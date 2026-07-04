// ===== 地図の初期化 =====
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://tiles.openfreemap.org/styles/liberty',
    center: [138.2529, 36.2048],
    zoom: 4.5
});

let earthquakeData = null; // 取得したデータを保持する変数
let animationId = null;    // アニメーション制御用
let isAnimating = false;



// 1. 分析開始（再分析）ボタンを押した時 -> 期間選択モーダルを表示
document.getElementById('analyze-btn').addEventListener('click', function() {
    document.getElementById('date-modal').classList.remove('hidden');
});

// 2. ラジオボタンの切り替え -> 期間指定フォームの有効/無効化
const periodRadios = document.querySelectorAll('input[name="period-type"]');
periodRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        const customDatesBox = document.getElementById('custom-dates');
        if (e.target.value === 'custom') {
            customDatesBox.classList.remove('disabled');
        } else {
            customDatesBox.classList.add('disabled');
        }
    });
});

// 3. キャンセルボタン -> モーダルを閉じる
document.getElementById('cancel-date-btn').addEventListener('click', () => {
    document.getElementById('date-modal').classList.add('hidden');
});

// 4. 分析を実行する処理
document.getElementById('execute-btn').addEventListener('click', async function() {
    // モーダルを隠す
    document.getElementById('date-modal').classList.add('hidden');

    const btn = document.getElementById('analyze-btn');
    btn.disabled = true;
    btn.innerText = 'データ取得中...';

    // 前回の結果（レイヤーとUI）を一旦隠す
    if (map.getLayer('earthquakes-heat')) {
        map.setLayoutProperty('earthquakes-heat', 'visibility', 'none');
    }
    if (map.getLayer('significant-earthquakes')) {
        map.setLayoutProperty('significant-earthquakes', 'visibility', 'none');
    }
    document.getElementById('legend').classList.add('hidden');
    document.getElementById('sidebar').classList.remove('active');

    // どの期間が選ばれたか判定し、APIのURLを決定する
    const periodType = document.querySelector('input[name="period-type"]:checked').value;
    let apiUrl = '';

    if (periodType === 'month') {
        // デフォルト: 過去1ヶ月
        apiUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
    } else {
        // カスタム期間指定
        const startDate = document.getElementById('start-date').value;
        let endDate = document.getElementById('end-date').value;

        if (!startDate) {
            alert('開始日を入力してください。');
            btn.disabled = false;
            btn.innerText = '再分析';
            return;
        }
        // 終了日が未入力の場合は「現在（今日）」を設定
        if (!endDate) {
            endDate = new Date().toISOString().split('T')[0]; // 例: "2024-05-15"
        }

        // USGSのカスタム検索用API (最大20,000件の制限あり)
        apiUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}&limit=20000`;
    }

    try {
        // データ取得
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('データ取得に失敗しました');
        }
        
        earthquakeData = await response.json();

        // 期間内にデータが1件もない場合のエラーハンドリング
        if (earthquakeData.features.length === 0) {
            alert('指定された期間に地震データがありません。別の期間をお試しください。');
            btn.disabled = false;
            btn.innerText = '再分析';
            return;
        }

        // データを古い順にソートしてアニメーション開始
        earthquakeData.features.sort((a, b) => a.properties.time - b.properties.time);
        btn.innerText = '分析中...';
        startAnalysisAnimation();

    } catch (error) {
        console.error('データ取得エラー:', error);
        alert('エラー発生: 期間が長すぎてデータ量が多すぎる（2万件超過）可能性があります。期間を短くしてください。');
        btn.innerText = '再分析';
        btn.disabled = false;
    }
});


// ===== 分析アニメーション（時間軸での表示） =====
function startAnalysisAnimation() {
    const overlay = document.getElementById('analysis-overlay');
    const timeDisplay = document.getElementById('analysis-time');
    overlay.classList.remove('hidden');
    isAnimating = true;

    // アニメーション用の一時的なデータソース
    const animatedGeoJSON = {
        type: 'FeatureCollection',
        features: []
    };

    if (!map.getSource('animation-source')) {
        map.addSource('animation-source', {
            type: 'geojson',
            data: animatedGeoJSON
        });

        // アニメーション中のレイヤー（Mに応じてサイズと色を変える）
        map.addLayer({
            id: 'animation-layer',
            type: 'circle',
            source: 'animation-source',
            paint: {
                'circle-radius': [
                    'interpolate', ['linear'], ['get', 'mag'],
                    1, 2,
                    5, 10,
                    7, 25
                ],
                'circle-color': [
                    'interpolate', ['linear'], ['get', 'mag'],
                    2, 'rgba(33,102,172,0.6)',
                    4, 'rgb(254,178,76)',
                    6, 'rgb(240,59,32)'
                ],
                // ★追加: 少し透明にして重なったときに見やすくする
                'circle-opacity': 0.6,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#fff'
            }
        });
    }

    let currentIndex = 0;
    const totalFeatures = earthquakeData.features.length;
    
    // アニメーションのスピード（1フレームあたりに進めるデータ数）
    const speed = 30; 
    
    // ★追加：同時に表示して残しておく地震の最大件数（これを超えると古い順に消えます）
    const maxVisiblePoints = 1000; 

    function animate() {
        if (!isAnimating) return; // スキップされたら停止

        // インデックスを指定したスピード分だけ進める
        currentIndex += speed;
        if (currentIndex > totalFeatures) {
            currentIndex = totalFeatures;
        }

        // ★変更：常に「startIndex」から「currentIndex」までの限られた件数だけを切り出す
        // currentIndex が 500 で maxVisiblePoints が 300 なら、200〜500の要素だけを取り出す
        const startIndex = Math.max(0, currentIndex - maxVisiblePoints);
        animatedGeoJSON.features = earthquakeData.features.slice(startIndex, currentIndex);

        // 地図上のデータを更新（古いデータは自動的に消える）
        map.getSource('animation-source').setData(animatedGeoJSON);

        // 画面の時間を更新
        if (currentIndex < totalFeatures) {
            // 現在描画している最新の地震の時間を表示
            const currentTime = earthquakeData.features[currentIndex - 1].properties.time;
            timeDisplay.innerText = new Date(currentTime).toLocaleString('ja-JP');
            
            // 次のフレームを描画
            animationId = requestAnimationFrame(animate);
        } else {
            // 全て完了したら最終結果を表示
            finishAnalysis();
        }
    }

    // アニメーション開始
    animate();
}

// ===== スキップボタンの処理 =====
document.getElementById('skip-btn').addEventListener('click', () => {
    if (isAnimating) {
        isAnimating = false; // アニメーションを停止
        cancelAnimationFrame(animationId);
        finishAnalysis();
    }
});

// ===== 最終結果（ヒートマップ＋ピン）の表示 =====
function finishAnalysis() {
    // 1. オーバーレイを隠す
    document.getElementById('analysis-overlay').classList.add('hidden');
    
    // ★変更: ボタンのテキストを「再分析」にし、再び押せるようにする
    const btn = document.getElementById('analyze-btn');
    btn.innerText = '再分析';
    btn.disabled = false; 

    // 2. アニメーション用の一時レイヤーを削除
    if (map.getLayer('animation-layer')) {
        map.removeLayer('animation-layer');
    }
    if (map.getSource('animation-source')) {
        map.removeSource('animation-source');
    }

    // 3. 本来のデータ（ヒートマップとマーカー）を表示
    if (!map.getSource('earthquakes')) {
        map.addSource('earthquakes', {
            type: 'geojson',
            data: earthquakeData
        });

        // リスクエリア表示（ヒートマップレイヤー）
        map.addLayer({
            id: 'earthquakes-heat',
            type: 'heatmap',
            source: 'earthquakes',
            maxzoom: 9,
            paint: {
                'heatmap-weight': [
                    'interpolate', ['linear'], ['get', 'mag'],
                    0, 0,
                    6, 1
                ],
                'heatmap-radius': [
                    'interpolate', ['linear'], ['zoom'],
                    0, 2,
                    9, 20
                ],
                'heatmap-color': [
                    'interpolate', ['linear'], ['heatmap-density'],
                    0, 'rgba(33,102,172,0)',
                    0.2, 'rgb(255,237,160)',
                    0.5, 'rgb(254,178,76)',
                    0.8, 'rgb(240,59,32)',
                    1, 'rgb(189,0,38)'
                ],
                'heatmap-opacity': 0.75
            }
        });

        // 過去に起きた大きな地震をマーキング
        map.addLayer({
            id: 'significant-earthquakes',
            type: 'circle',
            source: 'earthquakes',
            filter: ['>=', ['get', 'mag'], 5.0],
            paint: {
                'circle-radius': [
                    'interpolate', ['linear'], ['get', 'mag'],
                    5, 6,
                    7, 15
                ],
                'circle-color': '#ff1744',
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff',
                'circle-opacity': 0.9
            }
        });
    } else {
        // すでにソースがある場合はデータを更新するだけ
        map.getSource('earthquakes').setData(earthquakeData);
        // ★追加: 隠していたレイヤーを再び表示する
        map.setLayoutProperty('earthquakes-heat', 'visibility', 'visible');
        map.setLayoutProperty('significant-earthquakes', 'visibility', 'visible');
    }

    document.getElementById('legend').classList.remove('hidden');
}


// ===== 大きな地震のピンをクリックしたときの処理 =====
map.on('click', 'significant-earthquakes', (e) => {
    const properties = e.features[0].properties;
    const earthquakeTime = new Date(properties.time).toLocaleString('ja-JP');
    const sidebarContent = document.getElementById('sidebar-content');
    sidebarContent.innerHTML = `
        <h2 style="color: #d32f2f; margin-top:0;">⚠️ 大規模地震情報</h2>
        <hr>
        <p><strong>震源地:</strong><br>${properties.place}</p>
        <p><strong>規模 (マグニチュード):</strong><br><span style="font-size:20px; font-weight:bold; color:#d32f2f;">M ${properties.mag}</span></p>
        <p><strong>発生日時 (日本時間):</strong><br>${earthquakeTime}</p>
        <p><strong>津波警報の連動:</strong><br>${properties.tsunami === 1 ? '⚠️ 津波発生の可能性あり' : 'なし'}</p>
        <hr>
        <p><a href="${properties.url}" target="_blank" style="color: #ff5722; text-decoration: none; font-weight: bold;">➡️ USGSで詳細を見る(外部サイト)</a></p>
    `;
    document.getElementById('sidebar').classList.add('active');
});

map.on('mouseenter', 'significant-earthquakes', () => {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'significant-earthquakes', () => {
    map.getCanvas().style.cursor = '';
});

// ===== サイドバーの「×」ボタンを押したときの処理 =====
document.getElementById('close-sidebar-btn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('active');
});
const aboutBtn = document.getElementById("about-btn");
const aboutModal = document.getElementById("about-modal");
const closeAbout = document.getElementById("close-about");

aboutBtn.addEventListener("click", () => {
    aboutModal.style.display = "block";
});

closeAbout.addEventListener("click", () => {
    aboutModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === aboutModal) {
        aboutModal.style.display = "none";
    }
});
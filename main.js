// ===== 地図の初期化 =====
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://tiles.openfreemap.org/styles/liberty',
    center: [138.2529, 36.2048],
    zoom: 4.5
});

let earthquakeData = null;
let animationId = null;
let isAnimating = false;

document.getElementById('analyze-btn').addEventListener('click', function() {
    document.getElementById('date-modal').classList.remove('hidden');
});

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

document.getElementById('cancel-date-btn').addEventListener('click', () => {
    document.getElementById('date-modal').classList.add('hidden');
});

document.getElementById('execute-btn').addEventListener('click', async function() {
    document.getElementById('date-modal').classList.add('hidden');

    const btn = document.getElementById('analyze-btn');
    btn.disabled = true;
    btn.innerText = 'データ取得中...';

    if (map.getLayer('earthquakes-heat')) {
        map.setLayoutProperty('earthquakes-heat', 'visibility', 'none');
    }
    if (map.getLayer('significant-earthquakes')) {
        map.setLayoutProperty('significant-earthquakes', 'visibility', 'none');
    }
    document.getElementById('legend').classList.add('hidden');
    document.getElementById('sidebar').classList.remove('active');

    const periodType = document.querySelector('input[name="period-type"]:checked').value;
    const selectedCountryName = document.getElementById('country-select').value; // 選択された国を取得
    
    let baseUrl = '';

    // 1. 期間によるベースURLの作成
    if (periodType === 'month') {
        // Radius指定を適用するため、過去1ヶ月の場合もクエリ形式を使用する
        const today = new Date();
        const endDateStr = today.toISOString().split('T')[0];
        const startDateObj = new Date();
        startDateObj.setDate(today.getDate() - 30);
        const startDateStr = startDateObj.toISOString().split('T')[0];
        
        baseUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDateStr}&endtime=${endDateStr}&limit=20000`;
    } else {
        const startDate = document.getElementById('start-date').value;
        let endDate = document.getElementById('end-date').value;

        if (!startDate) {
            alert('開始日を入力してください。');
            btn.disabled = false;
            btn.innerText = '再分析';
            return;
        }
        if (!endDate) {
            endDate = new Date().toISOString().split('T')[0];
        }
        baseUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}&limit=20000`;
    }

    // 2. 地域（国）によるフィルタリングの追加
    let apiUrl = baseUrl;
    if (selectedCountryName !== 'all') {
        // 選択された国の緯度経度を探す
        const targetCountry = countryCoordinates.find(c => c.name === selectedCountryName);
        if (targetCountry) {
            const radiusKm = 1500; // 取得する半径（km）。日本周辺なら1500km程度が目安
            apiUrl += `&latitude=${targetCountry.lat}&longitude=${targetCountry.lng}&maxradiuskm=${radiusKm}`;
            
            // ついでに選択された国へカメラを移動させる（オプション）
            map.flyTo({
                center: [targetCountry.lng, targetCountry.lat],
                zoom: 4,
                speed: 1.5,
                essential: true
            });
        }
    }

    // ====== この後の try { const response = await fetch(apiUrl); ... } はそのまま ======

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('データ取得に失敗しました');
        
        earthquakeData = await response.json();

        if (earthquakeData.features.length === 0) {
            alert('指定された期間に地震データがありません。別の期間をお試しください。');
            btn.disabled = false;
            btn.innerText = '再分析';
            return;
        }

        earthquakeData.features.sort((a, b) => a.properties.time - b.properties.time);
        btn.innerText = '分析中...';
        startAnalysisAnimation();

    } catch (error) {
        console.error('データ取得エラー:', error);
        alert('エラー発生: 期間が長すぎてデータ量が多すぎる可能性があります。期間を短くしてください。');
        btn.innerText = '再分析';
        btn.disabled = false;
    }
});

function startAnalysisAnimation() {
    const overlay = document.getElementById('analysis-overlay');
    const timeDisplay = document.getElementById('analysis-time');
    overlay.classList.remove('hidden');
    isAnimating = true;

    const animatedGeoJSON = {
        type: 'FeatureCollection',
        features: []
    };

    if (!map.getSource('animation-source')) {
        map.addSource('animation-source', {
            type: 'geojson',
            data: animatedGeoJSON
        });

        map.addLayer({
            id: 'animation-layer',
            type: 'circle',
            source: 'animation-source',
            paint: {
                'circle-radius': [
                    'interpolate', ['linear'], ['get', 'mag'],
                    1, 2, 5, 10, 7, 25
                ],
                'circle-color': [
                    'interpolate', ['linear'], ['get', 'mag'],
                    2, 'rgba(33,102,172,0.6)',
                    4, 'rgb(254,178,76)',
                    6, 'rgb(240,59,32)'
                ],
                'circle-opacity': 0.6,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#fff'
            }
        });
    }

    let currentIndex = 0;
    const totalFeatures = earthquakeData.features.length;
    const speed = 30; 
    const maxVisiblePoints = 1500; 

    function animate() {
        if (!isAnimating) return;

        currentIndex += speed;
        if (currentIndex > totalFeatures) currentIndex = totalFeatures;

        const startIndex = Math.max(0, currentIndex - maxVisiblePoints);
        animatedGeoJSON.features = earthquakeData.features.slice(startIndex, currentIndex);

        map.getSource('animation-source').setData(animatedGeoJSON);

        if (currentIndex < totalFeatures) {
            const currentTime = earthquakeData.features[currentIndex - 1].properties.time;
            timeDisplay.innerText = new Date(currentTime).toLocaleString('ja-JP');
            animationId = requestAnimationFrame(animate);
        } else {
            finishAnalysis();
        }
    }

    animate();
}

document.getElementById('skip-btn').addEventListener('click', () => {
    if (isAnimating) {
        isAnimating = false;
        cancelAnimationFrame(animationId);
        finishAnalysis();
    }
});

// ===== ここから アプローチB: ポイントごとの深刻度スコア計算 =====
function finishAnalysis() {
    document.getElementById('analysis-overlay').classList.add('hidden');
    
    const btn = document.getElementById('analyze-btn');
    btn.innerText = '再分析';
    btn.disabled = false; 

    if (map.getLayer('animation-layer')) map.removeLayer('animation-layer');
    if (map.getSource('animation-source')) map.removeSource('animation-source');

    // 1. データ全体の最大マグニチュードを取得（正規化のため）
    let maxMag = 0;
    earthquakeData.features.forEach(feature => {
        const mag = feature.properties.mag || 0;
        if (mag > maxMag) maxMag = mag;
    });

    // 2. 各ポイントの「深刻度（Point Score）」を計算
    earthquakeData.features.forEach(feature => {
        const props = feature.properties;
        // USGSデータ: 経度, 緯度, 深さ(km) の順
        const depth = feature.geometry.coordinates[2] !== undefined ? feature.geometry.coordinates[2] : 0;
        
        // データの抽出
        const mag = props.mag || 0;
        const tsunami = props.tsunami === 1 ? 1 : 0;

        // 正規化 (0.0 〜 1.0)
        const normMag = maxMag > 0 ? (mag / maxMag) : 0;
        const depthScore = Math.max(0, (100 - depth) / 100); // 0kmで1.0、100km以深で0.0

        // 「頻度(0.40)」はヒートマップの密集度に任せるため、ここではそれ以外の要素(計0.60)を計算
        const pointScore = (0.30 * normMag) + (0.20 * depthScore) + (0.10 * tsunami);
        
        // 特殊プロパティとして保存
        feature.properties.pointScore = pointScore;
    });

    // 3. 地図への描画
    if (!map.getSource('earthquakes')) {
        map.addSource('earthquakes', {
            type: 'geojson',
            data: earthquakeData
        });

        // ヒートマップレイヤー
        map.addLayer({
            id: 'earthquakes-heat',
            type: 'heatmap',
            source: 'earthquakes',
            maxzoom: 9,
            paint: {
                // 各ポイントが持つ深刻度（最大0.6）を重みにする
                'heatmap-weight': [
                    'interpolate', ['linear'], ['get', 'pointScore'],
                    0, 0,
                    0.6, 1  // スコアが0.6なら最大の熱量として扱う
                ],
                // ズームに応じた熱源の広がり
                'heatmap-radius': [
                    'interpolate', ['linear'], ['zoom'],
                    0, 5,   // 元は 2（ズームレベル0：世界全体を見た時のサイズ）
                    9, 40   // 元は 20（ズームレベル9：拡大した時のサイズ）
                ],
                // ヒートマップのカラー設定
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

        // 大規模地震のマーカー
        map.addLayer({
            id: 'significant-earthquakes',
            type: 'circle',
            source: 'earthquakes',
            filter: ['>=', ['get', 'mag'], 5.0],
            paint: {
                'circle-radius': [
                    'interpolate', ['linear'], ['get', 'mag'],
                    5, 6, 7, 15
                ],
                'circle-color': '#ff1744',
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff',
                'circle-opacity': 0.9
            }
        });
    } else {
        // すでにソースがある場合はデータを更新して表示切り替え
        map.getSource('earthquakes').setData(earthquakeData);
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

// ===== サイドバーとモーダルの処理 =====
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

// ===== 国の緯度経度データの読み込みと検索 =====
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQUYesQGNST8fW1BDcKnlPIaJtLBCenrhFT_NG9jX7Ied7bS1gwlxA_UC95W3qljc_n7PoeRbpHxJY6/pub?output=csv';
let countryCoordinates = [];

async function loadCountryData() {
    try {
        const response = await fetch(csvUrl);
        const buffer = await response.arrayBuffer();
        const decoder = new TextDecoder('utf-8');
        const csvText = decoder.decode(buffer);
        const lines = csvText.split(/\r\n|\n/);
        
        const countrySelect = document.getElementById('country-select'); // プルダウンを取得

        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '') continue;
            
            const cols = lines[i].split(',');
            const countryName = cols[0].trim();
            
            countryCoordinates.push({
                name: countryName,
                lat: parseFloat(cols[1]),
                lng: parseFloat(cols[2]),
                description: cols[4] ? cols[4].trim() : ""
            });

            // プルダウンに国の選択肢(option)を追加
            const option = document.createElement('option');
            option.value = countryName;
            option.textContent = countryName;
            countrySelect.appendChild(option);
        }
    } catch (error) {
        console.error('CSVデータの取得に失敗しました:', error);
    }
}

document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('country-search').value.trim().replace(/[\s ]/g, '');
    const lowerQuery = query.toLowerCase();

    if (!query) return;

    const targetCountry = countryCoordinates.find(country => {
        const matchName = country.name.toLowerCase().includes(lowerQuery);
        const matchDesc = country.description && country.description.includes(query);
        return matchName || matchDesc;
    });

    if (targetCountry) {
        map.flyTo({
            center: [targetCountry.lng, targetCountry.lat],
            zoom: 4,
            speed: 1.5,
            essential: true
        });
    } else {
        alert(`「${query}」は見つかりませんでした。国名か首都名を確認してください。`);
    }
});

loadCountryData();
// ===== 地図の初期化 =====
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://tiles.openfreemap.org/styles/liberty',
    center: [138.2529, 36.2048],
    zoom: 4.5
});

// ===== 描画ツールの初期化 =====
const draw = new MapboxDraw({
    displayControlsDefault: false 
});
map.addControl(draw);

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

    // 分析開始時はツール類をリセット
    document.getElementById('left-tools-board').classList.add('hidden');
    document.getElementById('time-control-panel').classList.add('hidden');
    document.getElementById('ui-container').classList.remove('lifted');
    document.getElementById('draw-prompt').classList.add('hidden');
    draw.deleteAll(); 

    if (map.getLayer('earthquakes-heat')) {
        map.setLayoutProperty('earthquakes-heat', 'visibility', 'none');
    }
    if (map.getLayer('significant-earthquakes')) {
        map.setLayoutProperty('significant-earthquakes', 'visibility', 'none');
    }
    document.getElementById('legend').classList.add('hidden');
    document.getElementById('sidebar').classList.remove('active');

    const periodType = document.querySelector('input[name="period-type"]:checked').value;
    const selectedCountryName = document.getElementById('country-select').value; 
    
    let baseUrl = '';

    if (periodType === 'month') {
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

    let apiUrl = baseUrl;
    if (selectedCountryName !== 'all') {
        const targetCountry = countryCoordinates.find(c => c.name === selectedCountryName);
        if (targetCountry) {
            const radiusKm = 1500; 
            apiUrl += `&latitude=${targetCountry.lat}&longitude=${targetCountry.lng}&maxradiuskm=${radiusKm}`;
            
            map.flyTo({
                center: [targetCountry.lng, targetCountry.lat],
                zoom: 4,
                speed: 1.5,
                essential: true
            });
        }
    }

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

function finishAnalysis() {
    document.getElementById('analysis-overlay').classList.add('hidden');
    
    const btn = document.getElementById('analyze-btn');
    btn.innerText = '再分析';
    btn.disabled = false; 

    document.getElementById('left-tools-board').classList.remove('hidden');

    if (map.getLayer('animation-layer')) map.removeLayer('animation-layer');
    if (map.getSource('animation-source')) map.removeSource('animation-source');

    let maxMag = 0;
    earthquakeData.features.forEach(feature => {
        const mag = feature.properties.mag || 0;
        if (mag > maxMag) maxMag = mag;
    });

    earthquakeData.features.forEach(feature => {
        const props = feature.properties;
        const depth = feature.geometry.coordinates[2] !== undefined ? feature.geometry.coordinates[2] : 0;
        
        const mag = props.mag || 0;
        const tsunami = props.tsunami === 1 ? 1 : 0;

        const normMag = maxMag > 0 ? (mag / maxMag) : 0;
        const depthScore = Math.max(0, (100 - depth) / 100); 

        const pointScore = (0.30 * normMag) + (0.20 * depthScore) + (0.10 * tsunami);
        
        feature.properties.pointScore = pointScore;
    });

    if (!map.getSource('earthquakes')) {
        map.addSource('earthquakes', {
            type: 'geojson',
            data: earthquakeData
        });

        map.addLayer({
            id: 'earthquakes-heat',
            type: 'heatmap',
            source: 'earthquakes',
            maxzoom: 9,
            paint: {
                'heatmap-weight': [
                    'interpolate', ['linear'], ['get', 'pointScore'],
                    0, 0,
                    0.6, 1 
                ],
                'heatmap-radius': [
                    'interpolate', ['linear'], ['zoom'],
                    0, 5, 
                    9, 40 
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
        map.getSource('earthquakes').setData(earthquakeData);
        // フィルタをリセットして全表示
        map.setFilter('earthquakes-heat', null);
        map.setFilter('significant-earthquakes', ['>=', ['get', 'mag'], 5.0]);
        
        map.setLayoutProperty('earthquakes-heat', 'visibility', 'visible');
        map.setLayoutProperty('significant-earthquakes', 'visibility', 'visible');
    }

    document.getElementById('legend').classList.remove('hidden');
}


// ===== ツールボード内のボタンイベント =====

// 1. エリア詳細ボタン
document.getElementById('area-details-btn').addEventListener('click', () => {
    if (!earthquakeData || earthquakeData.features.length === 0) {
        alert('データがありません。先に「分析開始」を実行してください。');
        return;
    }
    draw.deleteAll();
    draw.changeMode('draw_polygon');
    
    document.getElementById('draw-prompt').classList.remove('hidden');
    document.getElementById('sidebar').classList.remove('active');
});

// 2. 時間別ボタンと再生バーの処理
const timePanel = document.getElementById('time-control-panel');
const uiContainer = document.getElementById('ui-container');
const sliderStart = document.getElementById('time-slider-start');
const sliderEnd = document.getElementById('time-slider-end');
const trackHighlight = document.getElementById('slider-track-highlight');
const displayStart = document.getElementById('time-display-start');
const displayEnd = document.getElementById('time-display-end');
const playPauseBtn = document.getElementById('play-pause-btn');
let playbackInterval = null;

document.getElementById('time-filter-btn').addEventListener('click', () => {
    if (!earthquakeData || earthquakeData.features.length === 0) {
        alert('データがありません。先に「分析開始」を実行してください。');
        return;
    }

    // データから最小・最大時間(タイムスタンプ)を取得
    const features = earthquakeData.features;
    const minTime = features[0].properties.time;
    const maxTime = features[features.length - 1].properties.time;

    // スライダーの範囲を設定
    sliderStart.min = minTime;
    sliderStart.max = maxTime;
    sliderEnd.min = minTime;
    sliderEnd.max = maxTime;
    
    // 初期値は全期間を表示
    sliderStart.value = minTime;
    sliderEnd.value = maxTime;

    updateTimeFilter();

    // パネル表示と「再分析」ボタンの上スライド
    timePanel.classList.remove('hidden');
    uiContainer.classList.add('lifted');
});

document.getElementById('close-time-panel-btn').addEventListener('click', () => {
    timePanel.classList.add('hidden');
    uiContainer.classList.remove('lifted');
    
    // 再生中なら停止
    if (playbackInterval) {
        clearInterval(playbackInterval);
        playbackInterval = null;
        playPauseBtn.innerText = '▶ 再生';
    }
    
    // 地図のフィルターを解除して全件表示に戻す
    if (map.getLayer('earthquakes-heat')) {
        map.setFilter('earthquakes-heat', null);
    }
    if (map.getLayer('significant-earthquakes')) {
        map.setFilter('significant-earthquakes', ['>=', ['get', 'mag'], 5.0]);
    }
});

// スライダー操作時のイベント
sliderStart.addEventListener('input', (e) => updateTimeFilter(e));
sliderEnd.addEventListener('input', (e) => updateTimeFilter(e));

function updateTimeFilter(e) {
    let startVal = parseInt(sliderStart.value);
    let endVal = parseInt(sliderEnd.value);
    
    // ツマミが交差しないようにブロックする処理
    if (startVal > endVal) {
        if (e && e.target === sliderStart) {
            sliderStart.value = endVal;
            startVal = endVal;
        } else if (e && e.target === sliderEnd) {
            sliderEnd.value = startVal;
            endVal = startVal;
        } else {
            const tmp = startVal;
            startVal = endVal;
            endVal = tmp;
        }
    }
    
    // 日付表示の更新
    displayStart.innerText = new Date(startVal).toLocaleString('ja-JP');
    displayEnd.innerText = new Date(endVal).toLocaleString('ja-JP');
    
    // スライダーの青いバー(ハイライト)の長さと位置を更新
    const min = parseInt(sliderStart.min);
    const max = parseInt(sliderStart.max);
    const percentStart = ((startVal - min) / (max - min)) * 100;
    const percentEnd = ((endVal - min) / (max - min)) * 100;
    
    trackHighlight.style.left = percentStart + '%';
    trackHighlight.style.width = (percentEnd - percentStart) + '%';
    
    // マップへのフィルター適用
    applyMapTimeFilter(startVal, endVal);
}

function applyMapTimeFilter(startTime, endTime) {
    if (!earthquakeData) return;
    
    const filterAll = [
        'all',
        ['>=', ['get', 'time'], startTime],
        ['<=', ['get', 'time'], endTime]
    ];
    
    const filterSig = [
        'all',
        ['>=', ['get', 'mag'], 5.0],
        ['>=', ['get', 'time'], startTime],
        ['<=', ['get', 'time'], endTime]
    ];
    
    if (map.getLayer('earthquakes-heat')) {
        map.setFilter('earthquakes-heat', filterAll);
    }
    if (map.getLayer('significant-earthquakes')) {
        map.setFilter('significant-earthquakes', filterSig);
    }
}

// 再生ボタンの処理
playPauseBtn.addEventListener('click', () => {
    if (playbackInterval) {
        // 再生中なら停止
        clearInterval(playbackInterval);
        playbackInterval = null;
        playPauseBtn.innerText = '▶ 再生';
    } else {
        // 停止中なら再生開始
        playPauseBtn.innerText = '⏸ 停止';
        
        let startVal = parseInt(sliderStart.value);
        let endVal = parseInt(sliderEnd.value);
        let windowSize = endVal - startVal;
        
        const min = parseInt(sliderStart.min);
        const max = parseInt(sliderStart.max);
        
        // すでに右端まで行っている場合は、最初に戻して再生
        if (endVal >= max) {
            startVal = min;
            endVal = min + windowSize;
        }
        
        const speedMultiplier = parseInt(document.getElementById('playback-speed').value);
        // 全体の長さに応じた1フレームあたりの移動量 (例: 全体を1000分割したベースに倍率をかける)
        const step = ((max - min) / 1000) * speedMultiplier; 
        
        playbackInterval = setInterval(() => {
            startVal += step;
            endVal = startVal + windowSize;
            
            // 右端に到達したときの処理
            if (endVal >= max) {
                endVal = max;
                startVal = max - windowSize;
                
                sliderStart.value = startVal;
                sliderEnd.value = endVal;
                updateTimeFilter();
                
                clearInterval(playbackInterval);
                playbackInterval = null;
                playPauseBtn.innerText = '▶ 再生';
            } else {
                sliderStart.value = startVal;
                sliderEnd.value = endVal;
                updateTimeFilter();
            }
        }, 50); // 50ms間隔で更新
    }
});


// ===== 図形の描画完了時の処理 =====
map.on('draw.create', calculateAreaDetails);
map.on('draw.update', calculateAreaDetails);

function calculateAreaDetails(e) {
    document.getElementById('draw-prompt').classList.add('hidden');
    
    const data = draw.getAll();
    if (data.features.length === 0) return;
    
    const polygon = data.features[0]; 
    
    const pts = turf.featureCollection(earthquakeData.features);
    const pointsWithin = turf.pointsWithinPolygon(pts, polygon);
    
    showAreaSidebarStats(pointsWithin.features);
}

function showAreaSidebarStats(features) {
    const sidebarContent = document.getElementById('sidebar-content');
    
    if (features.length === 0) {
        sidebarContent.innerHTML = `
            <h2 style="color: #2196F3; margin-top:0;">📊 エリア分析結果</h2>
            <hr>
            <p>選択されたエリア内に地震データは見つかりませんでした。</p>
        `;
        document.getElementById('sidebar').classList.add('active');
        return;
    }

    let totalMag = 0;
    let maxMag = -Infinity;
    let totalDepth = 0;
    let tsunamiCount = 0;

    features.forEach(f => {
        const mag = f.properties.mag || 0;
        const depth = f.geometry.coordinates[2] || 0; 
        
        totalMag += mag;
        if (mag > maxMag) maxMag = mag;
        totalDepth += depth;
        if (f.properties.tsunami === 1) tsunamiCount++;
    });

    const avgMag = (totalMag / features.length).toFixed(1);
    const avgDepth = (totalDepth / features.length).toFixed(1);

    sidebarContent.innerHTML = `
        <h2 style="color: #2196F3; margin-top:0;">📊 エリア分析結果</h2>
        <hr>
        <p><strong>地震発生数:</strong><br><span style="font-size:24px; font-weight:bold; color:#333;">${features.length}</span> 回</p>
        <p><strong>平均マグニチュード:</strong><br><span style="font-size:20px; font-weight:bold; color:#ff9800;">M ${avgMag}</span></p>
        <p><strong>最大マグニチュード:</strong><br><span style="font-size:20px; font-weight:bold; color:#f44336;">M ${maxMag}</span></p>
        <p><strong>平均震源の深さ:</strong><br>${avgDepth} km</p>
        <p><strong>津波警報連動数:</strong><br>${tsunamiCount} 回</p>
        <hr>
        <p style="font-size:12px; color:#666;">※別のエリアを調べる場合は、再度「エリア詳細」ボタンを押してください。</p>
    `;
    
    document.getElementById('sidebar').classList.add('active');
}


// ===== 大きな地震のピンをクリックしたときの処理 =====
map.on('click', 'significant-earthquakes', (e) => {
    if (draw.getMode() !== 'simple_select') return;

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
        
        const countrySelect = document.getElementById('country-select'); 

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
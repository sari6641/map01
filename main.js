const countryAliases = {
    "アフガニスタン": "Afghanistan",
    "アルバニア": "Albania",
    "アルジェリア": "Algeria",
    "アンドラ": "Andorra",
    "アンゴラ": "Angola",
    "アンティグア・バーブーダ": "Antigua and Barbuda",
    "アルゼンチン": "Argentina",
    "アルメニア": "Armenia",
    "オーストラリア": "Australia",
    "オーストリア": "Austria",
    "アゼルバイジャン": "Azerbaijan",
    "バハマ": "Bahamas",
    "バーレーン": "Bahrain",
    "バングラデシュ": "Bangladesh",
    "バルバドス": "Barbados",
    "ベラルーシ": "Belarus",
    "ベルギー": "Belgium",
    "ベリーズ": "Belize",
    "ベナン": "Benin",
    "ブータン": "Bhutan",
    "ボリビア": "Bolivia",
    "ボスニア・ヘルツェゴビナ": "Bosnia and Herzegovina",
    "ボツワナ": "Botswana",
    "ブラジル": "Brazil",
    "ブルネイ": "Brunei",
    "ブルガリア": "Bulgaria",
    "ブルキナファソ": "Burkina Faso",
    "ブルンジ": "Burundi",
    "カーボベルデ": "Cabo Verde",
    "カンボジア": "Cambodia",
    "カメルーン": "Cameroon",
    "カナダ": "Canada",
    "中央アフリカ共和国": "Central African Republic",
    "チャド": "Chad",
    "チリ": "Chile",
    "中国": "China",
    "コロンビア": "Colombia",
    "コモロ": "Comoros",
    "コンゴ共和国": "Congo",
    "コスタリカ": "Costa Rica",
    "クロアチア": "Croatia",
    "キューバ": "Cuba",
    "キプロス": "Cyprus",
    "チェコ": "Czech Republic",
    "コンゴ民主共和国": "Democratic Republic of the Congo",
    "デンマーク": "Denmark",
    "ジブチ": "Djibouti",
    "ドミニカ国": "Dominica",
    "ドミニカ共和国": "Dominican Republic",
    "エクアドル": "Ecuador",
    "エジプト": "Egypt",
    "エルサルバドル": "El Salvador",
    "赤道ギニア": "Equatorial Guinea",
    "エリトリア": "Eritrea",
    "エストニア": "Estonia",
    "エスワティニ": "Eswatini",
    "エチオピア": "Ethiopia",
    "フィジー": "Fiji",
    "フィンランド": "Finland",
    "フランス": "France",
    "ガボン": "Gabon",
    "ガンビア": "Gambia",
    "ジョージア": "Georgia",
    "ドイツ": "Germany",
    "ガーナ": "Ghana",
    "ギリシャ": "Greece",
    "グレナダ": "Grenada",
    "グアテマラ": "Guatemala",
    "ギニア": "Guinea",
    "ギニアビサウ": "Guinea-Bissau",
    "ガイアナ": "Guyana",
    "ハイチ": "Haiti",
    "ホンジュラス": "Honduras",
    "ハンガリー": "Hungary",
    "アイスランド": "Iceland",
    "インド": "India",
    "インドネシア": "Indonesia",
    "イラン": "Iran",
    "イラク": "Iraq",
    "アイルランド": "Ireland",
    "イスラエル": "Israel",
    "イタリア": "Italy",
    "ジャマイカ": "Jamaica",
    "日本": "Japan",
    "ヨルダン": "Jordan",
    "カザフスタン": "Kazakhstan",
    "ケニア": "Kenya",
    "キリバス": "Kiribati",
    "クウェート": "Kuwait",
    "キルギス": "Kyrgyzstan",
    "ラオス": "Laos",
    "ラトビア": "Latvia",
    "レバノン": "Lebanon",
    "レソト": "Lesotho",
    "リベリア": "Liberia",
    "リビア": "Libya",
    "リヒテンシュタイン": "Liechtenstein",
    "リトアニア": "Lithuania",
    "ルクセンブルク": "Luxembourg",
    "マダガスカル": "Madagascar",
    "マラウイ": "Malawi",
    "マレーシア": "Malaysia",
    "モルディブ": "Maldives",
    "マリ": "Mali",
    "マルタ": "Malta",
    "マーシャル諸島": "Marshall Islands",
    "モーリタニア": "Mauritania",
    "モーリシャス": "Mauritius",
    "メキシコ": "Mexico",
    "ミクロネシア": "Micronesia",
    "モルドバ": "Moldova",
    "モナコ": "Monaco",
    "モンゴル": "Mongolia",
    "モンテネグロ": "Montenegro",
    "モロッコ": "Morocco",
    "モザンビーク": "Mozambique",
    "ミャンマー": "Myanmar",
    "ナミビア": "Namibia",
    "ナウル": "Nauru",
    "ネパール": "Nepal",
    "オランダ": "Netherlands",
    "ニュージーランド": "New Zealand",
    "ニカラグア": "Nicaragua",
    "ニジェール": "Niger",
    "ナイジェリア": "Nigeria",
    "北朝鮮": "North Korea",
    "北マケドニア": "North Macedonia",
    "ノルウェー": "Norway",
    "オマーン": "Oman",
    "パキスタン": "Pakistan",
    "パラオ": "Palau",
    "パレスチナ": "Palestine",
    "パナマ": "Panama",
    "パプアニューギニア": "Papua New Guinea",
    "パラグアイ": "Paraguay",
    "ペルー": "Peru",
    "フィリピン": "Philippines",
    "ポーランド": "Poland",
    "ポルトガル": "Portugal",
    "カタール": "Qatar",
    "ルーマニア": "Romania",
    "ロシア": "Russia",
    "ルワンダ": "Rwanda",
    "セントクリストファー・ネービス": "Saint Kitts and Nevis",
    "セントルシア": "Saint Lucia",
    "セントビンセント・グレナディーン": "Saint Vincent and the Grenadines",
    "サモア": "Samoa",
    "サンマリノ": "San Marino",
    "サントメ・プリンシペ": "Sao Tome and Principe",
    "サウジアラビア": "Saudi Arabia",
    "セネガル": "Senegal",
    "セルビア": "Serbia",
    "セーシェル": "Seychelles",
    "シエラレオネ": "Sierra Leone",
    "シンガポール": "Singapore",
    "スロバキア": "Slovakia",
    "スロベニア": "Slovenia",
    "ソロモン諸島": "Solomon Islands",
    "ソマリア": "Somalia",
    "南アフリカ": "South Africa",
    "韓国": "South Korea",
    "南スーダン": "South Sudan",
    "スペイン": "Spain",
    "スリランカ": "Sri Lanka",
    "スーダン": "Sudan",
    "スリナム": "Suriname",
    "スウェーデン": "Sweden",
    "スイス": "Switzerland",
    "シリア": "Syria",
    "台湾": "Taiwan",
    "タジキスタン": "Tajikistan",
    "タンザニア": "Tanzania",
    "タイ": "Thailand",
    "東ティモール": "Timor-Leste",
    "トーゴ": "Togo",
    "トンガ": "Tonga",
    "トリニダード・トバゴ": "Trinidad and Tobago",
    "チュニジア": "Tunisia",
    "トルコ": "Turkey",
    "トルクメニスタン": "Turkmenistan",
    "ツバル": "Tuvalu",
    "ウガンダ": "Uganda",
    "ウクライナ": "Ukraine",
    "アラブ首長国連邦": "United Arab Emirates",
    "イギリス": "United Kingdom",
    "英国": "United Kingdom",
    "アメリカ": "United States",
    "アメリカ合衆国": "United States",
    "米国": "United States",
    "ウルグアイ": "Uruguay",
    "ウズベキスタン": "Uzbekistan",
    "バヌアツ": "Vanuatu",
    "バチカン市国": "Vatican City",
    "ベネズエラ": "Venezuela",
    "ベトナム": "Vietnam",
    "イエメン": "Yemen",
    "ザンビア": "Zambia",
    "ジンバブエ": "Zimbabwe",
    "コソボ": "Kosovo"
};
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

// ===== 地図切り替えUIの制御 =====
const basemapToggleBtn = document.getElementById('basemap-toggle-btn');
const basemapBoard = document.getElementById('basemap-board');
const basemapOptions = document.querySelectorAll('.basemap-option');

// 現在のスタイルを記録しておく変数（初期設定のスタイルを指定）
let currentMapStyle = 'mapbox://styles/mapbox/streets-v12';

// ボタンクリックでボードを開閉
basemapToggleBtn.addEventListener('click', () => {
    basemapBoard.classList.toggle('hidden');
});

// 各マップオプションのクリックイベント
basemapOptions.forEach(option => {
    option.addEventListener('click', () => {
        const newStyle = option.getAttribute('data-style');
        
        console.log("切り替え先のスタイル:", newStyle); // デバッグ用

        // 現在と同じスタイルなら閉じるだけで処理をスキップ
        if (currentMapStyle === newStyle) {
            basemapBoard.classList.add('hidden');
            return;
        }
        
        try {
            // スタイルを変更
            currentMapStyle = newStyle;
            map.setStyle(newStyle);
            basemapBoard.classList.add('hidden');
        } catch (error) {
            console.error("スタイルの変更中にエラーが発生しました:", error);
        }
    });
});

// ===== データの引き継ぎ（スタイル再読み込み時の復元） =====
// 新しい地図スタイルが読み込み終わったタイミングで発火します
map.on('style.load', () => {
    if (typeof earthquakeData !== 'undefined' && earthquakeData && earthquakeData.features && earthquakeData.features.length > 0) {
        restoreDataLayers(earthquakeData);
    }
});

/**
 * 消えてしまったソースとレイヤーを再追加し、UIの状態を復元する関数
 * @param {Object} geojsonData - APIから取得したGeoJSONデータ
 */
function restoreDataLayers(geojsonData) {
    // 1. ソースの再追加
    if (!map.getSource('earthquakes')) {
        map.addSource('earthquakes', {
            type: 'geojson',
            data: geojsonData
        });
    }

    // 2. ヒートマップレイヤーの再追加
    if (!map.getLayer('earthquakes-heat')) {
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
    }

    // 3. すべての地震地点レイヤー (earthquakes-points) の再追加
    if (!map.getLayer('earthquakes-points')) {
        map.addLayer({
            id: 'earthquakes-points',
            type: 'circle',
            source: 'earthquakes',
            layout: { 'visibility': 'none' },
            paint: {
                'circle-radius': [
                    'interpolate', ['exponential', 2], ['zoom'],
                    2, ['interpolate', ['linear'], ['get', 'mag'], 0, 1, 3, 1.5, 5, 2.5],
                    4, ['interpolate', ['linear'], ['get', 'mag'], 0, 4, 3, 6, 5, 10],
                    8, ['interpolate', ['linear'], ['get', 'mag'], 0, 64, 3, 96, 5, 160],
                    12, ['interpolate', ['linear'], ['get', 'mag'], 0, 1024, 3, 1536, 5, 2560]
                ],
                'circle-color': [
                    'interpolate', ['linear'], ['get', 'mag'],
                    0, 'rgba(33, 102, 172, 0.5)',
                    3, 'rgb(255, 237, 160)',
                    4.5, 'rgb(254, 178, 76)',
                    6, 'rgb(240, 59, 32)',
                    7.5, 'rgb(189, 0, 38)'
                ],
                'circle-opacity': 0.6,
                'circle-stroke-width': 0.5,
                'circle-stroke-color': '#ffffff'
            }
        });
    }

    // 4. 大規模地震レイヤー (significant-earthquakes) の再追加
    if (!map.getLayer('significant-earthquakes')) {
        map.addLayer({
            id: 'significant-earthquakes',
            type: 'circle',
            source: 'earthquakes',
            filter: ['>=', ['get', 'mag'], 5.0],
            paint: {
                'circle-radius': [
                    'interpolate', ['exponential', 2], ['zoom'],
                    2, ['interpolate', ['linear'], ['get', 'mag'], 5, 3, 7, 6.25],
                    4, ['interpolate', ['linear'], ['get', 'mag'], 5, 12, 7, 25],
                    8, ['interpolate', ['linear'], ['get', 'mag'], 5, 192, 7, 400],
                    12, ['interpolate', ['linear'], ['get', 'mag'], 5, 3072, 7, 6400]
                ],
                'circle-color': [
                    'interpolate', ['linear'], ['get', 'mag'],
                    0, 'rgba(33, 102, 172, 0.5)',
                    3, 'rgb(255, 237, 160)',
                    4.5, 'rgb(254, 178, 76)',
                    6, 'rgb(240, 59, 32)',
                    7.5, 'rgb(189, 0, 38)'
                ],
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff',
                'circle-opacity': 0.8
            }
        });
    }

    // 5. Mapbox Draw データの再描画
    if (typeof draw !== 'undefined') {
        const drawData = draw.getAll();
        if (drawData.features.length > 0) {
            draw.deleteAll();
            draw.add(drawData);
        }
    }

    // 6. UI状態（表示モード・時間フィルター）の再反映
    updateDisplayLayers();
    if (sliderStart && sliderEnd && sliderStart.value && sliderEnd.value) {
        applyMapTimeFilter(parseInt(sliderStart.value), parseInt(sliderEnd.value));
    }
}

// ===== 表示切替の処理 =====
function updateDisplayLayers() {
    if (!map.getLayer('earthquakes-heat')) return; // データがない場合はスキップ

    const mode = document.querySelector('input[name="display-mode"]:checked').value;
    const pointOptions = document.getElementById('point-options');
    
    if (mode === 'heatmap') {
        // ヒートマップモード
        pointOptions.classList.add('hidden');
        map.setLayoutProperty('earthquakes-heat', 'visibility', 'visible');
        map.setLayoutProperty('earthquakes-points', 'visibility', 'none');
        map.setLayoutProperty('significant-earthquakes', 'visibility', 'none');
        document.getElementById('legend').classList.remove('hidden');
    } else if (mode === 'points') {
        // 地震地点モード
        pointOptions.classList.remove('hidden');
        map.setLayoutProperty('earthquakes-heat', 'visibility', 'none');
        document.getElementById('legend').classList.add('hidden');
        
        const filterType = document.querySelector('input[name="point-filter"]:checked').value;
        if (filterType === 'all') {
            map.setLayoutProperty('earthquakes-points', 'visibility', 'visible');
            map.setLayoutProperty('significant-earthquakes', 'visibility', 'visible'); 
        } else if (filterType === 'sig') {
            map.setLayoutProperty('earthquakes-points', 'visibility', 'none');
            map.setLayoutProperty('significant-earthquakes', 'visibility', 'visible');
        }
    }
}

// ラジオボタンの変更イベントを登録
document.querySelectorAll('input[name="display-mode"]').forEach(radio => {
    radio.addEventListener('change', updateDisplayLayers);
});
document.querySelectorAll('input[name="point-filter"]').forEach(radio => {
    radio.addEventListener('change', updateDisplayLayers);
});

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
        if (map.getLayer('earthquakes-points')) {
            map.setLayoutProperty('earthquakes-points', 'visibility', 'none');
        }
        if (map.getLayer('significant-earthquakes')) {
            map.setLayoutProperty('significant-earthquakes', 'visibility', 'none');
        }
        
        // 地図上のデータソースも空にして完全に消去する
        if (map.getSource('earthquakes')) {
            map.getSource('earthquakes').setData({
                type: 'FeatureCollection',
                features: []
            });
        }
    document.getElementById('date-modal').classList.add('hidden');

    const btn = document.getElementById('analyze-btn');
    btn.disabled = true;
    btn.innerText = 'データ取得中...';

    // 分析開始時はツール類をリセット
    document.getElementById('left-tools-board').classList.add('hidden');
    document.getElementById('time-control-panel').classList.add('hidden');
    document.getElementById('ui-container').classList.remove('lifted');
    document.getElementById('show-time-panel-toggle').classList.add('hidden');
    document.getElementById('draw-prompt').classList.add('hidden');
    draw.deleteAll(); 

    if (map.getLayer('earthquakes-heat')) {
        map.setLayoutProperty('earthquakes-heat', 'visibility', 'none');
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
                    1, 4, 5, 15, 7, 35
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

        // ===== すべての地震地点レイヤー (青系の小さな丸) =====
        map.addLayer({
            id: 'earthquakes-points',
            type: 'circle',
            source: 'earthquakes',
            layout: { 'visibility': 'none' }, // 初期は非表示
            paint: {
                'circle-radius': [
                    // 地図の縮尺に合わせて2の累乗でスケールさせる
                    'interpolate', ['exponential', 2], ['zoom'],
                    // ① ズームレベル2（世界地図〜大陸レベル）: ズーム4の1/4のサイズ
                    2, [
                        'interpolate', ['linear'], ['get', 'mag'],
                        0, 1,
                        3, 1.5,
                        5, 2.5
                    ],
                    // ② ズームレベル4（国全体が見えるレベル）: 基準サイズ
                    4, [
                        'interpolate', ['linear'], ['get', 'mag'],
                        0, 4,
                        3, 6,
                        5, 10
                    ],
                    // ③ ズームレベル8（県が見えるレベル）
                    8, [
                        'interpolate', ['linear'], ['get', 'mag'],
                        0, 64,
                        3, 96,
                        5, 160
                    ],
                    // ④ ズームレベル12（市区町村が見えるレベル）
                    12, [
                        'interpolate', ['linear'], ['get', 'mag'],
                        0, 1024,
                        3, 1536,
                        5, 2560
                    ]
                ],
                // マグニチュードに応じて色を変化させる（凡例と同じ色合い）
                'circle-color': [
                    'interpolate', ['linear'], ['get', 'mag'],
                    0, 'rgba(33, 102, 172, 0.5)', // M0: 薄い青（透明度あり）
                    3, 'rgb(255, 237, 160)',      // M3: 薄い黄色
                    4.5, 'rgb(254, 178, 76)',     // M4.5: オレンジ
                    6, 'rgb(240, 59, 32)',        // M6: 赤
                    7.5, 'rgb(189, 0, 38)'        // M7.5以上: 濃い赤
                ],
                'circle-opacity': 0.6,
                'circle-stroke-width': 0.5,
                'circle-stroke-color': '#ffffff'
            }
        });

        map.addLayer({
            id: 'significant-earthquakes',
            type: 'circle',
            source: 'earthquakes',
            filter: ['>=', ['get', 'mag'], 5.0],
            paint: {
                'circle-radius': [
                    'interpolate', ['exponential', 2], ['zoom'],
                    // ① ズームレベル2（世界地図〜大陸レベル）: ズーム4の1/4のサイズ
                    2, [
                        'interpolate', ['linear'], ['get', 'mag'],
                        5, 3,
                        7, 6.25
                    ],
                    // ② ズームレベル4（国全体が見えるレベル）: 基準サイズ
                    4, [
                        'interpolate', ['linear'], ['get', 'mag'],
                        5, 12,
                        7, 25
                    ],
                    // ③ ズームレベル8（県単位）
                    8, [
                        'interpolate', ['linear'], ['get', 'mag'],
                        5, 192,
                        7, 400
                    ],
                    // ④ ズームレベル12（市区町村単位）
                    12, [
                        'interpolate', ['linear'], ['get', 'mag'],
                        5, 3072,
                        7, 6400
                    ]
                ],
                'circle-color': [
                    'interpolate', ['linear'], ['get', 'mag'],
                    0, 'rgba(33, 102, 172, 0.5)',
                    3, 'rgb(255, 237, 160)',
                    4.5, 'rgb(254, 178, 76)',
                    6, 'rgb(240, 59, 32)',
                    7.5, 'rgb(189, 0, 38)'
                ],
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff',
                'circle-opacity': 0.8
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
    updateDisplayLayers();
    initTimeSlider();
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

// 分析完了時に呼ばれる初期化関数を定義
function initTimeSlider() {
    if (!earthquakeData || earthquakeData.features.length === 0) return;

    const features = earthquakeData.features;
    const minTime = features[0].properties.time;
    const maxTime = features[features.length - 1].properties.time;

    sliderStart.min = minTime;
    sliderStart.max = maxTime;
    sliderEnd.min = minTime;
    sliderEnd.max = maxTime;
    
    sliderStart.value = minTime;
    sliderEnd.value = maxTime;

    updateTimeFilter();

    // パネルを表示して UIを上げる
    timePanel.classList.remove('hidden');
    uiContainer.classList.add('lifted');
    
    // 付箋ボタンは隠す
    document.getElementById('show-time-panel-toggle').classList.add('hidden');
}

// ×ボタンを押したときの処理
document.getElementById('close-time-panel-btn').addEventListener('click', () => {
    // パネルを下に隠す
    timePanel.classList.add('hidden');
    uiContainer.classList.remove('lifted');
    
    // 代わりに付箋(タブ)ボタンをひょっこり表示させる
    document.getElementById('show-time-panel-toggle').classList.remove('hidden');
    
});

// 付箋(タブ)ボタンをクリックしたときの処理
document.getElementById('show-time-panel-toggle').addEventListener('click', () => {
    // パネルを再表示する
    timePanel.classList.remove('hidden');
    uiContainer.classList.add('lifted');
    
    // 付箋ボタン自身を隠す
    document.getElementById('show-time-panel-toggle').classList.add('hidden');
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
    if (map.getLayer('earthquakes-points')) {
        map.setFilter('earthquakes-points', filterAll);
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
    
    // 【修正箇所】日付変更線またぎ対策
    // 地震データを仮想的に左右の地球（-360度, +360度）にも配置する
    let wrappedFeatures = [];
    earthquakeData.features.forEach(f => {
        const lng = f.geometry.coordinates[0];
        
        // ① 元の座標
        wrappedFeatures.push(f);
        
        // ② 右側にスクロールして描画した時用（+360度）
        let fPlus = JSON.parse(JSON.stringify(f));
        fPlus.geometry.coordinates[0] = lng + 360;
        wrappedFeatures.push(fPlus);
        
        // ③ 左側にスクロールして描画した時用（-360度）
        let fMinus = JSON.parse(JSON.stringify(f));
        fMinus.geometry.coordinates[0] = lng - 360;
        wrappedFeatures.push(fMinus);
    });
    
    const pts = turf.featureCollection(wrappedFeatures);
    const pointsWithin = turf.pointsWithinPolygon(pts, polygon);
    
    // 巨大な図形を描いた際、同じ地震を重複してカウントしないようIDでフィルターをかける
    const uniqueFeatures = [];
    const seenIds = new Set();
    
    pointsWithin.features.forEach(f => {
        // USGSのデータには f.id が存在するため、それを利用して重複チェック
        if (!seenIds.has(f.id)) {
            seenIds.add(f.id);
            uniqueFeatures.push(f);
        }
    });
    
    // 重複を排除したデータをサイドバーの計算用関数へ渡す
    showAreaSidebarStats(uniqueFeatures);
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
const pointLayers = ['significant-earthquakes', 'earthquakes-points'];

pointLayers.forEach(layer => {
    map.on('click', layer, (e) => {
        if (draw.getMode() !== 'simple_select') return;

        const properties = e.features[0].properties;
        const earthquakeTime = new Date(properties.time).toLocaleString('ja-JP');
        const sidebarContent = document.getElementById('sidebar-content');
        
        // M5以上かどうかでタイトルと色を分ける
        const isSignificant = properties.mag >= 5.0;
        const titleColor = isSignificant ? '#d32f2f' : '#2196F3';
        const titleText = isSignificant ? '⚠️ 大規模地震情報' : 'ℹ️ 地震詳細情報';

        sidebarContent.innerHTML = `
            <h2 style="color: ${titleColor}; margin-top:0;">${titleText}</h2>
            <hr>
            <p><strong>震源地:</strong><br>${properties.place}</p>
            <p><strong>規模 (マグニチュード):</strong><br><span style="font-size:20px; font-weight:bold; color:${titleColor};">M ${properties.mag}</span></p>
            <p><strong>発生日時 (日本時間):</strong><br>${earthquakeTime}</p>
            <p><strong>津波警報の連動:</strong><br>${properties.tsunami === 1 ? '⚠️ 津波発生の可能性あり' : 'なし'}</p>
            <hr>
            <p><a href="${properties.url}" target="_blank" style="color: #ff5722; text-decoration: none; font-weight: bold;">➡️ USGSで詳細を見る(外部サイト)</a></p>
        `;
        document.getElementById('sidebar').classList.add('active');
    });

    map.on('mouseenter', layer, () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', layer, () => {
        map.getCanvas().style.cursor = '';
    });
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
        const decoder = new TextDecoder("utf-8");
        const csvText = decoder.decode(buffer);
        const lines = csvText.split(/\r\n|\n/);

        // 検索バー用(datalist)
        const countryList = document.getElementById("country-list");

        // 分析用(select)
        const countrySelect = document.getElementById("country-select");

        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === "") continue;

            const cols = lines[i].split(",");
            const countryName = cols[0].trim();

            countryCoordinates.push({
                name: countryName,
                lat: parseFloat(cols[1]),
                lng: parseFloat(cols[2]),
                description: cols[4] ? cols[4].trim() : ""
            });

            // ===== 検索バーの予測変換 =====
            const listOption = document.createElement("option");
            listOption.value = countryName;
            countryList.appendChild(listOption);

            // ===== 分析画面の地域選択 =====
            const selectOption = document.createElement("option");
            selectOption.value = countryName;
            selectOption.textContent = countryName;
            countrySelect.appendChild(selectOption);
        }

        console.log("読み込み件数:", countryCoordinates.length);

    } catch (error) {
        console.error("CSVデータの取得に失敗しました:", error);
    }
    console.log(countryCoordinates);
}

document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('country-search').value.trim();

    if (!query) return;

    // 日本語なら英語名に変換
    const searchName = countryAliases[query] || query;
    const lowerQuery = searchName.toLowerCase();

    const targetCountry = countryCoordinates.find(country =>
        country.name.toLowerCase().includes(lowerQuery)
    );

    if (targetCountry) {
        map.flyTo({
            center: [targetCountry.lng, targetCountry.lat],
            zoom: 4,
            speed: 1.5,
            essential: true
        });
    } else {
        alert(`「${query}」は見つかりませんでした。`);
    }
});

loadCountryData();
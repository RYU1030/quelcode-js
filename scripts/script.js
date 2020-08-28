'use strict';

// 非同期処理を関数(ACQUIRE_DATA)に格納
const ACQUIRE_DATA = async (forecastFor) => {
  // 各パラメータを定数に格納
  const LANG = 'ja';
  const APP_ID = '4b5774e9f3d2a07b84f0f2f88e486224';
  // URLを作成し、定数に格納
  const URL = `http://api.openweathermap.org/data/2.5/weather?lang=${LANG}&id=${forecastFor}&appid=${APP_ID}`;
  // JSONデータを取得
  const JSON_DATA = await fetch(URL)
  .then(
    response => {
      return response.json(); 
    }
  )
  .catch(
    error => {
      console.error();('データの取得に失敗しました。', error);
      return null;
    }
  );

  // 取得したデータを定数に格納
  const SELECTED_CITY = JSON_DATA.name;
  const WEATHER = JSON_DATA.weather[0].description;
  const TEMPERATURE = Math.round(JSON_DATA.main.temp * 10 / 100);
  const ICON = JSON_DATA.weather[0].icon;
  const WEATHER_ICON = `http://openweathermap.org/img/wn/${ICON}@2x.png`;

  // HTML要素を取得
  const CURRENT_WEATHER = document.getElementById('weather');
  const CURRENT_CITY = document.getElementById('current-city');
  const WEATHER_CONDITION = document.getElementById('weather-condition');
  const CURRENT_TEMP = document.getElementById('temperature');

  // HTML要素に定数の値を反映
  CURRENT_CITY.textContent = SELECTED_CITY;
  CURRENT_WEATHER.textContent = WEATHER;
  WEATHER_CONDITION.src = WEATHER_ICON;
  CURRENT_TEMP.textContent = TEMPERATURE + '℃';
}

// プルダウンで選択肢を変更した時点で関数(ACQUIRE_DATA)を実行
const SELECT_CITY = document.getElementById('select-city');
SELECT_CITY.addEventListener('change', (e) => {
  // 選択されたオプションの値を定数に格納
  const FORECAST_FOR = e.target.value;
  ACQUIRE_DATA(FORECAST_FOR);
});

// デフォルトではロンドンの天気を表示する
const DEFAULT_CITY = '2643743';
ACQUIRE_DATA(DEFAULT_CITY);

import { weatherIcons } from './weather-icon.js';

const apiKey = 'MINHA API AQUI';

async function fetchWeatherData(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }
    const weatherData = await response.json();

    // Atualiza a cidade
    document.getElementById('cityName').innerText = weatherData.name;

    // Atualiza a temperatura
    const temperature = Math.round(weatherData.main.temp);
    document.getElementById('temperature').innerText = `${temperature}º`;

    // Atualiza a chance de chuva (nuvens)
    const cloudPercentage = weatherData.clouds.all;
    document.getElementById('chance-rain').innerText = `Chance de chuva ${cloudPercentage}%`;

    // Atualiza o ícone do clima usando seu próprio mapeamento
    const iconCode = weatherData.weather[0].icon;
    const customIcon = weatherIcons[iconCode];  // Busca no mapeamento

    if (customIcon) {
      document.getElementById('weather-icon').src = customIcon;
    } else {
      // Caso não haja ícone mapeado, pode-se usar um ícone padrão
      document.getElementById('weather-icon').src = './images/default-icon.svg';
    }
    } catch (error) {
    console.error('Erro ao buscar os dados do clima:', error);
    }
}

document.getElementById('cityInput').addEventListener('change', () => {
  const cityName = document.getElementById('cityInput').value;
  if (cityName) {
    fetchWeatherData(cityName);
  }
});
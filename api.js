require("dotenv").config();

const weatherApi = async (location) => {
  const URL = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location}`;
try {
  const response = await fetch(URL);

  if(!response.ok) {
    throw new Error('Ошибка: некорректно введена локация либо проблема с сервером. Попробуйте еще раз');
  }
  
  return await response.json();
  
} catch (error) {
  return error
}

};

const getTemperature = async location => {
  const weatherData = await weatherApi(location)

  if (weatherData && weatherData.stack && weatherData.message) {
    return weatherData.message
  }

  const temperature = `Месторасположение: ${weatherData.location.name}, ${weatherData.location.region}, ${weatherData.location.country}
  Температура: ${weatherData.current.temp_c}\u{00B0} Цельсия`

  console.log(temperature)

  return temperature
}

module.exports = {getTemperature}
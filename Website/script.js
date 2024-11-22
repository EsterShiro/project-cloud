async function getWeather() {
    const city = document.getElementById('city').value; // ดึงค่าจาก input field
    const tempDiv = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // ล้างค่าที่แสดงไว้ก่อนหน้า
    tempDiv.innerHTML = '';
    weatherInfoDiv.innerHTML = '';
    weatherIcon.src = '';
    hourlyForecastDiv.innerHTML = '';

    if (!city) {
        tempDiv.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    try {
        // ส่งคำขอไปที่ Python Backend (ปรับ endpoint ตามจริง)
        const response = await fetch('/weather?city=${city}');
        const data = await response.json();

        if (response.ok) {
            // แสดงข้อมูลที่ได้รับ
            tempDiv.innerHTML = <h3>Temperature: ${data.temperature}°C</h3>;
            weatherInfoDiv.innerHTML = <p>Description: ${data.description}</p>;

            // แสดงไอคอนสภาพอากาศ (ถ้ามีข้อมูล)
            if (data.icon) {
                weatherIcon.src = 'http://openweathermap.org/img/wn/${data.icon}@2x.png';
                weatherIcon.alt = data.description;
            }

            // หากมีข้อมูลพยากรณ์อากาศรายชั่วโมง (ถ้ามีการรองรับใน Backend)
            if (data.hourlyForecast) {
                hourlyForecastDiv.innerHTML = '<h3>Hourly Forecast:</h3>';
                data.hourlyForecast.forEach((hour) => {
                    const forecast = document.createElement('div');
                    forecast.innerHTML = 
                        <p><strong>${hour.time}</strong>: ${hour.temp}°C, ${hour.description}</p>
                    ;
                    hourlyForecastDiv.appendChild(forecast);
                });
            }
        } else {
            tempDiv.innerHTML = <p>Error: ${data.error}</p>;
        }
    } catch (error) {
        tempDiv.innerHTML = <p>Failed to fetch weather data. Please try again later.</p>;
        console.error('Error fetching weather data:', error);
    }
}
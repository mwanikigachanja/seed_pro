// seed-selector.js
document.addEventListener("DOMContentLoaded", function () {
    // Existing API keys and endpoints
    const weatherApiKey = 'e57fe133456b8c6ab739fbc3900619d0';  // Replace with your actual API key
    const locationApiUrl = 'https://ipapi.co/json/';
    const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    // Elements
    const recommendationSection = document.getElementById('recommendations');

    // Fetch location and weather data
    async function fetchWeatherAndLocation() {
        try {
            const locationResponse = await fetch(locationApiUrl);
            const locationData = await locationResponse.json();
            const city = locationData.city;
            const lat = locationData.latitude;
            const lon = locationData.longitude;

            const weatherResponse = await fetch(`${weatherApiUrl}?q=${city}&appid=${weatherApiKey}&units=metric`);
            const weatherData = await weatherResponse.json();

            const altResponse = await fetch(`https://api.open-meteo.com/v1/elevation?latitude=${lat}&longitude=${lon}`);
            const altData = await altResponse.json();
            const elevation = altData.elevation;

            // Display weather and location info (existing functionality)
            document.getElementById('weather-location').textContent = city;
            document.getElementById('weather-temperature').textContent = `${weatherData.main.temp} °C`;
            document.getElementById('weather-description').textContent = weatherData.weather[0].description;
            document.getElementById('weather-humidity').textContent = `${weatherData.main.humidity}%`;
            document.getElementById('weather-maxtemp').textContent = `${weatherData.main.temp_max} °C`;
            document.getElementById('weather-mintemp').textContent = `${weatherData.main.temp_min} °C`;
            document.getElementById('weather-wind').textContent = `${weatherData.wind.speed} m/s`;
            document.getElementById('weather-clouds').textContent = `${weatherData.clouds.all}%`;
            document.getElementById('weather-lat').textContent = lat;
            document.getElementById('weather-long').textContent = lon;
            document.getElementById('weather-alt').textContent = elevation;

            // Altitude categorization (existing functionality)
            let altitudeZone;
            if(elevation < 1200) {
                altitudeZone = 'Lowland Altitude';
            } else if(elevation >= 1201 && elevation < 1400) {
                altitudeZone = 'Dryland Altitude';
            } else if(elevation >= 1401 && elevation < 1500) {
                altitudeZone = 'Medium Altitude';
            } else if(elevation >= 1501 && elevation < 1800) {
                altitudeZone = 'Transitional Altitude';
            } else if(elevation >= 1801 && elevation < 2800) {
                altitudeZone = 'Highland Altitude';
            } else if(elevation >= 2801){
                altitudeZone = 'Very High Altitude';
            } else {
                altitudeZone = 'Unknown Altitude';
            }
            document.getElementById('weather-zone').textContent = altitudeZone;

            // Seed recommendation based on weather and altitude
            recommendSeeds(city, weatherData, elevation, altitudeZone);
        } catch (error) {
            console.error('Error fetching weather or location data:', error);
        }
    }

    // Seed recommendation logic
    function recommendSeeds(city, weatherData, elevation, altitudeZone) {
        // Example seed data - this should ideally be fetched from a database
        const seeds = [
            { name: 'Maize', suitableAltitude: [500, 2500], climate: 'Temperate', soil: 'Loamy' },
            { name: 'Sorghum', suitableAltitude: [300, 2000], climate: 'Dry', soil: 'Sandy' },
            { name: 'Wheat', suitableAltitude: [1000, 3000], climate: 'Cool', soil: 'Clayey' },
        ];

        // Filtering based on altitude and simple weather conditions (temperature)
        const recommendedSeeds = seeds.filter(seed => {
            const matchesAltitude = elevation >= seed.suitableAltitude[0] && elevation <= seed.suitableAltitude[1];
            const matchesClimate = (weatherData.main.temp >= 15 && weatherData.main.temp <= 25);  // Example temperature range

            return matchesAltitude && matchesClimate;
        });

        // Display the recommendations
        displayRecommendations(recommendedSeeds, city, altitudeZone, weatherData.main.temp);
    }

    // Display recommendations
    function displayRecommendations(seeds, city, altitudeZone, temperature) {
        recommendationSection.innerHTML = `<h3>Seed Recommendations for ${city} (${altitudeZone}, Temp: ${temperature}°C)</h3>`;
        if (seeds.length > 0) {
            seeds.forEach(seed => {
                const seedInfo = document.createElement('p');
                seedInfo.textContent = `- ${seed.name}: Suitable for your altitude and current temperature.`;
                recommendationSection.appendChild(seedInfo);
            });
        } else {
            recommendationSection.innerHTML += `<p>No suitable seeds found for your location and conditions.</p>`;
        }
    }

    // Initialize
    fetchWeatherAndLocation();
});

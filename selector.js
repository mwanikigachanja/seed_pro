document.getElementById('crop-planning-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get user inputs
    const location = document.getElementById('location').value;
    const altitude = document.getElementById('altitude').value;
    const soilType = document.getElementById('soil-type').value;
    const cropType = document.getElementById('crop-type').value;

    // Use the existing altitude algorithm from index.html
    const altitudeEffect = calculateAltitudeEffect(altitude);

    // Fetch data from APIs
    fetchLocationData(location)
        .then(locationData => fetchWeatherData(locationData))
        .then(weatherData => fetchSoilData(weatherData.locationData))
        .then(soilData => {
            // Generate and display seed recommendations
            const recommendations = generateRecommendations(altitudeEffect, soilType, weatherData, soilData, cropType);
            displayRecommendations(recommendations);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Please try again.');
        });
});

// Function to fetch location data from a Geolocation API
function fetchLocationData(location) {
    return new Promise((resolve, reject) => {
        const geolocationAPI = `https://api.example.com/geolocation?location=${encodeURIComponent(location)}`;
        fetch(geolocationAPI)
            .then(response => response.json())
            .then(data => {
                if (data && data.latitude && data.longitude) {
                    resolve({ latitude: data.latitude, longitude: data.longitude });
                } else {
                    reject('Invalid location data received.');
                }
            })
            .catch(error => reject(`Geolocation API error: ${error}`));
    });
}

// Function to fetch weather data from a Weather API
function fetchWeatherData(locationData) {
    return new Promise((resolve, reject) => {
        const weatherAPI = `https://api.example.com/weather?lat=${locationData.latitude}&lon=${locationData.longitude}`;
        fetch(weatherAPI)
            .then(response => response.json())
            .then(data => {
                if (data && data.temperature && data.rainfall) {
                    resolve({
                        temperature: data.temperature,
                        rainfall: data.rainfall,
                        locationData: locationData // Pass locationData for subsequent API calls
                    });
                } else {
                    reject('Invalid weather data received.');
                }
            })
            .catch(error => reject(`Weather API error: ${error}`));
    });
}

// Function to fetch soil data from a Soil API
function fetchSoilData(locationData) {
    return new Promise((resolve, reject) => {
        const soilAPI = `https://api.example.com/soil?lat=${locationData.latitude}&lon=${locationData.longitude}`;
        fetch(soilAPI)
            .then(response => response.json())
            .then(data => {
                if (data && data.soilType && data.pH) {
                    resolve({
                        soilType: data.soilType,
                        pH: data.pH
                    });
                } else {
                    reject('Invalid soil data received.');
                }
            })
            .catch(error => reject(`Soil API error: ${error}`));
    });
}

// Function to generate seed recommendations based on fetched data and user inputs
function generateRecommendations(altitudeEffect, soilType, weatherData, soilData, cropType) {
    // Placeholder recommendation logic, should be replaced with actual logic
    let recommendations = [];

    if (altitudeEffect === 'High altitude effect' && soilType === 'Loam' && weatherData.temperature > 20) {
        recommendations.push({
            seedName: 'Maize Hybrid 611',
            expectedYield: '5-7 tons/ha',
            optimalPlantingTime: 'March - May',
            soilCompatibility: soilType
        });
    }

    if (weatherData.rainfall > 100 && soilData.pH > 6) {
        recommendations.push({
            seedName: 'Sorghum Sila Mass',
            expectedYield: '4-6 tons/ha',
            optimalPlantingTime: 'October - December',
            soilCompatibility: soilType
        });
    }

    if (cropType && cropType.toLowerCase() === 'wheat') {
        recommendations.push({
            seedName: 'Wheat KENYA-FAHARI',
            expectedYield: '3-5 tons/ha',
            optimalPlantingTime: 'May - July',
            soilCompatibility: soilData.soilType
        });
    }

    return recommendations;
}

// Function to display seed recommendations in the table
function displayRecommendations(recommendations) {
    const tbody = document.querySelector('#recommendation-table tbody');
    tbody.innerHTML = ''; // Clear existing rows

    recommendations.forEach(recommendation => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${recommendation.seedName}</td>
            <td>${recommendation.expectedYield}</td>
            <td>${recommendation.optimalPlantingTime}</td>
            <td>${recommendation.soilCompatibility}</td>
        `;
        tbody.appendChild(row);
    });
}

// Existing altitude algorithm extracted and modified from index.html
function calculateAltitudeEffect(altitude) {
    // Simplified altitude effect logic
    if (altitude > 2000) {
        return 'High altitude effect';
    } else if (altitude > 1000) {
        return 'Moderate altitude effect';
    } else {
        return 'Low altitude effect';
    }
}

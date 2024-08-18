document.getElementById('crop-planning-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get user inputs
    const location = document.getElementById('location').value;
    const altitude = document.getElementById('altitude').value;
    const soilType = document.getElementById('soil-type').value;
    const cropType = document.getElementById('crop-type').value;

    // Use the altitude algorithm from index.html
    const altitudeEffect = calculateAltitudeEffect(altitude);

    // Fetch data from the APIs
    fetchLocationData(location)
        .then(locationData => fetchWeatherData(locationData))
        .then(weatherData => fetchSoilData(locationData))
        .then(soilData => {
            // Process data and generate recommendations
            const recommendations = generateRecommendations(altitudeEffect, soilType, weatherData, soilData, cropType);
            displayRecommendations(recommendations);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Please try again.');
        });
});

function fetchLocationData(location) {
    // Replace with actual API call
    return new Promise((resolve, reject) => {
        const dummyLocationData = { latitude: -1.2921, longitude: 36.8219 }; // Example for Nairobi
        resolve(dummyLocationData);
    });
}

function fetchWeatherData(locationData) {
    // Replace with actual API call
    return new Promise((resolve, reject) => {
        const dummyWeatherData = { temperature: 25, rainfall: 100 }; // Example data
        resolve(dummyWeatherData);
    });
}

function fetchSoilData(locationData) {
    // Replace with actual API call
    return new Promise((resolve, reject) => {
        const dummySoilData = { pH: 6.5, type: 'Loam' }; // Example data
        resolve(dummySoilData);
    });
}

function generateRecommendations(altitudeEffect, soilType, weatherData, soilData, cropType) {
    // This function generates seed recommendations based on all collected data
    // Replace with your actual recommendation logic
    const recommendations = [
        {
            seedName: 'Maize Hybrid 611',
            expectedYield: '5-7 tons/ha',
            optimalPlantingTime: 'March - May',
            soilCompatibility: soilType
        },
        {
            seedName: 'Sorghum Sila Mass',
            expectedYield: '4-6 tons/ha',
            optimalPlantingTime: 'October - December',
            soilCompatibility: soilType
        }
    ];

    return recommendations;
}

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

function calculateAltitudeEffect(altitude) {
    // Use the existing altitude algorithm from index.html
    // Here, we are just returning a dummy effect for demonstration purposes
    return altitude > 1000 ? 'High altitude effect' : 'Low altitude effect';
}

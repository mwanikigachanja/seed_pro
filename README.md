### Step 1: Create the New HTML File - `seed-selector.html`

We'll start by drafting the structure of the new HTML file. This page will include a form for inputting location, altitude, and other relevant details, and a section to display the seed recommendations.

#### 1.1 `seed-selector.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SeedInsight - Automated Crop Planning and Recommendation</title>
    <link rel="stylesheet" href="seed-selector.css">
</head>
<body>
    <header>
        <nav>
            <a href="index.html">Home</a>
            <a href="seed-selector.html" class="active">Crop Planning</a>
            <a href="#">Other Features</a>
            <a href="contact.html">Contact Us</a>
        </nav>
    </header>

    <main>
        <section class="intro">
            <h1>Automated Crop Planning and Recommendation</h1>
            <p>Get personalized seed recommendations based on your location, altitude, climate, and soil type.</p>
        </section>

        <section class="form-section">
            <form id="crop-planning-form">
                <div class="form-group">
                    <label for="location">Location:</label>
                    <input type="text" id="location" name="location" placeholder="Enter your location" required>
                </div>
                <div class="form-group">
                    <label for="altitude">Altitude (in meters):</label>
                    <input type="number" id="altitude" name="altitude" placeholder="Enter altitude" required>
                </div>
                <div class="form-group">
                    <label for="soil-type">Soil Type:</label>
                    <select id="soil-type" name="soil-type">
                        <option value="loam">Loam</option>
                        <option value="clay">Clay</option>
                        <option value="sand">Sand</option>
                        <option value="silt">Silt</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="crop-type">Crop Type (optional):</label>
                    <input type="text" id="crop-type" name="crop-type" placeholder="Enter crop type">
                </div>
                <button type="submit">Get Recommendations</button>
            </form>
        </section>

        <section id="results" class="results-section">
            <h2>Recommended Seeds</h2>
            <table id="recommendation-table">
                <thead>
                    <tr>
                        <th>Seed Name</th>
                        <th>Expected Yield</th>
                        <th>Optimal Planting Time</th>
                        <th>Soil Type Compatibility</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Results will be dynamically inserted here -->
                </tbody>
            </table>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 SeedInsight. All rights reserved.</p>
    </footer>

    <script src="seed-selector.js"></script>
</body>
</html>
```

### Step 2: Create the CSS File - `seed-selector.css`

This file will handle the styling of the new `seed-selector.html` page.

#### 2.1 `seed-selector.css`

```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
}

header {
    background-color: #333;
    color: #fff;
    padding: 10px 0;
    text-align: center;
}

nav a {
    color: #fff;
    margin: 0 15px;
    text-decoration: none;
}

nav a.active {
    font-weight: bold;
}

main {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.intro {
    text-align: center;
    margin-bottom: 20px;
}

.form-section {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button[type="submit"] {
    background-color: #28a745;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

button[type="submit"]:hover {
    background-color: #218838;
}

.results-section {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

#recommendation-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

#recommendation-table th,
#recommendation-table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
}

footer {
    text-align: center;
    padding: 10px;
    background-color: #333;
    color: #fff;
    position: fixed;
    width: 100%;
    bottom: 0;
}
```

### Step 3: Create the JavaScript File - `seed-selector.js`

This file will handle the logic for the form submission, API calls, and dynamic content generation.

#### 3.1 `seed-selector.js`

```javascript
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
    return altitude > 1000 ? 'High altitude effect' : 'Low altitude

 effect';
}
```

### Step 4: Integrate the New Feature

#### 4.1: **Link the New Page in the Existing Navigation**
   - Ensure the `index.html` navigation menu links to the new `seed-selector.html` page.

#### 4.2: **Leverage the Existing Altitude Algorithm**
   - The `calculateAltitudeEffect` function in `seed-selector.js` references the existing algorithm logic. We can copy or refactor parts of the existing code from `index.html` to be reused here.

#### 4.3: **API Integration**
   - Once we're ready for production, the dummy API functions should be replaced with actual calls to geolocation, weather, and soil data APIs.

### Conclusion

This setup provides a solid foundation for the new feature. The code is structured to be easily expandable with actual API integrations and refined algorithms. 

Next, I'll finalize the code, including API integrations and testing. Would you like to review the code at this stage, or shall I proceed with the final testing and deployment?
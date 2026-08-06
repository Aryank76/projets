// =============================
// WeatherAPI.com API Key
// =============================
const API_KEY = "6f9f76f2490e4c9182643729260508";

// Get weather when Search button is clicked
async function getWeather() {

    const city = document.getElementById("city").value.trim();

    if (city === "") {
        alert("Please enter a city.");
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network Error");
        }

        const data = await response.json();

        // If API returns an error
        if (data.error) {
            alert(data.error.message);
            return;
        }

        document.getElementById("cityName").textContent =
            `${data.location.name}, ${data.location.country}`;

        document.getElementById("temp").textContent =
            `${Math.round(data.current.temp_c)}°C`;

        document.getElementById("description").textContent =
            data.current.condition.text;

        document.getElementById("humidity").textContent =
            `${data.current.humidity}%`;

        document.getElementById("wind").textContent =
            `${data.current.wind_kph} km/h`;

        document.getElementById("feels").textContent =
            `${Math.round(data.current.feelslike_c)}°C`;

const aqi = data.current.air_quality["us-epa-index"];

let quality = "";

switch(aqi){

    case 1:
        quality = "🟢 Good";
        break;

    case 2:
        quality = "🟡 Moderate";
        break;

    case 3:
        quality = "🟠 Unhealthy (Sensitive)";
        break;

    case 4:
        quality = "🔴 Unhealthy";
        break;

    case 5:
        quality = "🟣 Very Unhealthy";
        break;

    case 6:
        quality = "🟤 Hazardous";
        break;

    default:
        quality = "N/A";

}

document.getElementById("aqi").textContent = quality;            

            


        document.getElementById("icon").src =
            "https:" + data.current.condition.icon;

        document.getElementById("icon").alt =
            data.current.condition.text;

    } catch (error) {

        console.error(error);
        alert("Unable to fetch weather. Check your internet or API key.");

    }

}

// Press Enter to search
document.getElementById("city").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        getWeather();
    }
});
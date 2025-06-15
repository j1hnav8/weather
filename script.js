// 🔑 Replace with your real API key 
const apiKey = "52bcf92b66090452e5e5bbdb6f2fa6d0";

//  When the button is clicked
document.getElementById("checkBtn").addEventListener("click", () => {
  const city = document.getElementById("city").value;
  const resultBox = document.getElementById("result");

  //  Validate user input
  if (city === "") {
    resultBox.innerHTML = " Please enter a city name.";
    return;
  }

  //  Form the API URL
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  //  Fetch the weather data
  fetch(apiURL)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      // 🌤 Extract and display
      const name = data.name;
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const emoji = pickEmoji(desc);

      resultBox.innerHTML = `
        <h3>${emoji} ${name}</h3>
        <p><strong>${temp}°C</strong> - ${desc}</p>
      `;
    })
    .catch(error => {
      resultBox.innerHTML = `❌ ${error.message}`;
    });
});

// 🌈 Fun function to match emojis to weather
function pickEmoji(description) {
  description = description.toLowerCase();
  if (description.includes("cloud")) return "☁️";
  if (description.includes("rain")) return "🌧️";
  if (description.includes("sun") || description.includes("clear")) return "☀️";
  if (description.includes("snow")) return "❄️";
  return "🌡️";
}

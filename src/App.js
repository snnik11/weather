// import React, { useState } from "react";

// const api = {
//   key: "402919c868bd708bd463c745b0df9586",
//   base: "https://api.openweathermap.org/data/2.5/",
// };

// function App() {
//   const [query, setQuery] = useState("");
//   const [weather, setWeather] = useState("");
//   const search = (evt) => {
//     if (evt.key === "enter") {
//       fetch(`${api.base}weather?q=${query}&units=metric&appid= ${api.key}`)
//         .then((res) => res.json())
//         .then((result) => {
//           setWeather(result);
//           setQuery("");
//           console.log(result);
//         });
//     }
//   };
//   const dateBuilder = (d) => {
//     let months = ["January", "february"];
//     let days = ["Sunday", "Monday"];
//     let day = days[d.getDay()];
//     let date = d.getDate();
//     let month = months[d.getMonth()];
//     let year = d.getFullYear();
//     return `${day} ${date} ${month} ${year}`;
//   };
//   return (
//     <div className="app">
//       <main>
//         <div className="search-box">
//           <input
//             type="text"
//             className="search-bar"
//             placeholder="Search..."
//             onChange={(e) => setQuery(e.target.value)}
//             value={query}
//             onKeyPress={search}
//           ></input>
//         </div>
//         <div className="location-box">
//           <div className="location"> Brisbane, Australia</div>
//           <div className="date">{dateBuilder(new Date())}</div>
//         </div>
//         <div className="weather-box">
//           <div className="temp"> 15 degrees Celsius </div>
//           <div className="weather">Sunny</div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;

import React from "react";
import "./App.css";
import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./app_component/weather.component";
import Form from "./app_component/form.component";

//const API_key = "402919c868bd708bd463c745b0df9586";
const API_key = "50c0477a6e3751b672978a62c87816e3";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
    };
    // this.getWeather();
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  get_WeatherIcon(icons, rangeID) {
    switch (true) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeID >= 500 && rangeID <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeID >= 600 && rangeID <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeID >= 701 && rangeID <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case (rangeID = 800):
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeID >= 801 && rangeID <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
      );

      const response = await api_call.json();
      console.log(response);
      this.setState({
        city: `${response.name} ${response.sys.country}`,
        country: response.sys.country,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false,
        //  icon: this.weatherIcon.Thunderstorm,
      });
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
    } else {
      this.setState({ error: true });
    }
  };
  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;

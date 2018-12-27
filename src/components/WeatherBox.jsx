import React from 'react';
import { connect } from 'react-redux';
import { isEmpty, head } from 'lodash';
import * as actionCreators from '../actions';


const mapStateToProps = state => ({
  weatherNow: state.weather.weatherNowData,
  weatherForecast: state.weather.weatherForecastData,
});

@connect(mapStateToProps, actionCreators)
class WeatherBox extends React.Component {
  normalizeDate = (timestamp) => {
    const fullDate = new Date(timestamp * 1000);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const rawHours = fullDate.getHours();
    const rawMinutes = fullDate.getMinutes();
    const hours = String(rawHours).length > 1 ? rawHours : `0${rawHours}`;
    const minutes = String(rawMinutes).length > 1 ? rawMinutes : `0${rawMinutes}`;
    return {
      day: fullDate.getDate(),
      month: monthNames[fullDate.getMonth()],
      hours,
      minutes,
    };
  }

  normalizeDegree = (degree) => {
    const roundedDegree = Math.round(degree);
    if (roundedDegree > 0) return `+${roundedDegree}`;
    return roundedDegree;
  }

  renderWeatherNow = (weatherData) => {
    const { weather, main, name } = weatherData;
    return (
      <>
        <div className="title">
          <h1 className="city">{name}</h1>
        </div>
        <div className="weather-now">
          <h3 className="city">Now</h3>
          <img src={`http://openweathermap.org/img/w/${head(weather).icon}.png`} />
          <div className="weather-now-description">{weather.description}</div>
          <div className="weather-now-temp">
            {`${this.normalizeDegree(main.temp)}`}
          </div>
        </div>
      </>
    );
  }

  renderWeatherForecast = (weatherData) => {
    const { list } = weatherData;
    return (

      <div className="weather-box">
        {list.map(({ dt, main, weather }) => {
          const date = this.normalizeDate(dt);
          return (
            <div className="weather-line" key={dt}>
              <div className="weather-date">
                <div className="weather-date-day">{date.day}</div>
                <div className="weather-date-month">{date.month}</div>
                <div className="weather-date-time">{`${date.hours}:${date.minutes}`}</div>
              </div>
              <div className="weather-info">
                <div className="weather-info-temp">
                  <img src={`http://openweathermap.org/img/w/${head(weather).icon}.png`} />
                  <div className="weather-info-temp-text">
                    <span className="deg low">{this.normalizeDegree(main.temp_min)}&#x2103;</span>&nbsp;
                    <span className="deg high">{this.normalizeDegree(main.temp_max)}&#x2103;</span>
                  </div>
                </div>
                <div className="weather-info-description">
                  <span>{head(weather).description}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    );
  }

  render() {
    const { weatherForecast, weatherNow } = this.props;
    return (
      <div className="weather-container">
        {!isEmpty(weatherNow) && this.renderWeatherNow(weatherNow) }
        {isEmpty(weatherForecast)
          ? <h1 className="city">Choose your Country!</h1>
          : this.renderWeatherForecast(weatherForecast)}
      </div>
    );
  }
}

export default WeatherBox;

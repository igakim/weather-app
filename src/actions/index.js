import { createAction } from 'redux-actions';
import axios from 'axios';

const apiKey = '73cd4a85bacde3a590c0017518449842';
const forecastHost = 'http://api.openweathermap.org/data/2.5/forecast';
const nowHost = 'http://api.openweathermap.org/data/2.5/weather';

export const showHeading = createAction('HEADING_SHOW');
export const closeHeading = createAction('HEADING_CLOSE');

export const getWeatherRequest = createAction('WEATHER_GET_REQUEST');
export const getWeatherSuccess = createAction('WEATHER_GET_SUCCESS');
export const getWeatherFailure = createAction('WEATHER_GET_FAILURE');

export const getWeather = city => async (dispatch) => {
  dispatch(getWeatherRequest());
  try {
    const forecastResponse = await axios.get(`${forecastHost}?appid=${apiKey}&q=${city}&cnt=3&units=metric`);
    const nowResponse = await axios.get(`${nowHost}?appid=${apiKey}&q=${city}&cnt=3&units=metric`);
    dispatch(getWeatherSuccess({
      weatherForecastData: forecastResponse.data,
      weatherNowData: nowResponse.data,
    }));
  } catch (e) {
    console.log(e);
    dispatch(getWeatherFailure());
  }
};

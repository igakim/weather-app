import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import * as actions from '../actions';

const weather = handleActions({
  [actions.getWeatherSuccess](state, { payload: { weatherForecastData, weatherNowData } }) {
    return {
      weatherForecastData, weatherNowData,
    };
  },
}, {});

export default combineReducers({
  weather,
  form: formReducer,
});

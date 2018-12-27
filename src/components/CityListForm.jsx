import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = () => ({});

@connect(mapStateToProps, actionCreators)
@reduxForm({
  form: 'city',
  initialValues: {
    city: 'tashkent',
  },
})
class CityListForm extends React.Component {
  getWeather = ({ city }) => {
    const { getWeather } = this.props;
    return getWeather(city);
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="form-box">
      <form action="" className="form" onSubmit={handleSubmit(this.getWeather)}>
        <Field name="city" component="select" required defaultValue={this.props.city} className="select-box">
          <option value="tashkent">Tashkent</option>
          <option value="moscow">Moscow</option>
          <option value="ottawa">Ottawa</option>
        </Field>
        <button type="submit" className="button button-submit" disabled={submitting}>{submitting ? 'WAIT' : 'GET WEATHER'}</button>
      </form>
      </div>
    );
  }
}

export default CityListForm;

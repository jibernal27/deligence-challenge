import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
 
require('react-datepicker/dist/react-datepicker.css')

export default class Form extends Component {

 
  constructor(props){
    super(props);
    this.state={startDate: moment()};
  }

  handleChange(date)
  {
  	 this.setState({
      startDate: date
    });
  }

  render() {
    return (
    	<div className="form-input">
    	<h2>Flying date</h2>
		<DatePicker
		dateFormat="DDMMMYYYY"
		minDate={moment()}
  		maxDate={moment().add(12, "months")}
  		monthsShown={2}
        selected={this.state.startDate}
        onChange={this.handleChange.bind(this)} 
        placeholderText="Date selection"/>
        </div>
    );
  }
}
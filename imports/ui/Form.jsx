import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
 
require('react-datepicker/dist/react-datepicker.css')

export default class Form extends Component {

 
  constructor(props){
    super(props);
    this.state={startDate: moment(),flightNumber:""};
  }

  handleChange(date)
  {
  	 this.setState({
      startDate: date
    });
  }
  checkFlight(data)
  {
  	var input=data.target.value;
  	this.setState({flightNumber:input});
  	if (input.length==2)
  	{
  		if (/^[a-z0-9]+$/i.test(input))
  		{
  			this.setState({flightNumber:input.toUpperCase()});
  		}
  		
  		else
  		{
  			this.setState({flightNumber:""});
  		}

  	}
  	else if (input.length>=3 && input.length<=6)
  	{
  		var number =input.substring(2,input.length);
  		if (/^[0-9]+$/i.test(number))
  		{
  			this.setState({flightNumber:input});
  		}
  		else
  		{
  			this.setState({flightNumber:input.substring(0,input.length-1)});
  		}
  	}
  	else if (input.length>6)
  	{
  		this.setState({flightNumber:input.substring(0,input.length-1)});
  		
  	}
  }

  unblur()
  {
  	var fight=this.state.flightNumber.substring(0,2)
  	var num=parseInt(this.state.flightNumber.substring(2,this.state.flightNumber.length));
  	if (num)
  	{
  		this.setState({flightNumber:fight+num});
  	}
  	
  }

  sumbitForm(event)
  {
  	console.log(this.state);
    event.preventDefault();
  }

  render() {
    return (
    	<div className="form-input">
    	<form>
    	<label >
    	 Flying date
		<div id="datepicker-id">
		<DatePicker
		dateFormat="DDMMMYYYY"
		minDate={moment()}
  		maxDate={moment().add(12, "months")}
  		monthsShown={2}
        selected={this.state.startDate}
        onChange={this.handleChange.bind(this)} 
        placeholderText="Date selection"/>
       </div>
       </label>
        <label>
        Flight Number
        <input type="text" name="name" onChange={this.checkFlight.bind(this)} value={this.state.flightNumber} onBlur={this.unblur.bind(this)}/>
        </label>
        <input type="submit" value="Search" onClick={this.sumbitForm.bind(this)} />
        </form>
        </div>
    );
  }
}
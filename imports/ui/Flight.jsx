import React, { Component } from 'react';
import moment from 'moment';
import {Reserves} from '../api/reserves.js';
export default class Flight extends Component {
	
 


	codeshareName(codeshare)
	{
		return codeshare.fsCode+codeshare.flightNumber;
	}
	name()
	{
		var rta="Flight "+this.props.flyname;
		if(this.props.data.codeshares.length>0)
		{
			rta+=" operated as "+this.codeshareName(this.props.data.codeshares[0]);

		for (var index = 1; index < this.props.data.codeshares.length; index++) {
		  	rta+=" and "+ this.codeshareName(this.props.data.codeshares[index]);
			}
		}
		return rta;
	}

	reserve()
	{
		console.log("works")
	}

	render()
	{

		return (
			<div className="flight">
			<h3> {this.name()}</h3>
			<div className="departure">
			<h3> Departure </h3>
			<h4> Date: {moment(this.props.data.departureDate.dateLocal).format('DDMMMYYYY')} </h4>
			<h4> Airport Code: {this.props.data.departureAirportFsCode}</h4>
			<h4> Airport Name: {this.props.airpots[this.props.data.departureAirportFsCode]}</h4>
			<h4> Time:{moment(this.props.data.departureDate.dateLocal).format('kk:mm')} </h4>
			<label> Reserve wheelchair
			<input type="checkbox"  onChange={()=>this.props.selectedChildren(false,this.props.index) } defaultChecked={this.props.statesEn.selectedDep} disabled={this.props.statesEn.enabledDep}/>
			</label>
			</div>
			<div className="arrival">
			<h3> Arrival </h3>
			<h4> Date: {moment(this.props.data.arrivalDate.dateLocal).format('DDMMMYYYY')} </h4>
			<h4> Airport Code: {this.props.data.arrivalAirportFsCode}</h4>
			<h4> Airport Name: {this.props.airpots[this.props.data.arrivalAirportFsCode]}</h4>
			<h4> Time:{moment(this.props.data.arrivalDate.dateLocal).format('kk:mm')} </h4>			
			<label> Reserve wheelchair
			<input type="checkbox"  onChange={()=>this.props.selectedChildren(true,this.props.index) } defaultChecked={this.props.statesEn.selectedArr} disabled={this.props.statesEn.enableArr} />
			</label>			
			</div>
			</div>
			)
	}
}

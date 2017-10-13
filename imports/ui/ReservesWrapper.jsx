import React,{Component} from 'react';
import {Reserves} from '../api/reserves.js';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';
 class ReservesWrapper extends Component{

 	deleteOne(index)
 	{

 		Meteor.call('reserveChair.delete', {
  			date:this.props.reserves[index].date,
  			flight:this.props.reserves[index].flight,
  			airportCode:this.props.reserves[index].airportCode
  		},(error)=>{});
 	}

 	render()
 	{
 		return (
 			<div className="reservesTable">
			<h1>Reserves</h1>
			  
 			{this.props.reserves.map((data,index)=>
 				(
 				<div className="reserve-list" key={index}>	
			    <h5 > {moment(data.createdAt).format('DDMMMYYYY kk:mm')} {data.airportCode} {data.flight} {moment(data.date).format('DDMMMYYYY kk:mm')} </h5>
 				<button onClick={()=>this.deleteOne(index)}> Delete </button>
 				</div>
 				))}
 			</div>
  			)
 		}
 }	

export default createContainer(() => {
  Meteor.subscribe('allReservations');

  return {
    reserves: Reserves.find({}, { sort: { createdAt: 1 } }).fetch()
  };
}, ReservesWrapper);
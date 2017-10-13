import React, { Component } from 'react';
import Flight from './Flight.jsx';
export default class Result extends Component {
	constructor(props){
    super(props);
    
    var flight= this.props.data.data.request.airline.fsCode+this.props.data.data.request.flight.interpreted;
    var status=this.props.data.data.flightStatuses;
    var airports={};

    for(var index in this.props.data.data.appendix.airports)
    {
    	airport=this.props.data.data.appendix.airports[index];
    	airports[airport.fs]=airport.name;
    }

;

    this.state={flight:flight,airports:airports,status:status};
  }

	render()
	{
		return (
			<div className="results">
			<h1> Search results</h1>
			{this.state.status.map((item,index)=> (
				<Flight data={item} airpots={this.state.airports} flyname={this.state.flight} key={index}/>
				))}
			</div>
			)
	}
}

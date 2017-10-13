import React, { Component } from 'react';
import Flight from './Flight.jsx';
/** Result component -Parses the results of the API and renders all the fligths */

export default class Result extends Component {
  /** Parses the information of the API
 *@constructor
 */
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
    childrenEstates={};
    status.map((item,index)=>
    	{
    		childrenEstates[index]={enabledDep: false,enableArr:false,selectedArr:false,selectedDep:false};
    	})
    this.state={flight:flight,airports:airports,status:status,count:0,childrenEstates:childrenEstates};
  }

/**
 * Changes the selection of an airport to ensure only two are selected. 
 * @param {boolean} arrival - If the selected status filght is from an arrival. 
 * @param {integer} key - The position of the flight status in the flightstatus of the state. 
 */
  selectedChildren(arrival,key)
  {

  	const childrenEstates=this.state.childrenEstates;
  	var add=this.state.count;
  	var added=false;


	var airpotcode="non";
	var date= new Date();
	if (arrival)
	{
		airpotcode=this.state.status[key].arrivalAirportFsCode;
		date=new Date(this.state.status[key].arrivalDate.dateLocal);
	}
	else
	{
		airpotcode=this.state.status[key].departureAirportFsCode;
		date=new Date(this.state.status[key].departureDate.dateLocal);
	}

  	if(arrival)
  	{
  		if(childrenEstates[key].selectedArr)
  		{
  			childrenEstates[key].selectedArr=false;
  			add+=-1;
  		}
  		else
  		{
  			childrenEstates[key].selectedArr=true;
  			add+=1;
  			added=true;
  		}
  	}
  	else
  	{
  		 if(childrenEstates[key].selectedDep)
  		{
  			childrenEstates[key].selectedDep=false;
  			add+=-1;
  		}
  		else
  		{
  			childrenEstates[key].selectedDep=true;
  			add+=1;
  			added=true;
  		}

  	}
    this.setState({count:add});
    
    if (add==2)
    {
    	for(var key in childrenEstates )
    	{

    		if (!childrenEstates[key].selectedArr)
    		{
    			childrenEstates[key].enableArr=true;
    		}
    		if (!childrenEstates[key].selectedDep)
    		{
    			childrenEstates[key].enabledDep=true;
    		}
    	}
    }
    else if (add<2)
    {
    	for(var key in childrenEstates )
    	{

    			childrenEstates[key].enableArr=false;
    			childrenEstates[key].enabledDep=false;
    	}

    }

    this.setState({
        childrenEstates,
    });

     if (added)
  	{
  		Meteor.call('reserveChair.reserve', {
  			date:date,
  			flight:this.state.flight,
  			airportCode:airpotcode
  		},(error)=>{});
  	}
  	else
  	{
  		Meteor.call('reserveChair.delete', {
  			date:date,
  			flight:this.state.flight,
  			airportCode:airpotcode
  		},(error)=>{});

  	}
  }

/** Renders all the fligth status in FLight components*/
	render()
	{
		return (
			<div className="results">
			<h1> Search results</h1>
			{this.state.status.map((item,index)=> (
        <div className="fligth-ind">
				<Flight data={item} airpots={this.state.airports} flyname={this.state.flight} key={index} index={index} statesEn={this.state.childrenEstates[index]} selectedChildren={this.selectedChildren.bind(this)}/>
				</div>
        ))}
			</div>
			)
	}
}

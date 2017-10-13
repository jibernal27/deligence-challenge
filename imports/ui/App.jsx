import React, { Component } from 'react';
 

import Form from './Form.jsx';
import Result from './Result.jsx'; 
import ReservesWrapper from './ReservesWrapper.jsx';
// App component - represents the whole app
export default class App extends Component {
  constructor(props){
    super(props);
    this.state={loading:false,data:null};
  }


  changeLoading()
  {
    this.setState({loading:!this.state.loading});
  }

  disPlayResults(data)
  {
    console.log(data);
    this.setState({data:data});
  }

  displayLoading()
  {
    if (this.state.loading)
    {
      return( <h2> Loading</h2>)
    }
    else if (this.state.data)
    {
      return (<Result data={this.state.data}/>)
    }

  }
 
  render() {
    var load=this.displayLoading()
    return (
      <div className="container">
        <header>
          <h1>Wheelchair reservation</h1>
        </header>
        <Form callbackFromparent={this.disPlayResults.bind(this)} changeLoading={this.changeLoading.bind(this)}/>
        <ReservesWrapper/>
        {load}
      </div>
    );
  }
}
import React, { Component } from 'react';
 

import Form from './Form.jsx';
import Result from './Result.jsx'; 
import ReservesWrapper from './ReservesWrapper.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { createContainer } from 'meteor/react-meteor-data';

/** App component - represents the whole app */
 class App extends Component {
  constructor(props){
    super(props);
    this.state={loading:false,data:null};
  }

/** Toggles  loading  . */

  changeLoading()
  {
    this.setState({loading:!this.state.loading});
  }
/**
 * Changes the state with the result of the API
 * @param {JSON} data -The result of the API
 */
  disPlayResults(data)
  {
    this.setState({data:data});
  }
/**  Shows the loading message while the data is retrived from the API. */

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
/** Renders the compoenent. Ensures that only logged users are the only ones able to use the application */

 
  render() {

    var load=this.displayLoading();

    return (
      <div className="container">
        <header>
          <h1>Wheelchair reservation</h1>
        </header>
        <AccountsUIWrapper />
      {this.props.currentUser ?
      <div>
        <Form callbackFromparent={this.disPlayResults.bind(this)} changeLoading={this.changeLoading.bind(this)}/>
        <ReservesWrapper/>
        {load}
      </div> :''
       }
      </div>
    );
  }
}

export default createContainer(() => {
 

  return {
    currentUser: Meteor.user(),
  };
}, App);
import React, { Component } from 'react';
 

import Form from './Form.jsx';
 
// App component - represents the whole app
export default class App extends Component {
 

 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Wheelchair reservation</h1>
        </header>
        <Form/>
       
      </div>
    );
  }
}
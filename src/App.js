import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Navbar from './Component/Navbar';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ""
    }
  }
  render() {
    return (
      <div className="App">
        <Navbar />
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  console.log(state);
  return {

  }
}

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
import React, { Component } from 'react';
import logo from './logo.svg';
import { InputField, List } from './githubComponent';
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
  keyPress = (e) => {
    if (e.key === "Enter") {
      this.props.getUserData(this.state.userInput);
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
import React, { Component } from 'react';
import logo from './logo.svg';
import { InputField, List } from './githubComponent';
import {connect} from 'react-redux';
import GitAction from './store/action/github';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInput : ""
    }
  }
  keyPress = (e) =>{
    if(e.key === "Enter"){
      this.props.getUserData(this.state.userInput);
    }
  }
  render() {
    return (
      <div className="App">
        <InputField
          value = {this.state.userInput}
          onChange = {(e) => this.setState({userInput: e.target.value})}
          onKeyPress = {this.keyPress}/>
      </div>
    );
  }
}

let mapStateToProps = (state) =>{
  console.log(state);
  return{
    
  }
}

let mapDispatchToProps = (dispatch) => {
  return{
    getUserData: (name) => dispatch(GitAction.getUserInfo(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
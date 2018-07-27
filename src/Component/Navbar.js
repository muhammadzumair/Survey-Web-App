import React, { Component } from "react";
import { connect } from "react-redux";
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChartIcon from '@material-ui/icons/BarChart';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import InputIcon from '@material-ui/icons/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Appbar from './Appbar';
import Home from '../Container/Home'
import './Navbar.css';

const color = '#3f3f3f'
const styles = {
  listText: {
    fontSize: '17px',
    fontFamily: 'sans-serif',
    paddingLeft: '15px',
    color: 'white',
    fontWeight: 'bold',
  },
  circularStyle: {
    height: '87vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: 'table',
      colorObj: {
        home: '#6c6c6c',
        reason: '#6c6c6c',
        logout: '#6c6c6c',
        add: '#6c6c6c'
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("user", nextProps.user);
    if (nextProps.user === null) {
      console.log("user", nextProps.user);
      this.props.history.replace('/');
    }
  }

  clicked = (name) => {
    let obj = this.state.colorObj;
    for (let i in obj) {
      obj[i] = '#6c6c6c'
    }
    obj[name] = '#37a4d2';
    this.setState({ colorObj: obj });
  }

  render() {
    return (
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: '25vw', position: 'fixed', border: "2px solid", backgroundColor: "#3d3d3d", height: '100vh' }} className='col-1'>
          <List component="nav" >
            <ListItem button style={{ padding: 0, margin: 0 }} onClick={() => this.clicked("kitchen")} className='align-center'>
              <h1 style={{ color: 'white', margin: 14, padding: 1 }} className='list-heading'>Survey Admin</h1>
            </ListItem>
            <Divider className='list-text' />
            <ListItem button onClick={() => this.clicked("home")} className='align-center'>
              <ListItemIcon>
                <DashboardIcon style={{ marginRight: "0px", color: this.state.colorObj.home }} />
              </ListItemIcon>
              <p style={styles.listText} className='list-text'>Home</p>
            </ListItem>
            <Divider />
            <ListItem button onClick={() => this.clicked("reason")} className='align-center'>
              <ListItemIcon>
                <ChartIcon style={{ marginRight: "0px", color: this.state.colorObj.reason }} />
              </ListItemIcon>
              <p style={styles.listText} className='list-text'>Reason Analytics</p>
            </ListItem>
            <Divider />
            <ListItem button onClick={() => this.clicked("add")} className='align-center'>
              <ListItemIcon>
                <AddIcon style={{ marginRight: "0px", color: this.state.colorObj.add }} />
              </ListItemIcon>
              <p style={styles.listText} className='list-text'>Add Branch</p>
            </ListItem>
            <Divider />
            <ListItem button onClick={() => this.clicked("logout")} className='align-center'>
              <ListItemIcon>
                <InputIcon style={{ marginRight: "0px", color: this.state.colorObj.logout }} />
              </ListItemIcon>
              <p style={styles.listText} className='list-text'>Logout</p>
            </ListItem>
          </List>
        </div>
        <div style={{ width: '75vw', marginLeft: '25vw', overflow: 'auto'}} className='col-2'>
          <Appbar />
          {/* {this.props.children} */}
          <Home/>
        </div>

      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    // user: state.AuthReducer.user,
    // isLoading: state.TableReducer.isLoading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

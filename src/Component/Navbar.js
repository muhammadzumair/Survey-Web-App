import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';
import InputIcon from '@material-ui/icons/Input';
import Grid from "@material-ui/core/Grid";
import DraftsIcon from '@material-ui/icons/Tab';
import SpaceBar from '@material-ui/icons/SpaceBar';
import Button from '@material-ui/core/Button'
import Appbar from './Appbar';
import './Navbar.css';
import Home from  '../Container/Home/Home';





const drawerWidth = 240;
const styles = {
  listText: {
    fontSize: '17px',
    fontFamily: 'sans-serif',
    paddingLeft: '15px',
    color: 'white',
    fontWeight: 'bold'
  },
  circularStyle: {
    height: '87vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}



export default class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { color: { home: "#6c6c6c", reason: "#6c6c6c", add: "#6c6c6c", logout: "#6c6c6c" } }
  }

  clicked = (name) => {
    let obj = this.state.color

    for (let i in obj) {
      obj[i] = "#6c6c6c"

    }
    obj[name] = "#37a4d2"
    this.setState({ color: obj })
  }

  render() {



    return (
      <div style={{ display: "flex" }}  >
        <div className={"col1"} style={{ width: '25vw', position: "fixed", backgroundColor: "#3f3f3f", height: "100vh" }} >
          <List component="nav" >
            <ListItem button style={{ padding: 0, margin: 0 }} >
              <ListItemText className={"listHeading"} primary={<h1 style={{ color: "#fff", padding: "1%", margin: "4%", textAlign: "center" }} >Survey Admin</h1>} >
              </ListItemText>
            </ListItem>
            <Divider className={"listText"} style={{ backgroundColor: "#686868" }} />
            <ListItem button className={"centerIcon"} onClick={() => this.clicked("home")}>
              <ListItemIcon  >
                <DashboardIcon style={{ marginRight: "0px", color: "#8e908e", color: this.state.color.home }} />
              </ListItemIcon>
              <p className={"listText"} style={styles.listText}>Home</p>
            </ListItem>
            <Divider />
            <ListItem button className={"centerIcon"} onClick={() => this.clicked("reason")}>
              <ListItemIcon>
                <BarChartIcon style={{ marginRight: "0px", color: "#8e908e", color: this.state.color.reason }} />
              </ListItemIcon>
              <p className={"listText"} style={styles.listText}>Reason Analytics</p>
            </ListItem>
            <Divider />
            <ListItem button className={"centerIcon"} onClick={() => this.clicked("add")}>
              <ListItemIcon>
                <AddCircleIcon style={{ marginRight: "0px", color: "#8e908e", color: this.state.color.add }} />
              </ListItemIcon>
              <p className={"listText"} style={styles.listText}>Add Branch</p>
            </ListItem>
            <Divider />
            <ListItem className={"centerIcon"} button onClick={() => this.clicked("logout")}>
              <ListItemIcon>
                <InputIcon style={{ marginRight: "0px", color: "#8e908e", color: this.state.color.logout }} />
              </ListItemIcon>
              <p className={"listText"} style={styles.listText}>Logout</p>
            </ListItem>
          </List>
        </div>
        <div className={"col2"} style={{ width: "75vw", backgroundColor: "cyan", marginLeft: "25vw", height: "100vh",overflowY:"scroll" }}>

          <Appbar />
          <Home />

        </div>
        {
          // this.state.component === "menu" ?
          //   <Menu />
          //   :
          //   this.state.component === "table" ?
          //     <Table />
          //     :this.state.component==="kitchen"?
          //     <Kitchen />:
          //     <Bill />
        }

      </div>
    );
  }
}


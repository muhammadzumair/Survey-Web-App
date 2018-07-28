import React, { Component } from "react";
import { connect } from 'react-redux';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";
import Person from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default class Appbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
    };
  }
  toggleDrawer = () => {
    this.setState({ openDrawer: !this.state.openDrawer });
  }

  render() {
    return (
      <div>
        <AppBar position="static" style={{ backgroundColor: "#d5d5d5" }}>
          <Toolbar style={{ display: "flex", flex: 1, justifyContent: 'flex-end' }} >







            <div  >

              <Select
                value={"select branch"}
                onChange={this.handleChange}


              >
                <MenuItem value="select branch">
                  <em>select branch</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>

            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}



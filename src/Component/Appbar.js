import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from '@material-ui/core/MenuItem';
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
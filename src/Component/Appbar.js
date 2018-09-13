import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { database } from "firebase";


class Appbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
      selectedBranch: ''
    };
  }
  toggleDrawer = () => {
    this.setState({ openDrawer: !this.state.openDrawer });
  }
  render() {
    return (
      <div>
        <AppBar position="static" style={{ backgroundColor: "#d5d5d5" }}>
          <Toolbar style={{ display: "flex", flex: 1, justifyContent: 'space-between' }} >
            <div  >
              <Select
                name
                value={this.props.selectedBranch}
                onChange={(e) => this.props.changeHandler(e)}
                inputProps={{
                  name: 'selectedBranch',
                }}
              >
                <MenuItem value="select branch">
                  <em>Select Branch</em>
                </MenuItem>
                {
                  this.props.state.branchesArray.map((data, i) => {
                    return <MenuItem key={i} value={data.key}>{data.key}</MenuItem>
                  })
                }
              </Select>
            </div>
          </Toolbar>
        </AppBar>
      </div >
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
  };
};
const mapStateToProps = state => {
  console.log('state from Appbar: ', state);
  return {
    state: state.dbReducer
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Appbar);
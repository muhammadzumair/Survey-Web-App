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


// import AuthActions from "../Store/Actions/AuthActions";
// import Firebase from '../Store/Firebase/firebaseConfig';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});


class Appbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDrawer: false,
            age: 'Select Branch'
        };
    }
    toggleDrawer = () => {
        this.setState({ openDrawer: !this.state.openDrawer });
    }
    signOut = () => {
        this.props.signOut();
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar position="static" style={{ backgroundColor: "#fff" }}>
                    <Toolbar style={{display:'flex', justifyContent:'flex-end'}}>
                        <div>
                            <Select
                                value={this.state.age}
                                onChange={this.handleChange}
                                name="age"
                                displayEmpty
                            >
                                <MenuItem value="Select Branch" disabled>
                                    Select Branch
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
const mapStateToProps = state => {
    console.log(state);
    return {
        // user: state.AuthReducer.user
    };
};
const mapDispatchToProps = dispatch => {
    return {
        // signOut : () => dispatch(AuthActions.signOut())
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Appbar);
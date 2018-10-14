import React, { Component } from "react";
import { connect } from "react-redux";
// import AuthActions from "../../Store/Actions/AuthActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AuthActions from '../store/action/AuthActions'
import DBActions from "../store/action/DBActions";
import './SignIn.css';

const styles = {
    signInForm: {
        width: '35em',
        // border: '1px solid',
        height: '35em',
        padding: '3em',
        backgroundColor: '#fff',
        boxShadow: '0 10px 6px -6px #777',
        borderRadius: '3px'
    },
    signInFormWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center',
        backgroundColor: '#dedede'
    }
}


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = { emailInput: "", passInput: "", modalState: false };
        // console.log("window: " + window.location.replace("/home"));
    }
    inputHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    signInHandler = () => {
        let userInfo = {
            email: this.state.emailInput,
            pass: this.state.passInput
        };
        console.log(userInfo);
        this.props.signInUser(userInfo);
    };

    componentDidMount() {
        this.props.loadBraches();
        // this.props.checkUser();
        this.props.getCurrentDate()
        this.props.checkUser();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.props.history.replace("/home");
        }
    }

    render() {
        return (
            <div style={styles.signInFormWrapper}>
                <div style={styles.signInForm} className="signInForm">
                    <div className="emojiWrapper">
                        <img src={require('./assets/happy.png')} height='125px' width='125px' style={{ margin: '4px' }} className="emoji" />
                        <img src={require('./assets/moderate.png')} height='125px' width='125px' style={{ margin: '4px' }} className="emoji" />
                        <img src={require('./assets/__sad.png')} height='125px' width='125px' style={{ margin: '4px' }} className="emoji" />
                        {/* <img src={require('./assets/_sad.png')} />
                        <img src={require('./assets/moderate.png')} />
                        <img src={require('./assets/happy.png')} /> */}
                    </div>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        onChange={this.inputHandler}
                        name="emailInput"
                        margin="normal"
                        value={this.state.emailInput}
                    // disabled={this.props.isLoading}
                    />
                    <TextField
                        required
                        fullWidth
                        id="password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        name="passInput"
                        onChange={this.inputHandler}
                        value={this.state.passInput}
                    // disabled={this.props.isLoading}
                    />
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            style={{ marginTop: "20px", alignSelf: 'center' }}
                            variant="outlined"
                            color="primary"
                            onClick={this.signInHandler}
                        // disabled={this.props.isLoading}
                        >
                            SignIn
                    </Button>
                    </div>
                </div >
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        user: state.authReducer.user,
        isLoading: state.authReducer.isLoading,
        isError: state.authReducer.isError,
        errorMsg: state.authReducer.errorMessage,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        loadBraches: () => dispatch(DBActions.loadBraches()),
        signInUser: (obj) => dispatch(AuthActions.SignInUser(obj)),
        checkUser: () => dispatch(AuthActions.checkUser()),
        getCurrentDate: () => dispatch(DBActions.getCurrentDate())
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
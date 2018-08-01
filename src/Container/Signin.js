import React, { Component } from "react";
import { connect } from "react-redux";
// import AuthActions from "../../Store/Actions/AuthActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AuthActions from '../store/action/AuthActions'
import DBActions from "../store/action/DBActions";

const styles = {
    signInForm: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '70vh',

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
            <div style={styles.signInForm}>
                <Grid style={{}} container direction="column" alignItems="center">
                    <Grid container direction="col" justify="center">
                        <Grid item xs={10} md={7}>
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
                        </Grid>
                        <Grid item xs={10} md={7}>
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
                        </Grid>
                        <Grid item xs={8} md={7} >
                            <div style={{textAlign: 'center'}}>
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
                        </Grid>
                    </Grid>
                </Grid>
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
        signInUser:(obj)=>dispatch(AuthActions.SignInUser(obj)),
        checkUser:()=>dispatch(AuthActions.checkUser()),
        getCurrentDate:()=>dispatch(DBActions.getCurrentDate())
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
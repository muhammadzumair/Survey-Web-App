import React, { Component } from "react";
import { connect } from "react-redux";
// import AuthActions from "../../Store/Actions/AuthActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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
        // let userInfo = {
        //   email: this.state.emailInput,
        //   pass: this.state.passInput
        // };
        // console.log(userInfo);
        // this.props.signInUser(userInfo);
        this.props.history.replace('/home');
        console.log('this.props.history: /*/*/*/*/*/*/*/*/*/', this.props.history.location.pathname);
    };
    componentDidMount() {
        // this.props.checkUser();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            // this.props.history.replace("/home");
            // console.log("auth completed")
        }
        if (nextProps.isError) {
            // this.modalHandler(true);
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
        // user: state.AuthReducer.user,
        // isLoading: state.AuthReducer.isLoading,
        // isError: state.AuthReducer.isError,
        // errorMsg: state.AuthReducer.errorMsg
    };
};
const mapDispatchToProps = dispatch => {
    return {

    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
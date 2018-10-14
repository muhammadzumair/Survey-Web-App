import actionTypes from "../actionTypes";

export default class AuthActions {
  
  static signUpUser(userPayload) {
    return {
      type: actionTypes.SIGNUP_PROG,
      payload: userPayload
    };
  }
  static signUpUserError(message) {
    return {
      type: actionTypes.SIGNUP_ERROR,
      payload: message
    };
  }
  static signInUserError(message) {
    return {
      type: actionTypes.SIGNIN_ERROR,
      payload: message
    };
  }
  static signOutUserError(message) {
    return {
      type: actionTypes.SIGNOUT_ERROR,
      payload: message
    };
  }
  static checkUser() {
    return {
      type: actionTypes.CHECK_USER_PROG
    };
  }
  static SignInUser(userPayload) {
    return {
      type: actionTypes.SIGNIN_PROG,
      payload: userPayload
    };
  }
  static SignOutUser(history) {
    return{
      type:actionTypes.SIGNOUT_PROG,
      payload: history
    }
  }
}

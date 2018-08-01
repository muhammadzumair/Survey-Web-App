export default class AuthActions {
  
  static signUpUser(userPayload) {
    return {
      type: AuthActions.SIGNUP_PROG,
      payload: userPayload
    };
  }
  static signUpUserError(message) {
    return {
      type: AuthActions.SIGNUP_ERROR,
      payload: message
    };
  }
  static signInUserError(message) {
    return {
      type: AuthActions.SIGNIN_ERROR,
      payload: message
    };
  }
  static signOutUserError(message) {
    return {
      type: AuthActions.SIGNOUT_ERROR,
      payload: message
    };
  }
  static checkUser() {
    return {
      type: AuthActions.CHECK_USER_PROG
    };
  }
  static SignInUser(userPayload) {
    return {
      type: AuthActions.SIGNIN_PROG,
      payload: userPayload
    };
  }
  static SignOutUser() {
    return{
      type:AuthActions.SIGNOUT_PROG
    }
  }
}

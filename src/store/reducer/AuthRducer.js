import actionTypes from "../actionTypes";


const INITIAL_STATE = {
  user: null,
  isLoading: false,
  isError: false,
  errorMsg: ""
};
export default function AuthReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.SIGNUP_PROG:
      return Object.assign({}, state, { isLoading: true });
    case actionTypes.SIGNUP_SUCC:
      break;
    case actionTypes.SIGNUP_ERROR:
      return Object.assign({}, state, {
          isLoading:false,
        isError: true,
        errorMsg: action.payload
      });


    case actionTypes.CHECK_USER_PROG:
      return Object.assign({}, state, { isLoading: true });
    case actionTypes.CHECK_USER_SUCC:
    return Object.assign({},state,{user:action.payload,isLoading:false});


    case actionTypes.SIGNIN_PROG:
    return Object.assign({},state,{isLoading:true});
    case actionTypes.SIGNIN_SUCC:
    return Object.assign({},state,{isLoading:false,user:action.payload});
    case actionTypes.SIGNIN_ERROR:
    return Object.assign({},state,{isLoading:false,isError:true,errorMsg:action.payload});
    

    case actionTypes.SIGNOUT_PROG:
    return Object.assign({},state,{isLoading:true});
    case actionTypes.SIGNOUT_SUCC:
    return Object.assign({},state,{isLoading:false,user:action.payload});
    case actionTypes.SIGNOUT_ERROR:
    return Object.assign({},state,{isLoading:false,isError:true,errorMsg:action.payload})

    default:
    return state;
  }
}

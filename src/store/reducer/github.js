import actionTypes from '../actionTypes';

let intialState = {
    loader: false,
    repos: []
}

function githubReducer(state = intialState, action){
    switch(action.type){
        case actionTypes.GET_USER_INFO:
            return Object.assign({}, state, {loader: true});
        case actionTypes.GET_USER_INFO_SUCCEED:
            return Object.assign({}, state, {loader: false, repos: action.payload});
        default:
            return state;
    }
}

export default githubReducer;
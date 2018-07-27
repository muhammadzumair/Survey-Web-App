import actionTypes from '../actionTypes';

let intialState = {
    isProgress: false,
    isError: false,
    errorMessage: '',
    hourlyData: null
}

function DBReducer(state = intialState, action) {
    switch (action.type) {
        case actionTypes.GET_HOURLY_DATA_PROGRESS:
            return Object.assign({}, state, {isProgress: true});
        case actionTypes.GET_HOURLY_DATA_SUCCEED:
            return Object.assign({}, state, {isProgress: false, hourlyData: action.payload});
        case actionTypes.GET_HOURLY_DATA_FAIL:
            return Object.assign({}, state, {isError: true, errorMessage: action.payload});
        case actionTypes.MAKE_ISERROR_FALSE:
            return Object.assign({}, state, {isError: false});

        default:
            return state;
    }
}

export default DBReducer;

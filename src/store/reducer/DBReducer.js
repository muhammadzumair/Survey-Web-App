import actionTypes from '../actionTypes';

let intialState = {
    isProgress: false,
    isError: false,
    errorMessage: '',
    hourlyData: null,
    weeklyData: [],
    realTimeData: []
}

function DBReducer(state = intialState, action) {
    switch (action.type) {
        case actionTypes.GET_HOURLY_DATA_PROGRESS:
            return Object.assign({}, state, { isProgress: true });
        case actionTypes.GET_HOURLY_DATA_SUCCEED:
            return Object.assign({}, state, { isProgress: false, hourlyData: action.payload });
        case actionTypes.GET_HOURLY_DATA_FAIL:
            return Object.assign({}, state, { isError: true, errorMessage: action.payload });
        case actionTypes.MAKE_ISERROR_FALSE:
            return Object.assign({}, state, { isError: false });
        case actionTypes.GET_WEEKLY_DATA_PROGRESS:
            return Object.assign({}, state, { isProgress: true });
        case actionTypes.GET_WEEKLY_DATA_SUCCEED:
            return Object.assign({}, state, { isProgress: false, weeklyData: [...state.weeklyData, ...action.payload] });
        case actionTypes.GET_WEEKLY_DATA_FAIL:
            return Object.assign({}, state, { isError: true, errorMessage: action.payload });
        case actionTypes.GET_REALTIME_DATA_SUCCEED:
            return Object.assign({}, state, { realTimeData: action.payload });
        case actionTypes.GET_REALTIME_DATA_FAIL:
            return Object.assign({}, state, { isError: true, errorMessage: action.payload });

        default:
            return state;
    }
}

export default DBReducer;
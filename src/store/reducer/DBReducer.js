import actionTypes from '../actionTypes';
import { retry } from 'rxjs/operators/retry';

let intialState = {
    isProgress: false,
    isError: false,
    errorMessage: '',
    hourlyData: [],
    weeklyData: [],
    realTimeData: [],
    hourlyDataFlag: true,
    branchesArray: [],
    currentBranch: ''
}

function DBReducer(state = intialState, action) {
    switch (action.type) {
        case actionTypes.GET_HOURLY_DATA_PROGRESS:
            return Object.assign({}, state, { isProgress: true, });
        case actionTypes.GET_HOURLY_DATA_SUCCEED:
            return Object.assign({}, state, { isProgress: false, hourlyData: action.payload, hourlyDataFlag: true });
        case actionTypes.GET_HOURLY_DATA_FAIL:
            return Object.assign({}, state, { isError: true, errorMessage: action.payload });
        // case actionTypes.GET_HOURLY_DATA_UPDATE:
        //     return Object.assign({}, state, { realTimeData: [...state.realTimeData, action.payload], hourlyDataFlag: action.hourlyDataFlag });
        case actionTypes.GET_HOURLY_DATA_FLAG_FALSE:
            return Object.assign({}, state, { hourlyDataFlag: false });


        case actionTypes.MAKE_ISERROR_FALSE:
            return Object.assign({}, state, { isError: false });

        case actionTypes.GET_HOURLY_DATA_UPDATE_FLAG_FALSE:
            return Object.assign({}, state, { hourlyDataFlag: false })



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




        case actionTypes.LOAD_BRANCHES_SUCCEED:
            return Object.assign({}, state, { branchesArray: action.payload });
        case actionTypes.LOAD_BRANCHES_FAIL:
            return Object.assign({}, state, { errorMessage: action.payload });



        case actionTypes.SET_CURRENT_BRANCH:
            return Object.assign({}, state, {currentBranch: action.payload});
        default:
            return state;
    }
}

export default DBReducer;
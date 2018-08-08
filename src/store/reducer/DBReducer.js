import actionTypes from '../actionTypes';
import { retry } from 'rxjs/operators/retry';

let intialState = {
    isProgress: false,
    isError: false,
    errorMessage: '',
    hourlyData: [],
    weeklyData: [],
    realTimeData: [],
    branchesArray: [],
    hourlyDataFlag: true,
    iteration: 0,
    currentDate: null,
    branchesArray: [],
    isProgressGetDataDateWise: false,
    dateWiseDataArray: [],
    isErrorGetDataDateWise: false,
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
            return Object.assign({}, state, { isError: false, isErrorGetDataDateWise: false });

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
            return Object.assign({}, state, { currentBranch: action.payload, weeklyData: [] });
        case actionTypes.INCREMENT_ITERATION:
            return Object.assign({}, state, { iteration: state.iteration++ });
        case actionTypes.RESET_ITERATION:
            return Object.assign({}, state, { iteration: 0 });


        case actionTypes.GET_CURRENT_DATE_PROGRESS:
            return Object.assign({}, state, { isProgress: true });
        case actionTypes.GET_CURRENT_DATE_SUCCEED:
            return Object.assign({}, state, { isProgress: false, currentDate: action.payload });
        case actionTypes.GET_CURRENT_DATE_FAIL:
            return Object.assign({}, state, { isProgress: false, isError: true, errorMessage: action.payload })

        //clear Array to prevent data doubling
        case actionTypes.CLEAR_MONTHLY_ARRAY:
            return Object.assign({}, state, {dateWiseDataArray: []});
        case actionTypes.CLEAR_WEEKLY_ARRAY:
            return Object.assign({}, state, {weeklyData:[]});



        case actionTypes.GET_DATA_DATE_WISE_PROGRESS:
            return Object.assign({}, state, {isProgressGetDataDateWise: true});
        case actionTypes.GET_DATA_DATE_WISE_SUCCEED:
            console.log('request succeed: ', action.payload);
            return Object.assign({}, state, {isProgressGetDataDateWise: false, dateWiseDataArray: [...state.dateWiseDataArray, ...action.payload]});
        case actionTypes.GET_DATA_DATE_WISE_FAIL:
            return Object.assign({}, state, {isProgressGetDataDateWise: false, isErrorGetDataDateWise: true, errorMessage: action.payload});

        default:
            return state;
    }
}

export default DBReducer;
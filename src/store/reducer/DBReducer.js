import actionTypes from '../actionTypes';
import { reduce } from 'rxjs/operator/reduce';
import { startWith } from 'rxjs/operators/startWith';

let intialState = {
    isProgress: false,
    isError: false,
    errorMessage: '',
    hourlyData: null,
    weeklyData: [],
    realTimeData:[]
}

function DBReducer(state = intialState, action) {
    switch (action.type) {
        case actionTypes.GET_HOURLY_DATA_PROGRESS:
            return Object.assign({}, state, { isProgress: true });
            break;
        case actionTypes.GET_HOURLY_DATA_SUCCEED:
            return Object.assign({}, state, { isProgress: false, hourlyData: action.payload });
            break;
        case actionTypes.GET_HOURLY_DATA_FAIL:
            return Object.assign({}, state, { isError: true, errorMessage: action.payload });
            break;
        case actionTypes.MAKE_ISERROR_FALSE:
            return Object.assign({}, state, { isError: false });
            break;


        case actionTypes.GET_WEEKLY_DATA_PROGRESS:
            return { ...state, isProgress: true }
            break;
        case actionTypes.GET_WEEKLY_DATA_SUCCEED:
            
            return { ...state, isProgress: false, weeklyData: state.weeklyData.concat(action.payload) }
            break;
        case actionTypes.GET_WEEKLY_DATA_FAIL:
            return { ...state, isError: true, isProgress: false, errorMessage: action.payload }
            break;
        case actionTypes.GET_REALTIME_DATA_SUCCEED:
        return {...state,realTimeData:action.payload}
        case actionTypes.GET_REALTIME_DATA_FAIL:
        return{...state,isError:true,errorMessage:action.payload}

        default:
            return state;
    }
}

export default DBReducer;

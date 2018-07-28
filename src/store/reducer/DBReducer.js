import actionTypes from '../actionTypes';
import { reduce } from 'rxjs/operator/reduce';
import { startWith } from 'rxjs/operators/startWith';

let intialState = {
    isProgress:false,
    isError:false,
    errorMessage:"",
    hourlyData:null
}

function DBReducer(state = intialState, action) {
    switch (action.type) {
        case actionTypes.GET_HOURLY_DATA_PROGRESS:
        return {...state,isProgres:true};
        case actionTypes.GET_HOURLY_DATA_SUCCESS:
        return{...state,isProgress:false,hourlyData:action.payload}
        case actionTypes.GET_HOURLY_DATA_FAIL:
        return {...state,isProgres:false,isError:true,errorMessage:action.payload}
        default:
            return state;
    }
}

export default DBReducer;

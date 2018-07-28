import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import actionTypes from '../actionTypes';
import FirebaseDB from '../Firebase/firebaseDB';

export default class EpicActions {

    static getHourlyData(action$) {
        return action$.ofType(actionTypes.GET_HOURLY_DATA_PROGRESS)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(FirebaseDB.getHourlyData(payload.date, payload.branch))
                    .map(data => {
                        return {
                            type: actionTypes.GET_HOURLY_DATA_SUCCEED,
                            payload: data
                        }
                    })
                    .catch(err=>{
                        return Observable.of({type:actionTypes.GET_HOURLY_DATA_FAIL, payload:err});
                    })
            })
    }

}
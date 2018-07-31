import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import actionTypes from '../actionTypes';
import FirebaseDB from '../Firebase/firebaseDB';
import { ActionsObservable } from 'redux-observable';

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
                    .catch(err => {
                        return Observable.of({ type: actionTypes.GET_HOURLY_DATA_FAIL, payload: err });
                    })
            })
    }

    static getWeeklyData(action$) {
        return action$.ofType(actionTypes.GET_WEEKLY_DATA_PROGRESS)
            .mergeMap(({ payload }) => {
                return Observable.fromPromise(FirebaseDB.getWeeklyData(payload.date, payload.branch))
                    .map(data => {
                        return {
                            type: actionTypes.GET_WEEKLY_DATA_SUCCEED,
                            payload: data
                        }
                    })
                    .catch(err => {
                        return Observable.of({ type: actionTypes.GET_WEEKLY_DATA_FAIL, payload: err.message });
                    })
            })
    }


    static getRealtimeData(action$) {
        return action$.ofType(actionTypes.GET_REALTIME_DATA)
            .switchMap(({ payload }) => {
                return Observable.of(FirebaseDB.getRealtimeData(payload.date, payload.branch))
                    .map(data => {
                        return {
                            type:null,
                        }
                    })
                    .catch(err => {
                        return Observable.of({ type: actionTypes.GET_REALTIME_DATA_FAIL, payload: err.message });
                    })
            })
    }
}


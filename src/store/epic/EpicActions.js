import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import actionTypes from '../actionTypes';
import FirebaseDB from '../Firebase/firebaseDB';
import { ActionsObservable } from 'redux-observable';
import DBActions from '../action/DBActions';

export default class EpicActions {

    static getHourlyData(action$) {
        return action$.ofType(actionTypes.GET_HOURLY_DATA_PROGRESS)
            .switchMap(({ payload }) => {
                return Observable.of(FirebaseDB.getHourlyData(payload.date, payload.branch))
                    .map(data => {
                        return {
                            type: null
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
                return Observable.of(FirebaseDB.getRealTimeData(payload.date, payload.branch))
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
    static getCurrentDate(action$){
        return action$.ofType(actionTypes.GET_CURRENT_DATE_PROGRESS).switchMap(()=>{
            return Observable.ajax({
               url: "http://api.timezonedb.com/v2/get-time-zone?key=FJFC17ZZIX4V&format=json&by=zone&zone=Asia/Karachi",
                method: 'GET',
                async: true,
                crossDomain: true,
                responseType: 'json',
                createXHR: () => new XMLHttpRequest()
            })
            .pluck("response").map(data=>{
                return{
                    type:actionTypes.GET_CURRENT_DATE_SUCCEED,
                    payload:dateConvertor(data.formatted)
                }
            }).catch(err=>{
                return Observable.of({type:actionTypes.GET_CURRENT_DATE_FAIL,payload:err.message})
            })
        })
    }
}
function dateConvertor(dateFromServer) {
    let str = dateFromServer;
    let res = str.slice(0, 11);
    let year = res.slice(0, 4);
    let month = res.slice(5, 7)
    let day = res.slice(8, 10);

    return day + "-" + month + "-" + year
}

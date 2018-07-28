import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import actionTypes from '../actionTypes';
import firebase from '../Firebase/firebase';
import { FirebaseDB } from '../Firebase/FirebaseDB';
import DBActions from '../action/DBActions';

export default class EpicActions {

    static getHourlyData(action$){
        return action$.ofType(actionTypes.GET_HOURLY_DATA_PROGRESS).switchMap(({payload})=>{
            return Observable.fromPromise(FirebaseDB.getHourlyData(payload.date,payload.branch)).map(array=>{
                return {
                    type:actionTypes.GET_HOURLY_DATA_SUCCESS,
                    payload:array
                }
            }).catch(err=>{
                return Observable.of(DBActions.getHourlyDataError(err.message))
            })
        })
    }

}
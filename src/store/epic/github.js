import { Observable } from 'rxjs';
import GitAction from '../action/github';
import 'rxjs/add/operator/switchMap';
import actionTypes from '../actionTypes';
import firebase from '../Firebase/firebase';

export default class EpicGitAction {
    static getUserInfo(action$) {
        return action$.ofType(actionTypes.GET_USER_INFO)
            .switchMap(({payload}) => {
                console.log(payload);
                return Observable.ajax(`https://api.github.com/users/${payload}/repos`)
                    .pluck("response")
                    .map((jsonData) => {
                        return {
                            type: actionTypes.GET_USER_INFO_SUCCEED,
                            payload: jsonData
                        };
                    });
            });
    }

}
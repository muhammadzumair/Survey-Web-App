import actionTypes from '../actionTypes';
import { createAction } from 'redux-actions';

class GitAction{
    static getUserInfo(userName){
        console.log("ok ki report getUserInfo")
        return{
            type: actionTypes.GET_USER_INFO,
            payload: userName
        }
    }
    static getUserInfoSucceed(data){
        console.log("ok ki report getUserInfoSucceed");
        return{
            type:actionTypes.GET_USER_INFO_SUCCEED,
            payload: data
        }
    }
}

export default GitAction;
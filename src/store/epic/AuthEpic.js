import actionTypes from "../actionTypes";
import { Observable } from "rxjs";
import {createUser,updateUserProfile,checkUser,sigInWithEmailAndPass,signOutUser}from '../Firebase/firebaseAuth';
import { retry } from "rxjs/operator/retry";

 export default class AuthEpic{
    static createUserOnFirebase(action$){
        return action$.ofType(actionTypes.SIGNUP_PROG).switchMap(({payload})=>{
            return Observable.fromPromise(createUser(payload)).map((obj)=>{
                return{
                    type:actionTypes.UPDATE_USER_PRO,
                    payload:payload
                }
            }).catch((error)=>{
                return Observable.of(actionTypes.signUpUserError(error.message))
            })
        })
    }
    static updateUserProfile(action$){
        return action$.ofType(actionTypes.UPDATE_USER_PRO).switchMap(({payload})=>{
            return Observable.fromPromise(updateUserProfile(payload)).map(()=>{
                return {
                    type:actionTypes.CHECK_USER_PROG,
                    
                }
            })
        })
    }
    static authStateChanged(action$){
        return action$.ofType(actionTypes.CHECK_USER_PROG).switchMap(({payload})=>{
            return Observable.fromPromise(checkUser()).map(user=>{
                return {
                    type:actionTypes.CHECK_USER_SUCC,
                    payload:user
                }
            })
        })
    }
    static signInUserFromFirebase(action$){
        return action$.ofType(actionTypes.SIGNIN_PROG).switchMap(({payload})=>{
            return Observable.fromPromise(sigInWithEmailAndPass(payload)).map((obj)=>{
                return{
                    type:actionTypes.SIGNIN_SUCC,
                    payload:obj.user
                }
            }).catch((error)=>{
                return Observable.of(actionTypes.signInUserError(error.message))
            })
        })
    }
    static singOutUserFromFirebase(action$){
        return action$.ofType(actionTypes.SIGNOUT_PROG).switchMap(()=>{
            return Observable.fromPromise(signOutUser()).map(()=>{
                return {
                    type:actionTypes.SIGNOUT_SUCC,
                    payload:null,
                }
            }).catch((error)=>{
                return Observable.of(actionTypes.signOutUserError(error.message))
            })
        })
    }

}

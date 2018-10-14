import Fire from './firebase';
import actionType from '../actionTypes';
import { store } from '../index';
import DBActions from '../action/DBActions';
export default class FirebaseDB {
    static getHourlyData(date, branch) {
        let array = []
        // return new Promise((res, rej) => {
        Fire.firestore().collection("Response").doc(branch).collection(date).onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
                var item = change.doc.data();
                item.key = change.doc.id;
                array.push(item)
            });
            store.dispatch({
                type: actionType.GET_HOURLY_DATA_SUCCEED,
                payload: array,
                getHourlyDataFlag: true
            })
        })
        // Fire.firestore().collection('Response').doc(branch).collection(date).get()
        //     .then(querySnapshot => {
        //         // {
        //         //     type: actionTypes.GET_HOURLY_DATA_SUCCEED,
        //         //     payload: data
        //         // }
        //         res(snapshotToArray(querySnapshot));
        //     })
        //     .catch(err => {
        //         rej(err.message);
        //     })
        // })
    }
    static getRealtimeData(date, branch) {
        let array = [];
        Fire.firestore().collection('Response').doc(branch).collection(date).onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
                let item = change.doc.data();
                item.key = change.doc.id;
                array.push(item);
            });
            store.dispatch(DBActions.getRealTimeDataSucceed(array));
        });
    }

    static getWeeklyData(date, branch) {
        return new Promise((res, rej) => {
            Fire.firestore().collection('Response').doc(branch).collection(date).get()
                .then(data => {
                    res(snapshotToArray(data))
                })
                .catch(err => {
                    rej(err);
                })
        })
    }

    static getDataDateWise(date, branch){
        console.log('before request: ');
        return new Promise((res, rej)=>{
            Fire.firestore().collection('Response').doc(branch).collection(date).get()
                .then(date => {
                    console.log('after request: ');
                    console.log('data come from firestore');
                    res(snapshotToArray(date));
                })
                .catch(err=>{
                    rej(err);
                })
        })
    }

    static getRealTimeData(date, branch) {
        let array = [];
        Fire.firestore().collection("Response").doc(branch).collection(date).onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
                var item = change.doc.data();
                item.key = change.doc.id;
                array.push(item)
            });
            store.dispatch(DBActions.getRealTimeDataSucceed(array))
        })

    }

    static loadBranches() {
        let array = []
        Fire.firestore().collection("Locations").onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
                var item = change.doc.data();
                item.key = change.doc.id;
                array.push(item)
                console.log('branches arrray form firebasedb: ', array);
            });
            store.dispatch({
                type: actionType.LOAD_BRANCHES_SUCCEED,
                payload: array,
            });
        })
    }

    static logout(history){
        Fire.firestore()
    }

}


function snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.data();
        item.key = childSnapshot.id;
        returnArr.push(item);
    });
    return returnArr;
};



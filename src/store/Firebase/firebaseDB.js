import Fire from './firebase';
import actionType from '../actionTypes';
import { store } from '../index';
import DBActions from '../action/DBActions';
export default class FirebaseDB {
    static getHourlyData(date, branch) {
        return new Promise((res, rej) => {
            Fire.firestore().collection('Response').doc('Tariq Road').collection('24-07-2018').get()
                .then(querySnapshot => {
                    res(snapshotToArray(querySnapshot));
                })
                .catch(err => {
                    rej(err.message);
                })
        })
    }
    static getRealtimeData(date,branch) {
        let array = [];
            Fire.firestore().collection('Response').doc(branch).collection(date).onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    let item = change.doc.data();
                    item.key = change.doc.id;
                    array.push(item);
                    store.dispatch(DBActions.getRealtimeDataSucceed(array));
                });
            })
            ;
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


Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

var date = new Date();
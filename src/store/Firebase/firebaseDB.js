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
                    store.dispatch(DBActions.getRealTimeDataSucceed(array));
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
    static getWeeklyData(date, branch) {
        // Fire.firestore().collection("Response").doc("Tariq Road").get().then((data)=>{
        //     console.log(data)
        // })
        return new Promise((res, rej) => {

            Fire.firestore().collection("Response").doc(branch).collection(date).get().then(querySnapshot => {
                res(snapshotToArray(querySnapshot))
            }).catch(err => {
                rej(err)
            })
        })

    }
    static getRealTimeData(date, branch) {
        let array = []

       

            Fire.firestore().collection("Response").doc(branch).collection(date).onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {


                    
                    var item = change.doc.data();
                    item.key = change.doc.id;
                    array.push(item)
                   

                    
                });
                
                store.dispatch(DBActions.getRealTimeDataSucceed(array))
                

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



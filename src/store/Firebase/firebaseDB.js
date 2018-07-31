import Fire from './firebase';
import actionTypes from '../actionTypes';
import DBActions from '../action/DBActions';
import { store } from '../index';

let globalArray = [];

export default class FirebaseDB {
    static getHourlyData(date, branch) {
        return new Promise((res, rej) => {
            Fire.firestore().collection('Response').doc('Tariq Road').collection('24-07-2018').get()
                .then(querySnapshot => {
                    res(snapshotToArray(querySnapshot));
                    // console.log(querySnapshot);
                })
                .catch(err => {
                    rej(err.message);
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

    console.log(returnArr)
    globalArray = [...globalArray, ...returnArr]
    console.log("///******//////", globalArray);
    return returnArr;
};



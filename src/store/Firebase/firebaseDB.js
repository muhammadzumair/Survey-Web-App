import Fire from './firebase';

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
}

function snapshotToArray(snapshot) {
    var returnArr = [];
    console.log(snapshot)
    snapshot.forEach(function (childSnapshot) {
        console.log(childSnapshot.data())
        var item = childSnapshot.data();
        item.key = childSnapshot.id;

        returnArr.push(item);
    });
    console.log(returnArr)
    return returnArr;
};

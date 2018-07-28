import fire from 'firebase';

var config = {
  apiKey: "AIzaSyBW4oyHCti3hfQWvvF-8SWbsVORSCfiiLw",
  authDomain: "surveyapp-c6f8c.firebaseapp.com",
  databaseURL: "https://surveyapp-c6f8c.firebaseio.com",
  projectId: "surveyapp-c6f8c",
  storageBucket: "surveyapp-c6f8c.appspot.com",
  messagingSenderId: "742944107462"
};
let firebase = fire.initializeApp(config);
export default firebase;
import {default as fb} from 'firebase';

var config = {
    apiKey: "AIzaSyBrk_9gZgY1e0e1ZHFrixtEay4oCbthtTY",
    authDomain: "karas-pp-workout.firebaseapp.com",
    databaseURL: "https://karas-pp-workout.firebaseio.com",
    projectId: "karas-pp-workout",
    storageBucket: "karas-pp-workout.appspot.com",
    messagingSenderId: "235488597116"
  };
  const firebase = fb.initializeApp(config);

  export default firebase;
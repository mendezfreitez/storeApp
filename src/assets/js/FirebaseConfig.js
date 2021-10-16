import firebase from 'firebase/app';

// const firebaseConfig = () => {
var config = {
    apiKey: "AIzaSyBpTsy5md5SPoZMWuA0ecRcBDo8SXwwtOg",
    authDomain: "meatiende.firebaseapp.com",
    projectId: "meatiende",
    storageBucket: "meatiende.appspot.com",
    messagingSenderId: "903066046395",
    appId: "1:903066046395:web:4ba6066a047586fb7cbe9e"
};
firebase.initializeApp(config);
// }

export default firebase;
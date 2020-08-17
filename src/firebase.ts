import firebase from 'firebase';

const firebaseConfig: object = require('./config/firebaseConfig.json');

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;

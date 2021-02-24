import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCEr0F8DIcBnP-XJbd3xzeFKrVqa0HrSA8',
  authDomain: 'todo-app-7edc1.firebaseapp.com',
  projectId: 'todo-app-7edc1',
  storageBucket: 'todo-app-7edc1.appspot.com',
  messagingSenderId: '73299654686',
  appId: '1:73299654686:web:328dd98aee6aaa08c6160f',
  measurementId: 'G-TFSWMV3ZZD',
});


const db = firebaseApp.firestore()

export default db;
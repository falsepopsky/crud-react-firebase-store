import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyB8whJaIvT-9RJ7ak5nLpm8luMA_u_GyY0',
  authDomain: 'fb-crud-ed15f.firebaseapp.com',
  databaseURL: 'https://fb-crud-ed15f.firebaseio.com',
  projectId: 'fb-crud-ed15f',
  storageBucket: 'fb-crud-ed15f.appspot.com',
  messagingSenderId: '446979538583',
  appId: '1:446979538583:web:96ab7175a3b64dd20333d2',
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();

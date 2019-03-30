import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDnPUBPviomyY9QQwEFwVXJHbhYLja2sZc',
  authDomain: 'song-hero.firebaseapp.com',
  databaseURL: 'https://song-hero.firebaseio.com',
  projectId: 'song-hero',
  storageBucket: 'song-hero.appspot.com',
  messagingSenderId: '625261084375'
};

export default firebase.initializeApp(config);

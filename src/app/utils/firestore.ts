import firebase from './firebase';

firebase.firestore().settings({timestampsInSnapshots: true});
const db = firebase.firestore().collection('leaderboard');

export const save = (name, score) => {
  return new Promise((resolve, reject) => {
    firebase.auth().signInAnonymously().then(() => {
      db
        .add({name: name, score: score})
        .then((docRef) => resolve(docRef))
        .catch((error) => reject(error));
    }).catch((error) => reject(error));
  });
};

export const getLeaderboard = (limit = 10) => {
  return new Promise((resolve, reject) => {
    firebase.auth().signInAnonymously().then(() => {
      db
        .orderBy('score', 'desc')
        .limit(limit)
        .get()
        .then((querySnapshot) => {
          const result = [];
          querySnapshot.forEach(doc => result.push(doc.data()));
          resolve(result);
        })
        .catch((error) => reject(error));
    }).catch((error) => reject(error));
  });
};

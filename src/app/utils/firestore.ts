import firebase from './firebase';

export interface ScoreResult {
  name: string;
  score: number;
}

firebase.firestore().settings({});
export const db = firebase.firestore().collection('leaderboard');

export const save = (name, score) => {
  return new Promise((resolve, reject) => {
    firebase.auth().signInAnonymously().then(() => {
      db
        .add({name, score})
        .then((docRef) => resolve(docRef))
        .catch((error) => reject(error));
    }).catch((error) => reject(error));
  });
};

export const getLeaderboard = (limit = 10): Promise<ScoreResult[]> => {
  return new Promise((resolve, reject) => {
    firebase.auth().signInAnonymously().then(() => {
      db
        .orderBy('score', 'desc')
        .limit(limit)
        .get()
        .then((querySnapshot) => {
          const result = [];
          querySnapshot.forEach(doc => result.push(doc.data() as ScoreResult));
          resolve(result);
        })
        .catch((error) => reject(error));
    }).catch((error) => reject(error));
  });
};

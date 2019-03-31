import * as functions from 'firebase-functions';

require = require('esm')(module);
const RC4 = require('rc4-es6').default;
const BadWords = require('bad-words');

export const decrypt = functions
  .region('europe-west1')
  .firestore
  .document('leaderboard/{id}')
  .onCreate((snap: any) => {
    const value: any = snap.data() || {};
    const name = value.name;
    const score = value.score;

    let decryptedScore;
    let cleanedName;
    try {
      decryptedScore = new RC4('you shall not pass').decrypt(score);
      cleanedName = new BadWords().clean(name)
    } catch (e) {
      console.log(e);
      console.log('Hacking alert');
    }

    const validScore = Number(decryptedScore) ? Number(decryptedScore) : 0;

    return snap.ref.set({
      name: cleanedName,
      score: validScore
    });
});

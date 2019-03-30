import * as functions from 'firebase-functions';

require = require('esm')(module);
const RC4 = require('rc4-es6').default;
const BadWords = require('bad-words');

export const decrypt = functions
  .region('europe-west1')
  .firestore
  .document('leaderboard/{id}')
  .onWrite( change => {
    const value:any = change.after.data();

    const decryptedScore = new RC4('you shall not pass').decrypt(value.score);
    const validScore = Number(decryptedScore) ? Number(decryptedScore) : 0;

    return change.after.ref.set({
      name: new BadWords().clean(value.name),
      score: validScore
    }, {merge: true});
});

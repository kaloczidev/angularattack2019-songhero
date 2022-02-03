const BitValuesUtil = require('../../utils/bitValues.util').BitValuesUtil;
const Encryptor = require('../../utils/encryptor').Encryptor;
const encryptor = new Encryptor('you shall not pass');

let score = 0;
window.encryptedScore = '';

setTimeout(function () {
  document.querySelector('audio').addEventListener('play', function () {
    score = 0;
  })
}, 2000);

exports.encypt = function (subMapItem, bitIndex, keyPressed) {
  if (BitValuesUtil.getBit(subMapItem, bitIndex) === keyPressed) {
    window.encryptedScore = encryptor.encrypt(String(++score));
  } else {
    if (score !== 0) window.encryptedScore = encryptor.encrypt(String(--score));
  }
};

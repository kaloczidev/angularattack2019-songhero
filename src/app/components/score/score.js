const BitValuesUtil = require('../../utils/bitValues.util').BitValuesUtil;
const Encryptor = require('../../utils/encryptor').Encryptor;
const encryptor = new Encryptor('you shall not pass');

let score = 0;
window.encryptedScore = '';

exports.encypt = function (subMapItem, bitIndex, keyPressed) {
  if (BitValuesUtil.getBit(subMapItem, bitIndex) === keyPressed) {
    window.encryptedScore = encryptor.encrypt(String(++score));
  } else {
    if (score !== 0) window.encryptedScore = encryptor.encrypt(String(--score));
  }
};

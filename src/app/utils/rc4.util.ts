
const CONST_ARR = Array.from({length: 256}, (v, k) => k);

function convert(text) {
  const codes = [];

  for (let i = 0, ii = text.length; i < ii; i++) {
    codes.push(text.charCodeAt(i));
  }

  return codes;
}

function keySetup(key) {

  const K = [...CONST_ARR];
  let j = 0;
  key = convert(key);

  for (let i = 0, ii = K.length; i < ii; i++) {
    j = (j + K[i] + key[i % key.length]) % 256;
    [K[i], K[j]] = [K[j], K[i]];
  }

  return K;

}

const byteStreamGenerator = function *(K) {
  let i = 0;
  let j = 0;

  while (true) {
    i = (i + 1) % 256;
    j = (j + K[i]) % 256;
    [K[i], K[j]] = [K[j], K[i]];
    yield (K[(K[i] + K[j]) % 256]);
  }
};

export class RC4Class {
  privateKey: any;
  encryptKey: any;
  constructor(key) {
    if (!key) console.error('Must pass the key to constructor');
    this.privateKey = keySetup(key);
    this.encryptKey = key;
  }
  encrypt(input) {
    if (!input) return console.log('no input of encrypt');
    let outputText = '';
    const byteStream = byteStreamGenerator([...this.privateKey]);

    for (let i = 0, ii = input.length; i < ii; i++) {
      outputText += ('00' + (input.charCodeAt(i) ^ byteStream.next().value).toString(16)).substr(-2) ;
    }

    return outputText;
  }
  decrypt(input) {
    if (!input) return console.log('no input of decrypt');
    let outputText = '';
    const byteStream = byteStreamGenerator([...this.privateKey]);

    input = input.match(/[a-z0-9]{2}/gi);

    for (let i = 0, ii = input.length; i < ii; i++) {
      outputText += String.fromCharCode((parseInt(input[i], 16) ^ byteStream.next().value));
    }

    return outputText;
  }
}

encryption_key = 'm3rp';
hash_method = "sha256";

let crypto = require('crypto');
let MCrypt = require('mcrypt').MCrypt;
let rijCcb = new MCrypt('rijndael-128', 'cbc');
let iv = '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0';
let skey = crypto.createHash(hash_method).update(encryption_key).digest('md5');
rijCcb.open(skey, iv);

function encode(text) {
  return rijCcb.encrypt(text).toString('base64');
}

function decode(text){
  return rijCcb.decrypt(new Buffer.from(text, 'base64')).toString();
}

// testing
encrypt_password = "nbsmetrokey1234!";

console.log(encode(encrypt_password));
console.log(decode(encode(encrypt_password)));
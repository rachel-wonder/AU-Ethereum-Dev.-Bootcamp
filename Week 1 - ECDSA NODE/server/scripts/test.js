const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const privateKey = "e8ee4fb05d8823320ca698fc4d2155796c3d3f831955becbed6a4481c0cec56c";
const amount = 25;
const recipient = "03f2ba8a99a07cda08d28fb72f5a85585bf8342b1427486521865b76d5171b7900";

async function address(privateKey){
    return toHex(secp256k1.getPublicKey(privateKey)); 
};
async function hash(message){
    return keccak256(utf8ToBytes(message));
};
async function sign(msgHash, privateKey){
    return secp256k1.sign( msgHash, privateKey ); 
};
//async function recoverKey(signature, msgHash){
    //return toHex(signature.recoverPublicKey(msgHash)); 
//};

const sender = address(privateKey);
const message = JSON.stringify({
    sender,
    amount,
    recipient,
  });
const msgHash = hash(message);
console.log(msgHash);
const signature = sign( msgHash, privateKey );
console.log(signature);
//const publicKey = recoverKey( signature, hash(message) );
//console.log(publicKey);


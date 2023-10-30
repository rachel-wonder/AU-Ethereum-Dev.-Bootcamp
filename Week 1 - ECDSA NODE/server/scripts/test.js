const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes, hexToBytes } = require("ethereum-cryptography/utils");

const privateKey = "e8ee4fb05d8823320ca698fc4d2155796c3d3f831955becbed6a4481c0cec56c";
const amount = 25;
const recipient = "03f2ba8a99a07cda08d28fb72f5a85585bf8342b1427486521865b76d5171b7900";

const sender = toHex(secp256k1.getPublicKey(privateKey)); 
console.log("sender:", sender);
const message = JSON.stringify({
    sender,
    amount,
    recipient,
  });
const msgHash = keccak256(utf8ToBytes(message));
console.log( "msgHash:", toHex(msgHash) );

const signature = secp256k1.sign( msgHash, privateKey ); 
console.log(signature);
console.log("type:", typeof(signature.s));
const recoverKey = signature.recoverPublicKey( msgHash ).toHex();
console.log("recoverKey type:", typeof(recoverKey));
console.log("recoverKey:", recoverKey);
const isValid = secp256k1.verify( signature, msgHash, sender ); 
console.log("isValid:", isValid);

const result = (recoverKey === sender) ? true : false;
console.log("result:", result);

let signedMessage = secp256k1.sign( msgHash, privateKey );
signedMessage = JSON.stringify({
  ...signedMessage,
  r: BigInt(signedMessage.r).toString(),
  s: BigInt(signedMessage.s).toString(),
  recovery: signedMessage.recovery,
});
console.log("signedMessage:", signedMessage);

let sig = JSON.parse(signedMessage);
sig.r = BigInt(sig.r);
sig.s = BigInt(sig.s);
sig.recovery = sig.recovery;

const sig2 = new secp256k1.Signature (sig.r, sig.s, sig.recovery);
/*
console.log("sig.r:", sig.r);
console.log("sig.r type:", typeof(sig.r));
console.log("sig.s:", sig.s);
console.log("sig.s type:", typeof(sig.s));
console.log("sig.recovery:", sig.recovery);
console.log("sig.recovery type:", typeof(sig.recovery));
*/
console.log("sig", sig);

const recoverKey2 = sig2.recoverPublicKey(msgHash).toHex();
console.log("recoverKey2:", recoverKey2);




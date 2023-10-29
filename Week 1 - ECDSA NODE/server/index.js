const express = require("express");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils"); 
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  /* private key: eb4654087d055a92d5bf1726b449294143c11e30d8f3ac08133b3e3a2eccca1e */
  "024ca209c24e7dd058ab613c09a9dc0bdbc6c05fb70e09c286061f97fff4ef73c8": 100,
  /* private key: f4409add52b7acc94f7f14e64b32c7ab29d6b9deaf5e3ad594da4a2cc7a87643 */
  "03f2ba8a99a07cda08d28fb72f5a85585bf8342b1427486521865b76d5171b7900": 50,
  /* private key: e8ee4fb05d8823320ca698fc4d2155796c3d3f831955becbed6a4481c0cec56c */
  "03a7a99838750f8cf284fe28855fe838aba43e2656c00c97175a0ba5961d044540": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  //TODO: get the signature from the client-side application
  const { sender, recipient, amount, msgHash, signedMessage} = req.body;
  setInitialBalance(sender);
  setInitialBalance(recipient);

  /* change signature back to it's original form which is s = bigint r = bigint recovery = number */
  let signature = JSON.parse(signedMessage);
  signature.r = BigInt(signature.r);
  signature.s = BigInt(signature.s);
  
  //1. Incorporate Public Key Cryptography so transfers can only be completed with a valid signature
  const isValid = secp256k1.verify(signature, msgHash, )


  //TODO: recover the public address from the signature
  //2. The person sending the transaction should have to verify that they own the private key corresponding to the address that is sending funds
  const recoverKey = signature.recoverPublicKey(msgHash);
  
  if(toHex(recoverKey) !== sender) {
    res.status(400).send({ message: "Not invalid sender!" });
  } else if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender], message: "Transfer succesful" });
  }; 
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

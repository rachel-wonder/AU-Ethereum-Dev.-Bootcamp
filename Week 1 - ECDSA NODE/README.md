# Week 1: Blockchain Cryptography 

## 🏁 Project: ECDSA-NODE
This project begins with a client that is allowed to transfer any funds from any account to another account. That's not very secure. By applying digital signatures we can require that only the user with the appropriate private key can create a signature that will allow them to move funds from one account to the other. Then, the server can verify the signature to move funds from one account to another.

1.Incorporate Public Key Cryptography so transfers can only be completed with a valid signature

2.The person sending the transaction should have to verify that they own the private key corresponding to the address that is sending funds

🤔 While you're working through this project consider the security implications of your implementation decisions. What if someone intercepted a valid signature, would they be able to replay that transfer by sending it back to the server?

## Set up instructions

### Video Instructions

Check out the project overview and video instructions in the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

### Written Instructions

Clone this repository locally: https://github.com/alchemyplatform/ecdsa-node by running the following command from your command-line:

git clone git@github.com:alchemyplatform/ecdsa-node.git

## Tips

### Helpful Resources

We're going to be incorporating the concepts we learned from this week into the final project. Here are a few resources you'll find helpful when working on this project:

Public Key Exercises in the Digital Signatures lesson (Recover Keys, Sign Message, Hash Messages)
The Ethereum Cryptography library - specifically random private key generation

### Optimal Solutions

As with all open-ended projects, there are multiple solutions we can build here, a few are better than others. We recommend watching the video walkthrough to understand what the optimal solutions are and tradeoffs that come with each path.

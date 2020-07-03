const uuid = require('uuid').v1
const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const bitcoin = new Blockchain()

app.get('/blockchain', (req, res) => {
    return res.json({
        message: 'Blockchain',
        coin: bitcoin
    })
});

app.post('/transaction', (req, res) => {

    const { amount, sender, recipient } = req.body
    const blockIndex = bitcoin.createNewTransaction(amount, sender, recipient)
    return res.json({
        message: 'Transaction successful',
        blockIndex
    })
});


app.post('/mine', (req, res) => {

    const lastBlock = bitcoin.getLastBlock()
    const previousBlockHash = lastBlock.hash

    // calculate nonce
    const nonce = bitcoin.proofOfWork(previousBlockHash, bitcoin.newTransactions)
    const blockIndex = bitcoin.createNewTransaction(amount, sender, recipient)
    return res.json({
        message: 'Transaction successful',
        blockIndex
    })
});


app.get('/', (req, res) => {
    return res.json({
        message: 'welcome back'
    })
});
const PORT = 3001

app.listen(PORT, () => {
    console.log(`RUNNING ON PORT ${PORT}`)
})
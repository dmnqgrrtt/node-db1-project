const express = require("express");
const router = express.Router();
const db = require("../data/dbConfig");

router.get("/", (req,res) => {
    db("accounts")
    .then(accounts => res.status(200).json({data: accounts}))
    .catch(err => console.log(err));
})

router.get("/:id", (req,res) => {
    const {id} = req.params;
    db("accounts")
    .where("id", id)
    .then(account => {
        if(account.length > 0){
            res.status(200).json({data: account})
        } else {
            res.status(404).json({message: "There was no account found with that ID"})
        }
    })
    .catch(err => console.log(err));
})

module.exports = router;
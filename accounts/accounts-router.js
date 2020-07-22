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

router.post("/", (req,res)=>{
    const accountInfo = req.body;
    if(accountInfo.name){
        if(accountInfo.budget) {
            db("accounts")
            .insert(accountInfo,)
            .then(id => res.status(201).json({data: id}))
            .catch(err => console.log(err));
        } else {
            res.status(404).json({message: "Missing required budget field"})
        }
    } else {
        res.status(404).json({message: "Missing required name field"})
    }
})

router.put("/:id", (req,res)=>{
    const {id} = req.params;
    const updates = req.body;
    db("accounts")
    .where("id", id)
    .update(updates)
    .then(count => {
        if(count > 0) {
            res.status(200).json({data: count})
        } else {
            res.status(404).json({message: "There is no account that matches that id provided"})
        }
    })
    .catch(err => console.log(err));
})

router.delete("/:id", (req,res)=>{
    const {id} = req.params;
    db("accounts")
    .where("id", id)
    .del()
    .then(count => {
        if(count > 0) {
            res.status(200).json({data: count})
        } else {
            res.status(404).json({message: "There is no account that matches that id provided"})
        }
    })
    .catch(err => console.log(err));
})

module.exports = router;
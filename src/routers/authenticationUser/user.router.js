const express = require ("express")
const Database = require ("../database")
const router = express.Router()


router.get("/", (req, res) => {
    console.log ("probando")
    res.json(Database.findAll())
})



module.exports = router
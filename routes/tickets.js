const router = require("express").Router();
const jwtHelper = require("../lib/jwt-helper");
const dbHelper = require("../lib/db-helper");


router.post('/api/generate', async (req, res) => {
    res.sendStatus(500);
});



router.post('/api/exit', async (req, res) => {
    res.sendStatus(500);
});


module.exports = router;
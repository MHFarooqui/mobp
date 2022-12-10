const router = require("express").Router();
const jwtHelper = require("../lib/jwt-helper");
const dbHelper = require("../lib/db-helper");

router.post('/api/authenticate', async (req, res) => {
    // get email & password from req body
    const loginInfo = {
        email: req.body.email,
        password: req.body.password
    };
    const user = await dbHelper.findByEmail(loginInfo.email);
    if (!!user && user.password == loginInfo.password) {
        const token = jwtHelper.generateJwtToken(user);
        res.json({ token });
    }
    else {
        // if not found then send 403 status.
        res.sendStatus(403)
    }
});

module.exports = router;
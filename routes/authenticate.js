const router = require("express").Router();
const jwtHelper = require("../lib/jwt-helper");
const dbHelper = require("../lib/db-helper");

router.post('/api/authenticate', async (req, res) => {
    // get email & password from req body
    const loginInfo = {
        email: req.body.email,
        password: req.body.password
    };
    // get user from db, if any user with given email & password exist
    const response = await dbHelper.executeQuery({ text: `SELECT * from Users where Email = $1 AND Password = $2`, values: [loginInfo.email, loginInfo.password] });
    const user = response.rows[0];
    // if found user then generate token for that user
    if (!!user) {
        const token = jwtHelper.generateJwtToken(user);
        res.json({ token });
    }
    else {
        // if not found then send 403 status.
        res.sendStatus(403)
    }
});

module.exports = router;
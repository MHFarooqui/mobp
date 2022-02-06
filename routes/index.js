const router = require("express").Router();
const userRoutes = require("./authenticate");
const tickets = require("./tickets");


router.use(userRoutes);
router.use(tickets);

module.exports = router;
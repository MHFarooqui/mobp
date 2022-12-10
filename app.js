const express = require("express");
const bodyParser = require('body-parser');
const routes = require("./routes/index.js");
const cors = require('cors');

const db = require('./lib/dbConn');


require("dotenv").config();

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// parse application/json
app.use(bodyParser.json());


app.get('/',  (req, res) => res.send({
       message: "I'm fine thanks for asking!!"
}));

app.use(routes);
let portNumber = process.env.PORT || 5000;
db.connectToServer(() => {
       app.listen(portNumber, function () {
              console.log(`Server Listinig on port ${portNumber} 🚀`);
       });
});
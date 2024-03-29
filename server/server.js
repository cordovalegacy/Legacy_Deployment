//in this order is ideal, dont move things around
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

//this parses incoming requests with JSON payloads
//allows us to recognize request object as a JSON object
app.use(express.json())

//this parses incoming requests with JSON payloads consisting of STRINGS or ARRAYS
app.use(express.urlencoded({extended:true}))

//this will allow us to connect our front end 3000 to our back end 8000
//taking cors away will result in cors errors while attempting your axios calls
//this security feature is built into the browser
app.use(cors({
    origin: true,
    credentials: true
}))

app.use(cookieParser())

require("./config/mongoose.config");
require("./routes/computer.route")(app);
require("./routes/custom.route")(app);

//added for user controller setup
require("./routes/user.route")(app);

app.listen(process.env.MY_PORT, () => console.log(`You are connected to port ${process.env.MY_PORT}`));
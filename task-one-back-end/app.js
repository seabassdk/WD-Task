/*
This project will use the express router as middleware for managing the proposals.
It will use the passport middleware for managing authentication and providing
credentials to the front end.
The database is the mongodb in the cloud.
*/

var dotenv = require('dotenv');
dotenv.config();
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
app = express();

var routesApi = require('./api/routes/index');

//connect to the database
mongoose.connect('mongodb+srv://seb:conservi@conservi-l6k1j.mongodb.net/conservi?retryWrites=true', { useNewUrlParser: true } );

require('./api/config/passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(passport.initialize());

//route calls to the middleware in index.js
app.use('/api', routesApi);



app.listen(8000, () => {
  console.log('Server started!');
});

const express = require('express');
const mongoose = require('mongoose');

//Initialize app to express
const app = express();

//DB config
const db = require('./config/keys').mongoURI;

//Connect to DB
mongoose.connect(db, {useNewUrlParser: true}).then(console.log("MongoDb connected..")).catch(err=>console.log(err))

//Creating port
const PORT = process.env.PORT || 5505;

app.listen(PORT, console.log(`Server is started on port ${PORT}`));
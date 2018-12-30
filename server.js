const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

//Initialize app to express
const app = express();

//DB config
const db = require('./config/keys').mongoURI;

//Connect to DB
mongoose.connect(db, {useNewUrlParser: true}).then(console.log("MongoDb connected..")).catch(err=>console.log(err))

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs')

//Express body parser
app.use(express.urlencoded({extended: true}));

//Exoress session
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

//Creating port
const PORT = process.env.PORT || 5505;

app.listen(PORT, console.log(`Server is started on port ${PORT}`));
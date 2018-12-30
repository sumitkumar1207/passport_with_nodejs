const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

//Initialize app to express
const app = express();

// Passport Config
require('./config/passport')(passport);

//DB config
const db = require('./config/keys').mongoURI;

//Connect to DB
mongoose.connect(db, { useNewUrlParser: true }).then(console.log("MongoDb connected..")).catch(err => console.log(err))

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs')

//Express body parser
app.use(express.urlencoded({ extended: true }));

//Exoress session
app.use(session({
	secret: "secret",
	resave: true,
	saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

//Creating port
const PORT = process.env.PORT || 5505;

app.listen(PORT, console.log(`Server is started on port ${PORT}`));
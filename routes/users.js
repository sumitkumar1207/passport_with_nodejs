const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Load User model
const User = require('../models/User');

//Login Page
router.get('/login', (req, res) => res.render('login'));

//Register Page
router.get('/register', (req, res) => res.render('register'));

//Register
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body
    let errors = []
    //Check required fields
    if (!email || !name || !password || !password2) {
        errors.push({ msg: "Please fill in all fields" });
    }

    //Check passwords match
    if (password !== password2) {
        errors.push({ msg: "Passsword must match" });
    }

    //Check password length
    if (password.length < 6) {
        errors.push({ msg: "Password must be at least six characters!" })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        //Validation passed
        User.findOne({ email: email }).then(user => {
            if (user) {
                //User exists
                errors.push({ msg: "Email is already register" })
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name, email, password
                });

                //Hash password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        //Set password to hash
                        newUser.password = hash;
                        //Svae user to DB

                        newUser.save().then(user => {
                            req.flash(
                                'success_msg',
                                'You are now registered and can log in'
                            );
                            res.redirect('/users/login')
                        }).catch(err => console.log(err))
                    });
                });
            }
        })
    }

})
module.exports = router
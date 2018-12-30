# Authentication in Nodejs(Passportjs & Express js)

This project is in Node.js, which is use Node.js, Express, Passport, Mongoose, EJS and some other packages to allow only the register user to log in and new user to register.

### Usage

```sh
$ npm install
```

```sh
$ npm start
# Or run with Nodemon
$ npm run dev

# Visit http://localhost:5505
```
### Example
The best part is that how you would save the user plain password to just non understadable(hash).

```javascript

//Hash password
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        //Set password to hash
        newUser.password = hash;

        //Svae user to DB
        newUser.save().then(user => {
            res.json(user)
        }).catch(err => console.log(err))
    });
});

```

### MongoDB

Open "config/keys.js" and add your MongoDB URI, local or Atlas

## Authors

[Sumit Kumar](https://github.com/sumitkumar1207)
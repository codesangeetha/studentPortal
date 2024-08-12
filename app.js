const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


const isLoggedin = (req, res, next) => {
    if (req.session.username) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

const isLoggedOut = (req, res, next) => {
    if (req.session.username) {
        return res.redirect('/homepage');
    } else {
        return next();
    }
}

const handleNotFound = (req, res, next) => {
    return res.status(404).send('Page not found');
}



app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/login', isLoggedOut, (req, res) => {
    let obj;
    if (req.session.invalid) {
        obj = { invalid: req.session.invalid };
    }
    res.render("login", obj);
});

app.get('/homepage', isLoggedin, (req, res) => {
    res.render("homePage");
});

app.post('/loginsubmit', (req, res) => {

    console.log(req.body);

    const { username, password } = req.body;

    let error;
    if (!username) {
        error = 'Username cannot be empty.';
    } else if (!password) {
        error = 'Password cannot be empty.';
    }



    if (error) {
        req.session.invalid = error;
        return res.redirect('/login');
    } else {
        if (req.body.username == "user1" && req.body.password == 'user1pwd') {
            req.session.username = req.body.username;
            console.log(req.session);
            return res.redirect('/homepage');
        } else {
            req.session.invalid = "invalid username/password";
            return res.redirect('/login');
        }
    }


});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        return res.redirect('/login');
    });
});

app.use(handleNotFound);





app.listen(5000, () => {
    console.log("server running");
});
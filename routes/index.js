var express  = require("express");
var router   = express.Router();
var User     = require("../models/user");
var passport = require("passport");

// HOME PAGE
router.get('/', function(req,res){
    res.render('landing');
});


// register form
router.get('/register', (req,res) => {
    res.render('register', {page:'register'});
});

// sign up logic
router.post('/register', (req,res) => {
    User.register(new User({
        username: req.body.username
    }), req.body.password, (err, user) => {
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate('local')(req,res, function() {
            req.flash('success','Welcome to YelpCamp ' + user.username);
            res.redirect('/campgrounds');
        });
    });
});

// login form
router.get('/login', (req,res) => {
    res.render('login', {page: 'login'});
});

// login logic
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), (req,res) => {
});

// logout route
router.get('/logout', (req,res) => {
    req.logout();
    req.flash('success', 'Logged you out!');
    res.redirect('/campgrounds');
});

module.exports = router;
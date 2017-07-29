var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campgrounds");
// it will automatically require index.js
var middleware = require("../middleware");

// INDEX - show all campgrounds
router.get('/', (req,res) => {
    // get all campgrounds
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            console.log(err);
        } else{
            res.render('campgrounds/index', {campgrounds: allCampgrounds, page: 'campgrounds/inde'});
        }
    });
});

// CREATE - request to add a new campground
router.post('/', middleware.isLoggedIn, (req, res) => {
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }, (err, newlyCreated) => {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/campgrounds');
        }
    });
});

// NEW - form for adding new campground
router.get('/new', middleware.isLoggedIn, (req,res) => {
    res.render('campgrounds/new');
});

// SHOW - shows more info about one campground
router.get('/:id', (req,res) => {
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get('/:id/edit' , middleware.checkCampgroundOwnership, (req,res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.render('campgrounds/edit', {campground: foundCampground});
        }
    });
});

// UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkCampgroundOwnership, (req,res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DELETE CAMPGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, (req,res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});

module.exports = router;
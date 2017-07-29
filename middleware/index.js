var Campground = require("../models/campgrounds");
var Comment    = require("../models/comments");

// all the middlewares
var middlewareObj = {};

// middleware to whether currently logged in user is tha author of campground that he wants to edit
middlewareObj.checkCampgroundOwnership = function(req,res,next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err){
                req.flash('error', 'Campground not found !');
                res.redirect('back');
            } else {
                if(foundCampground.author.id.equals( req.user._id )) {
                    next();
                } else {
                    req.flash('error', 'Permission Denied !');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that !');
        res.redirect('/campgrounds');
    }
};

// middleware to whether currently logged in user is tha author of comment that he wants to edit
middlewareObj.checkCommentOwnership = function(req,res,next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err){
                // redirects to onepage back
                res.redirect('back');
            } else {
                if(foundComment.author.id.equals( req.user._id )) {
                    next();
                } else {
                    req.flash('error', 'Permission Denied !');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that !');
        res.redirect('back');
    }
};

// middleware that checks if user is loggedIn or not
middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to be logged in to do that !');
    res.redirect('/login');
};

module.exports = middlewareObj;
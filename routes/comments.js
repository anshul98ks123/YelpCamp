var express       = require("express");
// mergeParams will aloow to use attached id by app.use in app.js
var router        = express.Router({mergeParams: true});
var Campground    = require("../models/campgrounds");
var Comment       = require("../models/comments");
// it will automatically require index.js
var middleware = require("../middleware");

// NEW COMMENT PAGE
router.get('/new', middleware.isLoggedIn, (req,res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    });
});

// CREATE NEW COMMENT POST REQUEST
router.post('/', middleware.isLoggedIn, (req,res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            res.redirect('/campgrounds');    
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    req.flash('error', 'Something went wrong !');
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash('success', 'Successfully added comment !');
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// EDIT COMMENT
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req,res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err){
            res.redirect('back');
        } else {
            res.render('comments/edit', {
                comment: foundComment,
                campground_id: req.params.id
            });
        }
    });
});

// UPDATE COMMENT
router.put('/:comment_id', middleware.checkCommentOwnership, (req,res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err) {
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DELETE COMMENT
router.delete('/:comment_id', middleware.checkCommentOwnership, (req,res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if(err){
            res.redirect('back');
        } else {
            req.flash('success', 'Comment deleted !');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

module.exports = router;
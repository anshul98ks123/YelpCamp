var mongoose = require("mongoose"),
Campground   = require("./models/campgrounds"),
Comment      = require("./models/comments");

var data = [
  {
    name: 'Cloud"s Rest',
    image: 'https://farm8.staticflickr.com/7042/7121867321_65b5f46ef1.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
  },
  {
    name: 'Desert Mesa',
    image: 'https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
  },
  {
    name: 'Canyon Floor',
    image: 'https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
  }
];

function seedDB() {
  // Remove all campgrounds
  /*Campground.remove({
  }).then(function(){
    console.log('removed campgrounds');
    for(var seed of data){
      Campground.create(seed).then(campground => {
        console.log('added a campground');
        Comment.create({
          text: 'This place is gr8, but i wish there was internet',
          author: 'Homer'
        }).then(comment => {
          campground.comments.push(comment);
          campground.save();
          console.log('Created new comment')
        });
      }).catch(err => {
        console.log(err);
      })
    }
  }).catch(err => {
    console.log(err);
  })*/
  
  Campground.remove({} , (err) => {
    /*if(err){
      console.log(err);
    }
    console.log('removed campgrounds!!');
     // add a few camgrounds
    for(var seed of data){
      Campground.create(seed, (err,campground) => {
        if(err){
          console.log(err);
        } else {
          console.log('created a campground');
          Comment.create({
            text: 'This place is gr8, but i wish there was internet',
            author: 'Homer'
          }, (err, comment) => {
            if(err){
              console.log(err);
            } else {
              campground.comments.push(comment);
              campground.save();
              console.log('Created new comment');
            }
          })
        }
      });
    }*/
  });
}

module.exports = seedDB;
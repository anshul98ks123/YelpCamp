var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    localStrategy  = require("passport-local"),
    User           = require("./models/user"),
    flash          = require("connect-flash"),
    methodOverride = require("method-override"),
    seedDB         = require("./seeds");

// requiring routes
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index");

mongoose.Promise = global.Promise;

/*mongoose.connect('mongodb://localhost/yelp_camp_v11');*/
mongoose.connect('mongodb://anshul98ks123:Anshul98yo@ds113063.mlab.com:13063/yelpcamp_aks');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
app.set('view engine', 'ejs');

/*seedDB();*/ // seed the db
 
// PASSPORT CONFIG
app.use(require("express-session")({
    secret: 'I am the best',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware which will run for every route
// it will send the user details by passport to every page
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success')
    next();
});

// it will enable campground.js file to attach /campgrunds as a prefix in every route
// now we can remove 'campground' from every route of campground.js
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Server has started');
});
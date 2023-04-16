import express from 'express';
const router = express.Router();
import Contact from '../models/contacts';
import passport from "passport";
import User from '../models/user';
import {AuthGaurd, UserDisplayName} from "../../util";

/******** TOP LEVEL ROUTES ********/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home',page: "home",displayName:"" });
});
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home',page: "home",displayName:"" });
});
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About Us',page: "about",displayName:"" });
});
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Our Projects',page: "projects",displayName:"" });
});
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Our Services',page: "services",displayName:"" });
});
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact Us',page: "contact",displayName:"" });
});

/******** AUTHENTICATION ROUTES ********/

router.get('/login', function(req, res, next) {
    if(!req.user){
        return res.render('index', { title: 'Login',page: "login",
            messages : req.flash('loginMessage'), displayName:"" });
    }
    return res.redirect('/contact-list');
});

router.post('/login', function (req, res, next){
    passport.authenticate('local', function (err : Error, user: any, info : string){

        if (err){
            console.error(err);
            res.end(err)
        }
        if (!user){
            req.flash('login', "Authentication Error");
            return res.redirect('/login');
        }

        req.logIn(user, function (err){
            if(err){
                console.error(err);
                res.end(err);
            }
            res.redirect('/contact-list')
        })
    })(req,res,next);
})

router.get('/register', function(req, res, next) {
    if(!req.user){
        return res.render('index', { title: 'Register',page: "register",
           message: req.flash('registerMessage'), displayName:"" });
    }
    res.redirect('/contact-list')
});

router.post('/register', function (req, res, next){

    let newUser = new User ({
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + "" + req.body.lastName
    });
    User.register(newUser, req.body.password, function(err){
        if(err){

            if(err.name == "UserExistsError")
            {
                console.error('Error: User Already Exists');
                req.flash('registerMessage','Registration Error');
            }
            console.error('Error: server Error');
            req.flash('registerMessage','Server Error');
            res.redirect('/register');
        }
        return passport.authenticate('local')(req,res, function (){
            return res.redirect('/contact-list');
        })
    });
});

router.get('/logout', function(req, res, next) {
    req.logOut(function (err){
        if(err){
           console.error(err)
            res.end(err);
        }
        return res.redirect('/login');
    });
});

/******** CONTACT LIST ROUTES ********/

router.get('/contact-list', AuthGaurd, function(req, res, next) {

    Contact.find().then(function (data) {
        // console.log(data)
        res.render('index', {
            title: 'Contact List', page: "contactlist",
            contacts: data, displayName: UserDisplayName(req)
        });
    }).catch(function (err) {
        console.error("Encountered an Error reading from the Database: " + err);
        res.end();
    });
});

//Display add page

router.get('/add', AuthGaurd, function(req, res, next) {
  res.render('index', { title: 'Add Contact',page: "edit",
                        contact: '', displayName: UserDisplayName(req)});
});

//process the add request
router.post('/add', AuthGaurd, function(req, res, next) {

    //instantiate a new contact
    let newContact = new Contact(
        {
            "FullName": req.body.fullName,
            "ContactNumber": req.body.contactNumber,
            "EmailAddress": req.body.emailAddress
        }
    );
    //insert contact in database
    Contact.create(newContact).then(function (contactToEdit){
        //new contact has been successfully added
        res.redirect("/contact-list");
    }).catch(function (err) {
        console.error("failed to add contact" + err);
        res.end();
    });
});


//process the delete request contact
router.get('/delete/:id', AuthGaurd,function(req, res, next) {

    //obtained from the passed in id:
    let id = req.params.id

    Contact.deleteOne({_id: id}).then(function (contactToEdit){

        res.redirect("/contact-list");

    }).catch(function (err) {
        console.error("failed to delete contact from database" + err);
        res.end();
    });
})

//display edit page with data
router.get('/edit/:id', AuthGaurd, function(req, res, next) {

    //obtained from the passed in id:
    let id = req.params.id

    Contact.findById(id).then(function (contactToEdit){
        //pass the id to the dband read/obtain contact
        res.render('index',{title:'Edit', page:"edit",
                                        contact: contactToEdit, displayName:UserDisplayName(req)});

}).catch(function (err) {
        console.error("failed to retrieve contact from Database" + err);
        res.end();
    });
});

//process the edit request
router.post('/edit/:id', AuthGaurd, function(req, res, next) {
    let id = req.params.id

    //instantiate a new object
    let updatedContact = new Contact(
        {
            "_id": id,
            "FullName": req.body.fullName,
            "ContactNumber": req.body.contactNumber,
            "EmailAddress": req.body.emailAddress
        }
    );
    //insert in database
    Contact.updateOne({_id: id},updatedContact).then(function (contactToEdit){

        //edit contact was successful
        res.redirect("/contact-list");
    }).catch(function (err) {
        console.error("failed to edit contact" + err);
        res.end();
    });
});




export default router;

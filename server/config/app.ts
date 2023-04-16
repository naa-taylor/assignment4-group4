 import createError from 'http-errors';
 import express, {NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

 import indexRouter from '../routes';
 import usersRouter from '../routes/users';

 //Modules for Authentication
import passport from 'passport';  //authentication support
import session from 'express-session'; //cookie-based session
import passportLocal from 'passport-local'; //authentication strategy (username/ password)
import flash from 'connect-flash' //authentication messaging

let LocalStrategy = passportLocal.Strategy; //alias

 //user Model
import User from '../models/user';
const app = express();

//add the database connection information
import  * as DBConfig from './db';

//mongoose.connect(DBConfig.localURI);
mongoose.connect(DBConfig.remoteURI);
const db = mongoose.connection;
db.on("error", function (){
  console.error("Connection Error!");
});

db.once("open", function (){
  console.log(`Connected to MongoDB at ${DBConfig.HostName}`);
});


 // view engine setup
 app.set('views', path.join(__dirname, '../views'));
 app.set('view engine', 'ejs');

 app.use(logger('dev'));
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 app.use(cookieParser());

 app.use(express.static(path.join(__dirname, '../../client')));
 app.use(express.static(path.join(__dirname, '../../node_modules')));

 //Configure Express Session
 app.use(
     session({
         secret: DBConfig.SessionSecret,
         resave: false,
         saveUninitialized: false,
     }))

 //Initialize Flash and Passport
 app.use(flash())
 app.use(passport.initialize());
 app.use(passport.session());

 //Implement Authentication Strategy
 passport.use(User.createStrategy())

 //serialize and deserialize user data
 passport.serializeUser(User.serializeUser())        //HACK///
 passport.deserializeUser(User.deserializeUser())

 // Configure passport
 passport.use(new LocalStrategy(User.authenticate()));

 //route declarations
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err :createError.HttpError, req:express.Request, res:express.Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


export default app;
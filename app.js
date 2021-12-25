const express = require('express');
const app = express();
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const schedule = require('node-schedule');
const MemoryStore = require('memorystore')(session);
const rateLimit = require("express-rate-limit");
var logger = require('morgan');

const apiRouters = require('./routes/api');
const userRouters = require('./routes/users');
const premiumRouters = require('./routes/premium');
var path = require('path');
const { isAuthenticated } = require('./lib/auth');
const { connectMongoDb } = require('./database/connect');
const { getApikey, resetLimit} = require('./database/db');
const { port } = require('./lib/settings');
const { ignoreFavicon } = require('./lib/function');
const { ExpiredTime, getTotalReq, getTodayReq, getVisitor, getTotalUser, addRequest, addVisitor } = require('./database/premium');
const PORT = process.env.PORT || port;

connectMongoDb();

app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5000, 
  message: 'Oops too many requests'
});
app.use(limiter);

app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static('public'));
app.use(logger('dev'));

app.use(ignoreFavicon)
app.use(express.static(path.join(__dirname, 'hasil')));
app.use(session({
  secret: 'secret',  
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
require('./lib/config')(passport);

app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})

app.use(function(req, res, next) {
  getTotalUser()
  addRequest();
  next();
})

app.get('/', (req, res) => {
  addVisitor()
  res.render('index', {
    layout: 'layouts/main'
  });
});
app.get('/price', (req, res) => {
  res.render('price', {
    layout: 'layouts/main'
  });
});
app.get('/docs', isAuthenticated, async (req, res) => { 
  addVisitor()
  let { apikey, username, limit, totalreq } = req.user
  let total = await getTotalReq()
  let today = await getTodayReq()
  let visitor = await getVisitor()
  let userTotal = await getTotalUser()
  res.render('docs', {
    limit: limit,
    total: total,
    today,
    visitor,
    userTotal,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/primbonmenu', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('primbon', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/animemenu', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('anime', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/makermenu', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('maker', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/randommenu', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('random', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/othermenu', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('other', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/changelog', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('changelog', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/gamemenu', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('game', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});
app.get('/downloadmenu', isAuthenticated, async (req, res) => { 
  let { apikey, username, limit } = req.user
  res.render('download', {
    limit: limit,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});

app.use('/api', apiRouters);
app.use('/users', userRouters);
app.use('/premium', premiumRouters);

app.set('json spaces', 4);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  schedule.scheduleJob('* * * * *', () => { 
    ExpiredTime()
  });
});

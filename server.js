const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const path = require('path');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const AOS = require('./node_modules/aos/dist');
// AOS.init();
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ 
  helpers: {
    eq: function (v1, v2) {
        return v1 === v2;
    },
    json: function (context) {
      return JSON.stringify(context);
    },
}
});

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 60 * 60 * 100,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  const loggedInContext = { loggedIn: req.session.loggedIn || false };
  res.render('homepage', loggedInContext);
});

app.use(routes);

// server-side routes
app.get('/quiz', (req, res) => {
  res.render('quiz');
});

app.get('/selectQuiz', (req, res) => {
  res.render('quiz-page');
});

app.get('/account', (req, res) => {
  res.render('account');
});
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});


const path = require("path");
const express = require("express");
const routes = require('./controller');
const session =  require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./util/helpers')

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/config')
const SequlizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(sessison(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(PORT, () => {
  console.log(` now Listening `);
  sequelize.sync({force: false})
});
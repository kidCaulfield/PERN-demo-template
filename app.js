const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const cors = require('cors');
const crypto = require('crypto');

//////////////////////////////////////////////////////////////////////
/*                          Middle Ware                             */
//////////////////////////////////////////////////////////////////////

app.use(express.static(`./client/build`))

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const localRedis = { port: 6379, host: 'localhost' };
const deployedRedis = { url: process.env.REDIS_URL };

const genuuid = () => {
  return crypto.randomBytes(64).toString('hex');
};

var sess = {
  genid: function(req) {
    return genuuid();
  },
  name: 'COOOKIE!!!!',
  secret: crypto.randomBytes(64).toString('hex'),
  store: new RedisStore(
    process.env.NODE_ENV === 'production' ? deployedRedis : localRedis
  ),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: false,
    path: '/',
  },
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}

app.use(session(sess));

//////////////////////////////////////////////////////////////////////
/*                            Routes                                */
//////////////////////////////////////////////////////////////////////

app.options(
  '*',
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

const usersRouter = require('./routes/users');
app.use('/api', usersRouter);

const sessionRouter = require('./routes/session');
app.use('/api', sessionRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
})

//////////////////////////////////////////////////////////////////////
/*                            Server                                */
//////////////////////////////////////////////////////////////////////

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`📡  Listening on port ${port}`));

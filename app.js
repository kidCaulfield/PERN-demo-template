const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

//////////////////////////////////////////////////////////////////////
/*                          Middle Ware                             */
//////////////////////////////////////////////////////////////////////

// app.use(express.static(`./client/build`))

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//////////////////////////////////////////////////////////////////////
/*                            Routes                                */
//////////////////////////////////////////////////////////////////////

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './client/build/index.html'));
// })

//////////////////////////////////////////////////////////////////////
/*                            Server                                */
//////////////////////////////////////////////////////////////////////

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`📡  Listening on port ${port}`));
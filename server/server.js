const express = require('express');
const app = express();

const path = require('path');
const PORT = process.env.PORT || 4000;
const morgan = require('morgan');
const router = require('./route');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const sequelize = require('./models').sequelize;
const { secret } = require('./models');
sequelize.sync();

app.use(express.static(path.join(__dirname, '..', 'public/')));
app.use(morgan('combined'));

app.use('/', router);
app.use(
    session({
      secret: secret, // 쿠키와 마찬가지로 아무 값이나 줘도 된다.
      resave: false, // 세션 아이디를 접속할 때마다 새롭게 발급할 것인가?
      saveUninitialized: true,
      store: new MySQLStore({
        host: sequelize.config.host,
        port: sequelize.config.port,
        user: sequelize.config.username,
        password: sequelize.config.password,
        database: sequelize.config.database
      })
    })
  );

app.listen(PORT, () => {
    console.log('server on : http://localhost:' + PORT)
})

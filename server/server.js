const express = require('express');
const app = express();

const path = require('path');
const PORT = process.env.PORT || 4000;
const morgan = require('morgan');

const sequelize = require('./models').sequelize;
sequelize.sync();

app.use(express.static(path.join(__dirname, '..', 'public/')));
app.use(morgan('combined'));

app.listen(PORT, () => {
    console.log('server on : http://localhost:' + PORT)
})
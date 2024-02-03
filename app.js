const express = require('express');

const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const cors = require('cors');

const app = express()

app.use(cors())

const todoRoutes = require('./routes/todo')

app.use(bodyParser.json())

app.use('/todo', todoRoutes)

sequelize.sync()
.then(() => {
    app.listen(3000);
})
.catch((err) => {
    console.log(err)
})
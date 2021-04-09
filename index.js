const express = require("express");
const path = require("path");

const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 8080;

//body parser:
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/users', require('./routes/api/users'))
app.use('/api/burgers', require('./routes/api/burgers'))

app.listen(PORT, () => console.log(`server on ${PORT}`));

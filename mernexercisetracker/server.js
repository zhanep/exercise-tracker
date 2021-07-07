const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


// middleware to parse json
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URL;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

const exercisesRouter = require('./backend/routes/Exercises')
const UsersRouter = require('./backend/routes/Users')

// url routes 
app.use('./exercises', exercisesRouter);
app.use('./users', UsersRouter);

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
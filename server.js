const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.set('strictQuery', false);
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Cot-cot-codêêêt"});
});

require('./app/routes/chicken.routes.js')(app);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

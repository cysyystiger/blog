const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/postdb');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/js', (req, res) => {
  res.sendFile(path.join(__dirname, 'bundle.js'));
});
app.get('/style', (req, res) => {
  res.sendFile(path.join(__dirname, 'style.css'));
});

routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
  next();
});

app.listen(port, () => {
  console.log('server on');
});

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('./logger');

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Connected to DB!');
  }
);

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/log-user-action', (req, res) => {
  const action = req.body.action;
  const data = req.body.data;
  const generatedData = Object.entries(data)
    .map(([key, val]) => `${key}: ${val}`)
    .join(', ');

  if (!!action && !!data) logger.info(`action: ${action}, ` + generatedData);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const Helpers = require('../db/models.js');

const app = express();

app.use('/', express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/api/listings/', (req, res) => {
  Helpers.listingModel.find()
    .then((listings) => {
      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify(listings, 0, 2));
    });
});
app.get('/api/listings/:id', (req, res) => {
  Helpers.listingModel.find({ id: req.params.id })
    .then((listings) => {
      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify(listings, 0, 2));
    });
});

module.exports = app;
const express = require('express');
const app =  express();
const parser = require('body-parser');
const cors = require('cors');
app.use(parser.json());
app.use(cors());

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('');
    const plaquesLocations = db.collection('plaques');
    // const plaquesRouter = createRouter(plaquesLocations);
    // app.use('/api/plaques', plaquesRouter);
  })
  .catch(console.err);

  app.listen(3000, function (){
    console.log(`Listening on port ${this.address().port}`);
  });

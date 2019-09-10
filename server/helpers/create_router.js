const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const fetch = require('node-fetch');

const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection
    .find()
    .toArray()
    .then((docs) => res.json(docs))
   });

   router.get('/:id', (req, res) => {
     const id = req.params.id;
     collection
     .findOne({ _id: ObjectID(id) })
     .then((doc) => res.json(doc))
   });

   router.post('/', (req, res) => {
     const newPlaque = req.body;
     collection
     .insertOne(newPlaque)
     .then((result) => {
       res.json(result.ops[0])
     })
   });

   router.put('/:id', (req, res) => {
     const id = req.params.id;
     const updatePlaque = req.body;
     collection.findOneAndUpdate(
       { _id: ObjectID(id)},
       {$set: updatePlaque},
       {returnOriginal: false}
     )
     .then(result => res.json(result.value))
   });

   router.delete('/:id', (req, res) => {
     const id = req.params.id;
     collection.deleteOne({_id: ObjectID(id)})
     .then(result => res.json(result));
   });

   // Gets extra api info
   router.post('/plaque-data', (req, res) => {
     let url = req.body.uri;
     fetch(url)
     .then(jsonData => jsonData.json())
     .then(data => res.json(data))
   })

   return router;
};

module.exports = createRouter;

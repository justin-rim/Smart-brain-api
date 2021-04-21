const Clarifai = require('clarifai');
const { json } = require('express');

const app = new Clarifai.App({
 apiKey: '4e80e3cd206d457ca0bdae15616fee4e'
});

const handleApiCall = (db) => (req, res) => {
   app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
         res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (db) => (req, res) => {
   const { id } = req.body;
      db('users').where('id', '=', id)
         .increment('entries', 1)
         .returning('entries')
         .then(entries => {
            res.json(entries[0]);
         })
         .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
   handleApiCall: handleApiCall,
   handleImage:handleImage
}


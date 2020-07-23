'use strict';

var _quartier = require('../models/quartier.model.js');

exports.list_all_quartiers = function(req, res) {
    _quartier.getAllquartier(function(err, quartier) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', quartier);
    res.send(quartier);
  });
};



exports.create_a_quartier = function(req, res) {
  var new_quartier = new _quartier(req.body);

  //handles null error 
   if(!new_quartier.nom || !new_quartier.commune){

            res.status(400).send({ error:true, message: 'quartier infos incomplet' });
            console.log("quartier infos incomplet");

        }
else{
  
    _quartier.createquartier(new_quartier, function(err, quartier) {
    
    if (err)
      res.send(err);
    res.json(quartier);
  });
}
};


exports.read_a_quartier = function(req, res) {
    _quartier.getquartierById(req.params.quartierId, function(err, quartier) {
    if (err)
      res.send(err);
    res.json(quartier);
  });
};


exports.update_a_quartier = function(req, res) {
    _quartier.updateById(req.params.quartierId, new _quartier(req.body), function(err, quartier) {
    if (err)
      res.send(err);
    res.json(quartier);
  });
};


exports.delete_a_quartier = function(req, res) {


    _quartier.remove( req.params.quartierId, function(err, quartier) {
    if (err)
      res.send(err);
    res.json({ message: 'quartier successfully deleted' });
  });
};

exports.getByCommune = function(req, res) {
  _quartier.getByCommune(req.params.communeId, function(err, commune) {
  if (err)
    res.send(err);
  res.json(commune);
});
};
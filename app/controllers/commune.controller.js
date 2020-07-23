'use strict';

var _commune = require('../models/commune.model.js');

exports.list_all_communes = function(req, res) {
    _commune.getAllcommune(function(err, commune) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', commune);
    res.send(commune);
  });
};



exports.create_a_commune = function(req, res) {
  var new_commune = new _commune(req.body);

  //handles null error 
   if(!new_commune.nom || !new_commune.departement){

            res.status(400).send({ error:true, message: 'commune infos incomplet' });
            console.log("commune infos incomplet");

        }
else{
  
    _commune.createcommune(new_commune, function(err, commune) {
    
    if (err)
      res.send(err);
    res.json(commune);
  });
}
};


exports.read_a_commune = function(req, res) {
    _commune.getcommuneById(req.params.communeId, function(err, commune) {
    if (err)
      res.send(err);
    res.json(commune);
  });
};


exports.update_a_commune = function(req, res) {
    _commune.updateById(req.params.communeId, new _commune(req.body), function(err, commune) {
    if (err)
      res.send(err);
    res.json(commune);
  });
};


exports.delete_a_commune = function(req, res) {


    _commune.remove( req.params.communeId, function(err, commune) {
    if (err)
      res.send(err);
    res.json({ message: 'commune successfully deleted' });
  });
};

exports.getByDepartement = function(req, res) {
  _commune.getByDepartement(req.params.departementId, function(err, departement) {
  if (err)
    res.send(err);
  res.json(departement);
});
};
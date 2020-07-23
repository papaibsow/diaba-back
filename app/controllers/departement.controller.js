'use strict';

var _departement = require('../models/departement.model.js');

exports.list_all_departements = function(req, res) {
    _departement.getAlldepartement(function(err, departement) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', departement);
    res.send(departement);
  });
};



exports.create_a_departement = function(req, res) {
  var new_departement = new _departement(req.body);

  //handles null error 
   if(!new_departement.nom || !new_departement.region){

            res.status(400).send({ error:true, message: 'departement infos incomplet' });
            console.log("departement infos incomplet");

        }
else{
  
    _departement.createdepartement(new_departement, function(err, departement) {
    
    if (err)
      res.send(err);
    res.json(departement);
  });
}
};


exports.read_a_departement = function(req, res) {
    _departement.getdepartementById(req.params.departementId, function(err, departement) {
    if (err)
      res.send(err);
    res.json(departement);
  });
};


exports.update_a_departement = function(req, res) {
    _departement.updateById(req.params.departementId, new _departement(req.body), function(err, departement) {
    if (err)
      res.send(err);
    res.json(departement);
  });
};


exports.delete_a_departement = function(req, res) {


    _departement.remove( req.params.departementId, function(err, departement) {
    if (err)
      res.send(err);
    res.json({ message: 'departement successfully deleted' });
  });
};




exports.getByRegion = function(req, res) {
  _departement.getByRegion(req.params.regionId, function(err, departement) {
  if (err)
    res.send(err);
  res.json(departement);
});
};
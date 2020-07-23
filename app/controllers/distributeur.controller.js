'use strict';

var _distributeur = require('../models/distributeur.model.js');

exports.list_all_distributeurs = function(req, res) {
    _distributeur.getAlldistributeur(function(err, distributeur) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', distributeur);
    res.send(distributeur);
  });
};



exports.create_a_distributeur = function(req, res) {
  var new_distributeur = new _distributeur(req.body);

  //handles null error 
   if(!new_distributeur.cni || !new_distributeur.nom|| !new_distributeur.prenom|| !new_distributeur.quartier|| !new_distributeur.telephone){

            res.status(400).send({ error:true, message: 'distributeur infos incomplet' });
            console.log("distributeur infos incomplet");

        }
else{
  
    _distributeur.createdistributeur(new_distributeur, function(err, distributeur) {
    
    if (err)
      res.send(err);
    res.json(distributeur);
  });
}
};


exports.read_a_distributeur = function(req, res) {
    _distributeur.getdistributeurById(req.params.distributeurId, function(err, distributeur) {
    if (err)
      res.send(err);
    res.json(distributeur);
  });
};


exports.update_a_distributeur = function(req, res) {
    _distributeur.updateById(req.params.distributeurId, new _distributeur(req.body), function(err, distributeur) {
    if (err)
      res.send(err);
    res.json(distributeur);
  });
};


exports.delete_a_distributeur = function(req, res) {


    _distributeur.remove( req.params.distributeurId, function(err, distributeur) {
    if (err)
      res.send(err);
    res.json({ message: 'distributeur successfully deleted' });
  });
};
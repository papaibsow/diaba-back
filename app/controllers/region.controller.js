'use strict';

var _region = require('../models/region.model.js');

exports.list_all_regions = function(req, res) {
    _region.getAllregion(function(err, region) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', region);
    res.send(region);
  });
};



exports.create_a_region = function(req, res) {
  var new_region = new _region(req.body);

  //handles null error 
   if(!new_region.nom){

            res.status(400).send({ error:true, message: 'region infos incomplet' });
            console.log("region infos incomplet");

        }
else{
  
    _region.createregion(new_region, function(err, region) {
    
    if (err)
      res.send(err);
    res.json(region);
    console.log("new region successfully added")

  });
}
};


exports.read_a_region = function(req, res) {
    _region.getregionById(req.params.regionId, function(err, region) {
    if (err)
      res.send(err);
    res.json(region);
  });
};


exports.update_a_region = function(req, res) {
    _region.updateById(req.params.regionId, new _region(req.body), function(err, region) {
    if (err)
      res.send(err);
    res.json(region);
    console.log("region successfully updated")
  });
};


exports.delete_a_region = function(req, res) {


    _region.remove( req.params.regionId, function(err, region) {
    if (err)
      res.send(err);
    res.json({ message: 'region successfully deleted' });
  });
};
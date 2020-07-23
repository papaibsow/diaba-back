'user strict';
var sql = require('../database/db.js');

// region object constructor
var _region_ = function(region){
    this.nom = region.nom;
    //this.departement = region.departement;

};
_region_.createregion = function (newregion, result) {    
        sql.query("INSERT INTO region set ?", newregion, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};
_region_.getregionById = function (regionId, result) {
        sql.query("Select * from region where id = ? ", regionId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
_region_.getAllregion = function (result) {
        sql.query("Select * from region", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('regions : ', res);  

                 result(null, res);
                }
            });   
};
_region_.updateById = function(id, region, result){
  sql.query("UPDATE region SET nom = ? WHERE id = ?", [region.nom, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
_region_.remove = function(id, result){
     sql.query("DELETE FROM region WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= _region_
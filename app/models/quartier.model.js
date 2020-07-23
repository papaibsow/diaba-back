'user strict';
var sql = require('../database/db.js');

// quartier object constructor
var _quartier_ = function(quartier){
    this.nom = quartier.nom;
    this.commune = quartier.commune;

};
_quartier_.createquartier = function (newquartier, result) {    
        sql.query("INSERT INTO quartier set ?", newquartier, function (err, res) {
                
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
_quartier_.getquartierById = function (quartierId, result) {
        sql.query("Select * from quartier where id = ? ", quartierId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
_quartier_.getAllquartier = function (result) {
        sql.query("Select * from quartier", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('quartiers : ', res);  

                 result(null, res);
                }
            });   
};
_quartier_.updateById = function(id, quartier, result){
  sql.query("UPDATE quartier SET nom = ?, commune = ? WHERE id = ?", [quartier.nom,quartier.commune, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
_quartier_.remove = function(id, result){
     sql.query("DELETE FROM quartier WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};
_quartier_.getByCommune = function (communeId, result) {
    sql.query("Select * from quartier where commune = ? ", communeId, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });   
};
module.exports= _quartier_
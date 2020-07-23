'user strict';
var sql = require('../database/db.js');

// departement object constructor
var _departement_ = function(departement){
    this.nom = departement.nom;
    this.region = departement.region;

};
_departement_.createdepartement = function (newdepartement, result) {    
        sql.query("INSERT INTO departement set ?", newdepartement, function (err, res) {
                
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
_departement_.getdepartementById = function (departementId, result) {
        sql.query("Select * from departement where id = ? ", departementId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
_departement_.getAlldepartement = function (result) {
        sql.query("Select * from departement", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('departements : ', res);  

                 result(null, res);
                }
            });   
};
_departement_.updateById = function(id, departement, result){
  sql.query("UPDATE departement SET nom = ?, region = ? WHERE id = ?", [departement.nom,departement.region, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
_departement_.remove = function(id, result){
     sql.query("DELETE FROM departement WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};
_departement_.getByRegion = function (regionId, result) {
    sql.query("Select * from departement where region = ? ", regionId, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });   
};
module.exports= _departement_
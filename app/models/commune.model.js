'user strict';
var sql = require('../database/db.js');

// commune object constructor
var _commune_ = function(commune){
    this.nom = commune.nom;
    this.departement = commune.departement;

};
_commune_.createcommune = function (newcommune, result) {    
        sql.query("INSERT INTO commune set ?", newcommune, function (err, res) {
                
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
_commune_.getcommuneById = function (communeId, result) {
        sql.query("Select * from commune where id = ? ", communeId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
_commune_.getAllcommune = function (result) {
        sql.query("Select * from commune", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('communes : ', res);  

                 result(null, res);
                }
            });   
};
_commune_.updateById = function(id, commune, result){
  sql.query("UPDATE commune SET nom = ?, departement = ? WHERE id = ?", [commune.nom,commune.region, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
_commune_.remove = function(id, result){
     sql.query("DELETE FROM commune WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};
_commune_.getByDepartement = function (departementId, result) {
    sql.query("Select * from commune where departement = ? ", departementId, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });   
};
module.exports= _commune_
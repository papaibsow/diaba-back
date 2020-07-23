'user strict';
var sql = require('../database/db.js');

// distributeur object constructor
var _distributeur_ = function(distributeur){
    this.quartier = distributeur.quartier;
    this.cni = distributeur.cni;
    this.nom = distributeur.nom;
    this.prenom = distributeur.prenom;
    this.telephone = distributeur.telephone;
    this.structure = distributeur.structure;


};
_distributeur_.createdistributeur = function (newdistributeur, result) {    
        sql.query("INSERT INTO distributeur set ?", newdistributeur, function (err, res) {
                
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
_distributeur_.getdistributeurById = function (distributeurId, result) {
        sql.query("Select * from distributeur where id = ? ", distributeurId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
_distributeur_.getAlldistributeur = function (result) {
        sql.query("Select * from distributeur", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('distributeurs : ', res);  

                 result(null, res);
                }
            });   
};
_distributeur_.updateById = function(id, distributeur, result){
  sql.query("UPDATE distributeur SET quartier = ?, cni = ? , nom = ? , prenom = ? ,telephone = ? , structure = ? WHERE id = ?", [distributeur.quartier,distributeur.cni,distributeur.nom,distributeur.prenom,distributeur.telephone,distributeur.structure, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
_distributeur_.remove = function(id, result){
     sql.query("DELETE FROM distributeur WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= _distributeur_
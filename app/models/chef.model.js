const sql = require("./db.js");

// constructor
const Chef = function(chef) {
  this.prenom = chef.prenom;
  this.nom = chef.nom;
  this.telephone = chef.telephone;
  this.cni = chef.cni;
  this.region = chef.region;
  this.departement = chef.departement;
  this.commune = chef.commune;
  this.quartier = chef.quartier;
};

Chef.create = (newChef, result) => {
  sql.query("INSERT INTO chefs_quartier SET ?", newChef, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created chef: ", { id: res.insertId, ...newChef });
    result(null, { id: res.insertId, ...newChef });
  });
};

Chef.findById = (chefId, result) => {
  sql.query(`SELECT * FROM chefs_quartier WHERE id = ${chefId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found chef: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Chef with the id
    result({ kind: "not_found" }, null);
  });
};

Chef.getAll = result => {
  sql.query("SELECT * FROM chefs_quartier", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("chefs: ", res);
    result(null, res);
  });
};

Chef.updateById = (id, chef, result) => {
  sql.query(
    "UPDATE chefs_quartier SET prenom = ?, nom = ?, telephone = ?,cni=?,region=?,departement=?,commune=?,quartier=? WHERE id =?",
    [chef.prenom, chef.nom, chef.telephone,chef.cni,chef.region,chef.departement,chef.commune,chef.quartier, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Chef with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated chef: ", { id: id, ...chef });
      result(null, { id: id, ...chef });
    }
  );
};

Chef.remove = (id, result) => {
  sql.query("DELETE FROM chefs_quartier WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Chef with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted chef with id: ", id);
    result(null, res);
  });
};

Chef.removeAll = result => {
  sql.query("DELETE FROM chefs_quartier", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} chefs`);
    result(null, res);
  });
};

module.exports = Chef;

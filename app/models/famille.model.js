const sql = require("./db.js");

// constructor
const Famille = function(famille) {
  this.prenom_chef = famille.prenom_chef;
  this.nom_chef = famille.nom_chef;
  this.telephone_chef = famille.telephone_chef;
  this.cni_chef = famille.cni_chef;
  this.region = famille.region;
  this.departement = famille.departement;
  this.commune = famille.commune;
  this.quartier = famille.quartier;
};

Famille.create = (newFamille, result) => {
  sql.query("INSERT INTO familles SET ?", newFamille, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created famille: ", { id: res.insertId, ...newFamille });
    result(null, { id: res.insertId, ...newFamille });
  });
};

Famille.findById = (familleId, result) => {
  sql.query(`SELECT * FROM familles WHERE id = ${familleId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found famille: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Famille with the id
    result({ kind: "not_found" }, null);
  });
};

Famille.getAll = result => {
  sql.query("SELECT * FROM familles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("familles: ", res);
    result(null, res);
  });
};

Famille.updateById = (id, famille, result) => {
  sql.query(
    "UPDATE familles SET prenom_chef = ?, nom_chef = ?, telephone_chef = ?,cni_chef=?,region=?,departement=?,commune=?,quartier=? WHERE id =?",
    [famille.prenom_chef, famille.nom_chef, famille.telephone_chef,famille.cni_chef,famille.region,famille.departement,famille.commune,famille.quartier, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Famille with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated famille: ", { id: id, ...famille });
      result(null, { id: id, ...famille });
    }
  );
};

Famille.remove = (id, result) => {
  sql.query("DELETE FROM familles WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Famille with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted famille with id: ", id);
    result(null, res);
  });
};

Famille.removeAll = result => {
  sql.query("DELETE FROM familles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} familles`);
    result(null, res);
  });
};

module.exports = Famille;

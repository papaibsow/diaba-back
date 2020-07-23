const sql = require("./db.js");

// constructor
const Autre = function(autre) {
    this.statut = autre.statut;
  this.prenom = autre.prenom;
  this.nom = autre.nom;
  this.telephone = autre.telephone;
  this.cni = autre.cni;
  this.region = autre.region;
  this.departement = autre.departement;
  this.commune = autre.commune;
  this.quartier = autre.quartier;
};

Autre.create = (newAutre, result) => {
  sql.query("INSERT INTO autres SET ?", newAutre, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created autre: ", { id: res.insertId, ...newAutre });
    result(null, { id: res.insertId, ...newAutre });
  });
};

Autre.findById = (autreId, result) => {
  sql.query(`SELECT * FROM autres WHERE id = ${autreId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found autre: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Autre with the id
    result({ kind: "not_found" }, null);
  });
};

Autre.getAll = result => {
  sql.query("SELECT * FROM autres", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("autres: ", res);
    result(null, res);
  });
};

Autre.updateById = (id, autre, result) => {
  sql.query(
    "UPDATE autres SET statut=?,prenom = ?, nom = ?, telephone = ?,cni=?,region=?,departement=?,commune=?,quartier=? WHERE id =?",
    [autre.statut,autre.prenom, autre.nom, autre.telephone,autre.cni,autre.region,autre.departement,autre.commune,autre.quartier, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Autre with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated autre: ", { id: id, ...autre });
      result(null, { id: id, ...autre });
    }
  );
};

Autre.remove = (id, result) => {
  sql.query("DELETE FROM autres WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Autre with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted autre with id: ", id);
    result(null, res);
  });
};

Autre.removeAll = result => {
  sql.query("DELETE FROM autres", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} autres`);
    result(null, res);
  });
};

module.exports = Autre;

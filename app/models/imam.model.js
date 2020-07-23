const sql = require("./db.js");

// constructor
const Imam = function(imam) {
  this.prenom = imam.prenom;
  this.nom = imam.nom;
  this.telephone = imam.telephone;
  this.cni = imam.cni;
  this.region = imam.region;
  this.departement = imam.departement;
  this.commune = imam.commune;
  this.quartier = imam.quartier;
  this.nom_mosquee = imam.nom_mosquee;
};

Imam.create = (newImam, result) => {
  sql.query("INSERT INTO imams SET ?", newImam, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created imam: ", { id: res.insertId, ...newImam });
    result(null, { id: res.insertId, ...newImam });
  });
};

Imam.findById = (imamId, result) => {
  sql.query(`SELECT * FROM imams WHERE id = ${imamId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found imam: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Imam with the id
    result({ kind: "not_found" }, null);
  });
};

Imam.getAll = result => {
  sql.query("SELECT * FROM imams", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("imams: ", res);
    result(null, res);
  });
};

Imam.updateById = (id, imam, result) => {
  sql.query(
    "UPDATE imams SET prenom = ?, nom = ?, telephone = ?,cni=?,region=?,departement=?,commune=?,quartier=?,nom_mosquee=? WHERE id =?",
    [imam.prenom, imam.nom, imam.telephone,imam.cni,imam.region,imam.departement,imam.commune,imam.quartier,imam.nom_mosquee, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Imam with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated imam: ", { id: id, ...imam });
      result(null, { id: id, ...imam });
    }
  );
};

Imam.remove = (id, result) => {
  sql.query("DELETE FROM imams WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Imam with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted imam with id: ", id);
    result(null, res);
  });
};

Imam.removeAll = result => {
  sql.query("DELETE FROM imams", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} imams`);
    result(null, res);
  });
};

module.exports = Imam;

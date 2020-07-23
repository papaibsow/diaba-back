const Famille = require("../models/famille.model.js");

// Create and Save a new Famille
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Famille
  const famille = new Famille({
    nom_chef: req.body.nom_chef,
    prenom_chef: req.body.prenom_chef,
    telephone_chef: req.body.telephone_chef,
    cni_chef:req.body.cni_chef,
    region:req.body.region,
    departement:req.body.departement,
    commune:req.body.commune,
    quartier:req.body.quartier
  });

  // Save Famille in the database
  Famille.create(famille, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Famille."
      });
    else res.send(data);
  });
};

// Retrieve all Familles from the database.
exports.findAll = (req, res) => {
  Famille.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving familles."
      });
    else res.send(data);
  });
};

// Find a single Famille with a familleId
exports.findOne = (req, res) => {
  Famille.findById(req.params.familleId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Famille with id ${req.params.familleId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Famille with id " + req.params.familleId
        });
      }
    } else res.send(data);
  });
};

// Update a Famille identified by the familleId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Famille.updateById(
    req.params.familleId,
    new Famille(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Famille with id ${req.params.familleId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Famille with id " + req.params.familleId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Famille with the specified familleId in the request
exports.delete = (req, res) => {
  Famille.remove(req.params.familleId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Famille with id ${req.params.familleId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Famille with id " + req.params.familleId
        });
      }
    } else res.send({ message: `Famille was deleted successfully!` });
  });
};

// Delete all Familles from the database.
exports.deleteAll = (req, res) => {
  Famille.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all familles."
      });
    else res.send({ message: `All Familles were deleted successfully!` });
  });
};

const Autre = require("../models/autre.model.js");

// Create and Save a new Autre
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Autre
  const autre = new Autre({
      statut:req.body.statut,
    nom: req.body.nom,
    prenom: req.body.prenom,
    telephone: req.body.telephone,
    cni:req.body.cni,
    region:req.body.region,
    departement:req.body.departement,
    commune:req.body.commune,
    quartier:req.body.quartier
  });

  // Save Autre in the database
  Autre.create(autre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Autre."
      });
    else res.send(data);
  });
};

// Retrieve all Autres from the database.
exports.findAll = (req, res) => {
  Autre.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving autres."
      });
    else res.send(data);
  });
};

// Find a single Autre with a autreId
exports.findOne = (req, res) => {
  Autre.findById(req.params.autreId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Autre with id ${req.params.autreId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Autre with id " + req.params.autreId
        });
      }
    } else res.send(data);
  });
};

// Update a Autre identified by the autreId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Autre.updateById(
    req.params.autreId,
    new Autre(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Autre with id ${req.params.autreId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Autre with id " + req.params.autreId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Autre with the specified autreId in the request
exports.delete = (req, res) => {
  Autre.remove(req.params.autreId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Autre with id ${req.params.autreId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Autre with id " + req.params.autreId
        });
      }
    } else res.send({ message: `Autre was deleted successfully!` });
  });
};

// Delete all Autres from the database.
exports.deleteAll = (req, res) => {
  Autre.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all autres."
      });
    else res.send({ message: `All Autres were deleted successfully!` });
  });
};

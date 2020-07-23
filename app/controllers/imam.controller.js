const Imam = require("../models/imam.model.js");

// Create and Save a new Imam
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Imam
  const imam = new Imam({
    nom: req.body.nom,
    prenom: req.body.prenom,
    telephone: req.body.telephone,
    cni:req.body.cni,
    region:req.body.region,
    departement:req.body.departement,
    commune:req.body.commune,
    quartier:req.body.quartier,
    nom_mosquee:req.body.nom_mosquee
  });

  // Save Imam in the database
  Imam.create(imam, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Imam."
      });
    else res.send(data);
  });
};

// Retrieve all Imams from the database.
exports.findAll = (req, res) => {
  Imam.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving imams."
      });
    else res.send(data);
  });
};

// Find a single Imam with a imamId
exports.findOne = (req, res) => {
  Imam.findById(req.params.imamId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Imam with id ${req.params.imamId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Imam with id " + req.params.imamId
        });
      }
    } else res.send(data);
  });
};

// Update a Imam identified by the imamId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Imam.updateById(
    req.params.imamId,
    new Imam(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Imam with id ${req.params.imamId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Imam with id " + req.params.imamId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Imam with the specified imamId in the request
exports.delete = (req, res) => {
  Imam.remove(req.params.imamId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Imam with id ${req.params.imamId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Imam with id " + req.params.imamId
        });
      }
    } else res.send({ message: `Imam was deleted successfully!` });
  });
};

// Delete all Imams from the database.
exports.deleteAll = (req, res) => {
  Imam.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all imams."
      });
    else res.send({ message: `All Imams were deleted successfully!` });
  });
};

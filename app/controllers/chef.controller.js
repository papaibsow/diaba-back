const Chef = require("../models/chef.model.js");

// Create and Save a new Chef
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Chef
  const chef = new Chef({
    nom: req.body.nom,
    prenom: req.body.prenom,
    telephone: req.body.telephone,
    cni:req.body.cni,
    region:req.body.region,
    departement:req.body.departement,
    commune:req.body.commune,
    quartier:req.body.quartier
  });

  // Save Chef in the database
  Chef.create(chef, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Chef."
      });
    else res.send(data);
  });
};

// Retrieve all Chefs from the database.
exports.findAll = (req, res) => {
  Chef.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving chefs."
      });
    else res.send(data);
  });
};

// Find a single Chef with a chefId
exports.findOne = (req, res) => {
  Chef.findById(req.params.chefId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Chef with id ${req.params.chefId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Chef with id " + req.params.chefId
        });
      }
    } else res.send(data);
  });
};

// Update a Chef identified by the chefId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Chef.updateById(
    req.params.chefId,
    new Chef(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Chef with id ${req.params.chefId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Chef with id " + req.params.chefId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Chef with the specified chefId in the request
exports.delete = (req, res) => {
  Chef.remove(req.params.chefId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Chef with id ${req.params.chefId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Chef with id " + req.params.chefId
        });
      }
    } else res.send({ message: `Chef was deleted successfully!` });
  });
};

// Delete all Chefs from the database.
exports.deleteAll = (req, res) => {
  Chef.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all chefs."
      });
    else res.send({ message: `All Chefs were deleted successfully!` });
  });
};

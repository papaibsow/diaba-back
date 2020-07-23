module.exports = app => {
    const familles = require("../controllers/famille.controller.js");
  
    // Create a new Famille
    app.post("/familles", familles.create);
  
    // Retrieve all Familles
    app.get("/familles", familles.findAll);
  
    // Retrieve a single Famille with familleId
    app.get("/familles/:familleId", familles.findOne);
  
    // Update a Famille with familleId
    app.put("/familles/:familleId", familles.update);
  
    // Delete a Famille with familleId
    app.delete("/familles/:familleId", familles.delete);
  
    // Create a new Famille
    app.delete("/familles", familles.deleteAll);
  };
  
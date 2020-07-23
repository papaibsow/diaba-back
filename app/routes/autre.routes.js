module.exports = app => {
    const autres = require("../controllers/autre.controller.js");
  
    // Create a new Autre
    app.post("/autres", autres.create);
  
    // Retrieve all Autres
    app.get("/autres", autres.findAll);
  
    // Retrieve a single Autre with autreId
    app.get("/autres/:autreId", autres.findOne);
  
    // Update a Autre with autreId
    app.put("/autres/:autreId", autres.update);
  
    // Delete a Autre with autreId
    app.delete("/autres/:autreId", autres.delete);
  
    // Create a new Autre
    app.delete("/autres", autres.deleteAll);
  };
  
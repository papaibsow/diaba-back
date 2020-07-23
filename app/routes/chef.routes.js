module.exports = app => {
    const chefs = require("../controllers/chef.controller.js");
  
    // Create a new Chef
    app.post("/chefs", chefs.create);
  
    // Retrieve all Chefs
    app.get("/chefs", chefs.findAll);
  
    // Retrieve a single Chef with chefId
    app.get("/chefs/:chefId", chefs.findOne);
  
    // Update a Chef with chefId
    app.put("/chefs/:chefId", chefs.update);
  
    // Delete a Chef with chefId
    app.delete("/chefs/:chefId", chefs.delete);
  
    // Create a new Chef
    app.delete("/chefs", chefs.deleteAll);
  };
  
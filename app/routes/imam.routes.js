module.exports = app => {
  const imams = require("../controllers/imam.controller.js");

  // Create a new Imam
  app.post("/imams", imams.create);

  // Retrieve all Imams
  app.get("/imams", imams.findAll);

  // Retrieve a single Imam with imamId
  app.get("/imams/:imamId", imams.findOne);

  // Update a Imam with imamId
  app.put("/imams/:imamId", imams.update);

  // Delete a Imam with imamId
  app.delete("/imams/:imamId", imams.delete);

  // Create a new Imam
  app.delete("/imams", imams.deleteAll);
};

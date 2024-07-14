module.exports = app => {
    const assigments = require("../controllers/assigment.controller.js");

    var router = require("express").Router();

    // Create a new Assigment
    router.post("/", assigments.create);

    // Retrieve all Assigments
    router.get("/", assigments.findAll);

    // Retrieve a single Assigment with id
    router.get("/:id", assigments.findOne);

    // Update an Assigment with id
    router.put("/:id", assigments.update);

    // Delete an Assigment with id
    router.delete("/:id", assigments.delete);

    // Delete all Assigments
    router.delete("/", assigments.deleteAll);

    app.use('/api/assigments', router);
};

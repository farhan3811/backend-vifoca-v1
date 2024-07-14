module.exports = app => {
    const materis = require("../controllers/materi.controller.js");

    var router = require("express").Router();

    // Create a new Materi
    router.post("/", materis.create);

    // Retrieve all Materis
    router.get("/", materis.findAll);

    // Retrieve a single Materi with id
    router.get("/:id", materis.findOne);

    // Update a Materi with id
    router.put("/:id", materis.update);

    // Delete a Materi with id
    router.delete("/:id", materis.delete);

    // Delete all Materis
    router.delete("/", materis.deleteAll);

    app.use('/api/materis', router);
};

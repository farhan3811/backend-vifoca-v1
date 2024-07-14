module.exports = app => {
    const penilaians = require("../controllers/penilaian.controller.js");

    var router = require("express").Router();

    // Create a new Penilaian
    router.post("/", penilaians.create);

    // Retrieve all Penilaians
    router.get("/", penilaians.findAll);

    // Retrieve a single Penilaian with id
    router.get("/:id", penilaians.findOne);

    // Update a Penilaian with id
    router.put("/:id", penilaians.update);

    // Delete a Penilaian with id
    router.delete("/:id", penilaians.delete);

    // Delete all Penilaians
    router.delete("/", penilaians.deleteAll);

    app.use('/api/penilaians', router);
};

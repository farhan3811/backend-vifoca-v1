module.exports = app => {
    const assigments = require("../controllers/assigment.controller.js");
    const upload = require("../middlewares/upload"); // Import the upload middleware

    var router = require("express").Router();

    // Create a new Materi with file upload
    router.post("/", upload.single('foto_tugas'), assigments.create);

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

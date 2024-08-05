module.exports = app => {
    const materis = require("../controllers/materi.controller.js");
    const upload = require("../middlewares/upload"); // Import the upload middleware

    var router = require("express").Router();

    // Create a new Materi with file upload
    router.post("/", upload.single('img_materi'), materis.create);

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

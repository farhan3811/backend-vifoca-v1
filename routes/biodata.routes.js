module.exports = app => {
    var router = require("express").Router();
const biodata = require("../controllers/biodata.controller");

// Create a new Biodata
router.post("/", biodata.create);

// Retrieve all Biodata
router.get("/", biodata.findAll);

// Retrieve a single Biodata with id
router.get("/:id", biodata.findOne);

// Update a Biodata with id
router.put("/:id", biodata.update);

// Delete a Biodata with id
router.delete("/:id", biodata.delete);

// Delete all Biodata
router.delete("/", biodata.deleteAll);

app.use('/api/biodata', router);
};

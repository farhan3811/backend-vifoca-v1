const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");

// Menggunakan Sequelize untuk sinkronisasi dengan database
db.sequelize.sync();

// Konfigurasi CORS
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

// Middleware untuk parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route sambutan
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Vifoca" });
});

require("./routes/biodata.routes")(app);
require("./routes/user.routes")(app);

// Port server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

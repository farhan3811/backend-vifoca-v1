const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models"); db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => { console.log("Drop and re-sync db.");
// });

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Vifocqa" });
});

require("./routes/tutorial.routes")(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

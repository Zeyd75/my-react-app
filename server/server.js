const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
let corOptions = {
  origin: "https://localhost:8081",
};
require("dotenv").config({ path: "./config/.env" });
db.sequelize.sync();

const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const { sequelize, Sequelize } = require("./models");

//Middlewares
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Testing API
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My-React-App" });
});

require("./routes/product.routes");
//Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

//routers
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);

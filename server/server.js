const express = require("express");
const cors = require("cors");
// const mysql = require("mysql");
require("dotenv").config({ path: "./config/.env" });

const app = express();

const productRoutes = require("./routes/productRouter");
const userRoutes = require("./routes/userRouter");

let corOptions = {
  origin: "https://localhost:8081",
};

//Middlewares
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);

//Testing API
app.get("/", (req, res) => {
  res.json({ message: "wesh api" });
});

//Port
//const PORT = process.env.PORT || 8080;

//Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

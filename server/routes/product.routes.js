const products = require("../controllers/product.controller");
const router = require("express").Router();
const auth = require("../middleware/auth");

//Create a new product
router.post("/", auth.userAuth, products.create);
//Retrieve all products
router.get("/", auth.userAuth, products.findAll);
//Retrieve all published products
router.get("/published", auth.userAuth, products.findAllPublished);
//Retrieve a single product with id
router.get("/:id", auth.userAuth, products.findOne);
//Update a product with id
router.put("/:id", auth.userAuth, products.update);
//Delete a product with id
router.delete("/:id", auth.userAuth, products.delete);
//Delete all products
router.delete("/", auth.userAuth, products.deleteAll);

module.exports = router;

const { products } = require("../models");
const db = require("../models");

//Create main model
const Product = db.products;
const Op = db.Sequelize.Op;

//Create and save a new product
exports.create = (req, res) => {
  //Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
    return;
  }
  //Create a product
  const product = {
    title: req.body.title,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };
  //Save product in database
  Product.create(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the product",
      });
    });
};

//Retrieve all products from database
exports.findAll = (req, res) => {
  const title = req.body.title;
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null; //Comprendre cette syntaxe
  Product.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving products",
      });
    });
};

//Retrieve a single product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Product.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Can not find product with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving product with id" + id,
      });
    });
};

//Update a product by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Product.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully!",
        });
      } else {
        res.send({
          message: `Can not update product with id=${id}. Maybe product was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating product with id" + id,
      });
    });
};

//Delete a product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Product.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!",
        });
      } else {
        res.send({
          message: `Can not delete product with id=${id}. Maybe product was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete product with id=" + id,
      });
    });
};

//Delete all products from database
exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false, //Regarder ce que veut dire truncate
  })
    .then((nums) => {
      res.send({ message: `${nums} products were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products",
      });
    });
};

//Retrieve all published products
exports.findAllPublished = (req, res) => {
  Product.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving products",
      });
    });
};

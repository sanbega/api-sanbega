const express = require ("express")
const Database = require ("../../database")
const router = express.Router()
//  *************** ADMIN PRODUCTS  *************** //
// Get all products
router.get("/admin/products", validateUser, validateUserAdmin, (req, res) => {
    const products = DATABASE.products || [];
  
    res.json({
      message: "Estos son todos los productos ",
      data: products,
    });
  });
  
  // Create product
  router.post("/admin/products", validateUser, validateUserAdmin, (req, res) => {
    const { name, price } = req.body;
  
    if (!name) {
      return res.status(400).json({
        message: "Debes asignar un nombre al producto",
      });
    }
  
    if (!price) {
      return res.status(400).json({
        message: "Debes asignar un precio a el producto",
      });
    }
  
    if (isNaN(Number(price))) {
      return res.status(400).json({
        message: "Precio debe ser un numero",
      });
    }
  
    const id = DATABASE.products[DATABASE.products.length - 1]?.id || 0;
  
    const product = {
      name,
      price,
      id: id + 1,
    };
  
    DATABASE.products.push(product);
  
    res.status(201).json({
      message: "Producto disponible",
      data: product,
    });
  });
  
  // Edit product
  router.patch(
    "/admin/products/:id",
    validateUser,
    validateUserAdmin,
    findProductById,
    (req, res) => {
      const { name, price } = req.body;
  
      const id = req.params.id;
  
      const product = req.product;
  
      if (price && isNaN(Number(price))) {
        return res.status(400).json({
          message: "Precio debe ser un numero",
        });
      }
  
      const editedProduct = {
        ...product,
        name: name || product.name,
        price: price || product.price,
      };
  
      DATABASE.products = DATABASE.products.map((product) => {
        if (product.id === Number(id)) {
          return editedProduct;
        }
  
        return product;
      });
  
      res.status(201).json({
        message: "Producto editado correctamente",
        data: editedProduct,
      });
    }
  );
  
  // Delete product
  router.delete(
    "/admin/products/:id",
    validateUser,
    validateUserAdmin,
    findProductById,
    (req, res) => {
      const product = req.product;
  
      const id = req.params.id;
  
      DATABASE.products = DATABASE.products.filter(
        (product) => product.id !== Number(id)
      );
  
      return res.json({
        message: "Producto eliminado",
        data: product,
      });
    }
  );
  

  module.exports = router
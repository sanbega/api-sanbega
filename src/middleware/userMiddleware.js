const express = require ("express")
const Database = require ("../../src/database")
const router = express.Router()
//  -------------------------  MIDDLEWARE  ------------------------- //

function validateUser(req, res, next) {
    const authorization = req.headers.authorization;
  
    if (!authorization) {
      return res.status(400).json({
        message: "Usuario no identificado",
      });
    }
  
    const token = `${authorization}`.split("Bearer ").pop();
  
    if (!token) {
      return res.status(400).json({
        message: "Usuario no identificado",
      });
    }
  
    const email = DATABASE.tokens[token];
  
    if (!email) {
      return res.status(400).json({
        message: "Usuario no identificado",
      });
    }
  
    const user = DATABASE.users.find((user) => user.email === email);
  
    if (!user) {
      return res.status(400).json({
        message: "Usuario no identificado",
      });
    }
  
    req.user = user;
  
    next();
  }
  
  function validateUserAdmin(req, res, next) {
    if (!req.user.admin) {
      return res.status(400).json({
        message: "Usuario no administrador",
      });
    }
  
    next();
  }
  
  function findProductById(req, res, next) {
    const id = req.params.id;
  
    const product = DATABASE.products.find(
      (product) => product.id === Number(id)
    );
  
    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }
  
    req.product = product;
  
    next();
  }

module.exports = router




const express = require ("express")
const Database = require ("../../database")
const router = express.Router()

// Login
router.post("/sign-in", (req, res) => {
    const { email, password } = req.body;
  
    if (!email) {
      return res.status(400).json({
        message: "Debes enviar un email",
      });
    }
  
    if (!password) {
      return res.status(400).json({
        message: "Debes enviar una contrasena",
      });
    }
  
    if (!validator.validate(email)) {
      return res.status(400).json({
        message: "No es un correo valido",
      });
    }
  
    const user = DATABASE.users.find((user) => {
      return user.email === email;
    });
  
    if (!user) {
      return res.status(400).json({
        message: "No se encontro el usaurio con email " + email,
      });
    }
  
    if (user.password !== password) {
      return res.status(400).json({
        message: "Contrasena incorrecta",
      });
    }
  
    const token = Math.random().toString();
  
    DATABASE.tokens = {
      ...DATABASE.tokens,
      [token]: user.email,
    };
  
    return res.json({
      message: "Usuario logueado correctamente",
      token,
    });
  });
  

  module.exports = router
const express = require ("express")
const Database = require ("../../database")
const router = express.Router()
// Register
router.post("/sing-up", (req, res) => {
    const { email, password, name } = req.body;
  
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
  
    if (!name) {
      return res.status(400).json({
        message: "Debes enviar un nombre",
      });
    }
  
    if (`${password}`.length < 5) {
      return res.status(400).json({
        message: "La contrasena es muy corta",
      });
    }
  
    if (!validator.validate(email)) {
      return res.status(400).json({
        message: "No es un correo valido",
      });
    }
  
    if (DATABASE.users.find((user) => user.email === email)) {
      return res.status(400).json({
        message: "Usuario ya registrado",
      });
    }
  
    const user = {
      email,
      password,
      name,
      admin: false,
    };
  
    DATABASE.users.push(user);
  
    res.status(201).json({
      message: "Usuario creado",
      data: user,
    });
  });
  

module.exports = router
const express = require ("express")
const Database = require ("../../database")
const router = express.Router()

//  *************** ADMIN ORDERS  *************** //
// Get Order
router.get("/admin/orders", validateUser, validateUserAdmin, (req, res) => {
    const orders = DATABASE.orders || [];
  
    res.json({
      message: "Todas las ordenes",
      data: orders,
    });
  });
  
  // Change order status
  router.patch("/admin/orders/:id", validateUser, validateUserAdmin, (req, res) => {
    const id = req.params.id;
  
    const status = req.body.status;
  
    const order = DATABASE.orders.find((order) => order.id === Number(id));
  
    if (!order) {
      res.status(404).json({
        message: "orden no encontrada",
      });
    }
  
    DATABASE.orders = DATABASE.orders.map((order) => {
      if (order.id === Number(id)) {
        return {
          ...order,
          status,
        };
      }
  
      return order;
    });
  
    res.json({
      message: "Orden editada",
      data: {
        ...order,
        status,
      },
    });
  });
  

  module.exports = router
const express = require ("express")
const Database = require ("../../database")
const router = express.Router()
//  *************** USER ORDERS  *************** //
// Orders by user
router.get("/orders", validateUser, (req, res) => {
    const orders =
      DATABASE.orders.filter((order) => {
        return order.user.email === req.user.email;
      }) || [];
  
    res.json({
      message: "Listado de ordenes por usuario",
      data: orders,
    });
  });
  
  // Create order
  router.post("/orders", validateUser, (req, res) => {
    const { cart, paymentMethodId } = req.body;
  
    if (!cart) {
      return res.status(400).json({
        message: "Debes enviar los productos a comprar",
      });
    }
  
    if (!Array.isArray(cart)) {
      return res.status(400).json({
        message: "Debes enviar los productos correctamente",
      });
    }
  
    if (!cart.length) {
      return res.status(400).json({
        message: "Debes enviar al menos un producto",
      });
    }
  
    if (!paymentMethodId) {
      return res.status(400).json({
        message: "Debes escoger un metodo de pago",
      });
    }
  
    const paymentMethod = DATABASE.methods.find(
      (method) => method.id === Number(paymentMethodId)
    );
  
    if (!paymentMethod) {
      return res.status(404).json({
        message: "Metodo de pago no encontrado",
      });
    }
  
    const products = DATABASE.products.reduce((allProducts, product) => {
      const productFound = cart.find(
        (cartProduct) => Number(cartProduct.id) === product.id
      );
  
      if (productFound) {
        allProducts.push({
          ...product,
          quantity: productFound.quantity,
        });
      }
  
      return allProducts;
    }, []);
  
    const id = DATABASE.orders[DATABASE.orders.length - 1]?.id || 0;
  
    const value = products.reduce((total, product) => {
      return total + (product.price * Math.abs(Number(product.quantity)) || 0);
    }, 0);
  
    const order = {
      id: id + 1,
      value,
      createdAt: new Date(),
      status: "CREADA",
      user: req.user,
      products,
      paymentMethod,
    };
  
    DATABASE.orders.push(order);
  
    res.json({
      message: "Order creada correctamente",
      data: order,
    });
  });
  
  // Edit order
  router.post("/orders/:id", validateUser, (req, res) => {
    const { cart, paymentMethodId } = req.body;
  
    const id = req.params.id;
  
    const order = DATABASE.orders.find((order) => order.id === Number(id));
  
    if (!order) {
      return res.status(404).json({
        message: "Order no encontrada",
      });
    }
  
    if (order.status === "CERRADA") {
      return res.status(404).json({
        message: "Ya no puedes editar la orden, esta cerrada",
      });
    }
  
    if (order.user.email !== req.user.email) {
      return res.status(401).json({
        message: "No eres el due;o de la orden",
      });
    }
  
    if (!cart) {
      return res.status(400).json({
        message: "Debes enviar los productos a comprar",
      });
    }
  
    if (!Array.isArray(cart)) {
      return res.status(400).json({
        message: "Debes enviar los productos correctamente",
      });
    }
  
    if (!cart.length) {
      return res.status(400).json({
        message: "Debes enviar al menos un producto",
      });
    }
  
    if (!paymentMethodId) {
      return res.status(400).json({
        message: "Debes escoger un metodo de pago",
      });
    }
  
    const paymentMethod = DATABASE.methods.find(
      (method) => method.id === Number(paymentMethodId)
    );
  
    if (!paymentMethod) {
      return res.status(404).json({
        message: "Metodo de pago no encontrado",
      });
    }
  
    const products = DATABASE.products.reduce((allProducts, product) => {
      const productFound = cart.find(
        (cartProduct) => Number(cartProduct.id) === product.id
      );
  
      if (productFound) {
        allProducts.push({
          ...product,
          quantity: productFound.quantity,
        });
      }
  
      return allProducts;
    }, []);
  
    const value = products.reduce((total, product) => {
      return total + (product.price * Math.abs(Number(product.quantity)) || 0);
    }, 0);
  
    const editedOrder = {
      ...order,
      value,
      products,
      paymentMethod,
    };
  
    DATABASE.orders = DATABASE.orders.map((order) => {
      if (order.id === Number(id)) {
        return editedOrder;
      }
  
      return order;
    });
  
    res.json({
      message: "Order editada correctamente",
      data: editedOrder,
    });	
  });
  

  module.exports = router
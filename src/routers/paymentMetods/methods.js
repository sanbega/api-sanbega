//  *************** PAYMENT METHODS  *************** //

// Get all payments mehtods
app.get("/admin/methods", validateUser, validateUserAdmin, (req, res) => {
    const methods = DATABASE.methods || [];
  
    res.json({
      message: "Estos son todos los methods ",
      data: methods,
    });
  });
  // Create product
  app.post("/admin/methods", validateUser, validateUserAdmin, (req, res) => {
    const { name, id } = req.body;
  
    const product = {
      name,
      id ,
    };
  
    if (!name) {
      return res.status(400).json({
        message: "Debes asignar el nombre del metodo de pago",
      });
    }
  
    if (!id) {
      return res.status(400).json({
        message: "Debes escojer el id del metodo de pago",
      });
    }
  
    if (isNaN(Number(id))) {
      return res.status(400).json({
        message: "Precio debe ser un numero",
      });
    }
  })
  
  
    
  
  // Delete payment method
  app.delete("/admin/methods/:id",validateUser,  validateUserAdmin,
    (req, res) => {
      const methods = req.product;
  
      const id = req.params.id;
  
      DATABASE.methods = DATABASE.methods.filter(
        (methods) => methods.id !== Number(id)
      );
  
      return res.json({
        message: "Producto eliminado",
        data: product,
      });
    }
  );
  
  // Edit payment method
  app.patch("/admin/methods/:id",validateUser,  validateUserAdmin,(req, res) => {
    const { name, id } = req.body;
  
    const ib = req.methods.id;
  
    const methods = req.methods;
  
    if (price && isNaN(Number(price))) {
      return res.status(400).json({
        message: "Precio debe ser un numero",
      });
    }
  
    const editedMethods = {
      ...methods,
      name: name || methods.name,
      id: id || methods.id,
    };
  
    DATABASE.methods = DATABASE.methods.map((methods) => {
      if (methods.id === Number(id)) {
        return editedMethods;
      }
  
      return methods;
    });
  
    res.status(201).json({
      message: "Producto editado correctamente",
      data: editedMethods,
    });
  }
  );
  
  
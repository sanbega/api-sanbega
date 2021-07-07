
//  -------------------------  DATABASE  ------------------------- //

const DATABASE = {
    products: [
      {
        id: 1,
        name: "Arroz",
        price: 1000,
      },
    ],
    users: [
      {
        email: "sanbega@gmail.com",
        password: "1234567",
        name: "sanbega",
        admin: true,
      },
    ],
    tokens: {
      [(0.2899243543452106).toString()]: "sanbega@gmail.com",
    },
    methods: [
      {
        id: 1,
        name: "Pago en efectivo",
        description: "Debes pagar cuando se te entregue la orden",
      },
    ],
    orders: [
      {
        id: 1,
        value: 1000,
        createdAt: new Date(),
        status: "CREADA",
        user: {
          email: "johins@gmail.com",
          password: "1234567",
          name: "Johan",
          admin: true,
        },
        paymentMethod: {
          id: 1,
          name: "Pago en efectivo",
          description: "Debes pagar cuando se te entregue la orden",
        },
        products: [
          {
            id: 1,
            name: "Arroz",
            price: 1000,
          },
        ],
      },
    ],
  };
  
function findAll(){
  return DATABASE.users
  
}

function createNewUser (user) {
  users.push(user)
}

module.exports = {findAll, createNewUser}
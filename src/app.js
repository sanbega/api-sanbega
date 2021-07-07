
const express = require("express");
const app = express();
const userRoutes = require("./routers/authenticationUser/user.login")

const userMiddleware = require ("./middleware/userMiddleware")
 
const PORT = 3000;

app.use("/user",userRoutes)

app.listen(PORT, () => {
    console.log("API REST Acamica corriendo http://localhost:" + PORT);
});
const { Router } = require("express");
const { createUser, getAllUser } = require("../controllers/userController");

const route = Router();

route.post('',createUser);
route.get('',getAllUser);

module.exports = route;
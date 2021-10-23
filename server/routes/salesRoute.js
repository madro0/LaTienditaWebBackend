const { Router } = require("express");
const { createSale } = require("../controllers/salesController");

const route = Router();

route.post('',createSale);

module.exports = route;
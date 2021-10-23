const { Router } = require('express');
const auth = require('./authRoute');
const product = require('./productRoute');
const provider = require('./providerRoute');
const user = require('./userRote');
const sales = require('./salesRoute');

const router = Router();

router.use('/user',user);
router.use('/login',auth);
router.use('/product',product);
router.use('/provider',provider);
router.use('/sale',sales);

module.exports = router;
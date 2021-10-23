const { Router } = require('express');
const auth = require('./authRoute');
const product = require('./productRoute');
const provider = require('./providerRoute');
const user = require('./userRote');

const router = Router();

router.use('/user',user);
router.use('/login',auth);
router.use('/product',product);
router.use('/provider',provider);

module.exports = router;
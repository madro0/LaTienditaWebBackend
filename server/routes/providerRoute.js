const { Router } = require('express');
const { createProvider, getAllProviders } = require('../controllers/providerController');

const router = Router();

router.post('',createProvider);
router.get('',getAllProviders);

module.exports= router;

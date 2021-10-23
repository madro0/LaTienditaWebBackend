const { Router } = require('express');
const { createProduct, 
        getAllProducts, 
        getProductById, 
        searchProduct,
        updateProduct,
        desactiveProduct 
} = require('../controllers/productController');

const router = Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/search/:search', searchProduct);
router.put('/:idProduct', updateProduct);
router.delete('/:idProduct', desactiveProduct);

module.exports= router;

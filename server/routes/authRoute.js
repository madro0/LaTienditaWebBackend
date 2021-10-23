const { Router } = require('express');
const { loginUser, revalidateToken, loginGoogle } = require('../controllers/loginController');
const { verifyToken } = require('../middlewares/auth');

const router = Router();

router.post('', loginUser);
router.post('/google',loginGoogle);
router.get('/renew',verifyToken, revalidateToken);

module.exports = router;


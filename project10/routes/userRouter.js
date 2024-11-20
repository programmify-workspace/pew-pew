const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureGuest } = require('../middleware/guest');
const { protect } = require('../middleware/auth');
const upload = require('../config/multerConfig');

router.get('/login', ensureGuest, userController.getLogin);
 
router.get('/register', ensureGuest, userController.getRegister);

router.post('/login', ensureGuest, userController.postLogin);
router.post('/register', ensureGuest, userController.postRegister);

router.get('/current', userController.getCurrentUser);
router.get('/profile', protect, userController.getProfile);

router.get('/edit-profile', protect, userController.getEditProfile);
router.post('/edit-profile', protect, upload.single('avatar'), userController.postEditProfile);

module.exports = router;
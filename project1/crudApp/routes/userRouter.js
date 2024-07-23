const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);

router.get('/register', (req, res) => {
    res.render("form");
})

router.post('/register', userController.addUsers);

router.post('/update', userController.editUser);

router.post('/delete', userController.deleteUser);



module.exports = router;

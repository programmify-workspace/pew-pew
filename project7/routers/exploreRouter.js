const express = require('express');
const exploreController = require('../controllers/exploreController');
const exploreRouter = express.Router();

exploreRouter.get('/', (req, res) => {
    res.redirect('/explore');
})

exploreRouter.get('/explore', exploreController.getProducts);

module.exports = exploreRouter;
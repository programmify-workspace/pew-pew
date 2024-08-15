const express = require('express'),
      router = express.Router()
const { getProjects } = require('../Controllers/project.controller');

router.get('/projects', getProjects);

module.exports = router;

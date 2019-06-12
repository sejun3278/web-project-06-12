const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/get/data', controller.get.data);

module.exports = router;
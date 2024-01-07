const express = require('express');
const router = express.Router();
const siteController = require('../controller/siteController')

router.post('/create-room', siteController.createRoom)
router.get('/', siteController.home)

module.exports = router
const express = require('express');
const router = express.Router();
const siteController = require('../controller/siteController')

router.get('/create-room', siteController.getCreateRoom)
router.post('/create-room', siteController.createRoom)
router.get('/', siteController.home)

module.exports = router
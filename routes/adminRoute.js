const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController')

router.get('/rooms', adminController.getAllRoom)
router.get('/:id/member', adminController.getMemberRoom)

module.exports = router;
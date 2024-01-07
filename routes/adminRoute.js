const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController')

router.get('/admin/dashboard', adminController.getDashboard)
router.get('/rooms', adminController.getAllRoom)
router.get('/:id/member', adminController.getMemberRoom)
router.get('/room/:id', adminController.getDetailRoom)

module.exports = router;
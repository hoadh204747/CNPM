const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

router.get('/info', userController.getInfo)
router.get('/dashboard', userController.getDashboard)
router.get('/add-member', userController.getAddMember)
router.post('/add-member', userController.addMember);
router.post('/delete-member', userController.deleteMember)
router.get('/info-room', userController.getInfoRoom)

module.exports = router;
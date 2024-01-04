const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

router.post('/add-member', userController.addMember);
router.post('/delete-member', userController.deleteMember)
router.get('/members', userController.getListMember)

module.exports = router;
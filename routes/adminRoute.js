const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController')

router.get('/admin/dashboard', adminController.getDashboard)
router.get('/rooms', adminController.getAllRoom)
router.get('/:id/member', adminController.getMemberRoom)
router.get('/room/:id', adminController.getDetailRoom)

router.get('/post-news', adminController.getNews)
router.post('/post-news', adminController.postNews)
router.get('/list-news', adminController.getListNews)
router.get('/edit-news/:id', adminController.getUpdateNews)
router.post('/edit-news/:id', adminController.updateNews)
router.post('/admin/list-news/:id', adminController.deteleNews)


module.exports = router;
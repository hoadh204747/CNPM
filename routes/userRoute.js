const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.get("/info", userController.getInfo);
router.post('/info', userController.editInfo)
router.get("/dashboard", userController.getDashboard);
router.get("/add-member", userController.getAddMember);
router.post("/add-member", userController.addMember);
router.post("/delete-member", userController.deleteMember);
router.get("/info-room", userController.getInfoRoom);
// tra cuu route
router.get("/noi-quy", userController.getNoiQuy);
router.get("/quy-dinh", userController.getQuyDinh);
router.get("/hotline", userController.getHotline);

//book service
router.get('/service', userController.getService)
router.post('/service', userController.bookService)
router.get('/history', userController.historyService)

module.exports = router;

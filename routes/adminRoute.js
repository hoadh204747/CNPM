const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const { route } = require("./authRoute");

router.get("/admin/dashboard", adminController.getDashboard);
router.get("/rooms", adminController.getAllRoom);
router.get("/:id/member", adminController.getMemberRoom);
router.get("/room/:id", adminController.getDetailRoom);

router.get("/post-news", adminController.getNews);
router.post("/post-news", adminController.postNews);
router.get("/list-news", adminController.getListNews);
router.get("/edit-news/:id", adminController.getUpdateNews);
router.post("/edit-news/:id", adminController.updateNews);
router.post("/admin/list-news/:id", adminController.deteleNews);

router.get("/post-noiquy", adminController.getNoiQuy);
router.post("/post-noiquy", adminController.postNoiQuy);
router.get("/list-noiquy", adminController.getListNoiQuy);
router.get("/edit-noiquy/:id", adminController.getUpdateNoiQuy);
router.post("/edit-noiquy/:id", adminController.updateNoiQuy);
router.post("/admin/list-noiquy/:id", adminController.deteleNoiQuy);

router.get("/post-quydinh", adminController.getQuyDinh);
router.post("/post-quydinh", adminController.postQuyDinh);
router.get("/list-quydinh", adminController.getListQuyDinh);
router.get("/edit-quydinh/:id", adminController.getUpdateQuyDinh);
router.post("/edit-quydinh/:id", adminController.updateQuyDinh);
router.post("/admin/list-quydinh/:id", adminController.deteleQuyDinh);

module.exports = router;

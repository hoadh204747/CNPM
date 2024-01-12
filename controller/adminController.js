const Room = require("../model/roomModel");
const User = require("../model/userModel");
const News = require("../model/newsModel");
const noiquy = require("../model/noiquy");
const quydinh = require("../model/quydinh");
const Service = require('../model/serviceModel')

class AdminController {
  async getDashboard(req, res) {
    res.render("admin/dashboard");
  }

  async getAllRoom(req, res) {
    const rooms = await Room.find();
    res.render("admin/list_room", { rooms });
  }
  async getMemberRoom(req, res) {
    const idRoom = req.params.id;
    const room = await Room.findById(idRoom);
    console.log(room.member);
  }

  async getDetailRoom(req, res) {
    const user = await User.findOne({ id_phong: req.params.id });
    const room = await Room.findOne({ _id: req.params.id });
    res.render("admin/detail_room", { room, user });
  }

  async getNews(req, res) {
    res.render("admin/create_post");
  }
  async postNews(req, res) {
    const { title, content } = req.body;
    const news = await News.create({ title: title, content: content });
    res.json(news);
  }

  async getListNews(req, res) {
    const news = await News.find().sort({ date_created: -1 }).lean();
    res.render("admin/list_post", { news });
  }

  async getUpdateNews(req, res) {
    const news = await News.findOne({ _id: req.params.id });
    res.render("admin/edit_post", { news });
  }
  async updateNews(req, res) {
    const news = await News.updateOne({ _id: req.params.id }, req.body);
    res.redirect("/list-news");
  }

  async deteleNews(req, res) {
    await News.deleteOne({ _id: req.params.id });
    res.redirect("/list-news");
  }
  // noi quy
  async getNoiQuy(req, res) {
    res.render("admin/noiquy_add");
  }

  async postNoiQuy(req, res) {
    const { title, content } = req.body;
    const noiQuy = await noiquy.create({ title: title, content: content });
    res.redirect("/list-noiquy");
  }
  async getListNoiQuy(req, res) {
    try {
      const noiQuyList = await noiquy.find().sort({ _id: -1 }).lean();
      res.render("admin/list_noiquy", { noiQuyList: noiQuyList });
    } catch (error) {
      console.error(error);
      res.status(500).send("No Data Found");
    }
  }
  async getUpdateNoiQuy(req, res) {
    const noiQuy = await noiquy.findOne({ _id: req.params.id });
    res.render("admin/edit_noiquy", { noiQuy: noiQuy });
  }
  async updateNoiQuy(req, res) {
    const noiQuy = await noiquy.updateOne({ _id: req.params.id }, req.body);
    res.redirect("/list-noiquy");
  }
  async deteleNoiQuy(req, res) {
    await noiquy.deleteOne({ _id: req.params.id });
    res.redirect("/list-noiquy");
  }

  // quy dinh
  async getQuyDinh(req, res) {
    res.render("admin/quy_dinh_add");
  }
  async postQuyDinh(req, res) {
    const { title, content } = req.body;
    const quyDinh = await quydinh.create({ title: title, content: content });
    res.redirect("/list-quydinh");
  }
  async getListQuyDinh(req, res) {
    try {
      const quyDinhList = await quydinh.find().sort({ _id: -1 }).lean();
      res.render("admin/list_quy_dinh", { quyDinhList: quyDinhList });
    } catch (error) {
      console.error(error);
      res.status(500).send("No Data Found");
    }
  }
  async getUpdateQuyDinh(req, res) {
    const quyDinh = await quydinh.findOne({ _id: req.params.id });
    res.render("admin/edit_quy_dinh", { quyDinh: quyDinh });
  }
  async updateQuyDinh(req, res) {
    const quyDinh = await quydinh.updateOne({ _id: req.params.id }, req.body);
    res.redirect("/list-quydinh");
  }
  async deteleQuyDinh(req, res) {
    await quydinh.deleteOne({ _id: req.params.id });
    res.redirect("/list-quydinh");
  }

  //Dich Vu
  async postService(req,res){
    const service =  await Service.create({
      name : req.body.name,
      end_time : req.body.end_time,
      start_time: req.body.start_time,
      flag : 0
    })
    res.status(200).json(service)
  }

  async getUsers(req,res){
    const users = await User.find({role:'member'}).populate('id_phong').exec()
    res.render('admin/list_user', {users})
  }

}

module.exports = new AdminController();

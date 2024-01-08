const Room = require("../model/roomModel");
const User = require("../model/userModel");
const noiQuy = require("../model/noiquy");
const quyDinh = require("../model/quydinh");
const Service = require('../model/serviceModel')

class UserController {
  async getDashboard(req, res) {
    res.render("site/dashboard");
  }

  async getAddMember(req, res) {
    res.render("site/add_member");
  }

  async addMember(req, res) {
    const { ho_ten, moi_quan_he, sdt } = req.body;
    // const room = await Room.findById(req.user.id_phong)
    // console.log(room)
    //     .then(() => {
    //         Room.updateOne(room._id, {$push: {member: [{user:{ho_ten:ho_ten, moi_quan_he:moi_quan_he}}]}})
    //         console.log(room)
    //     })
    const updateRoom = Room.updateOne(
      { _id: req.user.id_phong },
      { $push: { member: [{ user: { ho_ten, moi_quan_he, sdt } }] } }
    ).then(() => {
      return res.json(updateRoom);
    });
  }

  async deleteMember(req, res) {
    const idMember = req.body.idMember;
    const updateRoom = await Room.updateOne(
      { _id: req.user.id_phong },
      { $pull: { member: { _id: idMember } } }
    );
    res.redirect("back");
  }

  async getInfoRoom(req, res) {
    const user = await User.findById(req.user._id);
    const room = await Room.findById(req.user.id_phong);
    res.render("site/info_room", { user, room });
  }

  async getInfo(req, res) {
    const user = await User.findById(req.user._id);
    const room = await Room.findById(req.user.id_phong);
    res.render("site/info-owner", { user, room });
  }

  async getNoiQuy(req, res) {
    try {
      const listNoiQuy = await noiQuy.find().sort({ _id: -1 }).lean();
      res.render("site/noi_quy", { listNoiQuy: listNoiQuy });
    } catch (error) {
      res.status(500).send("Error getting noi quy");
    }
  }
  async getQuyDinh(req, res) {
    try {
      const listQuyDinh = await quyDinh.find().sort({ _id: -1 }).lean();
      res.render("site/quy_dinh", { listQuyDinh: listQuyDinh });
    } catch (error) {
      res.status(500).send("Error getting quy dinh");
    }
  }
  async getHotline(req, res) {
    res.render("site/hotline");
  }

  // Service
  async bookService(req,res){
    const idUser = req.user._id;
    const idService = req.body.idService;
    const service = await Service.findById(idService)
    console.log(service);
    
      const updateUser = await User.findByIdAndUpdate(
        idUser,
        { $set: {idService}},
        { new: true}
      )
      await Service.findByIdAndUpdate(
        idService,
        {flag: 1}
      )
      res.json(updateUser)
    }

    async getService(req,res){
      res.render('site/service')
    }
}

module.exports = new UserController();

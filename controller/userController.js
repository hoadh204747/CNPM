const Room = require("../model/roomModel");
const User = require("../model/userModel");
const noiQuy = require("../model/noiquy");
const quyDinh = require("../model/quydinh");

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
      const listNoiQuy = await noiQuy.find({});
      res.render("site/noi_quy", { listNoiQuy: listNoiQuy });
    } catch (error) {
      res.status(500).send("Error getting noi quy");
    }
  }
  async getQuyDinh(req, res) {
    try {
      const listQuyDinh = await quyDinh.find({});
      res.render("site/quy_dinh", { listQuyDinh: listQuyDinh });
    } catch (error) {
      res.status(500).send("Error getting quy dinh");
    }
  }
  async getHotline(req, res) {
    res.render("site/hotline");
  }
}

module.exports = new UserController();

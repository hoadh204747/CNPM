const Room = require("../model/roomModel");
const User = require("../model/userModel");
const noiQuy = require("../model/noiquy");
const quyDinh = require("../model/quydinh");
const Service = require('../model/serviceModel')

class UserController {

  async editInfo(req,res){
    const user = await User.updateOne({_id:req.user._id}, req.body);
    res.redirect('/info')
  }

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
      return res.redirect('/info-room');
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
//   async bookService(req,res){
//     const idUser = req.user._id;
//     const idService = req.body.idService;
//     const service = await Service.findById(idService)
//     await User.findById(idUser)
//       .then((user) => {
//         user.listService.forEach(s => {
//           if(s.idService == idService){
//             return res.json({message: 'Bạn đã đăng ký dịch vụ này rồi'})
//           }
//         })
//       })
      
//       await User.findByIdAndUpdate(
//         idUser,
//         {$push : {listService: [{idService: service._id}]}} ,
//         { new: true}
//       )
//       await Service.findByIdAndUpdate(
//         idService,
//         {flag: 1}
//       )
//       return res.redirect('back')
// }


async bookService(req, res) {
  try {
    const idUser = req.user._id;
    const idService = req.body.idService;

    // Kiểm tra xem người dùng đã đăng ký dịch vụ này trước đó chưa
    const user = await User.findById(idUser);
    const isServiceAlreadyBooked = user.listService.some(s => s.idService.equals(idService));

    if (isServiceAlreadyBooked) {
      return res.json({ message: 'Bạn đã đăng ký dịch vụ này rồi' });
    }

    // Lấy thông tin dịch vụ từ database
    const service = await Service.findById(idService);

    // Thêm dịch vụ vào danh sách của người dùng
    user.listService.push({ idService: service._id });
    await user.save();

    // Cập nhật trạng thái của dịch vụ
    await Service.findByIdAndUpdate(idService, { flag: 1 });

    // Chuyển hướng về trang trước đó
    return res.redirect('back');
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

    async getService(req,res){
      const services = await Service.find();
      res.render('site/service', {services})
    }

    async historyService(req,res){
      const services = await User.findById(req.user._id).populate('listService.idService').exec();
      console.log(services.listService)
      // services.forEach((s) => {
      //       console.log(s)
      //   })
      res.render('site/history_service', {services})
    }
}

module.exports = new UserController();

const Room = require('../model/roomModel')
const User = require('../model/userModel')

class AdminController{

    async getDashboard(req,res){
        res.render('admin/dashboard')
    }

    async getAllRoom(req,res){
        const rooms = await Room.find();
        res.render('admin/list_room', {rooms})
    }
    async getMemberRoom(req,res){
        const idRoom = req.params.id;
        const room = await Room.findById(idRoom);
        console.log(room.member);
    }

    async getDetailRoom(req,res){
        const user = await User.findOne({id_phong:req.params.id});
        const room = await Room.findOne({_id: req.params.id});
        res.render('admin/detail_room', {room, user})
    }
}

module.exports = new AdminController()
const Room = require('../model/roomModel')
const User = require('../model/userModel')

class AdminController{
    async getAllRoom(req,res){
        const rooms = await Room.find();
        res.json(rooms)
    }
    async getMemberRoom(req,res){
        const idRoom = req.params.id;
        const room = await Room.findById(idRoom);
    }
}

module.exports = new AdminController()
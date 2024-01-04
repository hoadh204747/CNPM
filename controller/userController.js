const Room = require('../model/roomModel')
const User = require('../model/userModel')

class UserController {
    async addMember(req,res){
        const {ho_ten, moi_quan_he} = req.body;
        // const room = await Room.findById(req.user.id_phong)
        // console.log(room)
        //     .then(() => {
        //         Room.updateOne(room._id, {$push: {member: [{user:{ho_ten:ho_ten, moi_quan_he:moi_quan_he}}]}})
        //         console.log(room)
        //     })
        const updateRoom = Room.updateOne({_id:req.user.id_phong}, {$push: {member: [{user:{ho_ten, moi_quan_he}}]}})
            .then(() => {
                return res.json(updateRoom)
            })
    }

    async deleteMember(req,res){
        const idMember = req.body.idMember
        const updateRoom = await Room.updateOne(
            {_id:req.user.id_phong},
            {$pull: {member:{_id: idMember}}}
        )
        console.log(updateRoom)
    }

    async getListMember(req,res){
        const room = await Room.findById(req.user.id_phong);
        console.log(room.member)
    }
}

module.exports = new UserController()
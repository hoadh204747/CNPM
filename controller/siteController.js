const Room = require('../model/roomModel')

class SiteController {
    async createRoom(req,res){
        const {name, idContract} = req.body;
        const room = await Room.create({name:name, idContract:idContract})
        res.json(room)
    }
}

module.exports = new SiteController()
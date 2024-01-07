const Room = require('../model/roomModel')

class SiteController {

    async getCreateRoom(req,res){
        res.render('admin/create-room')
    }

    async createRoom(req,res){
        const {name, idContract} = req.body;
        const room = await Room.create({name:name, idContract:idContract})
        res.redirect('/rooms')
    }

    async home(req,res){
        res.render('home');
    }
}

module.exports = new SiteController()
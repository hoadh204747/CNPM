const Room = require('../model/roomModel')
const News = require('../model/newsModel')

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
        const news = await News.find()
        res.render('home', {news});
    }

    async detailNews(req,res){
        const post = await News.find({})
        const news = await News.findOne({_id:req.params.id})
        res.render('detail_news', {news, post})
    }
}

module.exports = new SiteController()
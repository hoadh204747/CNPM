const Room = require('../model/roomModel')
const User = require('../model/userModel')
const News = require('../model/newsModel')

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

    async getNews(req,res){
        res.render('admin/create_post')
    }
    async postNews(req,res){
        const {title, content} = req.body;
        const news = await News.create({title:title, content:content});
        res.json(news)
    }

    async getListNews(req,res){
        const news = await News.find().sort({date_created:-1}).lean()
        res.render('admin/list_post', {news})
    }

    async getUpdateNews(req,res){
        const news = await News.findOne({_id:req.params.id});
        res.render('admin/edit_post', {news})
    }
    async updateNews(req,res){
        const news = await News.updateOne({_id:req.params.id}, req.body);
        res.redirect('/list-news')
    }
    
    async deteleNews(req,res){
        await News.deleteOne({_id:req.params.id})
        res.redirect('/list-news')
    }
}

module.exports = new AdminController()
const User = require('../model/userModel')
const Room = require('../model/roomModel')
const bcrypt = require("bcrypt");

class AuthController {

    async getRegister(req,res){
        res.render('auth/register')
    }

    //postSignup
    async postRegister(req, res){
        const {email, fullname, password, phone, cccd, idContract} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const room = await Room.findOne({idContract: idContract})
        const id_phong = room._id;
        if(room){
            const user = await User.create({email, fullname, password: hashedPassword, phone, cccd,idContract ,role:'member'})
                // .then((user) => {
                //     const updateUser = User.findByIdAndUpdate(user._id, { $set: {id_phong} }, {new:true})
                //     const updateRoom = Room.updateOne({_id:room._id}, { $set: {idOwner: user._id}})
                //     res.status(200).json(updateUser);
                // })
            const updateUser = User.findByIdAndUpdate(user._id, { $set: {id_phong} }, {new:true})
                .then(()=> {
                    return  res.json(updateUser);
                })
                
        }
        // try{
        //     const user = await User.create({email, fullname, password: hashedPassword, phone, cccd,idContract ,role:'member'})
        //     res.status(200).json(user)
        // }
        // catch(err){
        //     console.log(err)
        // }
        // res.redirect('/login')
        
    }

    async getLogin(req,res){
        res.render('auth/login')
    }

    //postLogin
    async  postLogin(req, res, next){
        const { email, password } = req.body;
        User.findOne({email: email})
            .then((user) => {
                if (!user) {
                    return res.status(422).render('login', {
                        errorMessage: 'Email hoặc mật khẩu không hợp lệ!',
                    });
                }
                bcrypt
                    .compare(password, user.password)
                    .then((doMatch) => {
                        if(doMatch) {
                            req.session.user = user;
                            req.session.authorized = true;
                            return req.session.save(() => {
                                if(req.session.user.role === "member" ){
                                    res.redirect('/dashboard')
                                }
                                if(req.session.user.role === "admin"){
                                    res.redirect('/admin/dashboard')
                                }
                            })
                        }
                    })
                    .catch(() => {
                        res.redirect('/login')
                    })
            })
            .catch(next)
    }

    postLogout(req, res){
        req.session.destroy(() =>{
            res.redirect('/');
        })
    }
}

module.exports = new AuthController()
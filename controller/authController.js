const User = require("../model/userModel");
const Room = require("../model/roomModel");
const bcrypt = require("bcrypt");
const crypto = require('crypto')

const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:465,
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
})

class AuthController {
  async getRegister(req, res) {
    res.render("auth/register");
  }

  //postSignup
  async postRegister(req, res) {
    const { email, fullname, password, phone, cccd, idContract } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const room = await Room.findOne({ idContract: idContract });
    const id_phong = room?._id;
    if (room) {
      const user = await User.create({
        email,
        fullname,
        password: hashedPassword,
        phone,
        cccd,
        idContract,
        role: "member",
      })
    //   .then((user) => {
    //     const updateUser = User.findByIdAndUpdate(
    //       user?._id,
    //       { $set: { id_phong } },
    //       { new: true }
    //     );
    //     const updateRoom = Room.updateOne(
    //       { _id: room?._id },
    //       { $set: { idOwner: user?._id } }
    //     );
    //     res.redirect('/login');
    //   });
      const updateUser = User.findByIdAndUpdate(
        user?._id,
        { $set: { id_phong } },
        { new: true }
      ).then( result => {
        
        transporter.sendMail({
            from: '"Hello" <dohuyhoa12012001@gmail.com>',
            to: email,
            subject:'Đăng ký thành công',
            html: '<h1>Bạn đã đăng ký thành công!</h1>'
        })
        return res.redirect('/login')
    })
    }
    // try {
    //   const user = await User.create({
    //     email,
    //     fullname,
    //     password: hashedPassword,
    //     phone,
    //     cccd,
    //     idContract,
    //     role: "member",
    //   });
    //   res.status(200).json(user);
    // } catch (err) {
    //   console.log(err);
    // }
  }

  async getLogin(req, res) {
    res.render("auth/login");
  }

  //postLogin
  async postLogin(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return res.status(422).render("login", {
            errorMessage: "Email hoặc mật khẩu không hợp lệ!",
          });
        }
        bcrypt
          .compare(password, user.password)
          .then((doMatch) => {
            if (doMatch) {
              req.session.user = user;
              req.session.authorized = true;
              return req.session.save(() => {
                if (req.session.user.role === "member") {
                  res.redirect("/dashboard");
                }
                if (req.session.user.role === "admin") {
                  res.redirect("/admin/dashboard");
                }
              });
            }
          })
          .catch(() => {
            res.redirect("/login");
          });
      })
      .catch(next);
  }

  postLogout(req, res) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  }

  getResetPassword(req,res){
    res.render('auth/reset-pw')
  }

  postReset(req, res, next) {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
            return res.redirect('/dat-lai-mat-khau')
        }
        const token = buffer.toString('hex')
        User.findOne({ email: req.body.email })
            .then(user => {
                user.resetToken = token
                user.resetTokenExpiration = Date.now() + 360000
                return user.save()
            })
            .then(result => {
                res.redirect('/login')
                transporter.sendMail({
                    from: '"Hello" <dohuyhoa12012001@gmail.com>',
                    to: req.body.email,
                    subject: 'Đặt lại mật khẩu',
                    html: `
                    <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu của bạn</p>
                    <p>Click vào <a href="http://localhost:3000/set-new-password/${token}">Đây</a> để đặt mật khẩu mới</p>
                    `
                })
            })
            .catch(err => {
                console.log(err)
            })
    })
}

    getNewPassword(req, res, next) {
        const token = req.params.token
        User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
            .then(user => {
                res.render('auth/set-new-pw', {
                    userId: user._id.toString(),
                    passwordToken: token
                })
            })
            .catch(err =>
                console.log(err))
    }

    postNewPassword(req, res, next) {
        const newPassword = req.body.password
        const userId = req.body.userId
        const passwordToken = req.body.passwordToken
        let resetUser
        User.findOne({
            resetToken: passwordToken,
            resetTokenExpiration: { $gt: Date.now() },
            _id: userId
        })
            .then(user => {
                resetUser = user
                return bcrypt.hash(newPassword, 12)
            })
            .then(hashedPassword => {
                resetUser.password = hashedPassword
                resetUser.resetToken = undefined
                resetUser.resetTokenExpiration = undefined
                return resetUser.save()
            })
            .then(result => {
                res.redirect('/login')
            })
            .catch(next)
    }

}

module.exports = new AuthController();

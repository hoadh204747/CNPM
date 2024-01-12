const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname:{
        type: String,
        require: true
    },
    email:{
        type:String,
        require: true
    },
    password:{
        type:String,
        require: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    phone:{
        type: String,
        // require: true
    },
    cccd:{
        type: String,
        // require: true
    },
    role:{
        type: String,
    },
    idContract: {type: String, require: true},
    id_phong:{
        type: Schema.Types.ObjectId,
        ref:'Room'
    },
    // idService:{
    //     type: Schema.Types.ObjectId,
    //     ref:'Service',
    // },
    listService:[
        {idService:{
            type : Schema.Types.ObjectId,
            ref: 'Service'
        }  }
    ],
    address: String,

    bool: {
        type: Number,
        // default:0,
    }
})

module.exports = mongoose.model('User', userSchema);
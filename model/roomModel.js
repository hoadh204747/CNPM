const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: { type: String, required: true },
    idOwner: {type : Schema.Types.ObjectId, ref:'User'},
    idContract: String,
    member:[
        {
            user:{
                ho_ten: String,
                moi_quan_he: String,
            }
        }
    ]
})


module.exports = mongoose.model('Room', roomSchema)
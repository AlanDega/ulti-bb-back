const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type:String
    },
    birth_date:{
        type:Date
    },
    gender:{
        type:String,
        enum:['M','F','O']
    },
    transactions:{
        type:[Schema.Types.ObjectId],
        ref:'transactions'
    },
    profile_pic:{
        type:String
    },
    is_active:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
});

ClientSchema.pre('save', function(next){
    const client = this;
    const SALT_FACTOR = 10;
    if(!client.isModified('password')) { return next();}
    bcrypt.genSalt(SALT_FACTOR, function (err, salt){
        if(err) return next(err);
        bcrypt.hash(client.password, salt, function(error, hash){
            if(error) return next(err);
            client.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('client', ClientSchema);

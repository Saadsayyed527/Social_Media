const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
unique:true
    },
    password:{
        type:String,
        required:true,
    },
    followers:[{
type:mongoose.Schema.Types.ObjectId,
ref:'User'
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
            }],
});


UserSchema.pre('save',async (next)=>{
    if (!this.isModified('password')) {
        next();
      }
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
})
UserSchema.methods.matchPassword = async (enteredPass)=>{
    return await bcrypt.compare(enteredPass,this.password)
};

const User = mongoose.model('User', UserSchema);
module.exports= User;
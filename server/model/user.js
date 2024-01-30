import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName:{
        type:Schema.Types.String,
        required:true
    },lastName:{
        type:Schema.Types.String,
        required:true,
    },email:{
        type:Schema.Types.String,
        required:true,
        unique:true
    },password:{
        type:Schema.Types.String,
        required:true
    }
},{
    timestamps: {
        createdAt: 'create', 
        updatedAt: 'update' 
      }
})
const User = mongoose.model('User', UserSchema);
export default User;
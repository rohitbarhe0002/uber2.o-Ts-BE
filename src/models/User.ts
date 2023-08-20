
import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  address: string;
  city: string;
  phoneNumber:Number,
  userType: string,
  isAdmin: boolean
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address:{
    type:String,
    required:true,
},
city:{
    type:String,
    required:true,
},
phoneNumber:{
    type:Number,
    required:true,
},
userType:{
    type:String,
    default:"Basic"
},
isAdmin:{
    type:Boolean,
    default:false
}
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;

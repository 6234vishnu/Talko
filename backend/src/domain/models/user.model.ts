import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  phone: string;
  profilePicture?: string;
  about?: string;
  lastSeen?: Date;
  isOnline: boolean;
  qrCode:string;
  contacts: { userId: mongoose.Schema.Types.ObjectId; name?: string }[];
  blockedUsers: mongoose.Schema.Types.ObjectId[];
  groups: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  isBlocked:boolean;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true }, 
    profilePicture: { type: String, default: '' }, 
    about: { type: String, default: 'Hey there! I am using Talko.' }, 
    lastSeen: { type: Date, default: Date.now }, 
    isOnline: { type: Boolean, default: false }, 
    isBlocked:{type:Boolean,default:false},
    qrCode: { type: String, }, 
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }], 
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;

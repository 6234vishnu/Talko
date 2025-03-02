import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
    userId: mongoose.Schema.Types.ObjectId; 
  phone:number;
  name?: string; 
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    phone:{type:Number,required:true},
    name: { type: String, default: '' }, 
  },
  { timestamps: true }
);

const ContactModel = mongoose.model<IContact>('Contact', ContactSchema);
export default ContactModel;

export interface ILetter extends Document {
  code: string;
  readBy: mongoose.Schema.Types.ObjectId;
  readAt: Date;
  _id: mongoose.Schema.Types.ObjectId;
}

import mongoose, { Document, Schema, Types } from "mongoose";

export interface IToken extends Document {
  user_id: Types.ObjectId;
  refresh_token: string;
}

const TokenSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  refresh_token: {
    type: String,
    required: true,
  },
});

export const TokenModel = mongoose.model<IToken>("Token", TokenSchema);

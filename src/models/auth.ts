// models/auth.ts
import { Schema, model, Model, Types } from "mongoose";

interface Auth {
  _id: Types.ObjectId;
  username: string;
  password: string;
}

type AuthModel = Model<Auth, unknown, unknown, unknown>;

const authSchema = new Schema<Auth, unknown, unknown, unknown>({
  username: { type: String, required: true, minLength: 4, maxLength: 8 },
  password: { type: String, required: true, minLength: 128, maxLength: 128 },
});

const Auth = model<Auth, AuthModel, unknown>("Auth", authSchema);

export default Auth;

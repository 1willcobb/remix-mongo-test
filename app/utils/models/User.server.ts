import { Schema, model, Types } from 'mongoose';

// Interface for the User properties
interface IUser {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];  // Assuming you have a Thought model
  friends: Types.ObjectId[];   // Array of User document references
}

// Interface to include virtual properties
interface IUserVirtuals extends IUser {
  friendCount: number;
  thoughtCount: number;
}

// Schema definition
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  thoughts: {
    type: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    default: [],
  },
  friends: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
}, {
  toJSON: {
    virtuals: true,
  },
});

// Define the virtuals
userSchema.virtual("friendCount").get(function (this: IUser) {
  return this.friends.length;
});

userSchema.virtual("thoughtCount").get(function (this: IUser) {
  return this.thoughts.length;
});

// Model creation
const User = model<IUserVirtuals>('User', userSchema);

export default User;

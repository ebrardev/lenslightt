import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required:true,  
   unique: true,
  },
  email: {
    type: String,
    required:true,
   unique: true,
  },
    password: {
        type: String,
        required:true,
    },
},
{
    timestamps: true,
})

userSchema.pre("save", async function (next) {
  const user = this;
  console.log(user.password, "bir");
  try {
      user.password = await bcrypt.hash(user.password, 10);
      console.log(user.password, "iki");
      next();
  } catch (err) {
      next(err);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  // // Relasi: Satu user bisa memiliki banyak resume
  // resumes: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Resume",
  //   },
  // ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model.User || mongoose.model('User', userSchema);

export default User
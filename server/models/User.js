import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama wajib diisi"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email wajib diisi"],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Format email tidak valid"],
  },
  password: {
    type: String,
    required: [true, "Password wajib diisi"],
    minlength: 6,
  },
  // Relasi: Satu user bisa memiliki banyak resume
  resumes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User
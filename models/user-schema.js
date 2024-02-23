import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    image_url: {
      type: String,
      trim: true,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  createdFroms: [],
});

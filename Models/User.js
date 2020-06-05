const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      max: 200
    },
    avatar: {
      type: String,
      default:
        "https://cdn4.iconfinder.com/data/icons/linecon/512/photo-512.png"
    },
    lastname: {
      type: String,
      required: true,
      max: 200
    },
    email: {
      type: String,
      required: true,
      max: 200,
      unique: 1,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 200
    },
    role: {
      type: Number,
      default: 0
    },
    moviesList: {
      type: Array,
      default: []
    },
    token: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };

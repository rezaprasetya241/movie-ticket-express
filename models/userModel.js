const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter username"],
    },
    email: {
      type: String,
      required: [true, "Please input email"],
    },
    password: {
      type: String,
      required: [true, "Please input password"],
    },
    age: {
      type: Number,
      required: true,
      default: 0,
    },
    role: {
      type: String,
      default: "user",
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
// encrypting password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
const User = mongoose.model("User", userSchema);

module.exports = User;

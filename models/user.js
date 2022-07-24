import mongoose from "mongoose";
const crypto = require("node:crypto");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please prove a first name for this user. "],
    maxLength: [60, "First name cannot be more than 60 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name for this user"],
    maxLength: [60, "Last name cannot be more than 60 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an user email."],
    maxLength: [255, "Last name cannot be more than 255 characters"],
  },
  role:{
    type: String,
    enum: ['user', 'admin','owner','academic','student','parent','teacher'],
    default: 'user'
  },
  active: {
    type: Boolean,
    default: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  hash: {type: String},
  salt: {type: String},
});

const salt_length = 64;
const iterations = 1000;
const pw_length = 255;
const digest = "sha256";
const encoding = "hex";

UserSchema.methods.setPassword = function(password)  {
  this.salt = crypto.randomBytes(salt_length).toString(encoding);
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, iterations, pw_length, digest)
    .toString(encoding);
};

UserSchema.methods.validatePassword = function(password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, iterations, pw_length, digest)
    .toString(encoding);
  return this.hash === hash;
};

UserSchema.pre("save", function (next) {
  let current = new Date();
  this.updated_at = current;
  if (!this.created_at) {
    this.created_at = current;
  }
  next();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);

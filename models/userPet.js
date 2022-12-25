const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");

const userPetSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 16,
  },
  birthday: {
    type: String,
  },
  date: {
    type: String,
  },
  breed: {
    type: String,
    minlength: 2,
    maxlength: 16,
  },
  comments: {
    type: String,
    minlength: 8,
    maxlength: 120,
  },
  avatarURL: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  cloudId: {
    type: String,
  },
});

userPetSchema.post("save", handleSaveErrors);

const UserPet = model("userPet", userPetSchema);

module.exports = { UserPet };

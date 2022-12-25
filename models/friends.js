const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");

const friendsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true],
    },
    url: {
      type: String,
      required: [true],
    },
    addressUrl: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    _id: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    workDays: {
      type: Array,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },

  { versionKey: false, timestamps: true }
);

friendsSchema.post("save", handleSaveErrors);

const Friend = model("friend", friendsSchema);

module.exports = Friend;

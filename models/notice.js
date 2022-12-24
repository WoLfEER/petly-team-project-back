const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");

const noticeSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: [true],
    },
    url: {
      type: String,
      required: [true],
    },
    description: {
      type: String,
      required: [true],
    },
    date: {
      type: String,
      required: true,
    },
  },

  { versionKey: false, timestamps: true }
);

noticeSchema.post("save", handleSaveErrors);

const Notice = model("notice", noticeSchema);

module.exports = Notice;

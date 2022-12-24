const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");

const newsSchema = new Schema(
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

newsSchema.post("save", handleSaveErrors);

const News = model("News", newsSchema);

module.exports = News;

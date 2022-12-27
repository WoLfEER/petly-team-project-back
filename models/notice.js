const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const categories = ["sell", "good-hands", "lost/found"];
const birthdayRegexp =
  /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;

const noticeSchema = new Schema(
  {
    category: {
      type: String,
      enum: categories,
      // required: [true, "Set name of category for notice"], 
    },
    title: {
      type: String,
      // required: [true, "Set title for notice"],
    },
    breed: {
      type: String,
    },
    name: {
      type: String,
    },
    place: {
      type: String,
    },
    age: {
      type: String,
    },
    price: {
      type: Number,
      required: [
        function () {
          if (this.category === "sell") return this.category;
        },
        "Price required",
      ],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    info: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    avatarURL: {
      type: String,
    },
    comments: {
      type: String,
      minlength: 5,
      maxlength: 120,
    },
    birthday: {
      type: String,
      maxlength: 10,
      trim: true,
      default: "00.00.0000",
    },
    idCloud: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Notice = model("notice", noticeSchema);

noticeSchema.post("save", handleSaveErrors);

const noticesSchema = Joi.object({
  category: Joi.string().valid("sell", "good-hands", "lost/found"),
  price: Joi.number().min(1).when("category", {
    is: "sell",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  title: Joi.string(),
  breed: Joi.string(),
  name: Joi.string(),
  place: Joi.string(),
  comments: Joi.string(),
  avatarURL: Joi.string(),
  birthday: Joi.string().pattern(new RegExp(birthdayRegexp)),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});

const schemas = { noticesSchema, updateFavoriteSchema };
module.exports = { schemas, Notice };

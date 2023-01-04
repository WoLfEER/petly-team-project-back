const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notice");
const { User } = require("../../models/user");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const getByCategory = async (req, res, next) => {
  const { category } = req.params;
  const { query } = req.query;

  if (category === "favorite" || category === "own") {
    try {
      const { authorization = "" } = req.headers;

      const [bearer = "", token = ""] = authorization.split(" ");
      if (bearer !== "Bearer") {
        throw HttpError(401, "Not authorized");
      }
      try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token) {
          throw Error("Not authorized");
        }

        req.user = user;
        const { _id: userId } = req.user;
        const result = await Notice.find({ owner: userId._id });
        res.status(200).json(result);

        next();
      } catch (error) {
        throw HttpError(401, "Not authorized");
      }
    } catch (error) {
      next(error);
    }
  }

  // const { page = 1, limit = 10 } = req.query;

  // const skip = (page - 1) * limit;
  if (!query) {
    const result = await Notice.find({ category }).populate({
      path: "owner",
      select: "id phone email",
    });
    if (result !== 0) {
      return res.status(200).json(result);
    }
    throw HttpError(404, "Not found");
  }
};

module.exports = getByCategory;

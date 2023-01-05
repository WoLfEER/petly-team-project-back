const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notice");
const { User } = require("../../models/user");
const { SECRET_KEY_ACCESS } = process.env;
const jwt = require("jsonwebtoken");

const getByCategory = async (req, res, next) => {
  const { category } = req.params;
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;

  if (category === "favorite" || category === "own") {
    // TODO midleware

    try {
      const { authorization = "" } = req.headers;

      const [bearer = "", accessToken = ""] = authorization.split(" ");
      if (bearer !== "Bearer") {
        throw HttpError(401, "Not authorized");
      }
      try {
        const { id } = jwt.verify(accessToken, SECRET_KEY_ACCESS);
        const user = await User.findById(id);
        if (!user || !user.accessToken) {
          throw Error("Not authorized");
        }

        req.user = user;
        const data = await Notice.find({ owner: user._id }).populate({
          path: "owner",
          select: "id phone email",
        });

        res.status(200).json(data);

        next();
      } catch (error) {
        throw HttpError(401, "Not authorized");
      }
    } catch (error) {
      next(error);
    }
    return;
  }

  const result = await Notice.find({ category }, "-createdAt -updatedsrAt", {
    skip,
    limit,
  }).populate({
    path: "owner",
    select: "id phone email",
  });
  if (result !== 0) {
    return res.status(200).json(result);
  }
  throw HttpError(404, "Not found");
};

module.exports = getByCategory;

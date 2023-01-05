const { HttpError } = require("../../helpers");
const { Notice, categories } = require("../../models/notice");

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
  res.json({ code: 200, status: "success", data });
};

module.exports = getByCategory;

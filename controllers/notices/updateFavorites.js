const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notice");
// const { User } = require("../../models/user");

const updateFavorites = async (req, res) => {
  const { id } = req.params;
  const result = await Notice.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateFavorites;

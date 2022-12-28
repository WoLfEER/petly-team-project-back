const { Notice } = require("../../models/notice");
const { HttpError } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Notice.findById(id, "-createdAt -updatedAt");

  console.log(111, result);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = getById;

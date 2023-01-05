const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notice");

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Notice.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404);
  }
  console.log(1111111, id, result);
  res.status(200).json({ message: "Notice deleted" });
};

module.exports = deleteById;

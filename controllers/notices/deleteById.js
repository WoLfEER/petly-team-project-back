const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notice");

const deleteById = async (req, res) => {

  console.log(HttpError);
  const { id } = req.params;
  const result = await Notice.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json({ message: "Notice deleted" });
};

module.exports = deleteById;

const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notice");

const deleteOwnNoticeById = async (req, res) => {
  const { id } = req.params;
  const result = await Notice.findByIdAndRemove(id).populate(
    "owner",
    "email phone"
  );
  if (!result) {
    throw HttpError(404);
  }
  res.json({ code: 200, status: "Notice deleted", data: result });
};

module.exports = deleteOwnNoticeById;

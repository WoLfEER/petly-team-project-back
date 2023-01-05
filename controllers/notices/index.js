const getByCategory = require("./getByCategory");
const addNotice = require("./addNotice");
const deleteOwnNoticeById = require("./deleteOwnNoticeById");
const updateFavorites = require("./updateFavorites");
const getOwnNotice = require("./getOwnNotice");
const getOwnNoticeFavorites = require("./getOwnNoticeFavorites");
const deleteFavorites = require("./deleteFavorites");

module.exports = {
  getByCategory,
  addNotice,
  deleteOwnNoticeById,
  updateFavorites,
  getOwnNotice,
  getOwnNoticeFavorites,
  deleteFavorites,
};

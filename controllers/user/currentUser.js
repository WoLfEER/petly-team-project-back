const { User } = require("../../models/user");

const currentUser = async (req, res) => {
  const { id } = req.user;
  const result = await await User.findById(id, { password: 0 }).populate(
    "myPets"
  );
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = currentUser;

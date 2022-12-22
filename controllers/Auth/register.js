const jwt = require("jsonwebtoken");
const {User} = require("../../models/user")
const {HttpError} = require("../../helpers")
const bcrypt =require("bcryptjs")
const gravatar = require("gravatar")
const {SECRET_KEY} = process.env


const register = async(req, res) => {
const {email, password, name, city, phone} = req.body;
const user = await User.findOne({email});
if(user){
    throw HttpError( 409, " Email in use")
}
if (password.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters long");
  }
const hashPassword = await bcrypt.hash(password, 10);
const avatarUrl = gravatar.url(email);
const newUser = await User.create({
    email, 
    password: hashPassword, 
    avatarUrl, 
    name,
    city,
    phone,
  });

    const payload = {
        id: newUser._id,
      };
    
      const token = jwt.sign(payload, SECRET_KEY);
      await User.findByIdAndUpdate(newUser._id, { token })

res.status(201).json({
    user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      },
      token,
})
}

module.exports = register;
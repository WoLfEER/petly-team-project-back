const User = require("../../models/user")
const {HttpError} = require("../../helpers")
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken")
const {SECRET_KEY} = process.env;

const login = async(req, res) => {
const {email, password} = req.body;
const user = await User.findOne({email});
if(!user){
    throw HttpError( 401, " Email or password invalid")
}


// if(!user.verify){
//     throw HttpError(401, "Email not verify")
// }


const passwordCompare = await bcrypt.compare(password,user.password);
if(!passwordCompare){
    throw HttpError( 401, " Email or password invalid")
}

const payload = {
    id: user._id,
}
const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "12h"})
await User.findByIdAndUpdate(user._id, {token})

res.json({
    token,
    user: {
        id: user._id,
        email,
    },
}) 
}

module.exports = login;
const getCurrent = async(req, res)=>{
    const {
        email, 
        password: hashPassword, 
        avatarUrl, 
        name,
        city,
        phone,
    } = req.user;

    res.json({
        email, 
    password: hashPassword, 
    avatarUrl, 
    name,
    city,
    phone,
    })
}

module.exports = getCurrent;
const jwt = require("jsonwebtoken")

const authChech = async(req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodeToken = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decodeToken
        next()
    } catch (error) {
        console.log("auth error:",error);
        return res.status(400).json({message:"Auth Failed"})
        
    }


}

module.exports= {
    authChech,
}
const axios = require('axios');

const authChech = async(req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        if(!token){
            res.status(401).json({ error: 'Access denied, no token provided' });
        }


        try {
            const response = await axios.post(`${process.env.AUTH_API_URL}/users/verify`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        
         
            req.user = response.data;
        
            next();
          } catch (error) {
            console.log("error:",error);
            res.status(401).json({ error: 'Invalid token' });
          }


       
    } catch (error) {
        console.log("auth error:",error);
        return res.status(400).json({message:"Auth Failed"})
        
    }


}

module.exports= {
    authChech,
}
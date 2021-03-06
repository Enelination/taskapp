const config = require('config')
const jwt = require('jsonwebtoken')

function auth(req,res,next){
    const token = req.header('x-auth-token')

    //token check
    if(!token){
       return res.status(401).json({msg:'No token ,access denied'})
    }
    try {
        //token verify
    const decoded = jwt.verify(token,config.get('jwtSecret'))

    //add user from paylod
    req.user = decoded;
    next() 
    } catch (err) {
        res.status(400).json({msg:'Token is not valid'})
    }

   
}

module.exports = auth
const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    if(req.body.role > 1){
        return res.status(401).json({
            message: 'Auth Failed'
        })
    }
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decode;
        next()
    }catch{
        return res.status(401).json({
            message: 'Auth Failed'
        })
    }
    
}; 
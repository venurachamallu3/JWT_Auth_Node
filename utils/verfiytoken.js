const jwt = require('jsonwebtoken')


const privatekey ='venugopal'
exports.verifytoken = (req,res,next)=>{
    const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
        status:"Please login token details are present",
        message:"TOKEN ADD"
    })
}try {
    const decoded = jwt.verify(token,privatekey );
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}
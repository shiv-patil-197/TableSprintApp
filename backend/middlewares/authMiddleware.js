const jwt = require('jsonwebtoken');
const redis = require('redis');
const client = redis.createClient();

let generateToken=(req,res,next)=>{
    try{
        const  {email,password}=req.body;
        const payload = { email: email,
            password: password};
        const token = jwt.sign(payload,process.env.JWT_SECRET, { expiresIn: '10m' });
        if(!token){
            return res.json({message:"Token not generated"})
        }
        req.token=token;  

    }
    catch(err){
        if(err){
            return res.status(500).json({message:err.message})
        }       
    }
    next();
   
}

let authenticateToken=(req,res,next)=>{
    // const token=req.headers['authorization'];
    const token = req.header('Authorization')?.replace('bearer ', '');
    console.log(token);
        if(!token || token===null){
      return res.status(401).json({message: 'Unauthorized: No token provided'})
    }
    // token=token.split(" ")[1]
    client.get(token, (err, data) => {
        if (err) throw err;

        if (data === 'blacklisted') {
            return res.status(401).json({ message: 'Token is blacklisted' });
        }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
      if(err){
          console.error(err.message);
          return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
      console.log(decoded);
      req.decoded=decoded;
      next()
    });
});
   ;
  }




  module.exports={generateToken,authenticateToken}
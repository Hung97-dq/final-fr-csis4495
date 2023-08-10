import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    let token = 0;
    if(req.headers.authorization){
      token = req.headers.authorization.split(" ")[1];
    }
    
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {   
      decodedData = jwt.decode(token);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
//this is the authentication middleware
//to check the visitor is authenticated to some routes
const jwt = require("jsonwebtoken");
require("dotenv").config();

//create a function called auth
//with 3 parameters the next is to go to then next function
let auth = async (req, res, next) => {
  //check the headers.cookie if there is a token
  const oldtoken = req.headers.cookie;
  //there is no token
  if (!oldtoken)
    return res.json({
      isAuth: false,
      message: "you are not authenticated :auth.js"
    });

  // we get the token like this "auth_token=...token.."
  //we need just this '...token...' so we remove the string : auth_token with slice function
  const token = await oldtoken.slice(11);

  //get the token
  try {
    // verify the token is it ok
    //decoded it and get the user id that we giv it before
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET);

    // set req.user = user id
    req.user = verified;

    //call next function
    next();
  } catch (err) {
    //there is an error maybe you are not loged in
    console.log("error :=> lign20:auth.js : " + err);

    return res.json({
      isAuth: false,
      message: "tooken is not valid: => lign23:auth.js"
    });
  }
};

module.exports = { auth };

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const Port = process.env.PORT || 5000;
//import the db

require("./db/db");

////////Schemas

const { User } = require("./Models/User");
///////////////////////////////
///////Middlewares    ////////
/////////////////////////////
//body parser
app.use(express.json());
//cors middleware
app.use(cors());
// auth and admin Middlewars
const { auth } = require("./Middlewares/auth");
const { admin } = require("./Middlewares/admin");

if ((process.env.NODE_ENV = "production")) {
  app.use(express.static("client/build"));
}

///////////////////////////////
///////Authentication ////////
/////////////////////////////

app.get("/api/users/auth", auth, async (req, res) => {
  //get id from auth middleware
  const { _id } = req.user;

  //we do this just if maybe we want other user data ===>{
  //find the user with the same id and get his data
  const authenticatedUser = await User.findOne({ _id });

  // const authId = authenticatedUser._id;

  const {
    avatar,
    moviesList,
    firstname,
    lastname,
    email,
    role,
  } = await authenticatedUser;

  ///}<===
  res.status(200).json({
    //send the data and isAuth to true
    _id,
    moviesList,
    avatar,
    isAdmin: role !== 0 ? true : false,
    isAuth: true,
    firstname,
    lastname,
    email,
  });
});

///////////////////////////////
///////Admin ////////
/////////////////////////////

app.get("/api/users/admin", auth, admin, async (req, res) => {
  const { _id } = req.user;

  const authenticatedAdmin = await User.findOne({ _id });

  const authAdminId = authenticatedAdmin._id;

  res.status(200).json({
    authAdminId,
    isAuth: true,
    isAdmin: true,
  });
});

////////////////////////
///////Register ////////
////////////////////////

app.post("/api/users/register", async (req, res) => {
  //get data from client side
  const { firstname, lastname, email, password } = req.body;

  //Checking if there already a user with the same email
  const emailExist = await User.findOne({ email });

  //a user with this email is exist
  if (emailExist)
    return res.json({
      isRegistered: false,
      error: true,
      message:
        "a user with this email is already exist, please try another email",
    });

  //email doesn't exsit ==> new user

  /// we have to hash the password

  //generate the salt wih bcryptjs
  const salt = await bcrypt.genSalt(10);
  //get the alt and the password then hash it with bcrypt
  const hashPassword = await bcrypt.hash(password, salt);

  //create a user object
  const user = new User({
    firstname,
    lastname,
    email,
    password: hashPassword,
  });

  //if it's all ok then save the new user in the database
  //else return the error

  try {
    //it's all ok
    //save it
    await user.save();
    res.status(200).json({
      isRegistered: true,
    });
  } catch (err) {
    //there is an error
    res.json({
      isRegistered: false,
      error: true,
      message: err,
    });
    //  console.log(`There is an error : ${error}`);
  }
});

////////////////////////
///////Login    ////////
////////////////////////

app.post("/api/users/login", async (req, res) => {
  console.log(req.body);

  //get the email and the password from the client
  const { email, password } = req.body;

  //check the email is exist => it must be a user with this email
  const userExist = await User.findOne({ email });

  //there is no user with this email so you cannot login
  if (!userExist) {
    return res.json({
      Login: false,
      error: true,
      message: "we cannot find a user with the same data",
    });
  }

  //there is a user with this email so we have see if the password is correct

  //use bcrypt to compare the exist pass and the pass from the client
  const comparePassword = await bcrypt.compare(password, userExist.password);

  //the client pass doesn't match the pass from db
  if (!comparePassword) {
    return res.json({
      Login: false,
      error: true,
      message: "Password incorrect!!!",
    });
  }

  //the email exist and the password is correct
  //then we have to generate a token with the user (_id) cause it's unique

  //we use jwt.sign to generate token then _id and the password from the envirment varible
  const generateToken = await jwt.sign(
    { _id: userExist._id },
    process.env.TOKEN_SECRET
  );

  //go to db and the user that we login with and add the token
  userExist.token = generateToken;

  //save the user
  userExist.save();
  // go to header.cookie and set the token with a name
  res.cookie("auth_token", generateToken).json({
    Login: true,
    message: "You are logged in",
    _id: userExist._id,
  });

  //you loged in
});
////////////////////////
///////Logout   ////////
////////////////////////

app.get("/api/users/logout", auth, async (req, res) => {
  // we use the auth middleware before we logout to check if the client has the right to this route
  //because it's a private route
  // you have to be already loged in

  //if we get here then we have the autorization to logout
  try {
    //from the auth middleware we get the user id
    // so we take this id and go to db then look for this user
    const userToLogout = await User.findOne({ _id: req.user._id });

    //we get the user and he must has a token
    //then we remove the token

    userToLogout.token = "";

    //we save the user changes
    userToLogout.save();

    //we go to headers.cookie and remove the token
    //we logout
    res.cookie("auth_token", "").json({
      logout: true,
      message: "Logout success",
    });
  } catch (err) {
    //there is an error
    res.json({
      logout: false,
      message: "there a problem with logout",
    });
  }
});

/////////////////////////////////////////
///////add new favorite movie   ////////
///////////////////////////////////////

app.post("/api/movies/favoritemovie", auth, async (req, res) => {
  //console.log(req.body);

  //authenicate required
  try {
    //get id from auth.js
    const { _id } = await req.user;

    //check user by his id
    const userData = await User.findById({ _id });

    //check if the movie with tmdb_id is already exist
    let array = false;

    await userData.moviesList.forEach((movie) => {
      if (req.body.imdb_id === movie.imdb_id) {
        array = true;
      }
    });

    //if it alerady exist : send the user this movie alredy in you favorites
    if (array)
      return res.json({
        addNewMovie: false,
        message: "This movie is exist in your db before",
      });
    // add new movie to favoritelist
    //get the object
    //it with take 3 data
    /*
      movie = {
        TMDB_id = id,
        name = movie name,
        poster image= poster_path
      }
      */
    const newFavorite = await req.body;

    const userToAdd = await User.findByIdAndUpdate(
      { _id },
      { $push: { moviesList: newFavorite } },
      { new: true }
    );

    res.status(200).json({
      addNewMovie: true,
      message: "You just added a movie to your list!!",
      userToAdd,
    });
  } catch (err) {
    console.log("there is a probleme with add new favorite movies" + err);
    res.json({
      addNewMovie: false,
      message: "sorry there is a problem !!",
    });
  }
});

///////////////////////////////////////
///////Remove a Movies from favList///
/////////////////////////////////////

app.post("/api/movies/removemovie", auth, async (req, res) => {
  //authorized to use this route is required
  try {
    //id from auth middlware
    const { _id } = req.user;

    const moviesToDelete = await req.body;

    const rmFromDb = await User.findByIdAndUpdate(
      { _id },
      {
        $pull: {
          moviesList: {
            tmdb_id: moviesToDelete.tmdb_id,
          },
        },
      },
      { new: true }
    );
    //remove success
    res.status(200).json({
      removeMovie: true,
      rmFromDb,
      message: "You removed a movie from your list",
    });
  } catch (err) {
    //error
    console.log("there is a probleme with remove a favorite movie" + err);
    res.json({
      removeMovie: false,
      message: "sorry the movie didn't removed from db!!",
    });
  }
});

///Server set up
app.listen(Port, () => {
  console.log(`Server run on port ${Port}`);
});

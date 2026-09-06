const userModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model.js")



/**
 * @name registerUserController
 * @description Register a new user, expects user data in the request body, and saves it to the database.
 * @access Public 
 */
async function registerUserController(req, res) {
  const { username, email, password } = req.body;//first we get the info from req.body

  if (!username || !email || !password) {//logic for checking that value is provided or not
    return res.status(400).json({ message: "Please provide username, email and password" });
  }

  const isUserAlreadyExist = await userModel.findOne({//logic for finding if user already exist with submitted username or email
    $or: [{ username }, { email }]
  });

  if (isUserAlreadyExist) {//if value matches return already exist
    return res.status(400).json({ message: "Username or email already exist" });
  }

  //if not exist then first password is hashed before creating new user
  const hash = await bcrypt.hash(password, 10)
  //then new user is created with the hashed password
  const user = await userModel.create({
    username,
    email,
    password: hash
  })

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )
  res.cookie("token", token)

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}


/**
 * @name loginUserController
 * @description Login a user, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }) //this is to find if the entered email exists in database or not

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" }) //if not then it will return error
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)//this is to compare the stored password with the entered password.

  if (!isPasswordValid) {//this will run if password do not match to show its invalid.
    return res.status(400).json({
      message: "Invalid email or password"
    })
  }
  //if password and email matches then this will run-->
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )
  res.cookie("token", token)
  res.status(200).json({
    message: "User loggedIn successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}


/**
 * @name logoutUserController
 * @description Logout a user
 * @access Public
 */
async function logoutUserController(req, res) {
  const token = req.cookies.token//to check if their is a token stored in req.cookie

  if (token) {//when token is available 
    await tokenBlacklistModel.create({ token })//this will blacklist the token
  }
  res.clearCookie("token")//this will clear token and user will get logged out
  res.status(200).json({
    message: "User logged out successfully"
  })
}


/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */
async function getMeController(req, res) {

  const user = await userModel.findById(req.user.id)


  res.status(200).json({
    message: "User details fetched successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}

module.exports = { registerUserController, loginUserController, logoutUserController, getMeController }
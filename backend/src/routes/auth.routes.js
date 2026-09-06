const { Router } = require('express');//r1
const authController = require("../controllers/auth.controller")//r7
const authMiddleware = require("../middlewares/auth.middleware")
const authRouter = Router()//r2

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public 
 */
authRouter.post("/register", authController.registerUserController)//r6


/**
 * @route POST /api/auth/login
 * @description Login user with email and password
 * @access Public
 */
authRouter.post("/login", authController.loginUserController)


/**
 * @route GET /api/auth/logout
 * @description Logout user by blacklisting the token
 * @access Public
 */
authRouter.get("/logout", authController.logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access Private
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)


module.exports = authRouter//r3
import { Router } from "express"

import { logoutUser, loginUser, registerUser } from "../controllers/user.controller.js"

import { upload } from "../middlewares/multer.middleware.js"

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router()


router.route("/register").post(
    
    upload.fields([
        {
            name:"avatar",
            maxCount:1      //multer part-----------bcz during doing registration,we will upload avatar and coverImage ..so multer will come----
        },

        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    
    registerUser
)

//login user--
router.route("/login").post(loginUser)

//user logout-------------
router.route("/logout").post(verifyJWT,logoutUser)

export default router 
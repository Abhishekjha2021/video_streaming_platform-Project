import { Router } from "express"

import { logoutUser, loginUser, registerUser, refreshAccessToken,
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateUserAvatar, 
    updateUserCoverImage,
    updateAccountDetails

 } from "../controllers/user.controller.js"


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

//refreshing access token-------------
router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

export default router 
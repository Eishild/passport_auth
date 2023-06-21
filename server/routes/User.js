import express from "express"
import { login, loginFacebook, logout, register } from "../controllers/user.js"
import passport from "passport"

const router = express.Router()

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: "true",
  }),
  login
)
router.get(
  "/login/facebook",
  passport.authenticate("facebook", { failureRedirect: "/login" })
)
router.get("/auth/facebook/callback", loginFacebook)

router.post("/register", register)
router.get("/logout", logout)

export default router

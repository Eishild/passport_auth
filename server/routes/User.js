import express from "express"
import { login, register } from "../controllers/user.js"
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
router.post("/register", register)

export default router

import { hash } from "argon2"
import User from "../models/User.js"

export const login = async (req, res) => {
  try {
    req.session.auth = true
    console.log(req.session.passport.user)
    res.send({ success: true, userID: String(req.session.passport.user) })
  } catch (error) {}
}
export const loginFacebook = async (req, res) => {
  res.send({ sessionID: req.sessionID, success: true })
}

export const register = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const findUser = await User.find({ $or: [{ username }, { email }] })

    if (findUser.length !== 0) {
      return res.send({ err: "register error" })
    }
    const hashPassword = await hash(password, {
      hash: process.env.SALT,
    })

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    })
    await newUser.save()
    res.send({ success: true })
  } catch (error) {
    console.log(error)
  }
}

export const logout = (req, res) => {
  req.session.destroy()
  res.send("session delete")
}

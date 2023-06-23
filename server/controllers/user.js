import { hash } from "argon2"
import User from "../models/User.js"

export const login = async (req, res) => {
  try {
    res.send({ sucess: true })
  } catch (error) {}
}
export const loginFacebook = async (req, res) => {
  res.send({ sessionID: req.sessionID, sucess: true })
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
    res.send({ sucess: true })
  } catch (error) {
    console.log(error)
  }
}

export const logout = (req, res) => {
  req.session.destroy((err) => console.log("logout"))
  res.send("session delete")
}

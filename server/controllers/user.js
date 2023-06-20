import argon2, { hash } from "argon2"
import User from "../models/Users.js"

export const login = async (req, res) => {
  try {
    res.send({ sucess: true })
  } catch (error) {}
}

export const register = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const findUser = await User.find({ $or: [{ username }, { email }] })

    if (findUser.length !== 0) {
      return res.send({ err: "register error" })
    }
    const hashPassword = await hash(password, {
      salt: process.env.SALT,
      type: argon2.argon2i,
    })
    const user = new User({
      username,
      email,
      password: hashPassword,
    })

    await user.save()
    res.send({ sucess: true })
  } catch (error) {
    console.log(error)
  }
}

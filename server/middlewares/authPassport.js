import LocalStrategy from "passport-local"
import User from "../models/Users.js"
import { verify } from "argon2"

export function auth() {
  return new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username })
    try {
      if (!user) return done(null, false)
      const verifyPassword = await verify(user.password, password, {
        hash: process.env.SALT,
      })
      if (password && !verifyPassword) return done(null, false)

      return done(null, user)
    } catch (error) {
      console.log(error)
    }
  })
}

export function serialize() {
  return function (user, cb) {
    cb(null, user.get("_id"))
  }
}

import LocalStrategy from "passport-local"
import FacebookStrategy from "passport-facebook"
import User from "../models/Users.js"
import { verify } from "argon2"

export const localAuth = () => {
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
      return error
    }
  })
}

export const facebookAuth = () => {
  return new FacebookStrategy(
    {
      clientID: process.env["FACEBOOK_APP_ID"],
      clientSecret: process.env["FACEBOOK_APP_SECRET"],
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("accessToken", accessToken)
        console.log("profile", profile)
        // const user = await User.findOne({ username: profile.id }).exec()
        // if (!user) {
        //   const newUser = new User({ username: profile.id })
        //   newUser.save()
        //   return done(null, newUser)
        // } else {
        return done(null, profile)
        // }
      } catch (error) {
        return done(null, false)
      }
    }
  )
}

export const serialize = () => {
  return function (user, cb) {
    cb(null, user.get("id"))
  }
}

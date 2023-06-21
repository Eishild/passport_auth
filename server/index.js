import express from "express"
import cors from "cors"
import "dotenv/config"
import passport from "passport"
import mongoose from "mongoose"
import session from "express-session"
import MongoStore from "connect-mongo"

import UserRoute from "./routes/User.js"
import {
  facebookAuth,
  localAuth,
  serialize,
} from "./middlewares/authPassport.js"

const PORT = process.env.PORT
const BDD_URI = process.env.MONGO_URI

mongoose.connect(BDD_URI)

const app = express()
app.use(
  session({
    name: "simple",
    secret: "auth",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: BDD_URI }),
  })
)

app.use(express())
app.use(cors())
app.use(express.json())

passport.use(localAuth())
passport.use(facebookAuth())
passport.serializeUser(serialize())

app.use("/", UserRoute)

app.listen(PORT, () => console.log(`Server run on port : ${PORT}`))

import express from "express"
import cors from "cors"
import "dotenv/config"
import passport from "passport"
import mongoose from "mongoose"
import session from "express-session"

import UserRoute from "./routes/User.js"
import { auth, serialize } from "./middlewares/authPassport.js"

const PORT = process.env.PORT
const BDD_URI = process.env.MONGO_URI

mongoose.connect(BDD_URI)

const app = express()
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
)

app.use(express())
app.use(cors())
app.use(express.json())

passport.use(auth())
passport.serializeUser(serialize())

app.use("/", UserRoute)

app.listen(PORT, () => console.log(`Server run on port : ${PORT}`))

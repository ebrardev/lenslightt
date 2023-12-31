import express from "express"
import dotenv from "dotenv"
import connectDB from "./db.js"
import pageRoute from "./routes/pageRoute.js"
import photoRoute from "./routes/photoRoute.js"
import userRoute from "./routes/userRoute.js"
dotenv.config()

connectDB()
 
const app = express()
const port = 3000

// ejs file
app.set("view engine", "ejs")

// static files middleware
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// routes
app.use("/", pageRoute)
app.use("/photos", photoRoute)
app.use("/users", userRoute)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
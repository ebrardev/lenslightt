import express from "express"
import dotenv from "dotenv"
import connectDB from "./db.js"

dotenv.config()

connectDB()
 
const app = express()
const port = 3000

// ejs file
app.set("view engine", "ejs")

// static files middleware
app.use(express.static("public"))



app.get("/", (req, res) => {
    res.render("index")
})

app.get("/about", (req, res) => {
    res.render("about")
}
)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
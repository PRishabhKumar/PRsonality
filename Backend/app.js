import dotenv from "dotenv"
import path from "path"
import express from "express"
import cors from "cors"
import userRoutes from "./Routes/api_routes.js"

const app = express()
// add middlewares
app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.set("port", process.env.PORT || 3000)
app.use("/api/v1", userRoutes)

app.get("/", (req, res)=>{
    res.send("Hello world !!!")
})

export default app
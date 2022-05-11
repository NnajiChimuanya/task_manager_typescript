import express, { Request, Response } from "express"
import Router from "./controller/task"
import bodyParser from "body-parser"
import methodOverride from "method-override"


const app = express()
const port = process.env.PORT || 3000

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended : false}))
app.use(methodOverride('_method'))

app.use("/", Router)

app.listen(port, () => {
    console.log(`listen at port : ${port}`)
})
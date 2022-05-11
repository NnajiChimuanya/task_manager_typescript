import express, {Request, Response} from "express"
import Task from '../model/Task'
import mongoose from "mongoose"

try{
    mongoose.connect("mongodb://localhost:27017/Task")
    console.log("Succeffully connected to the database")
} catch (err) {
    if(err) throw err
    console.log("Problem connecting to the database")
}

const Router = express.Router()

Router.get("/", async (req: Request, res:Response) => {
   const data = await Task.find({})
   res.render("index", {tasks : data})
    
})

Router.post("/api/addTask", async (req: Request, res: Response) => {
    console.log(req.body)
    let newTask = await new Task(req.body)
    newTask.save((err) => {
        if(err) throw err
        res.redirect("/")
    })
})

export default Router
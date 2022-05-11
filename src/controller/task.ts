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

Router.get("/api/getTask/:id", async (req: Request, res: Response) => {
    try {
        const data = await Task.findById({_id : req.params.id})
        res.render("task", {task : data})
    } catch (error) {
        if(error) throw error
    }
})

export default Router
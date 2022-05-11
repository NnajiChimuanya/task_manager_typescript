import express, {Request, Response} from "express"
import Task from '../model/Task'
import mongoose from "mongoose"

try{
    mongoose.connect( "mongodb+srv://Muanyachi:Muanyachi50@task.buirj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    console.log("Succeffully connected to the database")
} catch (err) {
    console.log("Problem connecting to the database")
}

const Router = express.Router()

Router.get("/", async (req: Request, res:Response) => {
   const data = await Task.find({})
   res.render("index", {tasks : data})
    
})

Router.post("/api/addTask", async (req: Request, res: Response) => {
    console.log(req.body)
    let newTask = await new Task({
        name : req.body.name
    })
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

Router.delete("/api/deleteTask/:id", async(req: Request, res: Response) => {
    try {
        await Task.findByIdAndDelete({_id : req.params.id})
        console.log(`Deleted task by Id : ${req.params.id}`)
    } catch (error) {
        if(error) throw error
    }

    res.redirect("/")
} )

Router.patch("/api/updateTask/:id", async(req: Request, res: Response) => {
    let mm = false
    if(req.body.completed) {
         mm = true
    }

    try {
        await Task.findByIdAndUpdate({_id : req.params.id}, {name : req.body.name, completed : mm} )
        console.log(`Updatated task by Id : ${req.params.id}`)
    } catch (error) {
        if(error) throw error
    }

    res.redirect("/")
} )

export default Router
import { Schema, model} from "mongoose";
import ITask from "../interface/Itask"


const taskSchema: Schema = new Schema({
    name : String,
    completed : Boolean
})

const Task = model<ITask>("Task", taskSchema)

export default Task
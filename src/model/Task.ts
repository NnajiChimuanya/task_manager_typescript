import { Schema, model} from "mongoose";
import ITask from "../interface/Itask"


const taskSchema: Schema = new Schema({
    name : String,
    completed : {
        type : Boolean,
        default : false
    }
})

const Task = model<ITask>("Task", taskSchema)

export default Task
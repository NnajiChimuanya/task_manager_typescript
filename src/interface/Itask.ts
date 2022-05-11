import { Document } from "mongoose";

interface ITask extends Document {
    name: string,
    completed: boolean
}

export default ITask;
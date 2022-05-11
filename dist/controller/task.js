"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Task_1 = __importDefault(require("../model/Task"));
const mongoose_1 = __importDefault(require("mongoose"));
try {
    mongoose_1.default.connect("mongodb+srv://Muanyachi:Muanyachi50@task.buirj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
    console.log("Succeffully connected to the database");
}
catch (err) {
    console.log("Problem connecting to the database");
}
const Router = express_1.default.Router();
Router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Task_1.default.find({});
    res.render("index", { tasks: data });
}));
Router.post("/api/addTask", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    let newTask = yield new Task_1.default({
        name: req.body.name
    });
    newTask.save((err) => {
        if (err)
            throw err;
        res.redirect("/");
    });
}));
Router.get("/api/getTask/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Task_1.default.findById({ _id: req.params.id });
        res.render("task", { task: data });
    }
    catch (error) {
        if (error)
            throw error;
    }
}));
Router.delete("/api/deleteTask/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Task_1.default.findByIdAndDelete({ _id: req.params.id });
        console.log(`Deleted task by Id : ${req.params.id}`);
    }
    catch (error) {
        if (error)
            throw error;
    }
    res.redirect("/");
}));
Router.patch("/api/updateTask/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let mm = false;
    if (req.body.completed) {
        mm = true;
    }
    try {
        yield Task_1.default.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name, completed: mm });
        console.log(`Updatated task by Id : ${req.params.id}`);
    }
    catch (error) {
        if (error)
            throw error;
    }
    res.redirect("/");
}));
exports.default = Router;

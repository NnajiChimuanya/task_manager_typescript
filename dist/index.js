"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_1 = __importDefault(require("./controller/task"));
const body_parser_1 = __importDefault(require("body-parser"));
const method_override_1 = __importDefault(require("method-override"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, method_override_1.default)('_method'));
app.use("/", task_1.default);
app.listen(port, () => {
    console.log(`listen at port : ${port}`);
});

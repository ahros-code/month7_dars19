import express from "express";
import {taskRouter} from "./routes/task.router.js";

(function (){
  try{
    const app = express();
    app.use(express.json());
    app.use(taskRouter)
    app.listen(5000, () => console.log("Server is running..."))
  } catch (err){
    console.log(err);
  }
})()
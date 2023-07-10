import express from "express";
import taskController from "../controllers/task.controller.js";

export const taskRouter = express.Router();

taskRouter.get("/tasks", taskController.GET_TASKS)
taskRouter.post("/task", taskController.CREATE_TASK)
taskRouter.post("/task/finish/:id", taskController.FINISH_TASK)
taskRouter.post("/task/body/:id", taskController.CREATE_TASK_BODY)
taskRouter.put("/task/body/:id", taskController.UPDATE_TASK_BODY)
taskRouter.delete("/task/:id", taskController.DELETE_TASK)
import {readFile, writeFile} from "../utils/fs.helper.js";

function GET_TASKS(req, res) {
  try {
    const query = req.query;
    const tasks = readFile("tasks.json");

    if (!Object.keys(query).length) {
      res.status(200).json({data: tasks, status: 200})
    }

    const filteredTasks = tasks.filter(task => task.completed === (query?.completed === "true"));

    res.status(200).json({data: filteredTasks, status: 200})

  } catch (err) {
    console.log(err.message)
  }
}

function CREATE_TASK(req, res) {
  try {
    const {title, orderId, completed, body, date, categoryId} = req.body;
    if (!(title || orderId || completed || date || categoryId)) {
      res.status(400).json(`error: Please fill all fields!`)
    }
    const tasks = readFile("tasks.json");
    tasks.push(body ? {id: tasks.at(-1)?.id + 1 || 1, title, orderId, completed, date, categoryId, body} : {id: tasks.at(-1)?.id + 1 || 1, title, orderId, completed, date, categoryId})
    writeFile("tasks.json", tasks);
    res.status(201).send("Task created successfully!")
  } catch (err) {
    console.log(err.message)
  }
}

function CREATE_TASK_BODY(req, res) {
  const {id} = req.params;
  const {body} = req.body;

  if (!body) {
    res.status(400).send(`Missing "body" field!`)
  }

  const data = readFile("tasks.json")

  let task = data.find(task => task.id === +id);
  if(task.body){
    res.send("Body already exists")
  } else {
    task.body = body;
    writeFile("tasks.json", data);
    res.status(201).send("Body added successfully!");
  }
}

function UPDATE_TASK_BODY(req, res) {
  const {id} = req.params;
  const {body} = req.body;

  if (!body) {
    res.status(400).send(`Missing "body" field!`)
  }

  const data = readFile("tasks.json");
  let newData = data.find(task => task.id === +id);
  newData.body = body;
  writeFile("tasks.json", data);
  res.status(200).send("Body update successfully!");
}

function DELETE_TASK(req, res) {
  try {
    const {id} = req.params;
    const data = readFile("tasks.json");
    // console.log(data)
    let task = data.filter(t => t.id !== +id);
    writeFile("tasks.json", task);
    res.status(200).send("Task deleted successfully!")
  } catch (err) {
    console.log(err.message)
  }
}

function FINISH_TASK(req, res) {
  try {
    const {id} = req.params;
    const data = readFile("tasks.json");
    let task = data.find(task => task.id === +id);
    task.completed = !task.completed;
    writeFile("tasks.json", data)
  } catch (err) {
    console.log(err.message)
  }
}

export default {
  GET_TASKS,
  CREATE_TASK,
  CREATE_TASK_BODY,
  UPDATE_TASK_BODY,
  DELETE_TASK,
  FINISH_TASK
}
let express = require("express");
let cors = require("cors");

let app = express();
let port = 3000;

app.use(cors());

//Home.
app.get("/", (req, res) => {
  res.send("Welcome to Airflow...");
});

//AirFlow Task Management System.

//Data Structure.
let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
];

//Endpoint 1 Add a Task to the Task List.
//Add a new task to the task list using the provided details.
function addTask(taskId, text, priority){
  let task = {
    taskId : taskId,
    text : text,
    priority : priority,
  }
  tasks.push(task);
  return tasks;
};

app.get("/tasks/add", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let result = addTask(taskId, text, priority);
  res.json({ tasks : result });
}); 

//Endpoint 2 Read All Tasks in the Task List.
//Return the current list of tasks.
function currentState(tasks){
  return tasks;
};

app.get("/tasks", (req, res) => {
  let result = currentState(tasks);
  res.json({ tasks : result });
});

//Endpoint 3 Sort Tasks by Priority.
//Sort tasks by their priority in ascending order.
function sortTasksByPriority(tasks1_object, tasks2_object){
  return tasks1_object.priority - tasks2_object.priority;
};

app.get("/tasks/sort-by-priority", (req, res) => {
  let tasksCopy = tasks.slice();
  let result = tasksCopy.sort(sortTasksByPriority);
  res.json({ tasks : result });
});

//Endpoint 4 Edit Task Priority.
//Edit the priority of an existing task based on the task ID.
function editTask(tasks, taskId, priority){
  for(let i=0; i<tasks.length; i++){
    if(tasks[i].taskId === taskId){
      tasks[i].priority = priority;
    }
  }
  return tasks;
};

app.get("/tasks/edit-priority", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = editTask(tasks, taskId, priority);
  res.json({ tasks : result });
});

//Endpoint 5 Edit/Update Task Text.
//Edit the text of an existing task based on the task ID.
function updateTaskText(tasks, taskId, text){
  for(let i=0; i<tasks.length; i++){
    if(tasks[i].taskId === taskId){
      tasks[i].text = text;
    }  
  }
  return tasks;
};

app.get("/tasks/edit-text", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = updateTaskText(tasks, taskId, text);
  res.json({ tasks : result });
});

//Endpoint 6 Delete a Task from the Task List.
//Delete a task from the task list based on the task ID.
function deleteTask(tasks, taskId){
  return tasks.taskId !== taskId;
};

app.get("/tasks/delete", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = tasks.filter(el => deleteTask(el, taskId));
  tasks = result;
  res.json({ tasks : result });
});

//Endpoint 7 Filter Tasks by Priority.
//Return tasks that match a specified priority.
function filterTasksByPriority(tasks, priority){
  return tasks.priority === priority;
};

app.get("/tasks/filter-by-priority", (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter(el => filterTasksByPriority(el, priority));
  res.json({ tasks : result });
});

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
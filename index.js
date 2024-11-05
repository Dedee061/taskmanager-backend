const express = require("express");
const dotenv = require("dotenv");

const connectToDataBase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");

dotenv.config();
const app = express();
app.use(express.json());

connectToDataBase();

/*
----------------------------------------------------------------
ROUTE TO LIST ALL TASKS
----------------------------------------------------------------
*/

app.get("/tasks", async (req, res) => {
    try {
        const task = await TaskModel.find({});
        res.status(200).send(task);
    } catch (err) {
        res.status(500).send("Error retrieving tasks");
    }
});

/*
----------------------------------------------------------------
ROUTE TO LIST A TASK BY ID
----------------------------------------------------------------
*/

app.get("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findById(taskId);

        if (!task) {
            return res.status(404).send("Essa Tarefa nao foi encontrada");
        }

        return res.status(200).send(task);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

/*
----------------------------------------------------------------
ROUTE TO CREATE A TASK
----------------------------------------------------------------
*/

app.post("/tasks", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);

        await newTask.save();

        res.status(200).send(newTask);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

/*
----------------------------------------------------------------
ROUTE TO DELETE A TASK
----------------------------------------------------------------
*/

app.delete("/tasks/:id", async (req, res) => {
    try {
        const taskid = req.params.id;

        const taskToDelte = await TaskModel.findById(taskid);

        if (!taskToDelte) {
            return res.status(404).send("Essa Tarefa nao foi encontrada");
        }

        const deleteTask = await TaskModel.findByIdAndDelete(taskid);

        res.status(200).send(deleteTask);
    } catch (err) {
        res.status(500).send("Error deleting task" + err.message);
    }
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

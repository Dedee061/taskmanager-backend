const express = require("express");
const TaskController = require("../controllers/task.controller");
const TaskModel = require("../models/task.model");

const router = express.Router();

/*
----------------------------------------------------------------
ROUTE TO LIST ALL TASKS
----------------------------------------------------------------
*/
router.get("/", async (req, res) => {
    return new TaskController(req, res).getTasks();
});

/*
----------------------------------------------------------------
ROUTE TO LIST A TASK BY ID
----------------------------------------------------------------
*/

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
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
ROUTE TO UPTADE A TASK BY ID
----------------------------------------------------------------
*/

router.patch("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        const taskToUpdate = await TaskModel.findById(taskId);

        const allowUpdate = ["isCompleted"];

        const requestUpdate = Object.keys(taskData);

        for (update of requestUpdate) {
            if (allowUpdate.includes(update)) {
                taskToUpdate[update] = taskData[update];
            } else {
                return res
                    .status(500)
                    .send("Um ou mais campos não são editaveis");
            }
        }

        await taskToUpdate.save();

        return res.status(200).send(taskToUpdate);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

/*
----------------------------------------------------------------
ROUTE TO DELETE A TASK
----------------------------------------------------------------
*/

router.delete("/:id", async (req, res) => {
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

module.exports = router;

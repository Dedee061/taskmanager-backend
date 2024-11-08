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
    return new TaskController(req, res).getTaskById();
});

/*
----------------------------------------------------------------
ROUTE TO CREATE A TASK
----------------------------------------------------------------
*/

router.post("/", async (req, res) => {
    return new TaskController(req, res).createTask();
});

/*
----------------------------------------------------------------
ROUTE TO UPTADE A TASK BY ID
----------------------------------------------------------------
*/

router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).updateTask();
});

/*
----------------------------------------------------------------
ROUTE TO DELETE A TASK
----------------------------------------------------------------
*/

router.delete("/:id", async (req, res) => {
    return new TaskController(req, res).deleteTask();
});

module.exports = router;

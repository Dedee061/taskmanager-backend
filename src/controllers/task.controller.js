const TaskModel = require("../models/task.model");
const { notFoundError, objetIdCastError } = require("../errors/mongodb.errors");
const { notAllowedFieldsToUpdateError } = require("../errors/general.errors");
const { MongoServerClosedError } = require("mongodb");
const { default: mongoose } = require("mongoose");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getTasks() {
        try {
            const task = await TaskModel.find({});
            this.res.status(200).send(task);
        } catch (err) {
            this.res.status(500).send("Error retrieving tasks");
        }
    }

    async getTaskById() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);

            if (!task) {
                return notFoundError(this.res);
            }

            return this.res.status(200).send(task);
        } catch (err) {
            if (err instanceof mongoose.Error.CastError) {
                return objetIdCastError(this.res);
            }

            this.res.status(500).send(err.message);
        }
    }

    async createTask() {
        try {
            const newTask = new TaskModel(this.req.body);

            await newTask.save();

            this.res.status(200).send(newTask);
        } catch (err) {
            this.res.status(500).send(err.message);
        }
    }

    async updateTask() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;

            const taskToUpdate = await TaskModel.findById(taskId);

            if (!taskToUpdate) {
                return notFoundError(this.res);
            }

            const allowUpdate = ["isCompleted"];

            const requestUpdate = Object.keys(taskData);

            for (const update of requestUpdate) {
                if (allowUpdate.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    return notAllowedFieldsToUpdateError(this.res);
                }
            }

            await taskToUpdate.save();

            return this.res.status(200).send(taskToUpdate);
        } catch (err) {
            if (err instanceof mongoose.Error.CastError) {
                return objetIdCastError(this.res);
            }
            this.res.status(500).send(err.message);
        }
    }

    async deleteTask() {
        try {
            const taskid = this.req.params.id;

            const taskToDelte = await TaskModel.findById(taskid);

            if (!taskToDelte) {
                return notFoundError(this.res);
            }

            const deleteTask = await TaskModel.findByIdAndDelete(taskid);

            this.res.status(200).send(deleteTask);
        } catch (err) {
            if (err instanceof mongoose.Error.CastError) {
                return objetIdCastError(this.res);
            }
            this.res.status(500).send("Error deleting task" + err.message);
        }
    }
}

module.exports = TaskController;

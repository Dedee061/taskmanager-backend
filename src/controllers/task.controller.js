const TaskModel = require("../models/task.model");

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
                return this.res
                    .status(404)
                    .send("Essa Tarefa nao foi encontrada");
            }

            return this.res.status(200).send(task);
        } catch (err) {
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

            const allowUpdate = ["isCompleted"];

            const requestUpdate = Object.keys(taskData);

            for (this.update of requestUpdate) {
                if (allowUpdate.includes(this.update)) {
                    taskToUpdate[this.update] = taskData[this.update];
                } else {
                    return this.res
                        .status(500)
                        .send("Um ou mais campos não são editaveis");
                }
            }

            await taskToUpdate.save();

            return this.res.status(200).send(taskToUpdate);
        } catch (err) {
            this.res.status(500).send(err.message);
        }
    }

    async deleteTask() {
        try {
            const taskid = this.req.params.id;

            const taskToDelte = await TaskModel.findById(taskid);

            if (!taskToDelte) {
                return this.res
                    .status(404)
                    .send("Essa Tarefa nao foi encontrada");
            }

            const deleteTask = await TaskModel.findByIdAndDelete(taskid);

            this.res.status(200).send(deleteTask);
        } catch (err) {
            this.res.status(500).send("Error deleting task" + err.message);
        }
    }
}

module.exports = TaskController;

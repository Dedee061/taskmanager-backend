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
}

module.exports = TaskController;

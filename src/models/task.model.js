const { model, Schema } = require("mongoose");

const TaskSchema = Schema({
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const taskModel = model("Task", TaskSchema);

module.exports = taskModel;

const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    assignedManager: {
        type: String
    },

    assignedDeveloper: {
        type: String
    },

    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Project", projectSchema);
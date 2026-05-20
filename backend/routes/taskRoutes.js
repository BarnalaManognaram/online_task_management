const express = require("express");

const router = express.Router();

const {

    createTask,
    getTasks,
    updateTaskStatus,
    deleteTask

} = require("../controllers/taskController");

const checkRole = require("../middleware/authMiddleware");

/*
=========================
Routes
=========================
*/

// Create Task

router.post(
    "/create",
    checkRole(["admin", "manager","developer"]),
    createTask
);

// Get Tasks

router.get(
    "/all",
    getTasks
);

// Update Task Status

router.put(
    "/update/:id",
    checkRole(["developer"]),
    updateTaskStatus
);

// Delete Task

router.delete(
    "/delete/:id",
    checkRole(["admin"]),
    deleteTask
);

module.exports = router;
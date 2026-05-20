const Task = require("../models/Task");
const Project = require("../models/Project");

/*
=========================
Create Task
=========================
*/

const createTask = async (req, res) => {

    try {

        console.log(req.body);

        const {
            title,
            description,
            project,
            assignedDeveloper,
            deadline,
            role
        } = req.body;

        // Check Empty Fields

        if (
            !title ||
            !description ||
            !project ||
            !assignedDeveloper
        ) {

            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });

        }

        /*
        =========================
        Check Developer Project
        =========================
        */

        if (role === "developer") {

            const existingProject = await Project.findOne({

                title: project,
                assignedDeveloper: assignedDeveloper

            });

            console.log(existingProject);

            if (!existingProject) {

                return res.status(403).json({

                    success: false,
                    message:
                        "You can only create tasks for your assigned project"

                });

            }

        }

        /*
        =========================
        Create Task
        =========================
        */

        const task = await Task.create({

            title,
            description,
            project,
            assignedDeveloper,
            deadline

        });

        res.status(201).json({

            success: true,
            message: "Task Created",
            task

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

/*
=========================
Get All Tasks
=========================
*/

const getTasks = async (req, res) => {

    try {

        const tasks = await Task.find();

        res.status(200).json({
            success: true,
            tasks
        });

    }

    catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

/*
=========================
Update Task Status
=========================
*/

const updateTaskStatus = async (req, res) => {

    try {

        const {
            status,
            role
        } = req.body;

        console.log("STATUS:", status);

        /*
        =========================
        Developer Restrictions
        =========================
        */

        if (

            role === "developer" &&

            (
                status === "Completed" ||
                status === "Reopened"
            )

        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Developer cannot complete or reopen tasks"

            });

        }

        /*
        =========================
        Find Task
        =========================
        */

        const task = await Task.findById(
            req.params.id
        );

        if (!task) {

            return res.status(404).json({

                success: false,
                message: "Task Not Found"

            });

        }

        /*
        =========================
        Update Status
        =========================
        */

        task.status = status;

        await task.save();

        /*
        =========================
        Success Response
        =========================
        */

        res.status(200).json({

            success: true,
            message: "Task Updated",
            task

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};
/*
=========================
Delete Task
=========================
*/

const deleteTask = async (req, res) => {

    try {

        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task Not Found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Task Deleted"
        });

    }

    catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

module.exports = {
    createTask,
    getTasks,
    updateTaskStatus,
    deleteTask
};
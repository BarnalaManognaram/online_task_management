const Project = require("../models/Project");

/*
=========================
Create Project
=========================
*/

const createProject = async (req, res) => {

    try {

        const {
            title,
            description,
            assignedManager,
            assignedDeveloper
        } = req.body;

        if (!title || !description) {

            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });

        }

        const project = await Project.create({

            title,
            description,
            assignedManager,
            assignedDeveloper

        });

        res.status(201).json({
            success: true,
            message: "Project Created",
            project
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
Get All Projects
=========================
*/

const getProjects = async (req, res) => {

    try {

        const projects = await Project.find();

        res.status(200).json({
            success: true,
            projects
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
Delete Project
=========================
*/

const deleteProject = async (req, res) => {

    try {

        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {

            return res.status(404).json({
                success: false,
                message: "Project Not Found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Project Deleted"
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
    createProject,
    getProjects,
    deleteProject
};
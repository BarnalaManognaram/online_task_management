const express = require("express");

const router = express.Router();

const {
    createProject,
    getProjects,
    deleteProject
} = require("../controllers/projectController");

const checkRole = require("../middleware/authMiddleware");

/*
=========================
Routes
=========================
*/

// Admin Creates Project

router.post(
    "/create",
    checkRole(["admin"]),
    createProject
);

// Get All Projects

router.get(
    "/all",
    getProjects
);

// Delete Project

router.delete(
    "/delete/:id",
    checkRole(["admin"]),
    deleteProject
);

module.exports = router;
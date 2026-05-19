const express = require("express");

const router = express.Router();

const {
    loginUser,
    createUsers
} = require("../controllers/authController");

const checkRole = require("../middleware/authMiddleware");

/*
=========================
Routes
=========================
*/

// Login Route

router.post("/login", loginUser);

// Create Users Route

router.get("/create-users", createUsers);

// Example Protected Route

router.post(
    "/admin",
    checkRole(["admin"]),
    (req, res) => {

        res.json({
            success: true,
            message: "Welcome Admin"
        });

    }
);

module.exports = router;
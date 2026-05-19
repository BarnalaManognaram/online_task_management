const User = require("../models/User");

/*
=========================
Login Controller
=========================
*/

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check Empty Fields

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });

        }

        // Find User

        const user = await User.findOne({
            email,
            password
        });

        // Invalid User

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });

        }

        // Success

        res.status(200).json({
            success: true,
            message: "Login Successful",
            role: user.role
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
Create Sample Users
=========================
*/

const createUsers = async (req, res) => {

    try {

        await User.deleteMany();

        await User.insertMany([

            {
                email: "admin@gmail.com",
                password: "admin123",
                role: "admin"
            },

            {
                email: "manager@gmail.com",
                password: "manager123",
                role: "manager"
            },

            {
                email: "developer@gmail.com",
                password: "developer123",
                role: "developer"
            }

        ]);

        res.json({
            success: true,
            message: "Users Created"
        });

    }

    catch (error) {

        res.status(500).json({
            success: false,
            message: "Error Creating Users"
        });

    }

};

module.exports = {
    loginUser,
    createUsers
};
/*
=========================
Role Middleware
=========================
*/

const checkRole = (roles) => {

    return (req, res, next) => {

        const userRole = req.body.role;

        if (!roles.includes(userRole)) {

            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });

        }

        next();

    };

};

module.exports = checkRole;
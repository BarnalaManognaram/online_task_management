/*
=========================
Role Middleware
=========================
*/

const checkRole = (roles) => {

    return (req, res, next) => {

        const userRole =
            req.body.role
                ?.trim()
                .toLowerCase();

        const allowedRoles =
            roles.map(role =>
                role.toLowerCase()
            );

        console.log("USER ROLE:", userRole);
        console.log(
            "ALLOWED ROLES:",
            allowedRoles
        );

        if (
            !allowedRoles.includes(
                userRole
            )
        ) {

            return res.status(403).json({

                success: false,
                message: "Access Denied"

            });

        }

        next();

    };

};

module.exports = checkRole;
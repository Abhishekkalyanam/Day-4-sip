const { invalidTokens } = require("../models/investorModel");
const { verifyJwt } = require("./authManager");

const checkAccess = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "Token Required"
            });
        }

        if (invalidTokens.includes(token)) {
            return res.status(401).json({
                message: "Token Expired or Logged Out"
            });
        }

        const payload = verifyJwt(token);

        if (!payload || payload.error === 0) {
            return res.status(401).json({
                message: "Invalid Token"
            });
        }

        if (payload.role === "investor") {
            req.user = payload;
            next();
        } else {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "Authentication Failed",
            error: error.message
        });
    }
};

module.exports = {
    checkAccess
};
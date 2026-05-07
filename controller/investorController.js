const { loginUser, logoutUser } = require("../models/investorModel");
const { signJwt } = require("../utility/authManager");
const {getInvestorById,getInvestorHoldings,calculateNAV} = require("../models/investorModel");



const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and Password are required"
        });
    }

    const user = loginUser(email, password);

    if (!user) {
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }

    const token = signJwt({
        email: user.email,
        role: user.role
    });

    return res.status(200).json({
        message: "Login Successful",
        token
    });
};

const logout = (req, res) => {
    const token = req.headers.authorization;
    const { email } = req.body;

    if (!email || !token) {
        return res.status(400).json({
            message: "Email and Token are required"
        });
    }

    const result = logoutUser(email, token);

    if (!result) {
        return res.status(400).json({
            message: "Logout Failed"
        });
    }

    return res.status(200).json({
        message: "Logout Successful"
    });
};

const { createInvestor } = require("../models/investorModel");

const addInvestor = (req, res) => {
    const investorData = req.body;

    if (!investorData) {
        return res.status(400).json({
            message: "Investor data is required"
        });
    }

    createInvestor(investorData, (err) => {
        if (err) {
            return res.status(500).json({
                message: "Error creating investor",
                error: err.message
            });
        }

        return res.status(201).json({
            message: "Investor created successfully"
        });
    });
};


const getInvestor = (req, res) => {
    const { investorId } = req.params;

    getInvestorById(investorId, (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Error fetching investor details"
            });
        }

        if (!data) {
            return res.status(404).json({
                message: "Investor not found"
            });
        }

        return res.status(200).json(data);
    });
};

const getHoldings = (req, res) => {
    const { investorId } = req.params;

    getInvestorHoldings(investorId, (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Error fetching holdings"
            });
        }

        return res.status(200).json(data);
    });
};

const getNAV = (req, res) => {
    const { investorId } = req.params;

    calculateNAV(investorId, (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Error calculating net worth"
            });
        }

        return res.status(200).json(data);
    });
};




module.exports = {
    login,
    logout,getInvestor,
    getHoldings,
    getNAV,addInvestor
};
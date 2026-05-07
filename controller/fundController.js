const {
    createFund,
    getAllFunds,
    updateFundNav
} = require("../models/fundModel");

const addFund = (req, res) => {
    const fundData = req.body;

    createFund(fundData, (err) => {
        if (err) {
            return res.status(500).json({
                message: "Error creating fund",
                error: err.message
            });
        }

        return res.status(201).json({
            message: "Fund created successfully"
        });
    });
};

const getFunds = (req, res) => {
    getAllFunds((err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Error fetching funds"
            });
        }

        return res.status(200).json(data);
    });
};

const updateNav = (req, res) => {
    const { fundId } = req.params;
    const { nav_value, nav_date } = req.body;

    updateFundNav(fundId, nav_value, nav_date, (err) => {
        if (err) {
            return res.status(500).json({
                message: "Error updating NAV"
            });
        }

        return res.status(200).json({
            message: "NAV updated successfully"
        });
    });
};

module.exports = {
    addFund,
    getFunds,
    updateNav
};
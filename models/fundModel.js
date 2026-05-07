const db = require("../utility/dbManager");

const createFund = (fundData, callback) => {
    const query = `
        INSERT INTO mutual_fund (
            fund_id,
            amc_id,
            fund_name,
            fund_category,
            fund_type
        ) VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
        query,
        [
            fundData.fund_id,
            fundData.amc_id,
            fundData.fund_name,
            fundData.fund_category,
            fundData.fund_type
        ],
        callback
    );
};

const getAllFunds = (callback) => {
    const query = `
        SELECT * FROM mutual_fund
    `;

    db.all(query, [], callback);
};

const updateFundNav = (fundId, navValue, navDate, callback) => {
    const query = `
        INSERT INTO nav_history (
            fund_id,
            nav_value,
            nav_date
        ) VALUES (?, ?, ?)
    `;

    db.run(query, [fundId, navValue, navDate], callback);
};

module.exports = {
    createFund,
    getAllFunds,
    updateFundNav
};
// const db = require("../utility/pgManager");

// const createFund = (fundData, callback) => {
//     const query = `
//         INSERT INTO mutual_fund (
//             fund_id,
//             amc_id,
//             fund_name,
//             fund_category,
//             fund_type
//         ) VALUES (?, ?, ?, ?, ?)
//     `;

//     db.run(
//         query,
//         [
//             fundData.fund_id,
//             fundData.amc_id,
//             fundData.fund_name,
//             fundData.fund_category,
//             fundData.fund_type
//         ],
//         callback
//     );
// };

// const getAllFunds = (callback) => {
//     const query = `
//         SELECT * FROM mutual_fund
//     `;

//     db.all(query, [], callback);
// };

// const updateFundNav = (fundId, navValue, navDate, callback) => {
//     const query = `
//         INSERT INTO nav_history (
//             fund_id,
//             nav_value,
//             nav_date
//         ) VALUES (?, ?, ?)
//     `;

//     db.run(query, [fundId, navValue, navDate], callback);
// };

// module.exports = {
//     createFund,
//     getAllFunds,
//     updateFundNav
// };

const db = require("../utility/pgManager");

const createFund = async (fundData, callback) => {
  const query = `
    INSERT INTO mutual_fund (
      fund_id,
      amc_id,
      fund_name,
      fund_category,
      fund_type
    )
    VALUES ($1,$2,$3,$4,$5)
  `;

  try {
    await db.query(query, [
      fundData.fund_id,
      fundData.amc_id,
      fundData.fund_name,
      fundData.fund_category,
      fundData.fund_type
    ]);

    callback(null);
  } catch (err) {
    callback(err);
  }
};

const getAllFunds = async (callback) => {
  const query = `
    SELECT * FROM mutual_fund
  `;

  try {
    const result = await db.query(query);
    callback(null, result.rows);
  } catch (err) {
    callback(err);
  }
};

const updateFundNav = async (fundId, navValue, navDate, callback) => {
  const query = `
    INSERT INTO nav_history (
      fund_id,
      nav_value,
      nav_date
    )
    VALUES ($1,$2,$3)
  `;

  try {
    await db.query(query, [
      fundId,
      navValue,
      navDate
    ]);

    callback(null);
  } catch (err) {
    callback(err);
  }
};

module.exports = {
  createFund,
  getAllFunds,
  updateFundNav
};
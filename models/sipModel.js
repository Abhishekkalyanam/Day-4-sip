// const db = require("../utility/pgManager");

// const createSip = (sipData, callback) => {
//     const query = `
//         INSERT INTO sip_registration (
//             sip_id,
//             portfolio_id,
//             fund_id,
//             sip_amount,
//             sip_date,
//             start_date,
//             status
//         ) VALUES (?, ?, ?, ?, ?, ?, ?)
//     `;

//     db.run(
//         query,
//         [
//             sipData.sip_id,
//             sipData.portfolio_id,
//             sipData.fund_id,
//             sipData.sip_amount,
//             sipData.sip_date,
//             sipData.start_date,
//             sipData.status
//         ],
//         callback
//     );
// };

// const getSipById = (sipId, callback) => {
//     const query = `
//         SELECT * FROM sip_registration
//         WHERE sip_id = ?
//     `;

//     db.get(query, [sipId], callback);
// };

// const processSip = (sipId, callback) => {
//     const query = `
//         INSERT INTO investment_transaction (
//             transaction_id,
//             sip_id,
//             fund_id,
//             transaction_amount,
//             nav_at_purchase,
//             units_allocated,
//             transaction_date
//         )
//         SELECT
//             'TXN' || strftime('%s','now'),
//             s.sip_id,
//             s.fund_id,
//             s.sip_amount,
//             n.nav_value,
//             (s.sip_amount / n.nav_value),
//             DATE('now')
//         FROM sip_registration s
//         JOIN nav_history n
//         ON s.fund_id = n.fund_id
//         WHERE s.sip_id = ?
//         ORDER BY n.nav_date DESC
//         LIMIT 1
//     `;

//     db.run(query, [sipId], callback);
// };

// const getSipTransactions = (sipId, callback) => {
//     const query = `
//         SELECT * FROM investment_transaction
//         WHERE sip_id = ?
//     `;

//     db.all(query, [sipId], callback);
// };

// module.exports = {
//     createSip,
//     getSipById,
//     processSip,
//     getSipTransactions
// };


const db = require("../utility/pgManager");

const createSip = async (sipData, callback) => {
  const query = `
    INSERT INTO sip_registration (
      sip_id,
      portfolio_id,
      fund_id,
      sip_amount,
      sip_date,
      start_date,
      status
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
  `;

  try {
    await db.query(query, [
      sipData.sip_id,
      sipData.portfolio_id,
      sipData.fund_id,
      sipData.sip_amount,
      sipData.sip_date,
      sipData.start_date,
      sipData.status
    ]);

    callback(null);
  } catch (err) {
    callback(err);
  }
};

const getSipById = async (sipId, callback) => {
  const query = `
    SELECT * FROM sip_registration
    WHERE sip_id = $1
  `;

  try {
    const result = await db.query(query, [sipId]);
    callback(null, result.rows[0]);
  } catch (err) {
    callback(err);
  }
};

const processSip = async (sipId, callback) => {
  const query = `
    INSERT INTO investment_transaction (
      transaction_id,
      sip_id,
      fund_id,
      transaction_amount,
      nav_at_purchase,
      units_allocated,
      transaction_date
    )
    SELECT
      'TXN' || EXTRACT(EPOCH FROM NOW()),
      s.sip_id,
      s.fund_id,
      s.sip_amount,
      n.nav_value,
      (s.sip_amount / n.nav_value),
      CURRENT_DATE
    FROM sip_registration s
    JOIN nav_history n
      ON s.fund_id = n.fund_id
    WHERE s.sip_id = $1
    ORDER BY n.nav_date DESC
    LIMIT 1
  `;

  try {
    await db.query(query, [sipId]);
    callback(null);
  } catch (err) {
    callback(err);
  }
};

const getSipTransactions = async (sipId, callback) => {
  const query = `
    SELECT * FROM investment_transaction
    WHERE sip_id = $1
  `;

  try {
    const result = await db.query(query, [sipId]);
    callback(null, result.rows);
  } catch (err) {
    callback(err);
  }
};

module.exports = {
  createSip,
  getSipById,
  processSip,
  getSipTransactions
};
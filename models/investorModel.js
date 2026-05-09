// const db = require("../utility/pgManager");
// const users = [
//     {
//         email:"abhi@gmail.com",
//         password:"abhi",
//         role:"investor",
//         isLoggedIn:false
//     }
// ]


// const invalidTokens =[]

// const loginUser = (email,password) => {
//     const userIndex = users.findIndex(
//         (u)=> u.email == email && u.password == password
//     )
//     if(userIndex != -1){
//         users[userIndex] = {...users[userIndex],isLoggedIn: true}
//     }
//     return users[userIndex]
// }

// const logoutUser = (email,token) =>{
//     const userIndex = users.findIndex((u)=> u.email == email && u.isLoggedIn == true)
//     if(userIndex != -1){
//         users[userIndex] = {...users[userIndex],isLoggedIn: false}
//         invalidTokens.push(token)
//         return true
//     }
//     return false
// }


// const createInvestor = (investorData, callback) => {
//     const query = `
//         INSERT INTO investor (
//             investor_id,
//             first_name,
//             middle_name,
//             last_name,
//             pancard_no,
//             aadhaar_no,
//             date_of_birth,
//             gender,
//             occupation,
//             passport_no
//         )
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     db.run(
//         query,
//         [
//             investorData.investor_id,
//             investorData.first_name,
//             investorData.middle_name,
//             investorData.last_name,
//             investorData.pancard_no,
//             investorData.aadhaar_no,
//             investorData.date_of_birth,
//             investorData.gender,
//             investorData.occupation,
//             investorData.passport_no
//         ],
//         callback
//     );
// };

// module.exports = {
//     createInvestor
// };


// const getInvestorById = (investorId, callback) => {
//     const query = `
//         SELECT * 
//         FROM investor
//         WHERE investor_id = ?
//     `;
//     db.get(query, [investorId], callback);
// };

// const getInvestorHoldings = (investorId, callback) => {
//     const query = `
//         SELECT 
//             mf.fund_name,
//             ph.total_units,
//             nh.nav_value,
//             (ph.total_units * nh.nav_value) AS current_value
//         FROM portfolio p
//         JOIN portfolio_holdings ph
//             ON p.portfolio_id = ph.portfolio_id
//         JOIN mutual_fund mf
//             ON ph.fund_id = mf.fund_id
//         JOIN nav_history nh
//             ON mf.fund_id = nh.fund_id
//         WHERE p.investor_id = ?
//     `;
//     db.all(query, [investorId], callback);
// };

// const calculateNAV = (investorId, callback) => {
//     const query = `
//         SELECT 
//             SUM(ph.total_units * nh.nav_value) AS net_worth
//         FROM portfolio p
//         JOIN portfolio_holdings ph
//             ON p.portfolio_id = ph.portfolio_id
//         JOIN nav_history nh
//             ON ph.fund_id = nh.fund_id
//         WHERE p.investor_id = ?
//     `;
//     db.get(query, [investorId], callback);
// };






// module.exports = {loginUser, logoutUser,getInvestorById,
//     getInvestorHoldings,
//     calculateNAV,createInvestor, invalidTokens} 


const db = require("../utility/pgManager");

const users = [
  {
    email: "abhi@gmail.com",
    password: "abhi",
    role: "investor",
    isLoggedIn: false
  }
];

const invalidTokens = [];

const loginUser = (email, password) => {
  const userIndex = users.findIndex(
    (u) => u.email === email && u.password === password
  );

  if (userIndex !== -1) {
    users[userIndex].isLoggedIn = true;
    return users[userIndex];
  }

  return null;
};

const logoutUser = (email, token) => {
  const userIndex = users.findIndex(
    (u) => u.email === email && u.isLoggedIn === true
  );

  if (userIndex !== -1) {
    users[userIndex].isLoggedIn = false;
    invalidTokens.push(token);
    return true;
  }

  return false;
};

const createInvestor = async (investorData, callback) => {
  const query = `
    INSERT INTO investor (
      investor_id,
      first_name,
      middle_name,
      last_name,
      pancard_no,
      aadhaar_no,
      date_of_birth,
      gender,
      occupation,
      passport_no
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
  `;

  try {
    await db.query(query, [
      investorData.investor_id,
      investorData.first_name,
      investorData.middle_name,
      investorData.last_name,
      investorData.pancard_no,
      investorData.aadhaar_no,
      investorData.date_of_birth,
      investorData.gender,
      investorData.occupation,
      investorData.passport_no
    ]);

    callback(null);
  } catch (err) {
    callback(err);
  }
};

const getInvestorById = async (investorId, callback) => {
  const query = `
    SELECT * FROM investor
    WHERE investor_id = $1
  `;

  try {
    const result = await db.query(query, [investorId]);
    callback(null, result.rows[0]);
  } catch (err) {
    callback(err);
  }
};

const getInvestorHoldings = async (investorId, callback) => {
  const query = `
    SELECT
      mf.fund_name,
      ph.total_units,
      nh.nav_value,
      (ph.total_units * nh.nav_value) AS current_value
    FROM portfolio p
    JOIN portfolio_holdings ph
      ON p.portfolio_id = ph.portfolio_id
    JOIN mutual_fund mf
      ON ph.fund_id = mf.fund_id
    JOIN nav_history nh
      ON mf.fund_id = nh.fund_id
    WHERE p.investor_id = $1
  `;

  try {
    const result = await db.query(query, [investorId]);
    callback(null, result.rows);
  } catch (err) {
    callback(err);
  }
};

const calculateNAV = async (investorId, callback) => {
  const query = `
    SELECT
      SUM(ph.total_units * nh.nav_value) AS net_worth
    FROM portfolio p
    JOIN portfolio_holdings ph
      ON p.portfolio_id = ph.portfolio_id
    JOIN nav_history nh
      ON ph.fund_id = nh.fund_id
    WHERE p.investor_id = $1
  `;

  try {
    const result = await db.query(query, [investorId]);
    callback(null, result.rows[0]);
  } catch (err) {
    callback(err);
  }
};

module.exports = {
  loginUser,
  logoutUser,
  createInvestor,
  getInvestorById,
  getInvestorHoldings,
  calculateNAV,
  invalidTokens
};
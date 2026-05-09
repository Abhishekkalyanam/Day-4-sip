// const jwt = require('jsonwebtoken')
// const secret = "qazwsxedcasdfghjkltgertydfghujnuygfdx"
// function signJwt(payload) {
//     try {
//         const token = jwt.sign(payload,secret,{
//             expiresIn: "5d"
//         })
//         return token
//     } catch (error) {
//         console.log(error)
//     }
// }
// function verifyJwt(token){
//     try {
//         const payload = jwt.verify(token,secret)
//         return payload
//     } catch (error) {
//         return {status: 401, message:"Invalid Token","error":0}
//     }
// }

// module.exports = {
//     signJwt,verifyJwt
// }
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

function signJwt(payload) {
  try {
    const token = jwt.sign(payload, secret, {
      expiresIn: "5d"
    });

    return token;
  } catch (error) {
    console.log(error);
  }
}

function verifyJwt(token) {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    return {
      status: 401,
      message: "Invalid Token",
      error: 0
    };
  }
}

module.exports = {
  signJwt,
  verifyJwt
};
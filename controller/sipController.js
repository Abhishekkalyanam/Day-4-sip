// const {
//     createSip,
//     getSipById,
//     processSip,
//     getSipTransactions
// } = require("../models/sipModel");

// const addSip = (req, res) => {
//     createSip(req.body, (err) => {
//         if (err) {
//             return res.status(500).json({
//                 message: "Error creating SIP",
//                 error: err.message
//             });
//         }

//         return res.status(201).json({
//             message: "SIP created successfully"
//         });
//     });
// };

// const getSip = (req, res) => {
//     const { sipId } = req.params;

//     getSipById(sipId, (err, data) => {
//         if (err) {
//             return res.status(500).json({
//                 message: "Error fetching SIP"
//             });
//         }

//         return res.status(200).json(data);
//     });
// };

// // Process SIP
// const processSipInstallment = (req, res) => {
//     const { sipId } = req.params;

//     processSip(sipId, (err) => {
//         if (err) {
//             return res.status(500).json({
//                 message: "Error processing SIP"
//             });
//         }

//         return res.status(200).json({
//             message: "SIP processed successfully"
//         });
//     });
// };

// const getTransactions = (req, res) => {
//     const { sipId } = req.params;

//     getSipTransactions(sipId, (err, data) => {
//         if (err) {
//             return res.status(500).json({
//                 message: "Error fetching transactions"
//             });
//         }

//         return res.status(200).json(data);
//     });
// };

// module.exports = {
//     addSip,
//     getSip,
//     processSipInstallment,
//     getTransactions
// };


const {
  createSip,
  getSipById,
  processSip,
  getSipTransactions
} = require("../models/sipModel");

const addSip = (req, res) => {
  createSip(req.body, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error creating SIP",
        error: err.message
      });
    }

    return res.status(201).json({
      message: "SIP created successfully"
    });
  });
};

const getSip = (req, res) => {
  const { sipId } = req.params;

  getSipById(sipId, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching SIP",
        error: err.message
      });
    }

    if (!data) {
      return res.status(404).json({
        message: "SIP not found"
      });
    }

    return res.status(200).json(data);
  });
};

const processSipInstallment = (req, res) => {
  const { sipId } = req.params;

  processSip(sipId, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error processing SIP",
        error: err.message
      });
    }

    return res.status(200).json({
      message: "SIP processed successfully"
    });
  });
};

const getTransactions = (req, res) => {
  const { sipId } = req.params;

  getSipTransactions(sipId, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching transactions",
        error: err.message
      });
    }

    return res.status(200).json(data);
  });
};

module.exports = {
  addSip,
  getSip,
  processSipInstallment,
  getTransactions
};
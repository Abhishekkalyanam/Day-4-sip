// const express = require("express");
// const router = express.Router();

// const {
//     addSip,
//     getSip,
//     processSipInstallment,
//     getTransactions
// } = require("../controller/sipController");

// const { checkAccess } = require("../utility/middleware");

// router.post("/", checkAccess, addSip);
// router.get("/:sipId", checkAccess, getSip);
// router.post("/:sipId/process", checkAccess, processSipInstallment);
// router.get("/:sipId/transactions", checkAccess, getTransactions);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  addSip,
  getSip,
  processSipInstallment,
  getTransactions
} = require("../controller/sipController");

const { checkAccess } = require("../utility/middleware");

router.post("/", checkAccess, addSip);
router.get("/:sipId", checkAccess, getSip);
router.post("/:sipId/process", checkAccess, processSipInstallment);
router.get("/:sipId/transactions", checkAccess, getTransactions);

module.exports = router;
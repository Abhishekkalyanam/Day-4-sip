// const express = require("express");
// const router = express.Router();

// const {
//     addFund,
//     getFunds,
//     updateNav
// } = require("../controller/fundController");

// const { checkAccess } = require("../utility/middleware");

// router.post("/", checkAccess, addFund);
// router.get("/getfunds", checkAccess, getFunds);
// router.put("/:fundId/nav", checkAccess, updateNav);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  addFund,
  getFunds,
  updateNav
} = require("../controller/fundController");

const { checkAccess } = require("../utility/middleware");

router.post("/", checkAccess, addFund);
router.get("/getfunds", checkAccess, getFunds);
router.put("/:fundId/nav", checkAccess, updateNav);

module.exports = router;
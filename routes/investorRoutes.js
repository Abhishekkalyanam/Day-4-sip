const { login, logout,addInvestor,getInvestor,getHoldings,getNAV } = require('../controller/investorController')

const express = require('express')
const router = express.Router()
const { verifyJwt } = require('../utility/authManager')
const { invalidTokens } = require('../models/investorModel')
const { checkAccess } = require('../utility/middleware')

router.post('/login',login)
router.post('/logout',logout)
router.post("/", addInvestor);
router.get("/:investorId", checkAccess, getInvestor);
router.get("/:investorId/holdings", checkAccess, getHoldings);
router.get("/:investorId/nav", checkAccess, getNAV);

module.exports=router;
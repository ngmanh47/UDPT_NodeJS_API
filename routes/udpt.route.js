const express = require("express");
const router = express.Router();
const userModel = require('../models/user.model');
const { successResponse } = require('../middlewares/success-response.mdw');

// export dữ liệu
router.post("/", async function (req, res) {

  return successResponse(res, "Success", []);
});





module.exports = router;
const express = require("express")
const router = express.Router()

const getDatasetController = require("../controller/getDatasetController")

router.get('/getDatasetValue', getDatasetController.getDataset)

module.exports = router
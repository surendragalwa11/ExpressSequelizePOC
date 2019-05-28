var express = require('express');
var router = express.Router();

var assetController = require('../controllers/asset.js');

router.post('/', async(req, res) => {
  var resp = await assetController.purchaseAsset(req.body);
  res.status(resp.Response).json(resp);
});

module.exports = router;
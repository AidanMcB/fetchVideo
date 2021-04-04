var express = require("express");
var router = express.Router();
import { JsonDB} from 'node-json-db';
router.get("/", function(req, res, next) {
    res.send(data);
});

module.exports = router;
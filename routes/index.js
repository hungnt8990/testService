var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const assert = require('assert');
const url_CLC_Primary = 'mongodb://102.165.49.9:27017';
const url_CLC_Secondary = 'mongodb://localhost:27017';
const dbName = 'LTR';

/* GET home page. */
router.get('/', async function (req, res, next) {
  let result_Primary, result_Secondary;
  await MongoClient.connect(url_CLC_Primary, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LTR");
    dbo.collection("followwallets").find({}).toArray(function (err, result) {
      if (err) throw err;
      result_Primary = result;
      db.close();
    });
  });
  await MongoClient.connect(url_CLC_Secondary, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LTR");
    dbo.collection("followwallets").find({}).toArray(function (err, result) {
      if (err) throw err;
      result_Secondary = result;
      db.close();
    });
  });
  res.json({
    result_Primary: result_Primary,
    result_Secondary: result_Secondary
  });

  // res.render('index', { title: 'Express' });
});

router.get('/api/checkCollection', (req, res) => {

  MongoClient.connect('mongodb://localhost:27017', function (err, db) {
    if (err) throw err;
    var dbo = db.db("store");
    dbo.collection("products").find({}).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
})

module.exports = router;

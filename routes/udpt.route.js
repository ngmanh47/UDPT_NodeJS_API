const express = require("express");
const router = express.Router();
const csv = require('fast-csv');
const path = require('path');
const fs = require('fs');
const questionModel = require('../models/question.model');
const quesCatModel = require('../models/question-category.model');
const { successResponse } = require('../middlewares/success-response.mdw');


class CsvFile {
  static write(filestream, rows, options) {
    return new Promise((res, rej) => {
      csv.writeToStream(filestream, rows, options)
        .on('error', err => rej(err))
        .on('finish', () => res());
    });
  }

  constructor(opts) {
    this.headers = opts.headers;
    this.path = opts.path;
    this.writeOpts = { headers: this.headers, includeEndRowDelimiter: true };
  }

  create(rows) {
    return CsvFile.write(fs.createWriteStream(this.path), rows, { ...this.writeOpts });
  }

  append(rows) {
    return CsvFile.write(fs.createWriteStream(this.path, { flags: 'a' }), rows, {
      ...this.writeOpts,
      // dont write the headers when appending
      writeHeaders: false,
    });
  }

  read() {
    return new Promise((res, rej) => {
      fs.readFile(this.path, (err, contents) => {
        if (err) {
          return rej(err);
        }
        return res(contents);
      });
    });
  }
}


// export câu hỏi
router.get('/question/export-csv', async function (req, res) {
  // get all question
  let limit = req.query.limit;
  const listQues = await questionModel.all(1, limit ? limit : 10);

  // export
  const fileName = 'export-question-' + new Date().getTime() + '.csv';
  const csvFile = new CsvFile({
    path: path.resolve(__dirname + '/../public', fileName),
    // headers to write
    headers: ['question_id', 'question_category_name', 'question_title', 'question_detail', 'firstname', 'lastname'],
  });

  // 1. create the csv
  csvFile
    .create(listQues)
    .then(() => csvFile.read())
    .then(contents => {
      console.log(`${contents}`);
      // res.send(`<a href='/public/${fileName}' download='${fileName}' id='download-link'></a> <script>document.getElementById('download-link').click();</script>`)
      successResponse(res, "Export data success", null, 200);
    })
    .catch(err => {
      console.error(err.stack);
      successResponse(res, "Export data fail", null, 400, false);
    });
})


// export danh mục câu hỏi
router.get('/question-category/export-csv', async function (req, res) {
  // get all question
  let limit = req.query.limit;
  const listQues = await quesCatModel.all(1, limit ? limit : 10);

  // export
  const fileName = 'export-question-category-' + new Date().getTime() + '.csv';
  const csvFile = new CsvFile({
    path: path.resolve(__dirname + '/../public', fileName),
    // headers to write
    headers: ['question_category_id', 'question_category_name'],
  });

  // 1. create the csv
  csvFile
    .create(listQues)
    .then(() => csvFile.read())
    .then(contents => {
      console.log(`${contents}`);
      // res.send(`<a href='/public/${fileName}' download='${fileName}' id='download-link'></a> <script>document.getElementById('download-link').click();</script>`)
      successResponse(res, "Export data success", null, 200);
    })
    .catch(err => {
      console.error(err.stack);
      successResponse(res, "Export data fail", null, 400, false);
    });
})


module.exports = router;
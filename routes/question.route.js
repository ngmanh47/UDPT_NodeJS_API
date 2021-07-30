const express = require('express');
const router = express.Router();
const schemaQues = require('../schema/question.json');
const questionModel = require('../models/question.model');
const answerModel = require('../models/answer.model');
const { successResponse } = require('../middlewares/success-response.mdw');


// danh sách câu hỏi
router.get('/', async function (req, res) {
    // phân trang (page, limit), sắp xếp
    let page = req.query.page;
    let limit = req.query.limit;
    let sort = req.query.sort;
    const list = await questionModel.all(page, limit, sort);
    const data = {
        data: list,
        page: page ? page : 1
    }
    successResponse(res, "Query data success", data);
})

// chi tiết câu hỏi, kèm câu trả lời
router.get('/:id', async function (req, res) {
    const id = req.params.id || 0;
    var question = await questionModel.single(id);
    if (question) {
        // get list answer
        const listAns = await answerModel.getAnswerByQuestionId(id);
        console.log(question);
        question.list_answer = listAns ? listAns : [];

        successResponse(res, "Query data success", question);
    } else {
        successResponse(res, "Have not question", null, 400, false);
    }

})

// thêm câu hỏi
router.post('/', require('../middlewares/validate.mdw')(schemaQues.create), async function (req, res) {
    let question = req.body;
    question.created_at = new Date();
    const ids = await questionModel.add(question);
    question.question_id = ids[0];
    successResponse(res, "Create data success", question, 201);
})

// chỉnh sửa câu hỏi
router.patch('/:id', require('../middlewares/validate.mdw')(schemaQues.update), async function (req, res) {
    const id = req.params.id
    const question = req.body;
    const result = await questionModel.edit(id, question);
    successResponse(res, "Update data success", result, 201);
})


// xoá câu hỏi
router.delete('/:id', async function (req, res) {
    const id = req.params.id;
    const result = await questionModel.delete(id);
    successResponse(res, "Delete data success", result, 200);
})


module.exports = router;
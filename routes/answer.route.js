const express = require('express');
const router = express.Router();
const schemaAns = require('../schema/answer.json');
const answerModel = require('../models/answer.model');
const { successResponse } = require('../middlewares/success-response.mdw');


// thêm câu trả lời
router.post('/', require('../middlewares/validate.mdw')(schemaAns.create), async function (req, res) {
    let answer = req.body;
    answer.created_at = new Date();
    const ids = await answerModel.add(answer);
    answer.answer_id = ids[0];
    successResponse(res, "Create data success", answer, 201);
})

// chỉnh sửa câu trả lời
router.patch('/:id', require('../middlewares/validate.mdw')(schemaAns.update), async function (req, res) {
    const id = req.params.id
    const answer = req.body;
    const result = await answerModel.edit(id, answer);
    successResponse(res, "Update data success", result, 201);
})

// xoá câu trả lờI
router.delete('/:id', async function (req, res) {
    const id = req.params.id;
    const result = await answerModel.delete(id);
    successResponse(res, "Delete data success", result, 200);
})

module.exports = router;
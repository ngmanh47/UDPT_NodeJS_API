const express = require('express');
const router = express.Router();
const schema = require('../schema/question-category.json');
const quesCatModel = require('../models/question-category.model');
const { successResponse } = require('../middlewares/success-response.mdw');


// danh sách danh muc câu hỏi
router.get('/', async function (req, res) {
    // phân trang (page, limit), sắp xếp
    let page = req.query.page;
    let limit = req.query.limit;
    let sort = req.query.sort;
    const list = await quesCatModel.all(page, limit, sort);
    const data = {
        data: list,
        page: page ? page : 1 
    }
    successResponse(res, "Query data success", data);
})

// thêm danh mục câu hỏi
router.post('/', require('../middlewares/validate.mdw')(schema.create), async function (req, res) {
    let quesCat = req.body;
    quesCat.created_at = new Date();
    const ids = await quesCatModel.add(quesCat);
    quesCat.question_category_id = ids[0];
    successResponse(res, "Create data success", quesCat, 201);
})

// chỉnh sửa danh mục câu hỏi
router.patch('/:id', require('../middlewares/validate.mdw')(schema.update), async function (req, res) {
    const id = req.params.id
    const quesCat = req.body;
    const result = await quesCatModel.edit(id, quesCat);
    successResponse(res, "Update data success", result, 201);
})

// xoá danh mục câu hỏi
router.delete('/:id', async function (req, res) {
    const id = req.params.id;
    const result = await quesCatModel.delete(id);
    successResponse(res, "Delete data success", result, 200);
})

module.exports = router;
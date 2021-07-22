const db = require("../utils/db");

const TABLE_NAME = "answers";
const PRIMARY_KEY = "answer_id";
const IS_ACTIVE = 1;
const IS_APPROVE = 1;

module.exports = {
    async getAnswerByQuestionId(questionId) {
        return await db(TABLE_NAME)
        .where("question_id", questionId)
        .where("is_active", IS_ACTIVE)
        .where("is_approve", IS_APPROVE)
    },
    // add
    add(data) {
        return db(TABLE_NAME).insert(data);
    },
    // edit
    edit(id, data) {
        return db(TABLE_NAME).where(PRIMARY_KEY, id).update(data);
    },
    // delete
    delete(id) {
        return db(TABLE_NAME).where(PRIMARY_KEY, id).update({ is_active: 0 });
    },
}
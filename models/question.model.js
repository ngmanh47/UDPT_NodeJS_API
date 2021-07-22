const db = require("../utils/db");

const TABLE_NAME = "questions";
const PRIMARY_KEY = "question_id";
const IS_ACTIVE = 1;
const IS_APPROVE = 1;
const LIMIT = process.env.LIMIT;
const SORT_TYPE = "ASC";

module.exports = {
    // get all by filter
    async all(page = 1, limit = LIMIT, sort = SORT_TYPE) {
        const listQues = await db(TABLE_NAME)
        .join("question_categories", `${TABLE_NAME}.question_category_id`, "=", "question_categories.question_category_id")
        .where(`${TABLE_NAME}.is_active`, IS_ACTIVE)
        .select(`${TABLE_NAME}.*`, "question_categories.question_category_name")
        .orderBy(`${TABLE_NAME}.${PRIMARY_KEY}`, sort)
        .limit(limit)
        .offset((page - 1) * limit);

        return listQues;
    },

    // get one
    async single(id) {
        const item = await db(TABLE_NAME)
        .where(`is_active`, IS_ACTIVE)
        .where(`is_approve`, IS_APPROVE)
        .where(PRIMARY_KEY, id);

        if (item.length === 0) {
            return null;
        }
        return item[0];
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
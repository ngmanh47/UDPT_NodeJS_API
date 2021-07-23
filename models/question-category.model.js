const db = require("../utils/db");

const TABLE_NAME = "question_categories";
const PRIMARY_KEY = "question_category_id";
const IS_ACTIVE = 1;
const SORT_TYPE = "ASC";

module.exports = {
    // get all by filter
    async all(page = 1, limit = LIMIT, sort = SORT_TYPE) {
        const list = await db(TABLE_NAME)
        .where(`${TABLE_NAME}.is_active`, IS_ACTIVE)
        .orderBy(`${TABLE_NAME}.${PRIMARY_KEY}`, sort)
        .limit(limit)
        .offset((page - 1) * limit);
        return list;
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
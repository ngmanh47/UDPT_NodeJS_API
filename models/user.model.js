const db = require("../utils/db");

const TABLE_NAME = "users";
const PRIMARY_KEY = "user_id";
const NOT_DELETE = 0;
const LIMIT = process.env.LIMIT;
const SORT_TYPE = "ASC";

module.exports = {
  async all() {
    return await db("user");
  },

  add(user) {
    return db("user").insert(user);
  },

  async getByEmail(email) {
    const users = await db("user").where("email", email);
    if (users.length === 0) {
      return null;
    }

    return users[0];
  },

  async singleByUserName(username) {
    const users = await db(TABLE_NAME)
      .where("username", username);

    if (users.length === 0) {
      return null;
    }
    return users[0];
  },

  patchRFToken(id, rfToken) {
    return db("user").where("user_id", id).update("refresh_token", rfToken);
  },

  async isValidRFToken(id, rfToken) {
    const list = await db("user")
      .where("user_id", id)
      .andWhere("refresh_token", rfToken)
      .first();

    if (list) {
      return true;
    }

    return false;
  },
};

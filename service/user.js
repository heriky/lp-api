const userDb = require('../db/user');

module.exports = {
    async login(username, password) {
        const user = await userDb.login(username, password);
        return user && user.id;
    },
    async register(obj) {
        
        // 查询是否已经存在
        const prevUser = await userDb.getUserByName(obj.username);
        const isExist = prevUser && prevUser.username;
        if (isExist) return null;

        // 如果不存在，则插入新的用户
        const rs = await userDb.register(obj);
        if (rs.affectedRows === 1) return rs.insertId;
    },
    async getUserById(userId) {
        const user = await userDb.getUserById(userId);
        return user;
    },
    async reviseUserDetail(userId, params){
        const rs = await userDb.reviseUserDetail(userId, params);
        if (rs.affectedRows !== null) return true;
        return false;
    },
    async revisePwd() {},
}
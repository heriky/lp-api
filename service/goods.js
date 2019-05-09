const goodsDb = require('../db/goods');

module.exports = {
    async getGoods(params) {
        const rs = await goodsDb.getGoods(params);
        return rs;
    },
    async publishGoods(userId, params) {
        const rs = await goodsDb.publishGoods(userId, params);
        return rs;
    },
    async reviseGoods(goodsId, params) {
        const rs = await goodsDb.reviseGoods(goodsId, params);
        return rs;
    },
    async deleteGoods(goodsId) {
        const rs =  await goodsDb.deleteGoods(goodsId);
        return rs;
    }
};
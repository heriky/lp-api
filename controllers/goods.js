const goodsService = require('../service/goods');
const saveUploadFiles = require('../utils/uploader').saveUploadFiles;

module.exports = {
    async getGoods(ctx, next) {
        // 所以这里只接收userId、keyword和goodsId
        const { userId, keyword, goodsId } = ctx.query;
        const params = { userId, keyword, goodsId };
        // userId != null && ( params.userId = userId );
        // keyword != null && ( params.keyword = keyword );
        
        const goodsList = await goodsService.getGoods(params);
        ctx.body = {
            status: 'success',
            data: goodsList
        }

    },
    async publishGoods(ctx, next) {
        const { userId, name, price, description } = ctx.request.body;
        if (userId == null) {
            ctx.status = 500;
            ctx.body = { status: 'error', message: '缺少userId' }
            return;
        }

        const isValidParams = [name, price, description].every(it => it != null);
        if (!isValidParams) {
            ctx.status = 500;
            ctx.body = { status: 'error', message: '参数[name, price, description, faceUrl]缺一不可' }
            return;
        }

        const imageRs = saveUploadFiles(ctx);

        const params = { name, price, description, ...imageRs };
        const rs = await goodsService.publishGoods(userId, params);
        if (rs == null) throw new Error('发布商品失败啦！');

        ctx.body = { message: '发布成功', data: { goodsId: rs } };
    },
    async reviseGoods(ctx, next) {
        const goodsId = ctx.params.goodsId;
        if (goodsId == null) { ctx.status = 500; return ctx.body = { status: 'error', message: '错误的请求，缺少goodsId' } };
        const { name, price, description } = ctx.request.body;
        const imageRs = saveUploadFiles(ctx);
        
        const params = { name, price, description, ...imageRs };
        const rs = await goodsService.reviseGoods(goodsId, params); 
        
        if (rs == null) throw new Error('修改商品失败啦');
        ctx.body = { message: '修改成功' };
    },
    async deleteGoods(ctx, next) {
        const goodsId = ctx.params.goodsId;
        if (goodsId == null) { ctx.status = 500; return ctx.body = { status: 'error', message: '错误的请求，缺少goodsId' } };

        const rs = await goodsService.deleteGoods(goodsId);
        if(rs == null) throw new Error('删除失败');
        ctx.body = { message: '删除成功' };
    },
};



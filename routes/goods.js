const router = require('koa-router')();
const koaBody = require('koa-body');
const goodsController = require('../controllers/goods');

/**
 *  get /goods?keyword=aaa&userId=111 获取所有商品, 搜索商品（按userId查， 按关键字keyword查， 按goodsId查详情）
 *  post /goods 发布商品
 * 
 *  get /goods/:goodsId 获取当前商品详情
 *  put /goods/:goodsId 修改当前商品信息
 *  delete /goods/:goodsId 删除当前商品
 *  
 */

router.prefix('/lp/v1/goods');

router.get('/', goodsController.getGoods);

router.post('/', goodsController.publishGoods);

router.put('/:goodsId', goodsController.reviseGoods);

router.delete('/:goodsId', goodsController.deleteGoods);

module.exports = router;
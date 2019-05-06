const router = require('koa-router')()

/**
 *  post /user/login 登陆
 *  post /user/register 注册
 *  get /user/:userId 获取用户信息
 *  put /user/:userId 修改用户信息
 *  put /user/:userId/pwd 修改用户密码
 *  
 */

router.prefix('/lp/v1/goods')
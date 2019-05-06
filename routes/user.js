const router = require('koa-router')()
const userController = require('../controllers/user');

/**
 *  post /user/login 登陆
 *  post /user/register 注册
 *  get /user/:userId 获取用户信息
 *  put /user/:userId 修改用户信息
 *  put /user/:userId/pwd 修改用户密码
 *  
 */

router.prefix('/lp/v1/user')

router.post('/login', userController.login);

router.post('/register', userController.register);

router.put('/:userId', userController.reviseUserDetail);

router.get('/:userId', userController.getUserById);

router.put('/:userId/pwd', userController.revisePwd);

module.exports = router;

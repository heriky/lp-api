const userService = require('../service/user');


module.exports = {
    async login(ctx, next) {
        const { username, password } = ctx.request.body;
        const rs = await userService.login(username, password);
        
        if (rs != null) return ctx.body = { userId: rs, message: '登陆成功' }

        ctx.status = 500;
        ctx.body = { status: 'error', message: '用户名密码不匹配' };
    },
    async register(ctx, next) {
        // const { username, password, phone, department, gender } = ctx.request.body;
        const body = ctx.request.body;
        if (['username', 'password', 'phone', 'department', 'gender'].some(prop => !(prop in body) || body[prop] == null )) {
            ctx.status = 500;
            ctx.body = {
                status: 'success',
                message: "必须包含有效的字段['username', 'password', 'phone', 'department', 'gender']"
            }
            return;
        }
        const rs = await userService.register(ctx.request.body);
        console.log(rs === null);
        if (rs === null) {
            ctx.status = 500;
            ctx.body = { status: 'error', message: '注册失败, 该用户名已经存在！' }
            return;
        }
        ctx.body = { status: 'success', userId: rs, message: '注册成功' };
    },
    async getUserById(ctx, next) {},
    async reviseUserDetail(ctx, next){},
    async revisePwd(ctx, next) {},
}
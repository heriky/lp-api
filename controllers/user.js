const userService = require('../service/user');
const saveUploadFiles = require('../utils/uploader').saveUploadFiles;

module.exports = {
    async login(ctx, next) {
        const { username, password } = ctx.request.body;
        
        const isValidParam = [username, password].every(item => item != null && item !== '');
        console.log(username, password);
        if (!isValidParam) return ctx.body = { status: 'error', message: '用户名密码不能为空' };

        const rs = await userService.login(username, password);
        
        if (rs != null) return ctx.body = { userId: rs, message: '登陆成功' }

        ctx.status = 500;
        ctx.body = { status: 'error', message: '啊啊啊，用户名密码不匹配' };
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
    async getUserById(ctx, next) {
        const userId = ctx.params.userId;
        if (userId == null) {
            ctx.status = 500;
            return ctx.body = { status: 'error', message: '缺少userId' };
        }
        const userDetail = await userService.getUserById(userId);

        if (!userDetail) {
            ctx.status = 500;
            return ctx.body = { status: 'error', message: '未找到用户信息' };
        }

        ctx.body = {
            status: 'success',
            data: userDetail
        }
    },
    async reviseUserDetail(ctx, next){
        const userId = ctx.params.userId;

        // 可修改的信息包括： username, avatar, gender, phone, department, password
        const { username, avatar, gender, phone, department, password } = ctx.request.body;
        const params = { username, avatar, gender, phone, department, password };
        const isValidParam = [username, avatar, gender, phone, department, password].some(it => it != null);
        if (!isValidParam) {
            ctx.status = 500;
            ctx.body = {
                status: 'error',
                message: '修改功能需要传递以下至少一个参数:  [username, avatar, gender, phone, department, password]'
            }
            return;
        }

        const avatarRs = saveUploadFiles(ctx);
        params = {...params, ...avatarRs};

        const rs = await userService.reviseUserDetail(userId, params);
        if (rs) {
            return ctx.body = { status: 'success', message: '修改成功' }
        }
        ctx.status = 500;
        ctx.body = { status: 'error', message: '修改发生错误！！！！！！！！！！' }
    },
    async revisePwd(ctx, next) {},
}
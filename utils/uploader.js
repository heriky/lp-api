const fs = require('fs');
const path = require('path');

/**
 * 处理上传文件流
 */
function saveUploadFiles(ctx) {
    const raw = ctx.request.files;
    if (raw == null) return {};

    const rs = {};
    for (let filedName in raw) {
        const file = raw[filedName];
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        
        // 获取上传文件扩展名
        const uri = `/upload/${Date.now()}_${file.name}`;
        let filePath = path.resolve(__dirname, '../public' + uri);
        
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
        rs[filedName] = ctx.origin + uri; // 拼接服务器地址
    }
    return rs;
}

module.exports = { saveUploadFiles };
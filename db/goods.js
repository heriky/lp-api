const dbInitializer = require('./init');

module.exports = {
    async getConn() {
        const pool = await dbInitializer.getPool();
        const conn = await pool.getConnection();
        return conn;
    },
    async getGoods(params) {
        const conn = await this.getConn();


        // 按照传入的条件参数，动态构建sql进行查询
        let sqlPartial = [];
        let sqlParams = [];


        // 只支持一个条件生效，不能同事生效！！！！
        if (params['userId'] != null) {
            sqlPartial.push(' ownerId=? ');
            sqlParams.push(params['userId']);
        }
        if (params['keyword'] != null){
            sqlPartial.push(' name like ? ');
            sqlParams.push(`%${params['keyword']}%`);
        }
        if (params['goodsId'] != null) {
            sqlPartial.push(' id=? ');
            sqlParams.push(params['goodsId']);
        }

        let sqlPartialStr =  sqlPartial.length ===0 ? '' : 'where' + sqlPartial.join(' and ');

        console.log(`select * from goods where ${sqlPartialStr}`);
        const [row, fileds] = await conn.execute(`select * from goods ${sqlPartialStr}`, sqlParams);
        return row;    
    },
    async publishGoods(userId, params) {
        const conn = await this.getConn();

        const sqlPartial = ['ownerId'];
        const sqlPlaceHolder = ['?'];
        const sqlParams = [userId];
        for (let key in params) {
            const value = params[key];
            if (value == null) continue;
            sqlPartial.push(key);
            sqlPlaceHolder.push('?');
            sqlParams.push(value);
        }

        sqlPartial.push(...['createAt', 'updateAt']);
        sqlPlaceHolder.push(...['?', '?']);
        const currentTime = new Date().toLocaleDateString();
        sqlParams.push(...[currentTime, currentTime]);

        const sqlPartialStr = `(${sqlPartial.join(',')})`;
        const sqlPlaceHolderStr = `(${sqlPlaceHolder.join(',')})`

        const [row, fileds] = await conn.execute(`insert into goods ${sqlPartialStr} values ${sqlPlaceHolderStr}`, sqlParams);
        if (row.affectedRows === 1) return row.insertId;
        return null;
    },
    async reviseGoods(goodsId, params) {
        const conn = await this.getConn();

        // 只更新不为空的参数
        const sqlPartial = [];
        const sqlParams = [];
        for (let key in params) {
            const value = params[key];
            if (value == null) continue;
            sqlPartial.push(`${key}=?`);
            sqlParams.push(value);
        }
        const sqlPartialStr = sqlPartial.join(',');

        const [row, fileds] = await conn.execute(`update goods set ${sqlPartialStr} where id=?`, [...sqlParams, goodsId]);
        return row;
    },
    async deleteGoods(goodsId) {
        const conn = await this.getConn();

        const [row, fileds] = await conn.execute('delete from goods where id=?', [goodsId]);
        return row;
    }
}
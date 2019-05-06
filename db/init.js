/**
 * 数据表初始化脚本
 */

 const mysql = require('mysql2/promise');

 const dbConf = {
    host: 'localhost',
    user: 'root',
    database: 'lp_api',
    password: '1234',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };

 const TABLE_USER = `
    CREATE TABLE IF NOT EXISTS USER( 
        id  int auto_increment primary key,
        username varchar(40),
        avatar varchar(255) DEFAULT '/images/female.png',
        gender  varchar(40),
        phone   varchar(20),
        password  varchar(20),
        department  varchar(100)
    ) DEFAULT charset=utf8;`;

const TABLE_GOODS = `
    CREATE TABLE IF NOT EXISTS GOODS( 
        id  int auto_increment primary key,
        name varchar(255),
        price  FLOAT,
        createAt VARCHAR(40),
        updateAt VARCHAR(40),
        faceUrl VARCHAR(255),
        description VARCHAR(255) COMMENT '简介',
        ownerId int COMMENT '归属者'
                
    ) DEFAULT charset=utf8;`;


let pool = null; // 数据库连接池, 单例

module.exports = {
    async getPool() {
        return pool || (pool = await mysql.createPool(dbConf));
    },
    async init() {
        const pool = await this.getPool();
        const conn = await pool.getConnection();
        console.log('数据库连接池建立成功！');
        await conn.execute(TABLE_USER);
        await conn.execute(TABLE_GOODS);
    }
}
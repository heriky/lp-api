
const dbInitializer = require('./init');

module.exports = {

    async getConn() {
        const pool = await dbInitializer.getPool();
        const conn = await pool.getConnection();
        return conn;
    },
    async login(username, password) {
        const conn = await this.getConn();
        const [row, fileds] = await conn.execute('select id from user where username=? and password=?', [username, password]);
        return row[0];
    },
    async register(obj) {
        const { username, password, gender, department, phone } = obj;
        const conn = await this.getConn();

        let avatar = gender === 'male' ? '/images/male.png' : '/images/female.png';
        avatar = gender === null ? '/images/unknown.png' : avatar;

        const [row, fileds] = await conn.execute('insert into user (username, password, gender, department, phone, avatar) values (?, ?, ?, ?, ?, ?)',[
            username, password, gender, department, phone, avatar
        ]);
        return row;
    },
    async getUserById(id) {
        const conn = await this.getConn();
        const [row, fileds] = await conn.execute('select * from user user where id=?', [id]);
        return row[0];
    },
    async getUserByName(username) {
        const conn = await this.getConn();
        const [row, fileds] = await conn.execute('select * from user user where username=?', [username]);
        return row[0];
    },
    async reviseUserDetail(){},
    async revisePwd() {},
}
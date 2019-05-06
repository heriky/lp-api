
class SqlExecutor {

    constructor(conn) {
        this.conn = conn;
    }

    async query(sql, values = []) {
        return new Promise((resolve, reject) => {
            this.conn.query(sql, values, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            })
        });
    }
    insert(sql) {
        
    }
    delete() {}
    update() {}
}
import mysql from 'promise-mysql';
import Bluebird from 'bluebird';

class Conexion {
    public pool: Bluebird<mysql.Pool>;

    constructor() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'HOSPITAL'
        }).then();
        this.conexion();
    }

    public async conexion() {
        try {
            const connection = (await (await this.pool).getConnection());
            (await this.pool).releaseConnection(connection);
            console.log(`\nConectado a MySQL: \x1b[32m%s\x1b[0m`, 'online\n');

        } catch (err) {
            console.error(err);
        }
    }
}

const database = new Conexion();
export default database.pool;
import mysql = require('mysql');
import { runInThisContext } from 'vm';

export default class MySql{
    private static _mysql: MySql;
    connection: mysql.Connection;
    connected = false;

    constructor(){
        console.log('Mysql initialized!');
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db',
        });

        this.connect();
    }

    public static get instance() {
        return this._mysql || (this._mysql = new this());
    }

    private connect(){
        this.connection.connect((error: mysql.MysqlError) => {
            if (error) {
                console.error(error.message);
                return;
            }
        });

        this.connected = true;
        console.log('Database connected!');
    }
}
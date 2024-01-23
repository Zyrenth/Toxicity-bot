import sqlite3, { Database as SQLDatabase, Statement } from 'sqlite3';

export default class Database {
    private db: SQLDatabase;
    private tableName: string = 'user_data';

    constructor(dbPath: string) {
        this.db = new sqlite3.Database(dbPath);
    }

    initTable(): void {
        this.db.run(`CREATE TABLE IF NOT EXISTS ${this.tableName} (id TEXT PRIMARY KEY, message_count INTEGER, toxic_count INTEGER)`);
    }

    createUserData(id: string, messageCount: number, toxic: number): void {
        const stmt: Statement = this.db.prepare(`INSERT INTO ${this.tableName} VALUES (?, ?, ?)`);
        stmt.run(id, messageCount, toxic);
        stmt.finalize();
    }

    updateUserData(id: string, messageCount: number, toxic: number): void {
        const stmt: Statement = this.db.prepare(`UPDATE ${this.tableName} SET message_count = ?, toxic_count = ? WHERE id = ?`);
        stmt.run(messageCount, toxic, id);
        stmt.finalize();
    }

    fetchUserData(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    hasUserData(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT id FROM ${this.tableName} WHERE id = ?`, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(!!row);
                }
            });
        });
    }
}

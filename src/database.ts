import sqlite3 from 'sqlite3';
import { open, ISqlite } from 'sqlite';
import path from 'path';


async function dbTestAsync() {
    console.log('opening sqlite');
    var db = await open<sqlite3.Database, sqlite3.Statement>({ filename: path.join(__dirname, 'database.db'), driver: sqlite3.Database });
    await db.exec('CREATE TABLE tbl (col TEXT)');
    await db.exec('INSERT INTO tbl VALUES ("test")');
    var row = await db.get('SELECT col FROM tbl WHERE col = ?', 'test');
    console.log(row);
}

async function getRow() {
    var db = await open<sqlite3.Database, sqlite3.Statement>({ filename: path.join(__dirname, 'database.db'), driver: sqlite3.Database });
    var row = await db.get('SELECT col FROM tbl WHERE col = ?', 'test');
    console.log(row);
}
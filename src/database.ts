import sqlite3 from 'sqlite3';
import { open, ISqlite } from 'sqlite';
import path from 'path';


// async function dbTestAsync() {
//     console.log('opening sqlite');
//     var db = await open<sqlite3.Database, sqlite3.Statement>({ filename: path.join(__dirname, 'wordoutDb.db'), driver: sqlite3.Database });
//     await db.exec('CREATE TABLE words (word TEXT, result INTEGER)');
//     await db.exec('INSERT INTO words VALUES ("test", 0)');
//     await db.exec('INSERT INTO words VALUES ("prueba", 1)');
//     var rows = await db.all('SELECT * FROM words');
//     console.log(rows);
// }
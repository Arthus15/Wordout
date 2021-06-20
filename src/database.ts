import sqlite3 from 'sqlite3';
import { open, ISqlite } from 'sqlite';
import path from 'path';


export class WordoutDb {
    path: string;
    dbName: string = 'wordoutDb.db';

    constructor() {
        this.path = path.join(__dirname, this.dbName);
    }

    async initAsync() {

        console.log('Iniciando Base de datos...');
        var db = await open<sqlite3.Database, sqlite3.Statement>({ filename: this.path, driver: sqlite3.Database });
        console.log('Creando tablas...');
        await db.exec('CREATE TABLE words (word TEXT NOT NULL PRIMARY KEY, result INTEGER NOT NULL)');
        await db.exec('CREATE TABLE configuration (words_number INTEGER, time INTEGER)');

        console.log('Insertando set de palabras');
        await db.exec('INSERT INTO words VALUES ("Halograma", 0)');
        await db.exec('INSERT INTO words VALUES ("Quinésico", 1)');
        await db.exec('INSERT INTO words VALUES ("Turunda", 0)');
        await db.exec('INSERT INTO words VALUES ("Aerocomercial", 0)');
        await db.exec('INSERT INTO words VALUES ("Outlet", 0)');
        await db.exec('INSERT INTO words VALUES ("Desjundicializar", 0)');
        await db.exec('INSERT INTO words VALUES ("Heparina", 1)');
        await db.exec('INSERT INTO words VALUES ("Hermenéutico", 1)');
        await db.exec('INSERT INTO words VALUES ("Impío", 1)');
        await db.exec('INSERT INTO words VALUES ("Avalorio", 0)');
        await db.exec('INSERT INTO words VALUES ("Broker", 0)');
        await db.exec('INSERT INTO words VALUES ("Matrioska", 0)');
        await db.exec('INSERT INTO words VALUES ("Veintavo", 1)');
        await db.exec('INSERT INTO words VALUES ("Antediluviano", 1)');
        await db.exec('INSERT INTO words VALUES ("Dínamo", 1)');

        console.log('Insertando configuración');
        await db.exec('INSERT INTO configuration VALUES ("10", 480)');
        await db.close();
        console.log('Base de datos inicializada');
    }

    async existsAsync(): Promise<boolean> {
        var db = await open<sqlite3.Database, sqlite3.Statement>({ filename: this.path, driver: sqlite3.Database });
        var result = await db.get('SELECT * from configuration').then(() => true).catch(() => false);
        await db.close();

        return result;
    }

    async selectAllAsync<T>(query: string) {
        var db = await open<sqlite3.Database, sqlite3.Statement>({ filename: this.path, driver: sqlite3.Database });
        var result = await db.all<T>(query);
        await db.close();

        return result;
    }

    async selectAsync<T>(query: string) {
        var db = await open<sqlite3.Database, sqlite3.Statement>({ filename: this.path, driver: sqlite3.Database });
        var result = await db.get<T>(query);
        await db.close();

        return result;
    }

    async execAsync(query: string) {
        var db = await open<sqlite3.Database, sqlite3.Statement>({ filename: this.path, driver: sqlite3.Database });
        await db.exec(query).catch((err) => console.error(err));
        await db.close();
    }
}
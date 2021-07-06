"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordoutDb = void 0;
var sqlite3_1 = __importDefault(require("sqlite3"));
var sqlite_1 = require("sqlite");
var path_1 = __importDefault(require("path"));
var WordoutDb = /** @class */ (function () {
    function WordoutDb() {
        this.dbName = 'wordoutDb.db';
        this.path = path_1.default.join(__dirname, this.dbName);
    }
    WordoutDb.prototype.initAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Iniciando Base de datos...');
                        return [4 /*yield*/, sqlite_1.open({ filename: this.path, driver: sqlite3_1.default.Database })];
                    case 1:
                        db = _a.sent();
                        console.log('Creando tablas...');
                        return [4 /*yield*/, db.exec('CREATE TABLE words (word TEXT NOT NULL PRIMARY KEY, result INTEGER NOT NULL, description TEXT)')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db.exec('CREATE TABLE configuration (words_number INTEGER, time INTEGER)')];
                    case 3:
                        _a.sent();
                        console.log('Insertando set de palabras');
                        return [4 /*yield*/, db.exec('INSERT INTO words VALUES ("Halograma", 0, "Elimina la palabra si quieres")')];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, db.exec('INSERT INTO words VALUES ("Quinésico", 1, "Elimina la palabra si quieres")')];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, db.exec('INSERT INTO words VALUES ("Turunda", 0, "Elimina la palabra si quieres")')];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, db.exec('INSERT INTO words VALUES ("Aerocomercial", 0, "Elimina la palabra si quieres")')];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, db.exec('INSERT INTO words VALUES ("Outlet", 0, "Elimina la palabra si quieres")')];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, db.exec('INSERT INTO words VALUES ("Desjundicializar", 0, "Elimina la palabra si quieres")')];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, db.exec('INSERT INTO words VALUES ("Heparina", 1, "Elimina la palabra si quieres")')];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, db.exec('INSERT INTO words VALUES ("Hermenéutico", 1, "Elimina la palabra si quieres")')];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, db.exec('INSERT INTO words VALUES ("Impío", 1, "Elimina la palabra si quieres")')];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, db.exec('INSERT INTO words VALUES ("Avalorio", 0, "Elimina la palabra si quieres")')];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, db.exec('INSERT INTO words VALUES ("Broker", 0, "Elimina la palabra si quieres")')];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, db.exec('INSERT INTO words VALUES ("Matrioska", 0, "Elimina la palabra si quieres")')];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, db.exec('INSERT INTO words VALUES ("Veintavo", 1, "Elimina la palabra si quieres")')];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, db.exec('INSERT INTO words VALUES ("Antediluviano", 1, "Elimina la palabra si quieres")')];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, db.exec('INSERT INTO words VALUES ("Dínamo", 1, "Elimina la palabra si quieres")')];
                    case 18:
                        _a.sent();
                        console.log('Insertando configuración');
                        return [4 /*yield*/, db.exec('INSERT INTO configuration VALUES ("10", 480)')];
                    case 19:
                        _a.sent();
                        return [4 /*yield*/, db.close()];
                    case 20:
                        _a.sent();
                        console.log('Base de datos inicializada');
                        return [2 /*return*/];
                }
            });
        });
    };
    WordoutDb.prototype.existsAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sqlite_1.open({ filename: this.path, driver: sqlite3_1.default.Database })];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.get('SELECT * from configuration').then(function () { return true; }).catch(function () { return false; })];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, db.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    WordoutDb.prototype.selectAllAsync = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var db, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sqlite_1.open({ filename: this.path, driver: sqlite3_1.default.Database })];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.all(query)];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, db.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    WordoutDb.prototype.selectAsync = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var db, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sqlite_1.open({ filename: this.path, driver: sqlite3_1.default.Database })];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.get(query)];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, db.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    WordoutDb.prototype.execAsync = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sqlite_1.open({ filename: this.path, driver: sqlite3_1.default.Database })];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.exec(query).catch(function (err) { return console.error(err); })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return WordoutDb;
}());
exports.WordoutDb = WordoutDb;

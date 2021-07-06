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
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("./database");
var db = new database_1.WordoutDb();
function AddWordAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var word, result, description, wordValue, wordResult, wordDescription;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    word = document.getElementById('word');
                    result = document.getElementById('wordResult');
                    description = document.getElementById('description');
                    if (!(word != null && result != null)) return [3 /*break*/, 2];
                    wordValue = word.value;
                    wordResult = result.value == 'true' ? 1 : 0;
                    wordDescription = description.value;
                    if (wordValue == '') {
                        showSnackBar('La palabra no puede estar vacia', 'is-error');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, db.execAsync("INSERT INTO words VALUES (\"" + wordValue + "\", " + wordResult + ", \"" + wordDescription + "\")")];
                case 1:
                    _a.sent();
                    showSnackBar('Palabra añadida', 'is-success');
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
function updateConfigAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var timeElement, wordsNumberElement, time, wordsNumber, words, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timeElement = document.getElementById('time');
                    wordsNumberElement = document.getElementById('wordsNumber');
                    if (!(timeElement != null && wordsNumberElement)) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    time = Number.parseInt(timeElement.value);
                    wordsNumber = Number.parseInt(wordsNumberElement.value);
                    return [4 /*yield*/, db.selectAllAsync('SELECT * FROM words')];
                case 2:
                    words = _a.sent();
                    if (words.length < wordsNumber)
                        showSnackBar('Dado que el número de palabras es mayor que las palabras registradas, el test se generará con todas las palabras hasta que se añadan más', 'is-warning');
                    return [4 /*yield*/, db.execAsync("Update configuration SET words_number = " + wordsNumber + ", time = " + time + " WHERE words_number is not null").catch(function () { return alert('Ha habido un error añadiendo la palabra'); })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function loadConfigurationPageAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var timeElement, wordsNumberElement, config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Loading configuration');
                    timeElement = document.getElementById('time');
                    wordsNumberElement = document.getElementById('wordsNumber');
                    return [4 /*yield*/, db.selectAsync('Select * FROM configuration')];
                case 1:
                    config = _a.sent();
                    if (timeElement && wordsNumberElement && config) {
                        timeElement.value = config.time.toString();
                        wordsNumberElement.value = config.words_number.toString();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function showSnackBar(msg, type) {
    var x = document.getElementById("snackbar");
    x.className = "show " + type;
    x.innerText = msg;
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

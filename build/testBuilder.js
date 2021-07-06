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
exports.TestBuilder = void 0;
var database_1 = require("./database");
var timer_1 = require("./timer");
var TestBuilder = /** @class */ (function () {
    function TestBuilder() {
        this.db = new database_1.WordoutDb();
        this.timer = new timer_1.Timer();
        this.questionHtml = '       <div id="{word}-id" class="box test-box">' +
            '            <h2>{word}</h2>' +
            '            <div class="control">' +
            '                <label class="radio">' +
            '                    <input type="radio" name="{word}" value="true">' +
            '                    Correcta' +
            '                </label>' +
            '                <label class="radio">' +
            '                    <input type="radio" name="{word}" value="false">' +
            '                    Incorrecta' +
            '                </label>' +
            '            </div>' +
            '            <div id="{word}-description" style="display: none; background-color: #7289da; margin-top: 5px; border-radius: 10px;">' +
            '            <p style="padding: 10px;">{description}</p>' +
            '            </div>' +
            '        </div>';
        this.testHTml = '       <h2 class="timer" id="timer">00:08:00</h2>' +
            '       <h2 class="mark" id="mark" style="display:none;"></h2>' +
            '       <form name="testForm" class="test-content-column">' +
            '           {questions}' +
            '       </form>' +
            '       <button onClick="testChecker.onSubmit();" class="button primary-button fixed-button">Finalizar Test</button>';
    }
    TestBuilder.prototype.buildTestAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var words, config, wordsNumber, result, test, i, rnd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.selectAllAsync('SELECT * FROM words')];
                    case 1:
                        words = _a.sent();
                        return [4 /*yield*/, this.db.selectAsync('Select * FROM configuration')];
                    case 2:
                        config = _a.sent();
                        if (config == null || config == undefined)
                            throw new Error('Null configuration');
                        wordsNumber = config.words_number > words.length ? words.length : config.words_number;
                        result = [];
                        test = [];
                        for (i = 0; i < wordsNumber; i++) {
                            rnd = Math.floor(Math.random() * ((words.length - 1)));
                            result.push(this.buildQuestion(words[rnd]));
                            test.push(words[rnd]);
                            words.splice(rnd, 1);
                        }
                        return [2 /*return*/, [this.testHTml.replace('{questions}', result.join(' ')), test]];
                }
            });
        });
    };
    TestBuilder.prototype.startTimerAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.selectAsync('Select * FROM configuration')];
                    case 1:
                        config = _a.sent();
                        if (config == undefined)
                            throw new Error('Null configuration');
                        this.timer = new timer_1.Timer(config.time, 'timer');
                        this.timer.startAsync();
                        return [2 /*return*/];
                }
            });
        });
    };
    TestBuilder.prototype.stopTimerAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.stopTimerAsync()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TestBuilder.prototype.buildQuestion = function (word) {
        var html = this.questionHtml;
        html = html.replace('{description}', word.description);
        var re = /{word}/gi;
        return html.replace(re, word.word);
    };
    return TestBuilder;
}());
exports.TestBuilder = TestBuilder;

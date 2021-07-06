"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.Test = void 0;
var Test = /** @class */ (function () {
    function Test() {
        this.word = '';
        //True -> Correct spelling; False -> Wrong Spelling
        this.result = false;
        this.description = '';
    }
    return Test;
}());
exports.Test = Test;
var Config = /** @class */ (function () {
    function Config() {
        this.time = 0;
        this.words_number = 0;
    }
    return Config;
}());
exports.Config = Config;

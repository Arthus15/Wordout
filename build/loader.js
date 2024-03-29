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
var testBuilder_1 = require("./testBuilder");
var testChecker_1 = require("./testChecker");
var electron_1 = require("electron");
var testBuilder = new testBuilder_1.TestBuilder();
var testChecker;
function closeWindow() {
    console.log('Cerrando');
    var w = electron_1.remote.getCurrentWindow();
    console.log(w);
    w.close();
}
//Primite function to load html inside the main page
function loadModule(pageUrl) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', pageUrl, true);
    xhr.onreadystatechange = function () {
        var status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
            // The request has been completed successfully
            var content = document.getElementById("divContent");
            if (content != null) {
                content.innerHTML = xhr.responseText;
                var codes = content.getElementsByTagName("script");
                for (var i = 0; i < codes.length; i++) {
                    eval(codes[i].text);
                }
            }
        }
        else {
            console.error('Something went wrong', xhr);
        }
    };
    xhr.send();
}
//Loads the test on memory and initialize the page
function loadTestAsync(isRetry) {
    if (isRetry === void 0) { isRetry = false; }
    return __awaiter(this, void 0, void 0, function () {
        var tuple, tuple, content;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isRetry) return [3 /*break*/, 1];
                    tuple = testBuilder.retryTest();
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, testBuilder.buildTestAsync()];
                case 2:
                    tuple = _a.sent();
                    _a.label = 3;
                case 3:
                    if (tuple == undefined)
                        return [2 /*return*/];
                    testChecker = new testChecker_1.TestChecker(tuple[1]);
                    content = document.getElementById("divContent");
                    if (!(content != null)) return [3 /*break*/, 5];
                    content.innerHTML = tuple[0];
                    return [4 /*yield*/, testBuilder.startTimerAsync()];
                case 4:
                    _a.sent();
                    document.addEventListener('timesUp', function () {
                        testChecker.onSubmit();
                    });
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}

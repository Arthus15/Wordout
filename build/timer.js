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
exports.Timer = void 0;
var Timer = /** @class */ (function () {
    function Timer(seconds, htmlElementId) {
        var _this = this;
        if (seconds === void 0) { seconds = 0; }
        if (htmlElementId === void 0) { htmlElementId = ''; }
        this.startValue = 0;
        this.htmlElementId = '';
        this.seconds = 0;
        this.cancelationToken = false;
        this.seconds = seconds;
        this.startValue = seconds;
        this.htmlElementId = htmlElementId;
        document.addEventListener('stopTimer', function () {
            _this.cancelationToken = true;
        });
    }
    Timer.prototype.startAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('timer started');
                        i = this.seconds;
                        _a.label = 1;
                    case 1:
                        if (!(i >= 0)) return [3 /*break*/, 4];
                        if (this.cancelationToken)
                            return [3 /*break*/, 4];
                        this.toTimer();
                        return [4 /*yield*/, this.delayAsync(1000)];
                    case 2:
                        _a.sent();
                        this.seconds = this.seconds - 1;
                        _a.label = 3;
                    case 3:
                        i--;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Timer.prototype.reset = function () {
        this.seconds = this.startValue;
        this.stopExecution();
    };
    Timer.prototype.stopExecution = function () {
        this.cancelationToken = true;
    };
    Timer.prototype.toTimer = function () {
        var hours = Math.floor(this.seconds / 3600);
        var remaining = this.seconds - (hours * 3600);
        var minutes = Math.floor(((remaining) / 60));
        var seconds = remaining % 60;
        var toString = (hours > 10 ? hours : '0' + hours) + ":" + (minutes > 10 ? minutes : '0' + minutes) + ":" + (seconds > 10 ? seconds : '0' + seconds);
        var element = document.getElementById(this.htmlElementId);
        if (element != null) {
            element.innerText = toString;
        }
        else {
            this.reset();
        }
        if (this.seconds == 0) {
            var event = new Event('timesUp');
            document.dispatchEvent(event);
        }
    };
    Timer.prototype.delayAsync = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    return Timer;
}());
exports.Timer = Timer;

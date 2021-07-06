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
exports.VersionController = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var VersionController = /** @class */ (function () {
    function VersionController() {
        this.versionJson = null;
        this.localVersionJson = null;
    }
    VersionController.prototype.newVersionAvailableAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getVersionFileAsync()];
                    case 1:
                        _a.sent();
                        this.readLocalVersionFile();
                        if (this.versionJson == null || this.localVersionJson == null)
                            console.warn('Error checking versions available...');
                        return [2 /*return*/, this.compareVersions()];
                }
            });
        });
    };
    VersionController.prototype.getBuildFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, body, filePath, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, node_fetch_1.default('https://raw.githubusercontent.com/Arthus15/Wordout/main/src/sections/test/new-test.html', {
                                method: 'Get',
                                headers: { "Content-Type": "text/plain", "accept": "application/vnd.github.v3+json" }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!(response.status == 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.text()];
                    case 2:
                        body = _a.sent();
                        filePath = path_1.default.join(__dirname, 'sections/test/new-test.html');
                        fs_1.default.writeFile(filePath, body, function (err) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            console.log("The file has been succesfully saved");
                        });
                        return [3 /*break*/, 4];
                    case 3: throw console.warn('Error getting version file: ', response);
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        console.warn(err_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    VersionController.prototype.getVersionFileAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, jsonbody, parsedBody, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, node_fetch_1.default('https://api.github.com/repos/Arthus15/Wordout/contents/version.json', {
                                method: 'Get',
                                headers: { "Content-Type": "application/json", "accept": "application/vnd.github.v3+json" }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!(response.status == 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.text()];
                    case 2:
                        jsonbody = _a.sent();
                        parsedBody = JSON.parse(jsonbody);
                        this.versionJson = JSON.parse(Buffer.from(parsedBody.content, 'base64').toString('binary'));
                        return [3 /*break*/, 4];
                    case 3: throw console.warn('Error getting version file: ', response);
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        console.warn(err_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    VersionController.prototype.readLocalVersionFile = function () {
        try {
            var filePath = path_1.default.join(__dirname, 'version.json');
            var file = fs_1.default.readFileSync(filePath);
            var text = file.toString();
            this.localVersionJson = JSON.parse(text);
        }
        catch (err) {
            console.warn(err);
        }
    };
    //True if new version
    VersionController.prototype.compareVersions = function () {
        var onlineVersion = this.versionJson.version;
        var localVersion = this.localVersionJson.version;
        var onlineVersionSplited = onlineVersion.split('.');
        var localVersionSplited = localVersion.split('.');
        for (var i = 0; i < localVersionSplited.length; i++) {
            if (onlineVersionSplited[i] > localVersionSplited[i])
                return true;
        }
        return false;
    };
    return VersionController;
}());
exports.VersionController = VersionController;

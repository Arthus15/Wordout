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
exports.UpdateFile = exports.VersionController = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var axios_1 = __importDefault(require("axios"));
var electron_1 = require("electron");
function startUpdateAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var updater;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updater = new VersionController();
                    return [4 /*yield*/, updater.executeUpdateAsync()];
                case 1:
                    _a.sent();
                    electron_1.ipcRenderer.sendSync('update-complete', true);
                    return [2 /*return*/];
            }
        });
    });
}
var VersionController = /** @class */ (function () {
    function VersionController() {
        this.versionJson = null;
        this.localVersionJson = null;
        this.key = 'Z2hwXzhVUFI2NFlzV0k4SWt3V2VUU3prRjZHdThIcjN5VzRGQVdiOA==';
        var fix_dirName = __dirname.split('\\');
        fix_dirName = fix_dirName.slice(0, fix_dirName.length - 2);
        this.__fix_dirname = fix_dirName.join('\\');
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
    VersionController.prototype.executeUpdateAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tk, response, body, parsedBody, files, progresBar, _a, _b, _i, i, content, filepath, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 11, , 12]);
                        tk = Buffer.from(this.key, 'base64').toString('binary');
                        return [4 /*yield*/, node_fetch_1.default('https://api.github.com/repos/Arthus15/Wordout/contents/build', {
                                method: 'Get',
                                headers: { "Content-Type": "application/json", "accept": "application/vnd.github.v3+json", "Authorization": "token " + tk }
                            })];
                    case 1:
                        response = _c.sent();
                        if (!(response.status == 200)) return [3 /*break*/, 9];
                        return [4 /*yield*/, response.text()];
                    case 2:
                        body = _c.sent();
                        parsedBody = JSON.parse(body);
                        return [4 /*yield*/, this.readFilesContentAsync(parsedBody)];
                    case 3:
                        files = _c.sent();
                        progresBar = document.getElementById('progress-bar');
                        _a = [];
                        for (_b in files)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 4;
                    case 4:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        i = _a[_i];
                        return [4 /*yield*/, this.getFileContentAsync(files[i].download_url)];
                    case 5:
                        content = _c.sent();
                        if (!content) return [3 /*break*/, 7];
                        filepath = files[i].path;
                        return [4 /*yield*/, this.updateFileAsync(content, path_1.default.join(this.__fix_dirname, filepath.split('/').slice(1, filepath.length).join("/")))];
                    case 6:
                        _c.sent();
                        progresBar.value = ((+i / files.length) * 100).toString();
                        _c.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 4];
                    case 8:
                        progresBar.value = "100";
                        return [3 /*break*/, 10];
                    case 9: throw console.warn('Error getting version file: ', response);
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        err_1 = _c.sent();
                        console.warn(err_1);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    VersionController.prototype.getVersionFileAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tk, response, jsonbody, parsedBody, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        tk = Buffer.from(this.key, 'base64').toString('binary');
                        return [4 /*yield*/, node_fetch_1.default('https://api.github.com/repos/Arthus15/Wordout/contents/version.json', {
                                method: 'Get',
                                headers: { "Content-Type": "application/json", "accept": "application/vnd.github.v3+json", "Authorization": "token " + tk }
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
        var onlineVersionParded = +(onlineVersion.split('.').join(''));
        var localVersionParsed = +(localVersion.split('.').join(''));
        return onlineVersionParded > localVersionParsed;
    };
    VersionController.prototype.readFilesContentAsync = function (buildJson) {
        return __awaiter(this, void 0, void 0, function () {
            var files, _a, _b, _i, element, json, dirContent, result, fileName;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        files = [];
                        _a = [];
                        for (_b in buildJson)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        element = _a[_i];
                        json = buildJson[element];
                        if (!(json.type == 'dir')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getDirContentAsync(json.url)];
                    case 2:
                        dirContent = _c.sent();
                        return [4 /*yield*/, this.readFilesContentAsync(dirContent)];
                    case 3:
                        result = _c.sent();
                        files = files.concat(result);
                        return [3 /*break*/, 5];
                    case 4:
                        fileName = json.name;
                        if (fileName.includes(".db") || fileName.includes(".png"))
                            return [3 /*break*/, 5];
                        files.push(new UpdateFile(json.path, json.download_url));
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, files];
                }
            });
        });
    };
    VersionController.prototype.getDirContentAsync = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var tk, response, body, parsedBody, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        tk = Buffer.from(this.key, 'base64').toString('binary');
                        return [4 /*yield*/, node_fetch_1.default(url, {
                                method: 'Get',
                                headers: { "Content-Type": "application/json", "accept": "application/vnd.github.v3+json", "Authorization": "token " + tk }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!(response.status == 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.text()];
                    case 2:
                        body = _a.sent();
                        parsedBody = JSON.parse(body);
                        return [2 /*return*/, parsedBody];
                    case 3: throw console.warn('Error getting dir tree: ', response);
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_3 = _a.sent();
                        console.warn(err_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    VersionController.prototype.getFileContentAsync = function (file_url) {
        return __awaiter(this, void 0, void 0, function () {
            var tk, response, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tk = Buffer.from(this.key, 'base64').toString('binary');
                        console.log('Url: ', file_url);
                        return [4 /*yield*/, axios_1.default.get(file_url, {
                                headers: { headers: { "Content-Type": "text/plain", "accept": "application/vnd.github.v3+json", "Authorization": "token " + tk } }
                            })];
                    case 1:
                        response = _a.sent();
                        console.log('Success...');
                        if (response.status == 200)
                            return [2 /*return*/, file_url.endsWith('.json') ? JSON.stringify(response.data) : response.data];
                        else
                            throw console.warn('Error getting file content: ', response);
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        console.warn(err_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // private async timeoutFetch(ms: number, promise: AxiosResponse<any>): Promise<AxiosResponse<any>> {
    //     return new Promise((resolve, reject) => {
    //         const timer = setTimeout(() => {
    //             reject(new Error('TIMEOUT'));
    //         }, ms);
    //         promise
    //             .then(value => {
    //                 clearTimeout(timer);
    //                 resolve(value);
    //             })
    //             .catch(reason => {
    //                 clearTimeout(timer);
    //                 console.log('Hola: ', reason);
    //                 reject(reason);
    //             });
    //     })
    // }
    VersionController.prototype.updateFileAsync = function (content, filePath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    console.log('Escribiendo');
                    fs_1.default.writeFileSync(filePath, content.toString());
                    console.log('Saliendo del write');
                }
                catch (err) {
                    console.error('Error writing file: ', err);
                }
                return [2 /*return*/];
            });
        });
    };
    return VersionController;
}());
exports.VersionController = VersionController;
var UpdateFile = /** @class */ (function () {
    function UpdateFile(path, download_url) {
        this.path = path;
        this.download_url = download_url;
    }
    return UpdateFile;
}());
exports.UpdateFile = UpdateFile;

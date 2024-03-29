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
exports.__esModule = true;
exports.roomChecker = exports.createOrFetchRoom = void 0;
var room_model_1 = __importDefault(require("../models/room.model"));
var user_model_1 = __importDefault(require("../models/user.model"));
var crypto = require("crypto");
var createOrFetchRoom = function () {
    return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var usertochat, room, user1, user2, user1PrivateKey, user2PrivateKey, user1PublicKey, user2PublicKey, userBody, userToChatBody, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, user_model_1["default"].findOne({ _id: req.body.usertochatId })];
                case 1:
                    usertochat = _a.sent();
                    return [4 /*yield*/, room_model_1["default"].findOne({
                            type: "dual",
                            $or: [{ users: [usertochat._id, req.body.user._id] }, { users: [req.body.user._id, usertochat._id] }]
                        })];
                case 2:
                    room = _a.sent();
                    if (!!room) return [3 /*break*/, 6];
                    return [4 /*yield*/, room_model_1["default"].create({
                            name: usertochat.name + " and " + req.body.user.name,
                            type: "dual",
                            users: [usertochat._id, req.body.user._id]
                        })];
                case 3:
                    room = _a.sent();
                    room.type = "new";
                    user1 = crypto.getDiffieHellman("modp15");
                    user2 = crypto.getDiffieHellman("modp15");
                    user1PrivateKey = user1.generateKeys();
                    user2PrivateKey = user2.generateKeys();
                    user1PublicKey = user1.getPublicKey();
                    user2PublicKey = user2.getPublicKey();
                    userBody = req.body.user;
                    userBody.keys.push({
                        oppositeUsername: usertochat.username,
                        privateKey: user1PrivateKey,
                        oppositePublicKey: user2PublicKey
                    });
                    return [4 /*yield*/, user_model_1["default"].findOneAndUpdate({ _id: req.body.user._id }, userBody)];
                case 4:
                    _a.sent();
                    userToChatBody = usertochat;
                    userToChatBody.keys.push({
                        oppositeUsername: req.body.user.username,
                        privateKey: user2PrivateKey,
                        oppositePublicKey: user1PublicKey
                    });
                    return [4 /*yield*/, user_model_1["default"].findOneAndUpdate({ _id: usertochat._id }, userToChatBody)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    req.body.room = room;
                    req.body.usertochat = usertochat;
                    next();
                    return [3 /*break*/, 8];
                case 7:
                    err_1 = _a.sent();
                    console.log(err_1);
                    req.flash("err", "Something went wrong!");
                    res.redirect("/chat/");
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
};
exports.createOrFetchRoom = createOrFetchRoom;
var roomChecker = function () {
    return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var room, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!req.body.room) {
                        req.flash("err", "Room doesnt exist!");
                        res.redirect("/chat/");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, room_model_1["default"].findById(req.body.room._id)];
                case 1:
                    room = _a.sent();
                    if (!room) {
                        req.flash("err", "Room doesnt exist!");
                        res.redirect("/chat/");
                        return [2 /*return*/];
                    }
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    req.flash("err", "Room doesnt exist!");
                    res.redirect("/chat/");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
};
exports.roomChecker = roomChecker;
//# sourceMappingURL=roomchecker.middleware.js.map
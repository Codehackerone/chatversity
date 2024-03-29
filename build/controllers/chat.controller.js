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
exports.renderTerminal = exports.roomHandler = exports.renderIndex = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_service_1 = require("../services/user.service");
var message_service_1 = require("../services/message.service");
var expiry_length = Number(process.env.EXPIRY) * 86400;
var jwt_headers = {
    algorithm: 'HS256',
    expiresIn: 1000 * 86400
};
var renderIndex = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, currentUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_service_1.allUsers()];
            case 1:
                users = _a.sent();
                currentUser = req.body.user;
                res.render("chats/index", { users: users, currentUser: currentUser });
                return [2 /*return*/];
        }
    });
}); };
exports.renderIndex = renderIndex;
var roomHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var isnewRoom, jwtToken, usernames, _i, _a, user_id, user, roomName, messages, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                isnewRoom = (req.body.room["new"]) ? true : false;
                jwtToken = jsonwebtoken_1["default"].sign({ user: req.body.user, room: req.body.room }, process.env.JWT_SECRET, jwt_headers);
                usernames = [];
                _i = 0, _a = req.body.room.users;
                _b.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                user_id = _a[_i];
                return [4 /*yield*/, user_service_1.findUser(user_id)];
            case 2:
                user = _b.sent();
                usernames.push(user.username);
                _b.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                roomName = req.body.room.name;
                return [4 /*yield*/, message_service_1.getMessageByRoom(req.body.room._id)];
            case 5:
                messages = _b.sent();
                res.render('chats/chat', { isnewRoom: isnewRoom, jwtToken: jwtToken, roomName: roomName, usernames: usernames, messages: messages });
                return [3 /*break*/, 7];
            case 6:
                err_1 = _b.sent();
                req.flash('err', "Error: " + err_1);
                res.redirect('/chat/');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.roomHandler = roomHandler;
var renderTerminal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.render('chats/terminal');
        return [2 /*return*/];
    });
}); };
exports.renderTerminal = renderTerminal;
//# sourceMappingURL=chat.controller.js.map
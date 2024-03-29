"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.formatMessage = void 0;
var moment_1 = __importDefault(require("moment"));
var formatMessage = function (username, text) {
    return {
        username: username,
        text: text,
        time: moment_1["default"]().format("h:mm a MMM YYYY")
    };
};
exports.formatMessage = formatMessage;
//# sourceMappingURL=messages.js.map
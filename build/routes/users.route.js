"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controllers/user.controller");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var validator_middlewares_1 = require("../middlewares/validator.middlewares");
var Router = express_1["default"].Router();
Router.route("/signin").get(user_controller_1.renderSignin).post(user_controller_1.signin);
Router.route("/userdetails")
    .get(user_controller_1.renderUserDetails)
    .post(auth_middleware_1.authorize(), validator_middlewares_1.validateUser(), user_controller_1.userDetails);
Router.route("/profile").get(auth_middleware_1.authorize(), user_controller_1.profile);
Router.route("/signout").all(auth_middleware_1.authorize(), user_controller_1.signout);
Router.route("/username").all(user_controller_1.checkUsername);
exports["default"] = Router;
//# sourceMappingURL=users.route.js.map
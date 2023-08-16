"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const adminRouter = express_1.default.Router();
adminRouter.route('/login').post((req, res) => {
    new admin_controller_1.AdminController().login(req, res);
});
adminRouter.route('/getNonVerifiedUsers').get((req, res) => {
    new admin_controller_1.AdminController().getNonVeirifedUsers(req, res);
});
adminRouter.route('/updateStatus').post((req, res) => {
    new admin_controller_1.AdminController().updateStatus(req, res);
});
adminRouter.route('/registerNewFirm').post((req, res) => {
    new admin_controller_1.AdminController().registerNewFirm(req, res);
});
adminRouter.route('/getAllUsers').get((req, res) => {
    new admin_controller_1.AdminController().getAllUsers(req, res);
});
adminRouter.route('/registerNewBuyer').post((req, res) => {
    new admin_controller_1.AdminController().registerNewBuyer(req, res);
});
exports.default = adminRouter;
//# sourceMappingURL=admin.router.js.map
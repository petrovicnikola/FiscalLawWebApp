"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firm_controller_1 = require("../controllers/firm.controller");
const firmRouter = express_1.default.Router();
firmRouter.route('/updateData').post((req, res) => {
    new firm_controller_1.FirmController().updateData(req, res);
});
firmRouter.route('/getBankAccounts').post((req, res) => {
    new firm_controller_1.FirmController().getBankAccounts(req, res);
});
firmRouter.route('/deleteBankAccount').post((req, res) => {
    new firm_controller_1.FirmController().deleteBankAccount(req, res);
});
firmRouter.route('/getStockrooms').post((req, res) => {
    new firm_controller_1.FirmController().getStockrooms(req, res);
});
firmRouter.route('/deleteStockroom').post((req, res) => {
    new firm_controller_1.FirmController().deleteStockroom(req, res);
});
firmRouter.route('/updateStockroom').post((req, res) => {
    new firm_controller_1.FirmController().updateStockroom(req, res);
});
firmRouter.route('/getCashRegisters').post((req, res) => {
    new firm_controller_1.FirmController().getCashRegisters(req, res);
});
firmRouter.route('/deleteCashRegister').post((req, res) => {
    new firm_controller_1.FirmController().deleteCashRegister(req, res);
});
firmRouter.route('/findFirmWithPIB').post((req, res) => {
    new firm_controller_1.FirmController().findFirmWithPIB(req, res);
});
firmRouter.route('/addNewPurchaser').post((req, res) => {
    new firm_controller_1.FirmController().addNewPurchaser(req, res);
});
firmRouter.route('/getUserAndPurchasers').post((req, res) => {
    new firm_controller_1.FirmController().getUserAndPurchasers(req, res);
});
firmRouter.route('/getPurchaser').post((req, res) => {
    new firm_controller_1.FirmController().getPurchaser(req, res);
});
firmRouter.route('/addNewBill').post((req, res) => {
    new firm_controller_1.FirmController().addNewBill(req, res);
});
firmRouter.route('/getAllBills').post((req, res) => {
    new firm_controller_1.FirmController().getAllBills(req, res);
});
firmRouter.route('/getBills').get((req, res) => {
    new firm_controller_1.FirmController().getBills(req, res);
});
firmRouter.route('/getBillsForBuyer').post((req, res) => {
    new firm_controller_1.FirmController().getBillsForBuyer(req, res);
});
firmRouter.route('/getIdentifierNumber').post((req, res) => {
    new firm_controller_1.FirmController().getIdentifierNumber(req, res);
});
firmRouter.route('/getRooms').post((req, res) => {
    new firm_controller_1.FirmController().getRooms(req, res);
});
firmRouter.route('/addRoom').post((req, res) => {
    new firm_controller_1.FirmController().addRoom(req, res);
});
firmRouter.route('/updateTables').post((req, res) => {
    new firm_controller_1.FirmController().updateTables(req, res);
});
exports.default = firmRouter;
//# sourceMappingURL=firm.router.js.map
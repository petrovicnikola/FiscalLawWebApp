import express from 'express';
import { FirmController } from '../controllers/firm.controller';


const firmRouter = express.Router();

firmRouter.route('/updateData').post(
    (req, res) => {
        new FirmController().updateData(req, res);
    }
)

firmRouter.route('/getBankAccounts').post(
    (req, res) => {
        new FirmController().getBankAccounts(req, res);
    }
)

firmRouter.route('/deleteBankAccount').post(
    (req, res) => {
        new FirmController().deleteBankAccount(req, res);
    }
)

firmRouter.route('/getStockrooms').post(
    (req, res) => {
        new FirmController().getStockrooms(req, res);
    }
)

firmRouter.route('/deleteStockroom').post(
    (req, res) => {
        new FirmController().deleteStockroom(req, res);
    }
)

firmRouter.route('/updateStockroom').post(
    (req, res) => {
        new FirmController().updateStockroom(req, res);
    }
)

firmRouter.route('/getCashRegisters').post(
    (req, res) => {
        new FirmController().getCashRegisters(req, res);
    }
)

firmRouter.route('/deleteCashRegister').post(
    (req, res) => {
        new FirmController().deleteCashRegister(req, res);
    }
)

firmRouter.route('/findFirmWithPIB').post(
    (req, res) => {
        new FirmController().findFirmWithPIB(req, res);
    }
)

firmRouter.route('/addNewPurchaser').post(
    (req, res) => {
        new FirmController().addNewPurchaser(req, res);
    }
)

firmRouter.route('/getUserAndPurchasers').post(
    (req, res) => {
        new FirmController().getUserAndPurchasers(req, res);
    }
)

firmRouter.route('/getPurchaser').post(
    (req, res) => {
        new FirmController().getPurchaser(req, res);
    }
)

firmRouter.route('/addNewBill').post(
    (req, res) => {
        new FirmController().addNewBill(req, res);
    }
)

firmRouter.route('/getAllBills').post(
    (req, res) => {
        new FirmController().getAllBills(req, res);
    }
)

firmRouter.route('/getBills').get(
    (req, res) => {
        new FirmController().getBills(req, res);
    }
)

firmRouter.route('/getBillsForBuyer').post(
    (req, res) => {
        new FirmController().getBillsForBuyer(req, res);
    }
)

firmRouter.route('/getIdentifierNumber').post(
    (req, res) => {
        new FirmController().getIdentifierNumber(req, res);
    }
)

firmRouter.route('/getRooms').post(
    (req, res) => {
        new FirmController().getRooms(req, res);
    }
)

firmRouter.route('/addRoom').post(
    (req, res) => {
        new FirmController().addRoom(req, res);
    }
)

firmRouter.route('/updateTables').post(
    (req, res) => {
        new FirmController().updateTables(req, res);
    }
)

export default firmRouter;
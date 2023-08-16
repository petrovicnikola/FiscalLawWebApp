import express from 'express';
import { AdminController } from '../controllers/admin.controller';

const adminRouter = express.Router();


adminRouter.route('/login').post(
    (req, res) => {
        new AdminController().login(req, res);
    }
)

adminRouter.route('/getNonVerifiedUsers').get(
    (req, res) => {
        new AdminController().getNonVeirifedUsers(req, res);
    }
)

adminRouter.route('/updateStatus').post(
    (req, res) => {
        new AdminController().updateStatus(req, res);
    }
)

adminRouter.route('/registerNewFirm').post(
    (req, res) => {
        new AdminController().registerNewFirm(req, res);
    }
)

adminRouter.route('/getAllUsers').get(
    (req, res) => {
        new AdminController().getAllUsers(req, res);
    }
)

adminRouter.route('/registerNewBuyer').post(
    (req, res) => {
        new AdminController().registerNewBuyer(req, res);
    }
)

export default adminRouter;
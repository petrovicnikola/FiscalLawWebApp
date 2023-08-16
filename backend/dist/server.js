"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const admin_router_1 = __importDefault(require("./routers/admin.router"));
const firm_router_1 = __importDefault(require("./routers/firm.router"));
const product_router_1 = __importDefault(require("./routers/product.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/uploads', express_1.default.static('uploads'));
mongoose_1.default.connect('mongodb://localhost:27017/app_db');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connection sucessfull');
});
const router = express_1.default.Router();
router.use('/users', user_router_1.default);
router.use('/admin', admin_router_1.default);
router.use('/firm', firm_router_1.default);
router.use('/products', product_router_1.default);
app.use('/', router);
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map
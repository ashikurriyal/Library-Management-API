"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../src/app"));
const db_1 = require("../src/config/db");
// Connect to MongoDB
(0, db_1.connectDB)(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));
exports.default = (req, res) => {
    (0, app_1.default)(req, res);
};

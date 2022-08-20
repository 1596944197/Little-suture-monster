"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const _53_jpg_1 = __importDefault(require("@/static/53.jpg"));
function App() {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h2", null, "\u4E00\u4E2A\u6D4B\u8BD5\u7684\u94FE\u63A5"),
        react_1.default.createElement("img", { src: _53_jpg_1.default, alt: "" })));
}
exports.default = App;

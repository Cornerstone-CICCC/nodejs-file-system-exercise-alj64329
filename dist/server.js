"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Check the README.md file for instructions to the exercise
const FILE_PATH = path_1.default.join(__dirname, '../dist/images', 'veryhappydog.jpg');
const server = http_1.default.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end('Home');
        return;
    }
    if (req.url === "/view-image") {
        fs_1.default.readFile(FILE_PATH, (err, data) => {
            if (err) {
                res.writeHead(500, { 'content-type': 'text/plain' });
                res.end(`Error reading file: ${err}`);
                return;
            }
            res.writeHead(200, { 'content-type': 'image/jpeg' });
            res.end(data || 'File is empty');
        });
        return;
    }
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end("Page not found");
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

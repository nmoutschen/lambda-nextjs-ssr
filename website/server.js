
const next = require('next')
const express = require("express");
const { PORT, NODE_ENV, LAMBDA } = process.env;
const dev = NODE_ENV !== 'production'
const port = parseInt(PORT, 10) || 5000;
const app = next({ dev })
const handle = app.getRequestHandler()

const createServer = () => {
    const server = express();
    server.get("*", (req, res) => handle(req, res));
    return server;
};

const server = createServer();
if (!LAMBDA) {
    app.prepare().then(() => {
        server.listen(port, err => {
        if (err) throw err;
            console.log(`Ready on http://localhost:${port}`);
        });
    });
}

exports.app = app;
exports.server = server;
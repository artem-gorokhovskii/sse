const WebSocket = require('ws');

const PORT = 8080;
const TIMER = 11000;

let globalStatus = false;
 
const wss = new WebSocket.Server({ port: PORT });
wss.on('connection', (ws) => {
    let timer;
    ws.on('message', (message) => {
        if (message === 'ready?') {
            globalStatus = false;
            timer = setInterval(() => {
                ws.send(String(globalStatus));
            }, 1000);
            setTimeout(() => {
                clearInterval(timer);
                globalStatus = true;
                ws.send(String(globalStatus));
                ws.close(1000);
            }, TIMER);
        }
    });
});
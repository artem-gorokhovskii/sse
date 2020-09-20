const http = require('http');
const PORT = 8080;
const TIMER = 11000;

let globalStatus = false;

http.createServer((req, res) => {
    if (req.url === '/sse') {
        
        globalStatus = false;
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        });

        function write() {
            const message = 'data: ' + globalStatus + '\n\n';
            res.write(message);
        };

        let timer = setInterval(write, 1000);
        setTimeout(() => {
            clearInterval(timer);
            globalStatus = true;
            res.write('data: ' + globalStatus + '\n\n');
            res.end();
        }, TIMER);
    } else {
        res.statusCode = 200;
        res.write('It\'s ok, but use /sse');
        res.end();
    }
}).listen(PORT, () => {
    console.log('Opened server on port ' + PORT);
});
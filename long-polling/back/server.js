const http = require('http');
const PORT = 8080;
const TIMER = 11000;

let globalStatus = false;
http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-type': 'application/json', 
        'Access-Control-Allow-Origin': '*'
    });

    if (req.url === '/begin') {
        globalStatus = false;
        setTimeout(() => { globalStatus = true }, TIMER);
        res.end(JSON.stringify({ data: 'Preparing for ' + TIMER + ' ms'}));
    } else if (req.url === '/check') {
        let timer = setInterval(() => {
            if (globalStatus) {
                clearInterval(timer);
                res.end(JSON.stringify({ data: globalStatus }));
            }
        }, 500);        
    } else {
        res.end(JSON.stringify({ data: 'everything just ok '}));
    }

})
.listen(PORT, () => { console.log('Opened server on port ' + PORT); });
const http = require('http');
const EventEmitter = require('events');
const { generatePoint } = require('./utils');
const {
    PORT,
    RESPONSE_INTERVAL,
    SSE_RESPONSE_HEADER,
    DEFAULT_RESPONSE_HEADER,
    MAX_ELEMENTS,
    RETRY_DELAY,
    DELAY_BEFORE_RESET_CONNECTION,
} = require('./consts');

const points = [];

const pointEventsEmitter = new EventEmitter();

setInterval(() => {
    if (points.length >= MAX_ELEMENTS) {
        points.shift();
    }
    points.push(generatePoint());
    pointEventsEmitter.emit('update');
}, RESPONSE_INTERVAL);

http.createServer((req, res) => {
    if (req.url === '/sse') {
        res.writeHead(200, SSE_RESPONSE_HEADER);
        const lastId = Number(req.headers['last-event-id']);

        // we check for lastId for demonstrating purpose (in this case it's not a bug)
        // (more convinient to show the beginning of work of the app with empty chart at beginning)
        const isGapInDataExists = lastId && points.length && lastId !== points[points.length - 1].id;
        if (isGapInDataExists) {
            let index = points.findIndex(({id}) => id === lastId);
            if (~index) {
                let arr = [];
                for (let i = index + 1; i < points.length; i++) {
                    arr.push(points[i]);
                }
                const lastPointId = arr[arr.length - 1].id;
                const arrStr = arr.map(({val}) => val).join(',');
                const message = 'retry: ' + RETRY_DELAY + '\n' + 'event: ' + 'reload' + '\n' + 'id: ' + lastPointId + '\n' + 'data: ' + arrStr + '\n\n';
                res.write(message);
            }
        }
        
        const sendMessage = () => {
            const {id, val} = points[points.length - 1];
            const message = 'retry: ' + RETRY_DELAY + '\n' + 'event: ' + 'regular' + '\n' + 'id: ' + id + '\n' + 'data: ' + val + '\n\n';
            res.write(message);
        };

        pointEventsEmitter.on('update', sendMessage)

        setTimeout(() => {
            pointEventsEmitter.removeListener('update', sendMessage);
            res.end();
        }, DELAY_BEFORE_RESET_CONNECTION);
    } else {
        res.writeHead(200, DEFAULT_RESPONSE_HEADER);
        res.end(JSON.stringify({ data: 'none' }));
    }
})
.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
})
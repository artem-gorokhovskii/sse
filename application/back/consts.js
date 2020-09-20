const PORT = 8080;
const RESPONSE_INTERVAL = 2000;
const MAX_ELEMENTS = 10;
const RETRY_DELAY = 5000; // too large for obvious updating points
const DELAY_BEFORE_RESET_CONNECTION = 9000;

const SSE_RESPONSE_HEADER = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
};

const DEFAULT_RESPONSE_HEADER = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

module.exports = {
    PORT,
    RESPONSE_INTERVAL,
    SSE_RESPONSE_HEADER,
    DEFAULT_RESPONSE_HEADER,
    MAX_ELEMENTS,
    RETRY_DELAY,
    DELAY_BEFORE_RESET_CONNECTION,
}
document.getElementById('button').addEventListener('click', loadData);
const SERVER_DELAY = 11000;
let date;

let ws;

function loadData() {
    console.log('Initialized action');
    setTimeout(() => { console.log('Server has prepeared correct status')}, SERVER_DELAY);
    date = Date.now();
    ws = new WebSocket('ws://localhost:8080');
    checkStatus();
}

function checkStatus() {
    ws.onopen = (e) => {
        ws.send('ready?');
    };
    ws.onmessage = ({data}) => {
        const status = document.getElementById('status');
        console.log('time: ', Date.now() - date, ', data: ', data);
        if (data === 'false') {
            status.innerHTML = 'NO';
        } else {
            console.log('Delay between updated status and received information: ', (date + SERVER_DELAY) - Date.now())
            status.innerHTML = 'YES';
        }
    };
}
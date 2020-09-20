document.getElementById('button').addEventListener('click', loadData);
const SERVER_DELAY = 11000;
let date;

let eventSource;

function loadData() {
    console.log('Initialized action');
    setTimeout(() => { console.log('Server has prepeared correct status')}, SERVER_DELAY);
    date = Date.now();
    eventSource = new EventSource('http://localhost:8080/sse')
    checkStatus();
}

function checkStatus() {
    eventSource.onopen = () => {
        console.log('Connection is established');
    };
    
    eventSource.onerror = (e) => {
        console.warn('Occured error: ', e);
    };
    
    eventSource.onmessage = e => {
        const status = document.getElementById('status');
        console.log('time: ', Date.now() - date, ', data: ', e.data);
        if (e.data === 'false') {
            status.innerHTML = 'NO';
        } else {
            console.log('Delay between updated status and received information: ', (date + SERVER_DELAY) - Date.now())
            status.innerHTML = 'YES';
            eventSource.close();
        }
    };
}

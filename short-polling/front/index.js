document.getElementById('button').addEventListener('click', loadData);
const SERVER_DELAY = 11000; 
let date;
let timer;

function loadData() {
    console.log('Initialized action');
    setTimeout(() => { console.log('Server has prepeared correct status')}, SERVER_DELAY);
    date = Date.now();
    fetch('http://localhost:8080/begin')
    timer = setInterval(checkStatus, 2000);
}

function checkStatus() {
    fetch('http://localhost:8080/check')
        .then(data => data.json())
        .then(data => {
            const status = document.getElementById('status');
            console.log('time: ', Date.now() - date, ', data: ', data.data);
            if (!data.data) {
                status.innerHTML = 'NO';
            } else {
                console.log('Delay between updated status and received information: ', (date + SERVER_DELAY) - Date.now())
                status.innerHTML = 'YES';
                clearInterval(timer);
            }
        })
}
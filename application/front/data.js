const MAX_ELEMENTS = 10;

let eventSource;

document
    .getElementById('button')
    .addEventListener('click', () => {
        eventSource = new EventSource('http://localhost:8080/sse');

        eventSource.addEventListener('regular', (ev) => {
            console.log(ev);
            console.log('Received data: ', ev.data);
            addOnePoint(Number(ev.data));
        });
        
        eventSource.addEventListener('reload', (ev) => {
            console.log('Updated data: ', ev.data);
            addMultiplePoints(ev.data);
        });
        
        eventSource.onerror = () => {
            console.warn('Connection is lost');
        };
    })


function addOnePoint (val, needUpdateChartAfterAdding = true) {
    const { data } = chartConfig.data.datasets[0];

    if (data.length >= MAX_ELEMENTS) {
        data.shift();
    }

    data.push(val);

    if (needUpdateChartAfterAdding) {
        chart.update();
    }    
};

function addMultiplePoints (valStr) {
    const valArr = valStr.split(',').map(Number);

    for (let val of valArr) {
        addOnePoint(val, false);
    }

    chart.update();
}
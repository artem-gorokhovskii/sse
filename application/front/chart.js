const chartConfig = {
    type: 'line',
    data: {
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        datasets: [{
            label: 'Values',
            data: [],
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            fill: false
        }]
    },
    options: {
        scales: {
            xAxes: [{
                display: true
            }],
            yAxes: [{
                display: true
            }]
        }
    }
};

const ctx = document.getElementById('mainChart').getContext('2d');
const chart = new Chart(ctx, chartConfig);

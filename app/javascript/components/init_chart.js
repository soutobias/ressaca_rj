
const initChart = () => {
	const ctx = document.getElementById("myChart").getContext('2d');
	const timestamp = document.getElementById("timestamp").textContent;
  console.log(timestamp)
	const waveHeigth = document.getElementById("wave").textContent;
  0 
	if (ctx) {
		const myChart = new Chart(ctx, {
		    type: 'line',
		    data: {
		        labels: timestamp,
		        datasets: [{
		            label: '# of Votes',
		            data: waveHeigth,
		            borderColor: [
		                'rgba(255,99,132,1)',
		                'rgba(54, 162, 235, 1)',
		                'rgba(255, 206, 86, 1)',
		                'rgba(75, 192, 192, 1)',
		                'rgba(153, 102, 255, 1)',
		                'rgba(255, 159, 64, 1)'
		            ],
		            borderWidth: 1
		        }]
		    },
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:false
		                }
		            }]
		        }
		    }
		});
  }
};


export { initChart };
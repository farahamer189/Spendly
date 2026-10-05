const chartCanvas = document.getElementById("spendingChart");

const spendingChart = new Chart(chartCanvas, {
    type: "doughnut",

    data: {
        labels: [
            "Food",
            "Transportation",
            "Shopping",
            "Bills"
        ],

        datasets: [
            {
                data: [35, 20, 30, 15]
            }
        ]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            },

            datalabels: {
                color: "#172033",
                font: {
                    weight: "bold",
                    size: 13
                },

                formatter: function (value) {
                    return value + "%";
                }
            }
        }
    },

    plugins: [ChartDataLabels]
});
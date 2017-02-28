$(function () {

    Highcharts.chart('container', {

        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: '등급'
        },

        pane: {
            startAngle: -120,
            endAngle: 120,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 10,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 50,
            tickWidth: 1,
            tickPosition: 'inside',
            tickLength: 1,
            tickColor: '#666',
            labels: {
                step: 1,
                rotation: 'auto'
            },
            title: {
                text: '등급'
            },
            plotBands: [{
                from: 6,
                to: 0,
                color: '#55BF3B' // green
            }, {
                from: 8,
                to: 6,
                color: '#DDDF0D' // yellow
            }, {
                from: 10,
                to: 8,
                color: '#DF5353' // red
            }]
        },

        series: [{
            name: '등급',
            data: [chartData]
        }]

    },
    // Add some life
    function (chart) {
    });
});

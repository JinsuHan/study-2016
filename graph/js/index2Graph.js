function drawChart(data){

  var chart_data = [ [data] ];
  var chart_opt = {
    title:'등급',
    seriesDefaults:{
      renderer:$.jqplot.MeterGaugeRenderer,
      rendererOptions: {
        min: 1,
        max: 10,
        intervals:[4, 6, 8, 10],
        intervalColors:['#66cc66', '#93b75f', '#E7E658', '#cc6666']
      }
    }
  };

  $.jqplot('container', chart_data, chart_opt);

}

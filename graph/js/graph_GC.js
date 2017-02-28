
$(document).ready(function() {
  //데이터는 createTempData.js
  var data = createData;
  var interval = 1;
  var target = "targetGC";
  var stateTarget = "state";
  var selectGraphItem ;

  drawGraphByGC(target, data, interval, selectGraphItem);
  showStat(stateTarget, data);

//윈도우 리사이즈
  $(window).resize(function() {
    drawGraphByGC(target, data, interval, selectGraphItem);
  });

  $(document).on("change", "#radioList" ,function(){
    interval = $("input[name=timeGC]:checked").val();
    drawGraphByGC(target, data, interval, selectGraphItem);
  });

  $(document).on("change", "input[name=selectGC]" ,function(e){
    selectGraphItem= new Array();
     selectGraphItem.push("date");
    $(":checkbox[name='selectGC']:checked").each(function(pi, po){
      selectGraphItem.push(po.value);
    });
    drawGraphByGC(target, data, interval, selectGraphItem);
  });


  function drawGraphByGC(target, data, interval, item){

    if(!data){
      console.log("데이터값이 존재하지 않습니다.");
      return 0;
    }

      // var parseTime = d3.utcParse("%Y-%m-%d %H:%M:%S");
      //값 복제
      // var data = $.extend({},data);
      try{
        data[0].dateTime.split("-");

        for( var i in data){
          data[i].dateTime = new Date(data[i].dateTime);
        }
      }catch(e){}

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var dataFormat = new Array();
      if(!item){
        dataFormat.push(['date','a','b','c','d','e']);
      }else{
        dataFormat.push(item);
      }
      var temp;
      for(var i in data){
        temp = i * interval;
        if(temp <= data.length-1){
          if(!item){
            dataFormat.push([data[temp].dateTime, data[temp].a, data[temp].b, data[temp].c, data[temp].d, data[temp].e]);
          }else{
            var temp02 = [];
            temp02[0] = data[temp].dateTime;
            for(var i = 1;i <= item.length-1;i++){
              eval("temp02[i] = data[temp]."+item[i]);
            }
            dataFormat.push(temp02);
          }
        }else{
          break;
        }
      }


      var value = google.visualization.arrayToDataTable(dataFormat);

      var options = {
        chart: {
          title: 'Google Chart Test',
          subtitle: 'Test'
        },
        hAxis:{
          format: 'yyyy-MM-dd hh-mm-ss'
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById(target));

      chart.draw(value, options);
    }
  }



});

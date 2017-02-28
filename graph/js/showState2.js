
var chartData;
function showStat(target, data){

//전체
  var max = maxValue(data);
  var min = minValue(data);
  var avg = average(data);

//날짜 별
  var DayMax = new Array();
  var DayMin = new Array();
  var DayAvg = new Array();

  var tempArray = new Array();
  var day = data[0].dateTime.getDate();
  for(var i in data){
    if(data[i].dateTime.getDate() != day || i == data.length-1){
      for(var y in data){
          if(data[y].dateTime.getDate() == day )tempArray.push(data[y]);
      }
      DayMax.push([day,maxValue(tempArray)]);
      DayMin.push([day,minValue(tempArray)]);
      DayAvg.push([day,average(tempArray)]);
      tempArray = new Array();
      day = data[i].dateTime.getDate();
    }
  }

  $("#grade").append("<div id='gaugeChart'></div>");
  var value=0;
  var count=0;

  for(var i in avg){
    count++;
    value += avg[i];
  }
  chartData = Math.floor((value/count) / 100);
  drawChart(chartData);


  $("#"+target).append("<p>기간 내 전체</p>");
  for(var i=0;i < 5;i++){
    $("#"+target).append(
      "<p>"+valueName(i)+"값 최대: "+max[i]+", 최소: "+min[i]+", 평균: "+avg[i]+"</p>"
    );
  }
  for(var i=0;i<DayMax.length;i++){
    $("#"+target).append("<hr><p>"+DayMax[i][0]+"일</p>");
      for(var j = 0;j<5;j++){
        $("#"+target).append("<p>"+ valueName(j)+
        "최대 : "+DayMax[i][1][j]+", "+
        "최소 : "+ DayMin[i][1][j]+", "+
        "평균 : "+ DayAvg[i][1][j]+
        "</p>");
      }
  }
}
function valueName(num){
  var result;
  if(num == 0)result = "A";
  if(num == 1)result = "B";
  if(num == 2)result = "C";
  if(num == 3)result = "D";
  if(num == 4)result = "E";
  return result;
}

function minValue(data){
  var tempArr = new Array();
  tempArr[0] = 1000;
  tempArr[1] = 1000;
  tempArr[2] = 1000;
  tempArr[3] = 1000;
  tempArr[4] = 1000;
  for(var i in data){
      if(data[i].a < tempArr[0]) tempArr[0] = data[i].a;
      if(data[i].b < tempArr[1]) tempArr[1] = data[i].b;
      if(data[i].c < tempArr[2]) tempArr[2] = data[i].c;
      if(data[i].d < tempArr[3]) tempArr[3] = data[i].d;
      if(data[i].e < tempArr[4]) tempArr[4] = data[i].e;
  }
  return tempArr;
}

function maxValue(data){
  var tempArr = new Array();
  tempArr[0] = 0;
  tempArr[1] = 0;
  tempArr[2] = 0;
  tempArr[3] = 0;
  tempArr[4] = 0;
  for(var i in data){
      if(data[i].a > tempArr[0]) tempArr[0] = data[i].a;
      if(data[i].b > tempArr[1]) tempArr[1] = data[i].b;
      if(data[i].c > tempArr[2]) tempArr[2] = data[i].c;
      if(data[i].d > tempArr[3]) tempArr[3] = data[i].d;
      if(data[i].e > tempArr[4]) tempArr[4] = data[i].e;
  }
  return tempArr;
}

  function average(data){
    var tempArr = new Array();
    tempArr[0] = 0;
    tempArr[1] = 0;
    tempArr[2] = 0;
    tempArr[3] = 0;
    tempArr[4] = 0;
    for(var i in data){
  tempArr[0] += data[i].a;
  tempArr[1] += data[i].b;
  tempArr[2] += data[i].c;
  tempArr[3] += data[i].d;
  tempArr[4] += data[i].e;
    }
    for(var i in tempArr){
      tempArr[i] = Math.round(tempArr[i] / data.length);
    }
    return tempArr;
  }
function callMaxValue(data, target){
  if(data > target) target = data;
  return target;
}
function callMinValue(data, target){
  if(data < target) target = data;
  return target;
}

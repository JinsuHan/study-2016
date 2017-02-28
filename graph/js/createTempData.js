

var createData = createData();


function createData(){
  var h = 9;
  var m = 0;
  var s = 0;

  var dataArray = new Array();
  for(var d = 0;d<3;d++){
    var day = 26 + d;
    for(var i = 0; i < 180; i++){
      var result = new Array();
      result.dateTime = "2016-11-"+day+" " + numberType(h) + ":" + numberType(m) + ":" + numberType(s);
      result.a = randomNumber(0,1000, 2);
      result.b = randomNumber(0,1000, 3);
      result.c = randomNumber(0,1000, 4);
      result.d = randomNumber(0,1000, 5);
      result.e = randomNumber(0,1000, 6);

      //시간 증가
      m++;
      s = randomNumber(01, 59);
      //60분 달성시 1시간 증가
      if(m >= 60){
        m = 0;
        h++;
      }

      dataArray.push(result);
    }
  }

  return dataArray;
}
//랜덤 난수 발생 num1 ~ num2
function randomNumber(num1, num2, count){
  var result = Math.floor(num1 + (Math.random() * num2));
  var temp = 0;

  if(count){
    temp = Math.floor(Math.random() * (150 * count) + (Math.random() * 200));
  }

  if((result - temp) < 0) { return result;}
  else{return result - temp; }
}

//한자리 숫자인 경우 앞에 0을 붙임 , 시간 등 표시용 1 -> 01
function numberType(num){
  var result;
  if(num < 10){
    result = "0" + num;
  }else{
    result = num;
  }
  return result;
}

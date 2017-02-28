var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
var crypto = require('crypto');
var net = require('net');
var bodyParser = require('body-parser');
var certification = "";
var waiting = 60; // 인증번호 입력 대기시간 // 단위 : 초

app.use(bodyParser.urlencoded({extended: false})); // req 내용 파싱 -> req.body.key
app.use('/js',express.static(__dirname+"/js"));
app.use('/css',express.static(__dirname+"/css"));

// 접속시 sample 페이지 로드
app.get('/',function (req, res){
  fs.readFile('sample.html', function(error, data){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(data);
  });
});

app.post('/confirm', function(req, res){
  console.log(" --- post - ajax - 인증번호 확인 --- ");
  var result;
  result = compareCertification(req.body.number);

  res.send(result);
});

app.post('/count', function(req, res){
  console.log(" --- post - ajax - 카운트 다운 --- ");
  console.log(certification);
  var result;
  var msg;
  msg = certification.timeLimit--;
  if(msg > 0){
    result = {result:true, msg: "남은 시간 : " + msg};
  }else if(msg == 0 && msg == null){
    result = {result:false, msg: ""};
  }else {
    console.log(" - 해당 인증의 시간 초과 - ");
    result = {result:false, msg: "시간 초과"};
    certification = "";
  }
  res.send(result);
});

app.post('/call',function (req, res){
  console.log(" --- post - ajax - 인증번호 요청 --- ");

  var url = 'https://sslsms.cafe24.com/sms_sender.php';
  var urlInfo = url.split('/');
  var host = urlInfo[2];
  var path = urlInfo[3];

  var result;
  var data = {};
  var msg;

  var reg = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$/;

  var number = req.body.number;

  if(certification != "" ){
    result = {result:false, msg: "이미 인증이 진행중 입니다."};
  }else if(number != "" && reg.test(number)){
    data.msg = "인증번호는 " +createCertificationNumber()+ " 입니다.";
    console.log("전송 되는 문자 내용 : " + data.msg);
    data.number = req.body.number; //입력받은 전화번호
    // var sms = smsDataInit(data);
    // sendSMS(sms,host,path);
    result = {result:true, msg: "인증번호 전송 완료"};
  }else{
    result = {result:false, msg: "잘못 입력하셨습니다."};
  }

  res.send(result);
});

//서버 시작
app.listen(3000, function(){
  console.log('server on - localhost:3000');
});

function compareCertification(data){
  var result;

  if(certification.result == data && certification.timeLimit > 0){
    result = {result:false, msg: "인증에 성공 하셨습니다."};
    certification = "";
    console.log("-- 인증 성공 --");
  }else{
    result = {result:true, msg: "잘못 입력 하셨습니다."};
  }

  return result;
}

//임의의 6자리 인증번호 생성, 인증번호 저장
function createCertificationNumber(){
  var result = Math.floor(Math.random() * 1000000)+100000;
  if(result > 1000000){
    result = result - 100000;
  }
  certification ={'result':result,'timeLimit': waiting};
  return result;
}


//sms 전송을 위한 폼 제작
function sendSMS(sms, host, path){
  var hash = crypto.createHash('md5').update(Math.floor(Math.random() * 3200) + '').digest("hex");
  var boundary = '---------------------' + hash.substr(0, 10);
  var header = 'POST /' + path + ' HTTP/1.0\r\n';
  header += 'Host: ' + host + '\r\n';
  header += 'Content-type: multipart/form-data, boundary=' + boundary + '\r\n';
  var data = '';
  // 본문 생성
  for ( var i in sms) {
    data += '--' + boundary + '\r\n';
    data += 'Content-Disposition: form-data; name=\'' + i + '\'\r\n';
    data += '\r\n' + sms[i] + '\r\n';
    data += '--' + boundary + '\r\n';
  }
  header += 'Content-length: ' + data.length + '\r\n\r\n';

  // 임시로 소켓 객체를 만들어서 전송
  var client = new net.Socket();
  client.connect(80, host, function() {
    console.log('CONNECTED TO: ' + host + ':' + 80 + ', local=' + client.localPort);
    client.write(header + data);
  });
  // 전송 끝
  client.on('close', function() {
    console.log('client disconnected');
  });
  // 전송 에러
  client.on('error', function(e) {
    console.log('error.' + e);
  });
}

//필수 정보
function smsDataInit(data){
  var r = {};

  r.user_id = '';
  r.secure = '';
  r.msg = data.msg;
  r.rphone = data.number;
  r.mode = '1';
  r.sphone1 = '';
  r.sphone2 = '';
  r.sphone3 = '';

  return r;
}

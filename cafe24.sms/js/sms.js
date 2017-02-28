
var tempInterval;

$('#ajax_call').click( function() {
    $('#result_call').html('');
    $.ajax({
        url: 'http://localhost:3000/call',
        dataType: 'json',
        type: 'POST',
        data: {'number': $("#number_call").val()},
        success: function(result) {
            if ( result['result'] == true ) {
                $('#result_call').html(result['msg']);
                countNumber();
            }else{
                $('#result_call').html(result['msg']);
            }
        },
        error: function(){
          $('#result').html("통신 실패");
        }
    });
});

$('#ajax_confirm').click( function() {
    $('#result_confirm').html('');
    $.ajax({
        url: 'http://localhost:3000/confirm',
        dataType: 'json',
        type: 'POST',
        data: {'number': $("#number_confirm").val()},
        success: function(result) {
            if ( result['result'] == true ) {
              $('#result_confirm').html(result['msg']);
              $('#result_result').html('');
            }else if(result['result'] == false){
              $('#result_result').html(result['msg']);
              clearInterval(tempInterval);
            }
        },
        error: function(){
          $('#result_confirm').html("통신 실패");
        }
    });
});

function countNumber(){
  tempInterval = setInterval(function () {
    $('#count_confirm').html('');
    $.ajax({
      url: 'http://localhost:3000/count',
      dataType: 'json',
      type: 'POST',
      // data: {'number': $("#number_confirm").val()},
      success: function(result) {
        if( result['result'] == true ) {
          $('#count_confirm').html(result['msg']);
        }else if(result['result'] == false){
          $('#count_confirm').html(result['msg']);
          $('#result_confirm').html('');
          clearInterval(tempInterval);
        }
      }
    });
  }, 1000);
}

require('../css/index.css');
// import '../css/index.css';
var $ = require('jquery');

$(function(){
  $('.aa').click(function(){
    $.ajax({
      type:"post",
      url:"/api/account.aspx",
      async:true,
      data: {"act":"login","pid": 'admin',"pwd":''},
      dataType: 'json',
      success:function(data){
        console.log(data);
      }
    })
  })
});

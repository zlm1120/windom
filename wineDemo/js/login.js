var isCheck=false;
var userinfo= {};
$(function(){
	checkCookie();
})

function getCookieValue(name) 
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]); 
    else 
        return null; 
} 
function checkCookie(){ //检测cookie是否存在，如果存在则直接读取，否则创建新的cookie
	var username = getCookieValue('username');
	var password = getCookieValue('password');
	if (username != null && username != "" && password != null && password != "") {
		$('#uname').val(username);
		$('#upwd').val(password);
		$('#ischeck').attr('data-on',1);
	}else {
		var uname=$('#uname').val();//获取用户名
	    var upwd=$('#upwd').val();//获取输入的密码
		if (uname != null && uname != "" && upwd != null && upwd != ""){
			var date = new Date();
			date.setDate(date.getDate() +7);
			document.cookie = "username="+uname+";expires=" + date.toGMTString();
			document.cookie = "password="+upwd+";expires=" + date.toGMTString();
//			alert(document.cookie)
		}
	}
//	alert(document.cookie)
} 

//复选框点击
$('#ischeck').click(function(){
	if($(this).attr('data-on')==0){
		$(this).attr('data-on',1);
		isCheck=true;
		var uname=$('#uname').val();//获取用户名
	    var upwd=$('#upwd').val();//获取输入的密码
		var date = new Date();
		date.setDate(date.getDate() + 7);
		document.cookie = "username="+uname+";expires=" + date.toGMTString();
		document.cookie = "password="+upwd+";expires=" + date.toGMTString();
	}else if($(this).attr('data-on')==1){
		$(this).attr('data-on',0);
		isCheck=false;
	}
})

/*
 *正则表达式
 * 电话：/^(((13[0-9]{1})|(18[0-9]{1})|(17[6-9]{1})|(15[0-9]{1}))+\d{8})$/
 * 邮箱：/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
 * */

var isTel=/^(((13[0-9]{1})|(18[0-9]{1})|(17[6-9]{1})|(15[0-9]{1}))+\d{8})$/;
var isEmail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
//点击登录按钮
$('.loginBtn').click(function(){
	var uname=$('#uname').val();//获取用户名
	var upwd=$('#upwd').val();//获取输入的密码
	if(uname!="" && uname!="账号" && upwd!=""){
		if(!isTel.test(uname)){
			if(!isEmail.test(uname)){
				Showbo.Msg.alert('账号格式不正确');
			}else{
				showPersonCenter(uname,upwd);
			}
		}else{
			showPersonCenter(uname,upwd);
		}
	}else{
		Showbo.Msg.alert('您好，请填写正确的用户名或密码!');
	}
});
document.onkeydown=keyDownSearch;  
      
function keyDownSearch(e) {    
    // 兼容FF和IE和Opera    
    var theEvent = e || window.event;    
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;    
    if (code == 13) {    
        var uname=$('#uname').val();//获取用户名
		var upwd=$('#upwd').val();//获取输入的密码
		showPersonCenter(uname,upwd);
    }      
}
var userInfo = {};
//登录成功执行的函数
function showPersonCenter(uname,upwd){
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/loginBackground.do", //请求接口
		data:{account:uname,passwd:upwd},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				console.log(json);
				sessionStorage.setItem("id",json.id);
				userInfo.userName = uname;
				userInfo.pwd = upwd;
				userInfo.id = json.id;
				userInfo.type= json.type;
				userInfo.state = json.state;
				userInfo.latitude = json.lat;
				userInfo.longitude = json.lng;
				userInfo.accountName = json.accountName;
				userInfo.account = json.account;
				userInfo.mapComboId = json.mapComboId;
				sessionStorage.setItem("user",JSON.stringify(userInfo));
				if(json.type==1){
					window.location.href='personCenter.html?id='+json.id+'&type='+json.type+'&state='+json.state+'';
				}else if(json.type==3){
					window.location.href="lookProcessOne.html?id="+json.id+"&type="+json.type+"";
				}else if(json.type==2){
					window.location.href="lookProcessCity.html?id="+json.id+"&type="+json.type+"";
				}
				
			}else if(json.status==4){
				Showbo.Msg.alert('用户名不存在！');
			}else{
				Showbo.Msg.alert('服务器异常！');
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
  })	
}

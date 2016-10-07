var InterValObj; //timer变量，控制时间
var count =60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
function sendMessage() {
    curCount = count;
    $(".button").val( + curCount + "秒再获取");
    InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
    $(".button").attr("disabled", "true");
    getVidateCode();

}
//timer处理函数
function SetRemainTime() {
    if (curCount == 0) {
        window.clearInterval(InterValObj);//停止计时器
        $(".button").removeAttr("disabled");//启用按钮
        $(".button").val("重新发送验证码");
        code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
    }
    else {
        curCount--;
        $(".button").val( + curCount + "秒再获取");
    }
}
var codeIsTrue = false;
//验证码判断
function checkCode(code){
	$('#oneVilidate').keyup(function (){
		var oneVilidate=$('#oneVilidate').val();
		if(oneVilidate!="" && oneVilidate.length>=6){
			if(oneVilidate ==code){
				$('#oneVilidate').css('background','url(img/validateOk.png) no-repeat right center');
				codeIsTrue = true;
			}else{
				$('#oneVilidate').css('background','url(img/validateError.png) no-repeat right center');
				codeIsTrue = false;
			}
		}else{
			$('#oneVilidate').css('background','');
		}
	})
}


function getVidateCode(){
	var account=$('#account').val();
	var moblie=$('#moblie').val();
	if(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(moblie)==false && account==""){
		Showbo.Msg.alert('信息填写有误');
	}else{
		$.ajax({
			type: "GET",
			async : false,  //同步请求
			url: ipAddress+"/getCode.do", //请求接口
			data:{account:account,mobile:moblie},
			dataType:"jsonp",
			timeout:5000, 
			success:function(json){
				if(json.status==1){
					checkCode(json.code);
				}else{
					Showbo.Msg.alert(json.message);
					$('#account').val('');
					$('#moblie').val('');
					$(".button").val("获取验证码");
					window.clearInterval(InterValObj);
					$(".button").removeAttr("disabled");//启用按钮
				}
			},
			error:function(){
				Showbo.Msg.alert('网络错误！');
			}
	   });
	}
}
function getData(){
	var account=$('#account').val();
	if(codeIsTrue==true){
		location.href='update_pwd_two.html?account='+account;
	}else{
		
	}
}


//得到url中某个属性的值
function getUrlValue(key) {
	var url = window.location.search;
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			if (strs[i].split("=")[0] == key) {
				return strs[i].split("=")[1];
			}
		}
	}
	return theRequest;
}

//判断密码是否正确
function checkPwd(){
	var pwd = $("#newPwd").val();
	if(/^[A-Za-z0-9_-]+$/.test(pwd)==false){
		Showbo.Msg.alert('密码格式不正确');
		$('#newPwd').val('');
		return false;
	}else{
		return true;
	}
}
//确认密码
function checkAgainPwd(){
	var pwd = $("#newPwd").val();
	var againPwd = $("#aginaPwd").val();
	if(pwd!=againPwd){
		Showbo.Msg.alert('确认密码不正确');
		$('#aginaPwd').val('');
		return false;
	}else{
		return true;
	}
}
function updatePwd(){
	var pwd = $("#newPwd").val();
	var account = getUrlValue("account");
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/reset.do", //请求接口
		data:{account:account,passwd:pwd},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				location.href='update_pwd_three.html';
			}else{
				Showbo.Msg.alert(json.message);
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
   });
}



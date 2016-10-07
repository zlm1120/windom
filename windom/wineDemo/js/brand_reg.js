$(function(){
	setSize(); //调用方法，设置加载的样式
	sessionStorage.removeItem("brand");
})
function setSize(){
	var winW=$(window).width();
	if(winW<1430){  //浏览器窗口小于1430px时，引入样式
		$('head').append('<link href="css/less1430/common1430.css" type="text/css" rel="stylesheet" />');
		$('head').append('<link href="css/less1430/about1430.css" type="text/css" rel="stylesheet" />');
	}else{//浏览器窗口大于1430px时，删除样式
		$('head link[href="css/less1430/common1430.css"]').remove();
		$('head link[href="css/less1430/about1430.css"]').remove();
	}
}

function checkBrand(){
	var brandUname = $("#brandUname").val();
	if(/^[A-Za-z0-9_()（）\-\u4e00-\u9fa5]+$/.test(brandUname)){
		return true;
	}else{
		Showbo.Msg.alert('请输入正确企业名称！如：XXX有限公司');
		$("#brandUname").val('');
		return false;
	}
}

function checkPwd(){
	var brandPwd=$('#brandPwd').val();//密码
	if(/^[A-Za-z0-9_-]+$/.test(brandPwd)){
		if(brandPwd.length>=6 && brandPwd.length <=20){
			return true;
		}else{
			Showbo.Msg.alert('密码长度为6-20位');
			$('#brandPwd').val('');
			return false;
		}
		
	}else{
		Showbo.Msg.alert('请输入正确密码！如：123456');
		$('#brandPwd').val('');
		return false;
	}
}

function checkAginaPwd(){
	var brandPwd=$('#brandPwd').val();//密码
	var brandPwdAgain=$('#brandPwdAgain').val();//重复输入密码
	if(brandPwd!=brandPwdAgain){
		Showbo.Msg.alert('两次密码不一致！');
		$('#brandPwdAgain').val('');
		return false;
	}else{
		return true;
	}
}

function checkName(){
	var name=$('#name').val();
	if(/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(name)==false){
		Showbo.Msg.alert('请输入联系人姓名！如：张三');
		$('#name').val('');
		return false;
	}else{
		return true;
	}
}

function checkPhone(){
	var phone=$('#phone').val();
	var patrn=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	if(patrn.test(phone)==false){
		Showbo.Msg.alert('请输入正确的电话号码！如：135****1472');
		$('#phone').val('');
		return false;
	}else{
		return true;
	}
}


var InterValObj; //timer变量，控制时间
var count =60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
var state = false;
function sendMessage() {
	var phone=$('#phone').val();
    if(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)){
    	curCount = count;
	    $(".getVidate").val( + curCount + "秒再获取");
	    InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
	    $(".getVidate").attr("disabled", "true");
	    getVidateCode();
    }else{
    	Showbo.Msg.alert('请输入手机号！');
    }

}
//timer处理函数
function SetRemainTime() {
    if (curCount == 0) {
        window.clearInterval(InterValObj);//停止计时器
        $(".getVidate").removeAttr("disabled");//启用按钮
        $(".getVidate").val("重新发送验证码");
        code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
    }
    else {
        curCount--;
        $(".getVidate").val( + curCount + "秒再获取");
    }
}
function getVidateCode(){
	var phone=$('#phone').val();
	if(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)==false){
		Showbo.Msg.alert('电话号码有误');
	}else{
		$.ajax({
			type: "GET",
			async : false,  //同步请求
			url: ipAddress+"/sendSMS.do", //请求接口
			data:{mobile:phone},
			dataType:"jsonp",
			timeout:5000, 
			success:function(json){
				if(json.status==1){
					sessionStorage.setItem("mobile",phone);
					checkCode(json.code);
				}else if(json.status==3){
					 Showbo.Msg.alert("您的手机号已经注册");
					 $('#phone').val('');
					 $(".getVidate").val("获取验证码");
					 window.clearInterval(InterValObj);
					 $(".getVidate").removeAttr("disabled");//启用按钮
				}else{
					Showbo.Msg.alert(json.message);
				}
			},
			error:function(){
				Showbo.Msg.alert('网络错误！');
			}
	   });
	}
}


//验证码判断
var codeIsTrue = false;
function checkCode(code){
	$('#brandVilidate').keyup(function (){
		var brandVilidate=$('#brandVilidate').val();
		if(brandVilidate!="" && brandVilidate.length>=6){
			if(brandVilidate ==code){
				$('#brandVilidate').css('background','url(img/validateOk.png) no-repeat right center');
				codeIsTrue = true;
			}else{
				$('#brandVilidate').css('background','url(img/validateError.png) no-repeat right center');
				codeIsTrue = false;
			}
		}else{
			$('#brandVilidate').css('background','');
		}
	})
}

function checkFields(){
	if(checkBrand()==true && checkPwd()==true && checkAginaPwd()==true && checkName()==true && checkPhone()==true && codeIsTrue==true){
		var mobile = sessionStorage.getItem("mobile");
		var phone = $('#phone').val();
		if(mobile == phone){
			var brandUname = $("#brandUname").val();
			var brandPwd = $('#brandPwd').val();
			var name = $('#name').val();
			var brandUser = {};
			brandUser.brandUname = brandUname;
			brandUser.brandPwd = brandPwd;
			brandUser.name = name;
			brandUser.phone = phone;
			sessionStorage.setItem("brand",JSON.stringify(brandUser));
			location.href="brand_reg_two.html";
		}else{
			Showbo.Msg.alert('您的电话号码不正确');
		}
		
	}else{
		Showbo.Msg.alert('请完善资料！');
	}
}

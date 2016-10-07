

$(function(){
	setSize(); //调用方法，设置加载的样式
	agreeContent();
	sessionStorage.removeItem("city");
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
	if(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)==false){
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

function checkCityCode(){
	var brandBusCode = $("#cityCode").val();
	if(brandBusCode.length==15){
		return true;
	}else{
		Showbo.Msg.alert('请输入正确营业执照号！如：330103000068586');
		$('#cityCode').val('');
		return false;
	}
}
////添加图片
//function addPreview(source,idName) {
//	var file = source.files[0];
//	if (window.FileReader) {
//		var fr = new FileReader();
//		var addimg = document.createElement('img');
//		var adda = document.createElement("a");
//		var addspan = document.createElement("i");
//		addspan.className='icon-remove';
//		adda.appendChild(addimg);
//		adda.appendChild(addspan);
//		document.getElementById(idName).appendChild(adda);
//		fr.onloadend = function(e) {
//
//			addimg.src = e.target.result;
//
//		};
//		fr.readAsDataURL(file);
//	}
//	$('.icon-remove').click(function(){
//		$(this).parent().remove();
//	})
//}


function showPreview(formName,idName){
	var num = formName.substr(4,1);
	 $("#"+formName+"").ajaxSubmit({
	     type:'post',
	     url:ipAddress+'/uploadImg.do',
	     data:{},
	     dataType:"json",
	     success:function(json){
			if(json.status==1){
				if(json.imgPath!=null || json.imgPath!=""){
//					var addimg = document.createElement('img');
//					var adda = document.createElement("a");
////					var addspan = document.createElement("i");
////					addspan.className='icon-remove';
//					adda.appendChild(addimg);
////					adda.appendChild(addspan);
//					document.getElementById(idName).appendChild(adda);
//					addimg.src = json.imgPath;
					$("#"+idName).html('<img src='+json.imgPath+'>');
					$("#label"+num+"").attr("imgType",json.imgName);
				}else{
					$("#label"+num+"").attr("imgType","");
				}
			}else{
				Showbo.Msg.alert('服务器发生异常！');
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
  });
}

function checkFields(){
	var mobile = sessionStorage.getItem("mobile");
	var phone = $('#phone').val();
	if(mobile == phone){
		if(document.getElementById("agree").checked){
			if(checkBrand()==true && checkPwd()==true && checkAginaPwd()==true && checkName()==true && checkPhone()==true && codeIsTrue==true ){
				var brandUname = $("#brandUname").val();
				var brandPwd = $('#brandPwd').val();
				var name = $('#name').val();
				var phone = $('#phone').val();
				var cityCode = $('#cityCode').val();
				var businessImgPath = $('#label1').attr("imgType");
				var cityUser = {};
				cityUser.brandUname = brandUname;
				cityUser.brandPwd = brandPwd;
				cityUser.name = name;
				cityUser.phone = phone;
				cityUser.businessCode = cityCode;
				cityUser.businessImgPath = businessImgPath;
				sessionStorage.setItem("city",JSON.stringify(cityUser));
				location.href="city_service_chooseWine.html";
			}else{
				Showbo.Msg.alert('请完善资料！');
			}	
		}else{
			Showbo.Msg.alert('请同意用户协议');
		}
	}else{
		Showbo.Msg.alert('您的电话号码不正确');
	}
}


$(".close").click(function(){
	$("#agreeContent").hide("slow");
})
function showAgree(){
	$("#agreeContent").show("slow");
}
$(".agreeButton").click(function(){
	$("#agreeContent").hide("slow");
})

function agreeContent(){
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/getAgreement.do", //请求接口
		data:{type:1},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				if(json.agreement==null){
					
				}else{
					$(".mainAgree").html(json.agreement.content);
				}
				
			}else{
				Showbo.Msg.alert('获取服务器失败！');
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
   });
}



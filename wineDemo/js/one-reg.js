$(function(){
	setSize(); //调用方法，设置加载的样式
//	sessionStorage.removeItem("oneInfo");
//	$('.oneCardRadio').eq(0).css('background','url(img/ServerFocus.png)  no-repeat left center');
//	$('.oneRadio').eq(0).css('background','url(img/ServerFocus.png)  no-repeat left center');
	agreeContent();
})
$(window).resize(function(){  //窗口发送变化时，调用方法
	setSize();
});
function setSize(){
	var winW=$(window).width();
	if(winW<1430){  //浏览器窗口小于1430px时，引入样式
		$('head').append('<link href="css/less1430/common1430.css" type="text/css" rel="stylesheet" />');
		$('head').append('<link href="css/less1430/one-register1430.css" type="text/css" rel="stylesheet" />');
	}else{//浏览器窗口大于1430px时，删除样式
		$('head link[href="css/less1430/common1430.css"]').remove();
		$('head link[href="css/less1430/one-register1430.css"]').remove();
	}
}

var longitude = "";
var latitude = "";
	var ac = new BMap.Autocomplete({    //建立一个自动完成的对象
	    "input" : "oneAddress"
	});
	var myValue;
	ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
		var _value = e.item.value;
	    myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
	    var myGeo=new BMap.Geocoder();
	    myGeo.getPoint(myValue, function(point){
	    	if (point) {
				latitude=point.lat; //获取纬度
				longitude=point.lng; //获取经度
		  	}
	    })
});



var InterValObj; //timer变量，控制时间
var count =60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
function sendMessage() {
    curCount = count;
    $(".getVidate").val( + curCount + "秒再获取");
    InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
    $(".getVidate").attr("disabled", "true");
    getVidateCode();

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
	var oneUname=$('#oneUname').val();
	if(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(oneUname)==false){
		Showbo.Msg.alert('电话号码有误');
	}else{
		$.ajax({
			type: "GET",
			async : false,  //同步请求
			url: ipAddress+"/sendSMS.do", //请求接口
			data:{mobile:oneUname},
			dataType:"jsonp",
			timeout:5000, 
			success:function(json){
				if(json.status==1){
					sessionStorage.setItem("mobile",oneUname);
					checkCode(json.code);
				}else if(json.status==3){
					Showbo.Msg.alert("您的手机号已经注册");
					$('#oneUname').val('');
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

//判断密码是否正确
function checkPwd(){
	var pwd = $("#onePwd").val();
	if(/^[A-Za-z0-9_-]+$/.test(pwd)==false){
		Showbo.Msg.alert('密码格式不正确');
		$('#onePwd').val('');
		return false;
	}else{
		return true;
	}
}
//确认密码
function checkAgainPwd(){
	var pwd = $("#onePwd").val();
	var againPwd = $("#onePwdAgain").val();
	if(pwd!=againPwd){
		Showbo.Msg.alert('确认密码不正确');
		$('#onePwdAgain').val('');
		return false;
	}else{
		return true;
	}
}
//判断联系人是否正确
function checkName(){
	var name = $("#name").val();
	if(/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(name)==false){
		Showbo.Msg.alert('联系人格式不正确');
		$('#name').val('');
		return false;
	}else{
		return true;
	}
}


//判断公司地址是否正确
function checkAddress(){
	var oneAddress=$('#oneAddress').val();
	if(/^[A-Za-z0-9_()（）\#\-\u4e00-\u9fa5]+$/.test(oneAddress)==false){
		Showbo.Msg.alert('公司地址不正确');
		$('#oneAddress').val('');
		return false;
	}else{
		return true;
	}
}
function checkBrand(){
	var brandUname = $("#oneUname").val();
	if(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(brandUname)){
		return true;
	}else{
		Showbo.Msg.alert('电话号码不正确');
		$("#oneUname").val('');
		return false;
	}
}

//判断身份证号码是否正确
function checkIdCard(){
	var oneIdCard=$('#oneIdCard').val();
	if(/\d{17}[\d|x]|\d{15}/.test(oneIdCard)==false){
		Showbo.Msg.alert('身份证号码格式不正确');
		$('#oneIdCard').val('');
		return false;
	}else{
		return true;
	}
}
function checkOneBusCode(){
	var brandBusCode = $("#oneBusCode").val();
	if(brandBusCode.length==15){
		return true;
	}else{
		Showbo.Msg.alert('请输入正确营业执照号！如：330103000068586');
		$('#oneBusCode').val('');
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
//
////判断图片是否上传完成
//function checkImg(){
//	var img1 = $("#label1").attr("imgType");
//	var img2 = $("#label2").attr("imgType");
//	if(img1=="" ||img2==""){
//		Showbo.Msg.alert('请上传证明');
//		return false;
//	}else{
//		return true;
//	}
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
					var addimg = document.createElement('img');
					var adda = document.createElement("a");
					adda.appendChild(addimg);
					document.getElementById(idName).appendChild(adda);
					addimg.src = json.imgPath;
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

//
//var identityType=0,serviceType=0; //注册身份、服务类型
////绑定注册身份按钮控制
//$('.oneCardRadio').click(function(){
//	$('.oneCardRadio').attr('data-check',0);
//	$('.oneCardRadio').css('background','url(img/ServerBlur.png)  no-repeat left center');
//	$(this).attr('data-check',1);
//	$(this).css('background','url(img/ServerFocus.png)  no-repeat left center');
//	if($(this).text()=="个人"){
//		identityType=0;
//		$("#email").show();
//		$("#comp").hide();
//		$("#person").show();
//		$("#oneUname").show();
//		$("#oneUEmail").hide();
//	}else if($(this).text()=="公司"){
//		identityType=1;
//		$("#oneUname").hide();
//		$("#oneUEmail").show();
//		$("#email").hide();
//		$("#comp").show();
//		$("#person").hide();
//		$("#form2").show();
//		$("#organCodeInput").show();
//		$("#comp .oneRadio").css('background','url(img/ServerFocus.png)  no-repeat left center');
//	}
//		
//})
////绑定服务类型按钮控制
//$('.oneRadio').click(function(){
//	$('.oneRadio').attr('data-check',0);
//	$('.oneRadio').css('background','url(img/ServerBlur.png)  no-repeat left center');
//	$(this).attr('data-check',1);
//	$(this).css('background','url(img/ServerFocus.png)  no-repeat left center');
//	if($(this).text()=="固定"){
//		serviceType=0;
//		$("#form2").show();
//		$("#organCodeInput").show();
//	}else if($(this).text()=="移动"){
//		serviceType=1;
//		$("#form2").hide();
//		$("#organCodeInput").hide();
//	}
//})
//var isTel=/^(((13[0-9]{1})|(18[0-9]{1})|(17[6-9]{1})|(15[0-9]{1}))+\d{8})$/;
//var isEmail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
$('#oneServerBtn').click(function(){
	oneReg();
})

var oneInfo = {};
function oneReg(){
//绑定注册身份按钮控制
//	identityType
//绑定服务类型按钮控制
//	serviceType
	var phone = $("#oneUname").val();
	var onePwd = $("#onePwd").val();
	var name = $("#name").val();
	var oneAddress = $("#oneAddress").val();
	var oneIdCard = $("#oneIdCard").val();
	var organCode = $("#oneBusCode").val();
	var img1 = $("#label1").attr("imgType");
	var img2 = $("#label2").attr("imgType");
	var mobile = sessionStorage.getItem("mobile");
	if(mobile == phone){
		if(document.getElementById("agree").checked){
			if(checkBrand()==true && checkName()==true && checkAddress()==true && checkPwd()==true && checkAgainPwd()==true && checkIdCard()==true && checkOneBusCode()==true && codeIsTrue==true ){
				oneInfo.onePwd = onePwd;
				oneInfo.name = name;
				oneInfo.oneAddress = oneAddress;
				oneInfo.oneIdCard = oneIdCard;
				oneInfo.businessCode = organCode;
				oneInfo.businessImgPath = img2;
				oneInfo.cardImgPath = img1;
				oneInfo.phone = phone;
				oneInfo.latitude = latitude;
				oneInfo.longitude = longitude;
				sessionStorage.setItem("oneInfo",JSON.stringify(oneInfo));
				var user = JSON.parse(sessionStorage.getItem("oneInfo"));
				if(user!=null && user!=undefined){
					getGrid(user.latitude,user.longitude);
				}else{
					
				}
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

function getGrid(latitude,longitude){
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/getGrid.do", //请求接口
		data:{lat:latitude,lng:longitude},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				if(json.grids==null){
					Showbo.Msg.alert("您所在区域，暂不支持1公里服务商注册,请重新选择");
					$("#oneAddress").val("");
				}else{
//					console.log(json);
					location.href="one_service_chooseWine.html?id="+json.grids.id+"";
				}
			}else{
				Showbo.Msg.alert(json.message);
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
	});
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
		data:{type:2},
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





////判断成功调用的函数
//function oneRegSuccess(){
//	var province=$('#oneProvince').val();//省份
//	var city=$('#oneCity').val();//城市
//	var oneArea=$('#oneArea').val();//地区
//	var oneAdd=$('#oneAdd').val();//街道地址
//	window.location.href="oneServerSelectWine.html";
//}

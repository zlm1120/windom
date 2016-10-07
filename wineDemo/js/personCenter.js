$(window).resize(function(){  //窗口发送变化时，调用方法
	setSize();
});
function setSize(){
	var winW=$(window).width();
	if(winW<1430){  //浏览器窗口小于1430px时，引入样式
		$('head').append('<link href="css/less1430/common1430.css" type="text/css" rel="stylesheet" />');
		$('head').append('<link href="css/less1430/personCenter1430.css" type="text/css" rel="stylesheet" />');
	}else{//浏览器窗口大于1430px时，删除样式
		$('head link[href="css/less1430/common1430.css"]').remove();
		$('head link[href="css/less1430/personCenter1430.css"]').remove();
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
var longitude = "";
var latitude = "";
var ac = new BMap.Autocomplete({    //建立一个自动完成的对象
    "input" : "cityAddress"
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
	
var ac = new BMap.Autocomplete({    //建立一个自动完成的对象
    "input" : "brandAddress"
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
					$("#"+idName+"").attr("src",json.imgPath);
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

function checkName(){
	var name=$('#brandLinkName').val();
	if(/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(name)==false){
		Showbo.Msg.alert('请输入联系人姓名！如：张三');
		$('#brandLinkName').val('');
		return false;
	}else{
		return true;
	}
}

function checkPhone(){
	var phone=$('#brandLinkPhone').val();
	var patrn=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	if(patrn.test(phone)==false){
		Showbo.Msg.alert('请输入正确的电话号码！如：135****1472');
		$('#brandLinkPhone').val('');
		return false;
	}else{
		return true;
	}
}

function checkBusCode(){
	var brandBusCode = $("#brandBusCode").val();
	if(brandBusCode.length==15){
		return true;
	}else{
		Showbo.Msg.alert('请输入正确营业执照号！如：330103000068586');
		$('#brandBusCode').val('');
		return false;
	}
}
function checkBrandPermission(){
	var brandPermission = $("#brandPermission").val();
	if(brandPermission.length==14){
		return true;
	}else{
		Showbo.Msg.alert('请输入正确酒品许可证号！如：QS520015012729');
		$('#brandPermission').val('');
		return false;
	}
}

function checkBrandCirculate(){
	var brandCirculate = $("#brandCirculate").val();
	if(brandCirculate.length==23){
		return true;
	}else{
		Showbo.Msg.alert('请输入正确流通许可证号！如：SPXXXXXXXXXXXXXXXX');
		$('#brandCirculate').val('');
		return false;
	}
}


var identityType ="";
var serviceType = "";
function getData(){
	var id = getUrlValue("id");
	var type = getUrlValue("type"); 	
	var state =getUrlValue("state");
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/showInfo.do", //请求接口
		data:{id:id,type:type},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				if(state==1){
					$(".isShenHe").html('<img src="img/checkOk.png"/>');
				}else if(state==2){
					$(".isShenHe").html('<img src="img/checkIn.png"/>');
				}else if(state==3 || state==0){
					$(".isShenHe").html('<img src="img/checkFail.png"/>');
				}
				if(type==1){
					if(state==2){
						hideElement();
						$("#brandUname").val(json.rs.accountName);
						$("#brandLinkName").val(json.rs.contact);
						$("#brandLinkPhone").val(json.rs.mobile);
						$("#brandState").val("审核中");
						$("#brandBusCode").val(json.rs.businessNo);
						$("#brandPermission").val(json.rs.productionNo);
						$("#brandCirculate").val(json.rs.permitNo);
						$("#BrandFileImg1").attr("src",json.rs.businessImgPath);
						$("#BrandFileImg2").attr("src",json.rs.productionImgPath);
						$("#BrandFileImg3").attr("src",json.rs.permitImgPath);
					}else if(state==1 || state==3){
						showElement();
						if(state==1){
							$("#brandState").val("审核成功");
						}else{
							$("#brandState").val("审核失败");
						}
						$("#brandUname").val(json.rs.accountName);
						$("#brandLinkName").val(json.rs.contact);
						$("#brandLinkPhone").val(json.rs.mobile);
						
						$("#brandBusCode").val(json.rs.businessNo);
						$("#brandPermission").val(json.rs.productionNo);
						$("#brandCirculate").val(json.rs.permitNo);
						$("#BrandFileImg1").attr("src",json.rs.businessImgPath);
						$("#BrandFileImg2").attr("src",json.rs.productionImgPath);
						$("#BrandFileImg3").attr("src",json.rs.permitImgPath);
					}
					
				}else if(type==2){
					if(state==2){
						hideElement();
//						$("#brand_box").html("");
						$("#brandUname").val(json.rs.accountName);
						$("#brandLinkName").val(json.rs.contact);
						$("#brandState").val("审核中");
						$("#brandLinkPhone").val(json.rs.mobile);
						$("#brandBusCode").val(json.rs.businessNo);
						$("#cityFileImg1").attr("src",json.rs.businessImgPath);
						$("#brandName").val(json.rs.bankName);
						$("#brandUserName").val(json.rs.bankUser);
						$("#brandAccount").val(json.rs.bankNo);
					}else if(state==1 || state==3){
						if(state==1){
							$("#brandState").val("审核成功");
//							$("#brand_box").show();
						}else{
							$("#brandState").val("审核失败");
//							$("#brand_box").hide();
						}
						showElement();
						$("#brandUname").val(json.rs.accountName);
						$("#brandLinkName").val(json.rs.contact);
						$("#brandLinkPhone").val(json.rs.mobile);
						$("#brandBusCode").val(json.rs.businessNo);
						
						$("#cityFileImg1").attr("src",json.rs.businessImgPath);
						
						$("#brandName").val(json.rs.bankName);
						$("#brandUserName").val(json.rs.bankUser);
						$("#brandAccount").val(json.rs.bankNo);
					}
				}else if(type==3){
					
					if(state==2){
						hideElement();
//						$("#brand_box").html("");
						$("#brandUname").val(json.rs.mobile);
						$("#brandLinkName").val(json.rs.contact);
						$("#brandState").val("审核中");
						$("#brandAddress").val(json.rs.address);
						$("#brandBusCode").val(json.rs.businessNo);
						$("#idCardCode").val(json.rs.idNo);
						
						$("#BrandFileImg1").attr("src",json.rs.businessImgPath);
						$("#BrandFileImg2").attr("src",json.rs.cardImgPath);
						
						
						$("#brandName").val(json.rs.bankName);
						$("#brandUserName").val(json.rs.bankUser);
						$("#brandAccount").val(json.rs.bankNo);
					}else if(state==1 || state==3){
						showElement();
						if(state==1){
							$("#brandState").val("审核成功");
//							$("#brand_box").html('<div class="inputGroup"><label>开户行</label>'+
//							'<input type="text" class="brand-input" id="brandName" placeholder="请输入开户行"/>'+
//							'</div><div class="inputGroup"><label>开户人</label>'+
//							'<input type="text" class="brand-input" id="brandUserName" placeholder="请输入开户人姓名"/>'+
//							'</div><div class="inputGroup"><label>银行账号</label><input type="text" class="brand-input" id="brandAccount" placeholder="请输入银行账号"/></div>');
						
						}else{
							$("#brandState").val("审核失败");
//							$("#brand_box").html("");
						}
						$("#brandUname").val(json.rs.mobile);
						$("#brandLinkName").val(json.rs.contact);
						$("#brandAddress").val(json.rs.address);
						$("#brandBusCode").val(json.rs.businessNo);
						$("#idCardCode").val(json.rs.idNo);
						
						$("#BrandFileImg1").attr("src",json.rs.businessImgPath);
						$("#BrandFileImg2").attr("src",json.rs.cardImgPath);
						
						$("#brandName").val(json.rs.bankName);
						$("#brandUserName").val(json.rs.bankUser);
						$("#brandAccount").val(json.rs.bankNo);
					}
				}
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
   })	
}



function hideElement(){
	$('.personCenter input').attr('disabled','disabled');//不可编辑
	$('.personCenter select').attr('disabled','disabled');//不可编辑
	$('.pwd').hide(); //隐藏再次填写密码框
	$('.newPwd').hide(); //隐藏再次填写密码框
	$('.personCenter button').hide();//隐藏上传按钮
	$('.personCenter .inputGroup a').hide();//隐藏单选按钮
	$('.personCenter .file-input').hide();//隐藏上传按钮
	$('.personCenter .editConfirm').hide(); //隐藏确认修改按钮
	$('.personCenter .editBtn').hide(); //显示修改按钮
}
function showElement(){
	$('.personCenter input').removeAttr("disabled");  //可编辑
	$('.personCenter select').removeAttr("disabled"); //可编辑
	$('#busPrice').attr('disabled','disabled');
	$('#brandPrice').attr('disabled','disabled');
	$('.pwd').hide(); //隐藏再次填写密码框
	$('.newPwd').hide(); //隐藏再次填写密码框
	$('.personCenter button').show(); //显示上传按钮
	$('.personCenter .inputGroup a').show();//显示单选按钮
	$('.personCenter .inputGroup .radio').hide();//隐藏单选按钮的文本框
	$('.personCenter .file-input').show();//显示上传按钮
	$('.personCenter .editConfirm').hide(); //隐藏确认修改按钮
	$('.personCenter .editBtn').show(); //隐藏修改按钮
}
$('.cityEditBtn').click(function(){
	updateCityData();
})
function updateCityData(){
	var uname = $("#brandUname").val();
	var name = $("#brandLinkName").val();
	var phone = $("#brandLinkPhone").val();
	var brandBusCode = $("#brandBusCode").val();
	
	var img1 = $("#label1").attr("imgType");
	var id = getUrlValue("id");
	
	var brandName = $("#brandName").val();
	var brandUserName = $("#brandUserName").val();
	var brandAccount = $("#brandAccount").val();
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/updateCityProvider.do", //请求接口
		data:{mobile:phone,businessImgPath:img1,businessNo:brandBusCode,contact:name,accountName:uname,
		bankUser:brandUserName,bankNo:brandAccount,bankName:brandName,id:id},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				Showbo.Msg.alert('提交修改成功,请等待审核',goIndex);
			}else if(json.status==4){
				Showbo.Msg.alert('用户名不存在！',goIndex);
			}else{
				Showbo.Msg.alert('服务器异常！');
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
   })	
}

//品牌商修改
$('.brandEditBtn').click(function(){
	updateBrandData();
})

function updateBrandData(){
	var brandUname = $("#brandUname").val();
	var brandLinkName = $("#brandLinkName").val();
	var brandLinkPhone = $("#brandLinkPhone").val();
	var brandBusCode = $("#brandBusCode").val();
	var brandPermission = $("#brandPermission").val();
	var brandCirculate = $("#brandCirculate").val();
	var img1 = $("#label1").attr("imgType");
	var img2 = $("#label2").attr("imgType");
	var img3 = $("#label3").attr("imgType");
	if(img1==undefined){
		img1="";
	}
	if(img2==undefined){
		img2="";
	}
	if(img3==undefined){
		img3="";
	}
	var id = getUrlValue("id");
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/updateBrand.do", //请求接口
		data:{mobile:brandLinkPhone,businessImgPath:img1,productionImgPath:img2,permitImgPath:img3,
					contact:brandLinkName,accountName:brandUname,business_no:brandBusCode,production_no:brandPermission,permit_no:brandCirculate,id:id},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				Showbo.Msg.alert('提交修改成功,请等待审核',goIndex);
			}else if(json.status==4){
				Showbo.Msg.alert('用户名不存在！',goIndex);
			}else{
				Showbo.Msg.alert('服务器异常！');
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
     })	
}

/********************************************一公里服务商*******************************************/

//1公里服务商修改
$('.oneEditBtn').click(function(){
	updateOneServiceData();
})

function updateOneServiceData(){
	var oneUname = $("#brandUname").val();
	var oneName = $("#brandLinkName").val();
	var oneAddress = $("#brandAddress").val();
	var businessNo = $("#brandBusCode").val();
	var idCard = $("#idCardCode").val();

	var img1 = $("#label1").attr("imgType");
	var img2 = $("#label2").attr("imgType");
	var id = getUrlValue("id");
	
	var brandName = $("#brandName").val();
	var brandUserName = $("#brandUserName").val();
	var brandAccount = $("#brandAccount").val();
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/updateKilometerProvider.do", //请求接口
		data:{mobile:oneUname,businessImgPath:img1,cardImgPath:img2,
			contact:oneName,address:oneAddress,latitude:latitude,longitude:longitude,id:id,
			businessNo:businessNo,idNo:idCard,bankUser:brandUserName,bankNo:brandAccount,bankName:brandName},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				Showbo.Msg.alert('提交修改成功,请等待审核',goIndex);
			}else if(json.status==4){
				Showbo.Msg.alert('用户名不存在！',goIndex);
			}else{
				Showbo.Msg.alert('服务器异常！');
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
   })	
}

function goIndex(){
	location.href="index.html";
}




$(function(){
	setSize(); //调用方法，设置加载的样式
	var type = getUrlValue("type");
	if(type==1){
		$(".page1").hide();
		$(".page2").hide();
		$(".page3").hide();
		$(".page4").show();
	}else if(type==2){
		$(".page1").hide();
		$(".page2").show();
		$(".page3").hide();
		$(".page4").hide();
	}else if(type==3){
		$(".page1").show();
		$(".page2").hide();
		$(".page3").hide();
		$(".page4").hide();
	}
	getData();
//	$('.loginBefore').hide();
//	$('.loginAfter').show();
})

/*
 *正则表达式
 * 电话：/^(((13[0-9]{1})|(18[0-9]{1})|(17[6-9]{1})|(15[0-9]{1}))+\d{8})$/
 * 邮箱：/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
 * */
//var identityType="个人",serviceType="固定",outfitType=""; //注册身份、服务类型
//var isTel=/^(((13[0-9]{1})|(18[0-9]{1})|(17[6-9]{1})|(15[0-9]{1}))+\d{8})$/;
//var isEmail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
//$(function(){
//	$('.personCenter input').attr('disabled','disabled');//不可编辑
//	$('.personCenter select').attr('disabled','disabled');//不可编辑
//	$('.againPwd').hide(); //隐藏再次填写密码框
//	$('.personCenter button').hide();//隐藏上传按钮
//	$('.personCenter .inputGroup a').hide();//隐藏单选按钮
//	$('.personCenter .file-input').hide();//隐藏上传按钮
//	$('.personCenter .editConfirm').hide(); //隐藏确认修改按钮
//	$('.personCenter .editBtn').show(); //显示修改按钮
//})
//$('.personCenter .editBtn').click(function(){
//	$('.personCenter input').removeAttr("disabled");  //可编辑
//	$('.personCenter select').removeAttr("disabled"); //可编辑
//	$('#busPrice').attr('disabled','disabled');
//	$('#brandPrice').attr('disabled','disabled');
//	$('.againPwd').show();//显示再次填写密码框
//	$('.personCenter button').show(); //显示上传按钮
//	$('.personCenter .inputGroup a').show();//显示单选按钮
//	$('.personCenter .inputGroup .radio').hide();//隐藏单选按钮的文本框
//	$('.personCenter .file-input').show();//显示上传按钮
//	$('.personCenter .editConfirm').show(); //显示确认修改按钮
//	$('.personCenter .editBtn').hide(); //隐藏修改按钮
//	
//	$('.oneCardRadio').eq(0).css('background','url(img/ServerFocus.png)  no-repeat left center');
//	$('.oneRadio').eq(0).css('background','url(img/ServerFocus.png)  no-repeat left center');
//})
//
//function hideFunc(){
//	$('.personCenter input').attr('disabled','disabled');//不可编辑
//	$('.personCenter select').attr('disabled','disabled');//不可编辑
//	$('.againPwd').hide();//隐藏再次填写密码框
//	$('.personCenter button').hide();//隐藏单选按钮
//	$('.personCenter .file-input').hide();//隐藏上传按钮
//	$('.personCenter .editConfirm').hide(); //隐藏确认修改按钮
//	$('.personCenter .inputGroup a').hide();//隐藏单选按钮
//	$('.personCenter .inputGroup .radio').show();//显示单选按钮的文本框
//	$('.personCenter .editBtn').show(); //显示修改按钮	
//
//}


////更改身份证
//function showOnePreview1(source) {
//	var file = source.files[0];
//	if (window.FileReader) {
//		var fr = new FileReader();
//		fr.onloadend = function(e) {
//			$("#oneFileImg1").attr('src',e.target.result);
//		};
//		fr.readAsDataURL(file);
//	}
//}
////更改营业执照
//function showOnePreview2(source) {
//	var file = source.files[0];
//	if (window.FileReader) {
//		var fr = new FileReader();
//		fr.onloadend = function(e) {
//			$("#oneFileImg2").attr('src',e.target.result);
//		};
//		fr.readAsDataURL(file);
//	}
//}
//
//$('#oneEditBtn').click(function(){
//	var flag1=false,flag2=false,flag3=false;
//	$('#oneCardInput').val(identityType); //更改注册身份的文本值
//	$('#oneRadioInput').val(serviceType);//更改服务类型的文本值
//	var oneUname=$('#oneUname').val();//用户名
//	var onePwd=$('#onePwd').val();//密码
//	var onePwdAgain=$('#onePwdAgain').val();//重复输入密码
//	var organCode=$('#organCode').val();//获取组织机构证代码
//	//判断手机号
//	if(oneUname!="" && oneUname !="请输入手机号码或邮箱"){
//		if(!isTel.test(oneUname)){
//			if(!isEmail.test(oneUname)){
//				Showbo.Msg.alert('账号格式不正确');
//				flag1=false;
//			}else{
//				flag1=true;
//			}
//		}else{
//			flag1=true;
//		}
//	}else{
//		Showbo.Msg.alert("请设置账号");
//	}
//	//密码判断
//	if(onePwdAgain!="" && onePwdAgain==onePwd){
//		flag2=true;
//	}else{
//		Showbo.Msg.alert("请设置密码");
//	}
//	
//	if(organCode!=""){
//		flag3=true;
//	}else{
//		Showbo.Msg.alert("请填写组织机构证代码");
//	}
//	if(flag1==true && flag2==true &&flag3==true){
//		hideFunc();
//		Showbo.Msg.alert('一公里服务商修改成功');
//	}
//})
///********************************************城市服务商*******************************************/
////更改身份证
//function showCityPreview1(source) {
//	var file = source.files[0];
//	if (window.FileReader) {
//		var fr = new FileReader();
//		fr.onloadend = function(e) {
//			$("#cityFileImg1").attr('src',e.target.result);
//		};
//		fr.readAsDataURL(file);
//	}
//}
////更改营业执照
//function showCityPreview2(source) {
//	var file = source.files[0];
//	if (window.FileReader) {
//		var fr = new FileReader();
//		fr.onloadend = function(e) {
//			$("#cityFileImg2").attr('src',e.target.result);
//		};
//		fr.readAsDataURL(file);
//	}
//}
//$('#cityEditBtn').click(function(){
//	var flag1=false,flag2=false,flag3=false;
//	var cityUname=$('#cityUname').val();//用户名
//	var cityPwd=$('#cityPwd').val();//密码
//	var cityPwdAgain=$('#cityPwdAgain').val();//重复输入密码
//	var cityBankCard=$('#cityBankCard').val();//银行卡账号
//
//	//判断手机号
//	if(cityUname!=""){
//		if(!isTel.test(cityUname)){
//			if(!isEmail.test(cityUname)){
//				Showbo.Msg.alert('账号格式不正确');
//				flag1=false;
//			}else{
//				flag1=true;
//			}
//		}else{
//			flag1=true;
//		}
//	}else{
//		Showbo.Msg.alert("请设置账号");
//	}
//	//密码判断
//	if(cityPwdAgain!="" && cityPwdAgain==cityPwd){
//		flag2=true;
//	}else{
//		Showbo.Msg.alert("请设置密码");
//	}
//	
//	if(cityBankCard!=""){
//		if(! /^(\d{16}|\d{19})$/.test(cityBankCard)){
//			Showbo.Msg.alert("请输入正确的银行卡号");
//		}else{
//			flag3=true;
//		}
//	}else{
//		Showbo.Msg.alert("请输入银行卡号");
//	}
//	
//	
//	if(flag1==true && flag2==true && flag3==true){
//		hideFunc();
//		Showbo.Msg.alert("城市服务商修改成功");
//	}
//})
///*******************************************************业务员*************************************************/
////更改身份证
//function showBusPreview1(source) {
//	var file = source.files[0];
//	if (window.FileReader) {
//		var fr = new FileReader();
//		fr.onloadend = function(e) {
//			$("#busFileImg1").attr('src',e.target.result);
//		};
//		fr.readAsDataURL(file);
//	}
//}
////绑定机构按钮控制
//$('.busRadio').click(function(){
//	if($(this).attr('data-check')==0){
//		$(this).css('background','url(img/ServerFocus.png)  no-repeat left center');
//		$(this).attr('data-check',1);
//		outfitType="一公里服务商";
//	}else if($(this).attr('data-check')==1){
//		$(this).css('background','url(img/ServerBlur.png)  no-repeat left center');
//		$(this).attr('data-check',0);
//		outfitType="";
//	}
//})
//$('#busEditBtn').click(function(){
//	var flag1=false,flag2=false;
//	$('#busRadioInput').val(outfitType);
//	var busUname=$('#busUname').val();//用户名
//	var busPwd=$('#busPwd').val();//密码
//	var busPwdAgain=$('#busPwdAgain').val();//重复输入密码
//	//判断手机号
//	if(busUname!=""){
//		if(!isTel.test(busUname)){
//			if(!isEmail.test(busUname)){
//				Showbo.Msg.alert('账号格式不正确');
//				flag1=false;
//			}else{
//				flag1=true;
//			}
//		}else{
//			flag1=true;
//		}
//	}else{
//		Showbo.Msg.alert("请设置账号");
//	}
//	//密码判断
//	if(busPwdAgain!="" && busPwdAgain==busPwd){
//		flag2=true;
//	}else{
//		Showbo.Msg.alert("请设置密码");
//	}
//	if(flag1==true && flag2==true){
//		hideFunc();
//		Showbo.Msg.alert("业务员修改成功");
//	}
//})
///*******************************************************品牌服务商*************************************************/
////更改营业执照
//function showBrandPreview1(source) {
//	var file = source.files[0];
//	if (window.FileReader) {
//		var fr = new FileReader();
//		fr.onloadend = function(e) {
//			$("#BrandFileImg1").attr('src',e.target.result);
//		};
//		fr.readAsDataURL(file);
//	}
//}
////更改税务登记证
//function showBrandPreview2(source) {
//	var file = source.files[0];
//	if (window.FileReader) {
//		var fr = new FileReader();
//		fr.onloadend = function(e) {
//			$("#BrandFileImg2").attr('src',e.target.result);
//		};
//		fr.readAsDataURL(file);
//	}
//}
////更改组织机构证代码
//function showBrandPreview3(source) {
//	var file = source.files[0];
//	if (window.FileReader) {
//		var fr = new FileReader();
//		fr.onloadend = function(e) {
//			$("#BrandFileImg3").attr('src',e.target.result);
//		};
//		fr.readAsDataURL(file);
//	}
//}
////更改酒类生产许可
//function showBrandPreview4(source) {
//	var file = source.files[0];
//	if (window.FileReader) {
//		var fr = new FileReader();
//		fr.onloadend = function(e) {
//			$("#BrandFileImg4").attr('src',e.target.result);
//		};
//		fr.readAsDataURL(file);
//	}
//}
////更改流通许可证
//function showBrandPreview5(source) {
//	var file = source.files[0];
//	if (window.FileReader) {
//		var fr = new FileReader();
//		fr.onloadend = function(e) {
//			$("#BrandFileImg5").attr('src',e.target.result);
//		};
//		fr.readAsDataURL(file);
//	}
//}
//$('#brandEditBtn').click(function(){
//	var flag1=false,flag2=false;
//	var brandUname=$('#brandUname').val();//用户名
//	var brandPwd=$('#brandPwd').val();//密码
//	var brandPwdAgain=$('#brandPwdAgain').val();//重复输入密码
//	//判断手机号
//	if(brandUname!="" ){
//		if(!isTel.test(brandUname)){
//			if(!isEmail.test(brandUname)){
//				Showbo.Msg.alert('账号格式不正确');
//				flag1=false;
//			}else{
//				flag1=true;
//			}
//		}else{
//			flag1=true;
//		}
//	}else{
//		Showbo.Msg.alert("请设置账号");
//	}
//	//密码判断
//	if(brandPwdAgain!="" && brandPwdAgain==brandPwd){
//		flag2=true;
//	}else{
//		Showbo.Msg.alert("请设置密码");
//	}
//	
//	if(flag1==true && flag2==true){
//		hideFunc();
//		Showbo.Msg.alert("品牌服务商修改成功");
//	}
//})
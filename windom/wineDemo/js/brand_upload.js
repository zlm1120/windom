////  上传图片
//function showPreview(source) {
//	var file = source.files[0];
//	if (window.FileReader) {
//		var fr = new FileReader();
//		fr.onloadend = function(e) {
//			document.getElementById("portrait").src = e.target.result;
//		};
//		fr.readAsDataURL(file);
//	}
//}
//
//添加图片
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
//			addimg.src = e.target.result;
//		};
//		fr.readAsDataURL(file);
//	}
//	$('.icon-remove').click(function(){
//		$(this).parent().remove();
//	})
//}

$(function(){
	agreeContent();
})
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
		Showbo.Msg.alert('请输入正确流通许可证号！如：SPXXXXXXXXXXXXXXXXXXXXX');
		$('#brandCirculate').val('');
		return false;
	}
}

function submit(){
	var brand_user = JSON.parse(sessionStorage.getItem("brand"));
	var brandUname = brand_user.brandUname;
	var brandPwd = brand_user.brandPwd;
	var name = brand_user.name;
	var phone = brand_user.phone;
	var brandBusCode = $("#brandBusCode").val();
	var brandPermission = $("#brandPermission").val();
	var brandCirculate = $("#brandCirculate").val();
	var img1 = $("#label1").attr("imgType");
	var img2 = $("#label2").attr("imgType");
	var img3 = $("#label3").attr("imgType");
	if(document.getElementById("agree").checked){
		if(brandBusCode!="" && brandPermission!="" &&brandCirculate!="" && img1!=undefined && img2!=undefined && img3!=undefined){
			$.ajax({
				type: "GET",
				async : false,  //同步请求
				url: ipAddress+"/applyBrand.do", //请求接口
				data:{account:phone,passwd:brandPwd,businessImgPath:img1,productionImgPath:img2,permitImgPath:img3,
					contact:name,accountName:brandUname,business_no:brandBusCode,production_no:brandPermission,permit_no:brandCirculate},
				dataType:"jsonp",
				timeout:5000, 
				success:function(json){
					if(json.status==1){
						Showbo.Msg.alert('您已提交注册信息！',goSuss);
					}else if(json.status==4){
						Showbo.Msg.alert('对不起，您的手机号已注册',goIndex);
					}
				},
				error:function(){
					Showbo.Msg.alert('网络错误！');
				}
			})
		}else{
				Showbo.Msg.alert('请完善资料');
		}
	}else{
		Showbo.Msg.alert('请同意用户协议');
	}
		
	
}

function goIndex(){
	location.href="index.html";
}
function goSuss(){
	location.href="brand_reg_three.html";
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
		data:{type:0},
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






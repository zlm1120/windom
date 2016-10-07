$(function(){
	getBank();
	isGet();
})

function isGet(){
	var user = JSON.parse(sessionStorage.getItem("user"));
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/getPayment.do", //请求接口
		data:{userId:user.id},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			var payment = json.payment;
			if(payment==null){
				
			}else{
				Showbo.Msg.alert('您提交的信息正在审核中');
				$("#photo_box").html('<img src='+payment.image+'>');
				$("#get_box").html('<input type="button" class="notGet" value="提交"  disabled="disabled"/>');
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
	});
}


function getBank(){
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/getBanks.do", //请求接口
		data:{},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			var list = json.banks;
			var html = "";
			for(var i=0;i<list.length;i++){
				html += '<div class="bank"><img src="'+list[i].image+'" /><p>'+list[i].bankName+'</p><p class="account_num">'+list[i].account+'</p><p>'+list[i].name+'</p></div>';
			}
			$(".bank_box").html(html);
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
	});
}

function showPreview(formName,idName){
	 $("#"+formName+"").ajaxSubmit({
	     type:'post',
	     url:ipAddress+'/uploadImg.do',
	     data:{},
	     dataType:"json",
	     success:function(json){
			if(json.status==1){
				if(json.imgPath!=null || json.imgPath!=""){
					$("#"+idName).html('<img src='+json.imgPath+'>');
					$("#label1").attr("imgType",json.imgName);
				}else{
					$("#label1").attr("imgType","");
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

function getMoney(){
	Showbo.Msg.confirm('请确保转账金额与缴纳保证金一致',function(btn){if(btn=="yes"){
		submitMoney();
	}});
}
function submitMoney(){
	var deposit = sessionStorage.getItem("deposit");
	var user = JSON.parse(sessionStorage.getItem("user"));
	var img1 = $("#label1").attr("imgType");
	if(img1==null || img1==undefined || img1 == ""){
		Showbo.Msg.alert("请上传汇款凭证");
	}else{
		$.ajax({
			type: "GET",
			async : false,  //同步请求
			url: ipAddress+"/payment.do", //请求接口
			data:{userId:user.id,amount:deposit,payer:user.account,image:img1},
			dataType:"jsonp",
			timeout:5000, 
			success:function(json){
				if(json.status==1){
					Showbo.Msg.alert('提交数据成功',goLook);
				}else{
					Showbo.Msg.alert('服务器异常！');
				}
			},
			error:function(){
				Showbo.Msg.alert('网络错误！');
			}
		})
	}
}

function goLook(){
	var user = JSON.parse(sessionStorage.getItem("user"));
	if(user.type==2){
		location.href="lookProcessCity.html";
	}else if(user.type==3){
		location.href="lookProcessOne.html";
	}
}

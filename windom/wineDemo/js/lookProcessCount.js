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
$(function(){
	var type = getUrlValue("type");
	if(typeof(type)=="object"){
		var type = sessionStorage.getItem("type");
	}else{
		var type = type;
		sessionStorage.setItem("type",type);
	}
	getCount(type);
	getRegConfig(type);
})
var deposit = "";
var wineId = "";
var id = sessionStorage.getItem("userId");
var oneService = JSON.parse(sessionStorage.getItem("user"));

function getCount(type){
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/selectWine.do", //请求接口
		data:{id:id,option:1,mapComboId:oneService.mapComboId},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			var len = 0;
			if(json.status==1){
				var data = json.rs;
				var html = '';
				deposit = json.depositCity;
//				len = data.length;
				if(type==3){
					for(var i=0;i<data.length;i++){
						if(data[i].wineCheck==4){
							if(data[i].hidden==0){
								
							}else if(data[i].hidden==1){
								len=len+1;
								wineId+=data[i].id+",";
								html +='<div class="list"><div class="PicBox">'+
									'<img src="'+data[i].img_path+'" />'+
								'</div><div class="gary_div">'+
								'<h1>'+data[i].wine_name+'</h1>'+
								'<h5>'+data[i].wine_name+' '+data[i].degree+'度'+data[i].standard+'ML</h5>'+
								'<strong>数量：'+data[i].amount+'瓶</strong>'+
								'<a href="javascript:void(0)" class="inCheck">待支付</a></div></div>';
							}
						}
					}
					
				}else{
					for(var i=0;i<data.length;i++){
						if(data[i].wineCheck==4){
							if(data[i].hidden==0){
								
							}else if(data[i].hidden==1){
								len=len+1;
								wineId+=data[i].id+",";
								html +='<div class="list"><div class="PicBox">'+
									'<img src="'+data[i].img_path+'" />'+
								'</div><div class="gary_div">'+
								'<h1>'+data[i].wine_name+'</h1>'+
								'<h5>'+data[i].wine_name+' '+data[i].degree+'度'+data[i].standard+'ML</h5>'+
								'<a href="javascript:void(0)" class="inCheck">待支付</a></div></div>';
							}
							
						}
					}
				}
				$(".processBox").eq(1).find("div").eq(0).html(html);
				
				$(".price").html('<p>保证金：<a id="priceTotal">'+deposit+'</a></p><p class="now" style="color: #FFFFFF;" onclick="getDisposit()">立即缴费</p>');
				sessionStorage.setItem("deposit",deposit);
			}else{
				Showbo.Msg.alert('服务器异常！');
			}
			sessionStorage.setItem("len",len);
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
  	})
}

function getRegConfig(type){
	var types = "";
	if(type==3){
		types = 1;
	}else{
		types=0;
	}
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/getRegConfig.do", //请求接口
		data:{type:types},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				if(json.config!=null){
					if(json.config.bzjStatus==1){
						var len = sessionStorage.getItem("len");
						if(len<=0){
							$(".price").hide();
						}else{
							$(".price").show();
						}
						
					}else{
						$(".price").hide();
					}
				}else{
					$(".price").hide();
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



function getDisposit(){
	location.href="agreement.html?id="+id;
//	$.ajax({
//		type: "GET",
//		async : false,  //同步请求
//		url: ipAddress+"/submitApplyWineInfo.do", //请求接口
//		data:{id:id,wineIdCheck:wineId,deposit:deposit},
//		dataType:"jsonp",
//		timeout:5000, 
//		success:function(json){
//			if(json.status==1){
//				Showbo.Msg.alert("提交成功",goIndex);
//			}else{
//				Showbo.Msg.alert('服务器异常！');
//			}
//		},
//		error:function(){
//			Showbo.Msg.alert('网络错误！');
//		}
//	})
}
function goIndex(){
	location.href="lookProcessCity.html";
}




//$('.wineTypes div').each(function(num){
//	$(this).click(function(){
//		$('.wineTypes div').removeClass('checkIn');
//		$(this).addClass('checkIn');
//		$('.item').hide();
//		$('.item').eq(num).show();
//	})
//})

////得到url中某个属性的值
//function getUrlValue(key) {
//	var url = window.location.search;
//	var theRequest = new Object();
//	if (url.indexOf("?") != -1) {
//		var str = url.substr(1);
//		strs = str.split("&");
//		for (var i = 0; i < strs.length; i++) {
//			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
//			if (strs[i].split("=")[0] == key) {
//				return strs[i].split("=")[1];
//			}
//		}
//	}
//	return theRequest;
//}

$(function(){
	getWine();
	getRegConfig();
})
function getWine(){
		var wines= JSON.parse(sessionStorage.getItem("wines"));
		var deposi = sessionStorage.getItem("deposi");
		
		var html = "";
		for(var i = 0;i<wines.length;i++){
			html+='<div class="list isNotVerify">'+
						'<div class="PicBox">'+
							'<img src="'+wines[i].img_path+'" />'+
						'</div>';
						if(wines[i].wine_name.length>=9){
							var wineName =wines[i].wine_name.replace(wines[i].wine_name.substr(9, wines[i].wine_name.length),"···");
							html +='<h1>'+wineName+'</h1>';
						}else{
							html += '<h1>'+wines[i].wine_name+' '+wines[i].degree+'度'+wines[i].standard+'ML</h1>';
						}
						html += '</div>';
		}
		$(".item").html(html);	
	
}
function getRegConfig(){
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/getRegConfig.do", //请求接口
		data:{type:0},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				if(json.config==null){
					if(json.config.cyjStatus==1){
						$(".price").html('<p>诚意金：<span>￥'+json.config.cyj+'</span></p>');
						$(".operation").html('<input type="button" class="last" value="上一步" onclick="returnLast(\'\')"/>'+
						'<input type="button" class="brand_next" value="立即支付"/>');
					}else{
						$(".price").hide();
						$(".operation").html('<input type="button" class="last" value="上一步" onclick="returnLast(\'\')"/>'+
						'<input type="button" class="brand_next" value="下一步" onclick="succ(\'\')"/>');
					}
				}else{
					$(".price").hide();
					$(".operation").html('<input type="button" class="last" value="上一步" onclick="returnLast(\'\')"/>'+
						'<input type="button" class="brand_next" value="下一步" onclick="succ(\'\')"/>');
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
function returnLast(){
	location.href="city_service_chooseWine.html";
}
function succ(){
	location.href="city_service_succ.html";
}

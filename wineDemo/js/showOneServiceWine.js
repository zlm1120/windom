var ruleId = "";
var detailId = "";
$(function(){
	//获取套餐
	getGrid();
	
//	getComo("31334ec8595343c0a69e52a77fea4d20");
//	getWine("03091658a41d4a0e9411ec198db935dd");
//	sessionStorage.removeItem("addId");
//	sessionStorage.removeItem("addNum");
	getRegConfig();
})


function getGrid(){
	var oneService = JSON.parse(sessionStorage.getItem("oneInfo"));
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/getGrid.do", //请求接口
		data:{lat:oneService.latitude,lng:oneService.longitude},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				if(json.grids==null){
					
				}else{
					getBigComo(json.grids.id);
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

function getBigComo(gridId){
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/getGridRules.do", //请求接口
		data:{id:gridId},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				var html = "";
				var id = sessionStorage.getItem("ruleIds");
				for(var i=0;i<json.rules.length;i++){
					if(json.rules[i].id==id){
						ruleId = json.rules[i].rule_id;
						html+='<a href="javascript:void(0)" class="check" data-ruleId="'+json.rules[i].rule_id+'">'+json.rules[i].name+'</a>';
					}
//					if(i==0){
//						ruleId = json.rules[i].rule_id;
//						html+='<a href="javascript:void(0)" class="check" data-ruleId="'+json.rules[i].rule_id+'">'+json.rules[i].name+'</a>';
//					}else{
//						html +='<a href="javascript:void(0)" data-ruleId="'+json.rules[i].rule_id+'">'+json.rules[i].name+'</a>';
//					}
					
				}
				$(".combos").html(html);
				
				var item = 0;
				$('.combos a').each(function(index){
					$(this).click(function(){
						$('.combos a').removeClass('check');
						$(this).addClass('check');
						var ruleId = $(this).attr('data-ruleId');
						$('.wineTypes div').removeClass('checkIn');
						$('.wineTypes div').eq(item).addClass('checkIn');
						getComo(ruleId);
					})
				})
				getComo(ruleId);
			}else{
				Showbo.Msg.alert('服务器异常！');
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
  })
}


function getComo(ruleId){
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/findByRuleId.do", //请求接口
		data:{id:ruleId},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				var html = "";
				for(var i=0;i<json.detail.length;i++){
					if(i==0){
						detailId = json.detail[i].detail_id;
						html+='<div class="checkIn" data-detailId="'+json.detail[i].detail_id+'">'+json.detail[i].name+'</div>';
					}else{
						html+='<div data-detailId="'+json.detail[i].detail_id+'">'+json.detail[i].name+'</div>';
					}
				}
				$(".wineTypes").html(html);
				$('.wineTypes div').each(function(num){
					$(this).click(function(){
						$('.wineTypes div').removeClass('checkIn');
						$(this).addClass('checkIn');
						var detailId = $(this).attr("data-detailId");
						getWine(detailId,ruleId);
					})
				})
				getWine(detailId);
			}else{
				Showbo.Msg.alert('服务器异常！');
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
  })
}

function getWine(detailId,ruleId){
	var wineList = JSON.parse(sessionStorage.getItem("wines"));
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/findWinesByRuleId.do", //请求接口
		data:{id:detailId,ruleId:ruleId},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				var html = '<div class="item">';
				for(var i=0;i<json.wines.length;i++){
					for(var j=0;j<wineList.length;j++){
						
						if(json.wines[i].id==wineList[j].id){
							
						html+='<div class="list isNotVerify">'+
								'<div class="PicBox">'+
								'<img src="'+json.wines[i].img_path+'" /></div>';
								if(json.wines[i].wine_name.length>=9){
									var wineName =json.wines[i].wine_name.replace(json.wines[i].wine_name.substr(9, json.wines[i].wine_name.length),"···");
									html +='<h1>'+wineName+'</h1>';
								}else{
									html += '<h1>'+json.wines[i].wine_name+' '+json.wines[i].degree+'度'+json.wines[i].standard+'ML</h1>';
								}
								html += '<strong>数量：'+wineList[j].amount+'瓶</strong></div>';
						}
					}
				}
				html +='</div>';
				$(".cityMainWines").html(html);
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
  })
}


function getRegConfig(){
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/getRegConfig.do", //请求接口
		data:{type:1},
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
	location.href="one_service_chooseWine.html";
}
function succ(){
	location.href="one_service_succ.html";
}



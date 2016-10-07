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
//
//$(function(){
//	var type = getUrlValue("type");
//	setSize(); //调用方法，设置加载的样式
//	showPage();
//	getWineSuss();
//	getWineIn();
//	getWineFail();
//	getWineDaiLi();
//	
////	getOneWine();
//	$('.loginBefore').hide();
//	$('.loginAfter').show();
//})
//$(window).resize(function(){  //窗口发送变化时，调用方法
//	setSize();
//});
//function setSize(){
//	var winW=$(window).width();
//	if(winW<1430){  //浏览器窗口小于1430px时，引入样式
//		$('head').append('<link href="css/less1430/common1430.css" type="text/css" rel="stylesheet" />');
//		$('head').append('<link href="css/less1430/lookProcess1430.css" type="text/css" rel="stylesheet" />');
//	}else{//浏览器窗口大于1430px时，删除样式
//		$('head link[href="css/less1430/common1430.css"]').remove();
//		$('head link[href="css/less1430/lookProcess1430.css"]').remove();
//	}
//}
//
//function showPage(){
//	var type = getUrlValue("type");
//	if(type==2){
//		$(".adBanner2").show();
//		$(".adBanner1").hide();
//		$(".page2").show();
//		$(".page1").hide();
//	}else if(type==3){
//		$(".adBanner2").hide();
//		$(".adBanner1").show();
//		$(".page2").hide();
//		$(".page1").show();
//	}
//}
//
//
//var checkWine ="";
//function getWineSuss(){
//	var userId = getUrlValue("id");
//	var totalPrice =0;
//	var type = getUrlValue("type");
//	$.ajax({
//		type: "GET",
//		async : false,  //同步请求
//		url: ipAddress+"/cityApplyWineInfo.do", //请求接口
//		data:{id:userId,type:2},
//		dataType:"jsonp",
//		timeout:5000, 
//		success:function(json){
//			if(json.status==1){
//				var data = json.rs;
//				if(data.length<=0){
//					$(".page1 .personTitle").hide();
//					$(".page2 .personTitle").hide();
//				}else{
//					checkWine  = data;
//					var html = "";
//					for(var i=0;i<data.length;i++){
//						totalPrice += parseInt(data[i].deposit);
//						html+='<div class="list">'+
//						'<div class="PicBox">'+
//							'<img src="'+data[i].img_path+'" />'+
//						'</div>'+
//						'<h1>'+data[i].wine_name+''+data[i].degree+'度  '+data[i].standard+'Ml</h1>'+
//					'</div>';
//					}
//					if(parseInt(totalPrice)==0){
//						$(".city_price").html("0.00");
//					}else{
//						$(".city_price").html(parseInt(totalPrice)+".00");
//					}
//					if(type==2){
//						$(".page2 .processBox").html(html);
//					}else{
//						$(".page1 .processBox").html(html);
//					}
//				}
//				
//				
//			}else{
//				Showbo.Msg.alert('访问服务器异常！');
//			}
//		},
//		error:function(){
//			Showbo.Msg.alert('网络错误！');
//		}
//  })	
//}
//
//
//function getWineIn(){
//	var userId = getUrlValue("id");
//	var type = getUrlValue("type");
//	$.ajax({
//		type: "GET",
//		async : false,  //同步请求
//		url: ipAddress+"/cityApplyWineInfo.do", //请求接口
//		data:{id:userId,type:1},
//		dataType:"jsonp",
//		timeout:5000, 
//		success:function(json){
//			if(json.status==1){
//				var data = json.rs;
//				if(data.length<=0){
//					$(".page1 .personTitle1").hide();
//					$(".page2 .personTitle1").hide();
//				}else{
//					var html = "";
//					for(var i=0;i<data.length;i++){
//						html+='<div class="list">'+
//						'<div class="PicBox">'+
//							'<img src="'+data[i].img_path+'" />'+
//						'</div>'+
//						'<h1>'+data[i].wine_name+''+data[i].degree+'度  '+data[i].standard+'Ml</h1>'+
//					'</div>';
//					}
//					if(type==2){
//						$(".page2 .processBox1").html(html);
//					}else{
//						$(".page1 .processBox1").html(html);
//					}
//				}
//				
//			}else{
//				Showbo.Msg.alert('访问服务器异常！');
//			}
//		},
//		error:function(){
//			Showbo.Msg.alert('网络错误！');
//		}
//  })	
//}
//
//
//function getWineFail(){
//	var userId = getUrlValue("id");
//	var type = getUrlValue("type");
//	$.ajax({
//		type: "GET",
//		async : false,  //同步请求
//		url: ipAddress+"/cityApplyWineInfo.do", //请求接口
//		data:{id:userId,type:3},
//		dataType:"jsonp",
//		timeout:5000, 
//		success:function(json){
//			if(json.status==1){
//				var data = json.rs;
//				if(data.length<=0){
//					$(".page1 .personTitle2").hide();
//					$(".page2 .personTitle2").hide();
//				}else{
//					var html = "";
//					for(var i=0;i<data.length;i++){
//						html+='<div class="list">'+
//						'<div class="PicBox">'+
//							'<img src="'+data[i].img_path+'" />'+
//						'</div>'+
//						'<h1>'+data[i].wine_name+''+data[i].degree+'度  '+data[i].standard+'Ml</h1>'+
//					'</div>';
//					}
//					if(type==2){
//						$(".page2 .processBox2").html(html);
//					}else{
//						$(".page1 .processBox2").html(html);
//					}
//				}
//			}else{
//				Showbo.Msg.alert('访问服务器异常！');
//			}
//		},
//		error:function(){
//			Showbo.Msg.alert('网络错误！');
//		}
//  })	
//}
//
//function getWineDaiLi(){
//	var userId = getUrlValue("id");
//	var type = getUrlValue("type");
//	$.ajax({
//		type: "GET",
//		async : false,  //同步请求
//		url: ipAddress+"/cityApplyWineInfo.do", //请求接口
//		data:{id:userId,type:4},
//		dataType:"jsonp",
//		timeout:5000, 
//		success:function(json){
//			if(json.status==1){
//				var data = json.rs;
//				if(data.length<=0){
//					$(".page1 .personTitle3").hide();
//					$(".page2 .personTitle3").hide();
//				}else{
//					var html = "";
//					for(var i=0;i<data.length;i++){
//						html+='<div class="list">'+
//						'<div class="PicBox">'+
//							'<img src="'+data[i].img_path+'" />'+
//						'</div>'+
//						'<h1>'+data[i].wine_name+''+data[i].degree+'度  '+data[i].standard+'Ml</h1>'+
//					'</div>';
//					}
//					if(type==2){
//						$(".page2 .processBox3").html(html);
//					}else{
//						$(".page1 .processBox3").html(html);
//					}
//				}
//			}else{
//				Showbo.Msg.alert('访问服务器异常！');
//			}
//		},
//		error:function(){
//			Showbo.Msg.alert('网络错误！');
//		}
//  })	
//}
//
//$('.oneAtOnceBtn').click(function(){
//	submitApplyWineInfo();
//})
//$(".cityAtOnceBtn").click(function(){
//	submitApplyWineInfo();
//})
//
//function submitApplyWineInfo(){
//	var userId = getUrlValue("id");
//	var type = getUrlValue("type");
//	var price = $(".city_price").html();
//	var deposit = "";
//	if(price=="" || price==undefined || price==null){
//		deposit="0.00";
//	}else{
//		deposit=price;
//	}
//	var wineIdCheck = [];
//	for(var i=0;i<checkWine.length;i++){
//		wineIdCheck[i] = checkWine[i].id;
//	}
//	$.ajax({
//		type: "GET",
//		async : false,  //同步请求
//		url: ipAddress+"/submitApplyWineInfo.do", //请求接口
//		data:{id:userId,wineIdCheck:wineIdCheck.toString(),deposit:deposit},
//		dataType:"jsonp",
//		timeout:5000, 
//		success:function(json){
//			if(json.status==1){
//				if(type==2){
//					Showbo.Msg.alert('酒品确认成功，请等待审核！',goIndex);
//				}else{
//					Showbo.Msg.alert('酒品确认成功，请等待审核！',goIndexs);
//				}
//				
//			}else{
//				Showbo.Msg.alert('访问服务器异常！');
//			}
//		},
//		error:function(){
//			Showbo.Msg.alert('网络错误！');
//		}
//  })	
//}
//var userId = getUrlValue("id");
//var type = getUrlValue("type");
//function goIndex(){
//	location.href='lookProcessOne.html?id='+userId+'&type='+type+'';
//}
//function goIndexs(){
//	location.href='lookProcess.html?id='+userId+'&type='+type+'';
//}
//
//
//
////function getOneWine(){
////	var userId = getUrlValue("id");
////	var totalPrice = 0;
////	$.ajax({
////		type: "GET",
////		async : false,  //同步请求
////		url: ipAddress+"/cityApplyWineInfo.do", //请求接口
////		data:{id:userId},
////		dataType:"jsonp",
////		timeout:5000, 
////		success:function(json){
////			if(json.status==1){
////				var data = json.rs;
////				checkWine  = data;
////				var html = "";
////				for(var i=0;i<data.length;i++){
////					totalPrice += totalPrice+parseInt(data[i].deposit);
////					html+='<div class="list"><div class="PicBox"><img src="'+data[i].img_path+'" /></div>'+
////					       '<h1>'+data[i].wine_name+''+data[i].degree+'度  '+data[i].standard+'Ml</h1>'+
////						'<p>数量：<strong>20</strong>瓶</p>'+
////					'</div>';
////				}
////				if(totalPrice==0){
////					$(".city_price").html("0.00");
////				}else{
////					$(".city_price").html(totalPrice+".00");
////				}
////				
////				$(".page1 .processBox").html(html);
////			}else{
////				Showbo.Msg.alert('访问服务器异常！');
////			}
////		},
////		error:function(){
////			Showbo.Msg.alert('网络错误！');
////		}
////  })	
////}








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
	getWineData(type);
})
var idArray = new Array();
function getWineData(type){
	var userId = getUrlValue("id");
	if(typeof(userId)=="object"){
		var id = sessionStorage.getItem("userId");
	}else{
		var id = userId;
		sessionStorage.setItem("userId",userId);
	}
	var oneService = JSON.parse(sessionStorage.getItem("user"));
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/selectWine.do", //请求接口
		data:{id:id,option:1,mapComboId:oneService.mapComboId},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				var data = json.rs;
				var html = '';
				if(type==3){
					for(var i=0;i<data.length;i++){
						if(data[i].wineCheck==-1){
//							html += '<div class="list"><div class="PicBox">'+
//										'<img src="'+data[i].img_path+'" />'+
//									'</div><div class="gary_div">'+
//									'<h1>'+data[i].wine_name+'</h1>'+
//									'<h5>'+data[i].wine_name+' '+data[i].degree+'度'+data[i].standard+'ML</h5>'+
//									'<a href="javascript:void(0)" class="inCheck">未选择</a></div></div>';
						}else if(data[i].wineCheck==1 || data[i].wineCheck==2|| data[i].wineCheck==3){
							html +='<div class="list"><div class="PicBox">'+
										'<img src="'+data[i].img_path+'" />'+
									'</div><div class="gary_div">'+
									'<h1>'+data[i].wine_name+'</h1>'+
									'<h5>'+data[i].wine_name+' '+data[i].degree+'度'+data[i].standard+'ML</h5>'+
									'<strong>数量：'+data[i].amount+'瓶</strong>';
									if(data[i].cancel==1){
										html +='<a href="javascript:void(0)" class="inCheck">审核取消中</a></div></div>';
									}else{
										html +='<a href="javascript:void(0)" class="inCheck">审核中</a></div></div>';
									}
						}else if(data[i].wineCheck==5 || data[i].wineCheck==6 || data[i].wineCheck==7){
							if(data[i].hidden==0){
								html +='<div class="list"><div class="PicBox">'+
										'<img src="'+data[i].img_path+'" />'+
									'</div><div class="gary_div">'+
									'<h1>'+data[i].wine_name+'</h1>'+
									'<h5>'+data[i].wine_name+' '+data[i].degree+'度'+data[i].standard+'ML</h5>'+
									'<strong>数量：'+data[i].amount+'瓶</strong>'+
									'<a href="javascript:void(0)" class="inCheck">审核中</a></div></div>';
			
							}else if(data[i].hidden==1){
								html +='<div class="list"><div class="PicBox">'+
										'<img src="'+data[i].img_path+'" />'+
									'</div><div class="gary_div">'+
									'<h1>'+data[i].wine_name+'</h1>'+
									'<h5>'+data[i].wine_name+' '+data[i].degree+'度'+data[i].standard+'ML</h5>'+
									'<strong>数量：'+data[i].amount+'瓶</strong>'+
									'<img src="img/perror.png" class="checkState"/></div></div>';
							}
							
						}else if(data[i].wineCheck==8 ){
							if(data[i].hidden==0){
								html +='<div class="list"><div class="PicBox">'+
										'<img src="'+data[i].img_path+'" />'+
									'</div><div class="gary_div">'+
									'<h1>'+data[i].wine_name+'</h1>'+
									'<h5>'+data[i].wine_name+' '+data[i].degree+'度'+data[i].standard+'ML</h5>'+
									'<strong>数量：'+data[i].amount+'瓶</strong>'+
									'<a href="javascript:void(0)" class="inCheck">审核中</a></div></div>';
			
							}else if(data[i].hidden==1){
								html += '<div class="list"><div class="PicBox">'+
										'<img src="'+data[i].img_path+'" />'+
									'</div><div class="gary_div">'+
									'<h1>'+data[i].wine_name+'</h1>'+
									'<h5>'+data[i].wine_name+' '+data[i].degree+'度'+data[i].standard+'ML</h5>'+
									'<strong>数量：'+data[i].amount+'瓶</strong>'+
									'<img src="img/psuccess.png" class="checkState"/></div></div>';
							}
							
						}else if( data[i].wineCheck==4){
							if(data[i].hidden==0){
								html +='<div class="list"><div class="PicBox">'+
										'<img src="'+data[i].img_path+'" />'+
									'</div><div class="gary_div">'+
									'<h1>'+data[i].wine_name+'</h1>'+
									'<h5>'+data[i].wine_name+' '+data[i].degree+'度'+data[i].standard+'ML</h5>'+
									'<strong>数量：'+data[i].amount+'瓶</strong>'+
									'<a href="javascript:void(0)" class="inCheck">审核中</a></div></div>';
			
							}else if(data[i].hidden==1){
								html += '<div class="list"><div class="PicBox">'+
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
						if(data[i].wineCheck==-1){
//							html += '<div class="list"><div class="PicBox">'+
//										'<img src="'+data[i].img_path+'" />'+
//									'</div><div class="gary_div">'+
//									'<h1>'+data[i].wine_name+'</h1>'+
//									'<h5>'+data[i].wine_name+' '+data[i].degree+'度'+data[i].standard+'ML</h5>'+
//									'<a href="javascript:void(0)" class="inCheck">未选择</a></div></div>';
						}else if(data[i].wineCheck==1 || data[i].wineCheck==2|| data[i].wineCheck==3){
							html +='<div class="list"><div class="PicBox">'+
										'<img src="'+data[i].img_path+'" />'+
									'</div><div class="gary_div">'+
									'<h1>'+data[i].wine_name+'</h1>'+
									'<h5>'+data[i].wine_name+' '+data[i].degree+'度'+data[i].standard+'ML</h5>';
									if(data[i].cancel==1){
										html +='<a href="javascript:void(0)" class="inCheck">审核取消中</a></div></div>';
									}else{
										html +='<a href="javascript:void(0)" class="inCheck">审核中</a></div></div>';
									}
						}else if(data[i].wineCheck==5 || data[i].wineCheck==6 || data[i].wineCheck==7){
							if(data[i].hidden==0){
								html += '<div class="list"><div class="PicBox">'+
										'<img src="'+data[i].img_path+'" />'+
									'</div><div class="gary_div">'+
									'<h1>'+data[i].wine_name+'</h1>'+
									'<h5>'+data[i].wine_name+' '+data[i].degree+'度'+data[i].standard+'ML</h5>'+
									'<a href="javascript:void(0)" class="inCheck">审核中</a></div></div>';
			
							}else if(data[i].hidden==1){
								html +='<div class="list"><div class="PicBox">'+
										'<img src="'+data[i].img_path+'" />'+
									'</div><div class="gary_div">'+
									'<h1>'+data[i].wine_name+'</h1>'+
									'<h5>'+data[i].wine_name+' '+data[i].degree+'度'+data[i].standard+'ML</h5>'+
									'<img src="img/perror.png" class="checkState"/></div></div>';
							}
							
						}else if(data[i].wineCheck==8 ){
							if(data[i].hidden==0){
								html += '<div class="list"><div class="PicBox">'+
										'<img src="'+data[i].img_path+'" />'+
									'</div><div class="gary_div">'+
									'<h1>'+data[i].wine_name+'</h1>'+
									'<h5>'+data[i].wine_name+' '+data[i].degree+'度'+data[i].standard+'ML</h5>'+
									'<a href="javascript:void(0)" class="inCheck">审核中</a></div></div>';
			
							}else if(data[i].hidden==1){
								html += '<div class="list"><div class="PicBox">'+
										'<img src="'+data[i].img_path+'" />'+
									'</div><div class="gary_div">'+
									'<h1>'+data[i].wine_name+'</h1>'+
									'<h5>'+data[i].wine_name+' '+data[i].degree+'度'+data[i].standard+'ML</h5>'+
									'<img src="img/psuccess.png" class="checkState"/></div></div>';
							}
							
						}else if( data[i].wineCheck==4){
							if(data[i].hidden==0){
								html += '<div class="list"><div class="PicBox">'+
										'<img src="'+data[i].img_path+'" />'+
									'</div><div class="gary_div">'+
									'<h1>'+data[i].wine_name+'</h1>'+
									'<h5>'+data[i].wine_name+' '+data[i].degree+'度'+data[i].standard+'ML</h5>'+
									'<a href="javascript:void(0)" class="inCheck">审核中</a></div></div>';
			
							}else if(data[i].hidden==1){
								html += '<div class="list"><div class="PicBox">'+
										'<img src="'+data[i].img_path+'" />'+
									'</div><div class="gary_div">'+
									'<h1>'+data[i].wine_name+'</h1>'+
									'<h5>'+data[i].wine_name+' '+data[i].degree+'度'+data[i].standard+'ML</h5>'+
									'<a href="javascript:void(0)" class="inCheck">待支付</a></div></div>';
							}
							
						}
					}
				}
				$(".processBox").eq(1).html(html);
				
				
				
			}else{
				Showbo.Msg.alert('服务器异常！');
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
  	})	
}



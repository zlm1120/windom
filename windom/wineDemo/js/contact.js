$(function(){
	setSize();
	getContact();
//	var map = new BMap.Map("mapContenter");
//  map.centerAndZoom("四川", 12);
//  map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
//  map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
//
//  map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
//  map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
//  map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));   //右下角，打开
//
//  var localSearch = new BMap.LocalSearch(map);
//  localSearch.enableAutoViewport(); //允许自动调节窗体大小
//  function searchByStationName() {
//  	map.clearOverlays();//清空原来的标注
//	    var keyword = document.getElementById("text_").value;
//	    alert(keyword);
//	    localSearch.setSearchCompleteCallback(function (searchResult) {
//	        var poi = searchResult.getPoi(0);
//	        document.getElementById("result_").value = poi.point.lng + "," + poi.point.lat;
//	        map.centerAndZoom(poi.point, 13);
//	        var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // 创建标注，为要查询的地方对应的经纬度
//	        map.addOverlay(marker);
//	        var content = document.getElementById("text_").value + "<br/><br/>经度：" + poi.point.lng + "<br/>纬度：" + poi.point.lat;
//	        var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>");
//	        marker.addEventListener("click", function () { this.openInfoWindow(infoWindow); });
////	         marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
//	    });
//	    localSearch.search(keyword);
//	} 
	
})
$(window).resize(function(){  //窗口发送变化时，调用方法
	setSize();
});
function setSize(){
	var winW=$(window).width();
	if(winW<1430){  //浏览器窗口小于1430px时，引入样式
		$('head').append('<link href="css/less1430/common1430.css" type="text/css" rel="stylesheet" />');
		$('head').append('<link href="css/less1430/contract-us1430.css" type="text/css" rel="stylesheet" />');
	}else{//浏览器窗口大于1430px时，删除样式
		$('head link[href="css/less1430/common1430.css"]').remove();
		$('head link[href="css/less1430/contract-us1430.css"]').remove();
	}
}

 function getContact(){
	jQuery.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/getGPS.do", //请求接口
		data:{},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				$("#address").html("<span>地址：</span>"+json.gps.address);
				$("#tel").html("<span>电话：</span>"+json.gps.telephone);
				$("#webSite").html("<span>网址：</span>"+json.gps.webSite);
//				$("#text_").val(json.gps.address);
//				searchByStationName();
                placeSearch(json.gps.address);
                if(json.gps.imgPath!=null){
                	 $(".erwei").html('<img src="'+json.gps.imgPath +'" width="106" height="106"/><em>扫一扫<br/>关注我们</em>');
                }else{
                	
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
 

//function getContact(){
//	$.ajax({
//		type: "GET",
//		async : false,  //同步请求
//		url: ipAddress+"/getGPS.do", //请求接口
//		data:{},
//		dataType:"jsonp",
//		timeout:5000, 
//		success:function(json){
//			if(json.status==1){
//				$("#address").html("<span>地址：</span>"+json.gps.address);
//				$("#tel").html("<span>电话：</span>"+json.gps.telephone);
//				$("#webSite").html("<span>网址：</span>"+json.gps.webSite);
//				$("#text_").val(json.gps.address);
////				searchByStationName();
//			}else{
//				Showbo.Msg.alert('服务器发生异常！');
//			}
//		},
//		error:function(){
//			Showbo.Msg.alert('网络错误！');
//		}
// });
//}
    

$('.contactBtn').click(function(){
	var name=$('#name').val();//姓名
	var tel=$('#moblie').val();//电话
	var idea=$('#idea').val();//意见
	if(name!=""){
		if(tel!=""&& /0?(13|14|15|18)[0-9]{9}/.test(tel)){
			if(idea!=""){
				$.ajax({
					type: "GET",
					async : false,  //同步请求
					url: ipAddress+"/submitOpinion.do", //请求接口
					data:{userName:name,mobile:tel,opinion:idea},
					dataType:"jsonp",
					timeout:5000, 
					success:function(json){
						if(json.status==1){
							Showbo.Msg.alert('建议提交成功！');
							$('#name').val("");
							$('#moblie').val("");
							$('#idea').val("");
							
						}else{
							Showbo.Msg.alert('服务器发生异常！');
						}
					},
					error:function(){
						Showbo.Msg.alert('网络错误！');
					}
			   });
			}else{
				Showbo.Msg.alert('请填写您的意见'); 
				$('#idea').val("");
			}
		}else{
			Showbo.Msg.alert('请填写正确的电话号码');
			$('#moblie').val(""); 
		}
	}else{
		Showbo.Msg.alert('请填写您的姓名');  
		$('#name').val("");
	} 
})



$(function(){
	getInfo();
	setSize(); //调用方法，设置加载的样式
	
})
$(window).resize(function(){  //窗口发送变化时，调用方法
//	getBanner();
	setSize();
//	imgReload();
});
function setSize(){
	var winW=$(window).width();
	if(winW<1430){  //浏览器窗口小于1430px时，引入样式
		$('head').append('<link href="css/less1430/common1430.css" type="text/css" rel="stylesheet" />');
		$('head').append('<link href="css/less1430/home1430.css" type="text/css" rel="stylesheet" />');
	}else{//浏览器窗口大于1430px时，删除样式
		$('head link[href="css/less1430/common1430.css"]').remove();
		$('head link[href="css/less1430/home1430.css"]').remove();
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
function getInfo(){
	var ID = getUrlValue("id");
	$.ajax({
			type: "GET",
			async : false,  //同步请求
			url: ipAddress+"/getHomeMenu.do", //请求接口
			data:{id:ID},
			dataType:"jsonp",
			timeout:5000, 
			success:function(json){
				if(json.status==1){
					var html = "";
					var banner = json.menu.imageBanner;
					var textBanner = json.menu.textBanner;
					var androidUrl = json.menu.androidUrl;
					var iosUrl = json.menu.iosUrl;
					html = '<img src="'+banner+'" style="z-index: 0;"/>'+
						'<div class="banner_font">'+
							'<div style="width: 70%;margin: auto;">'+textBanner+'</div>'+
							'<img src="'+androidUrl+'" class="imgOne"/>'+
							'<img src="'+iosUrl+'" class="imgOne"/>'+
						'</div>';
					$("#adBnner").html(html);
					
					$(".wrap").find('.red_flow_info').eq(0).html(json.menu.content1);
					$(".wrap").find('.red_flow_info').eq(1).html(json.menu.content2);
					$(".wrap").find('.red_flow_info').eq(2).html(json.menu.content3);
				}else{
					Showbo.Msg.alert('服务器发生异常！');
				}
			},
			error:function(e){
				Showbo.Msg.alert("网络错误");
			}
	   });
}
function getBanner(){
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/getIndexPicture.do", //请求接口
		data:{},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				var html = "<ul>";
				for(var i=0;i<json.reasonList.length;i++){
					html+='<li class="sliderimg"><a href="javascript:void(0)"><img src="'+json.reasonList[i].imgPath+'" width="100%"></a></li>';
				}
				html +="</ul>";
				$("#banner").html(html);
				
				var bannerHtml = "";
				for(var j=0;j<json.menus.length;j++){
					var title = json.menus[j].title;
					var strs= new Array();
					strs=title.split("、");
					var html = "";
					for(var k=0;k<strs.length;k++){
						html +='<p>'+strs[k]+'</p>';
					}
					bannerHtml+='<li>'+
						'<img src="'+json.menus[j].imageTitle+'"  width="300" height="190"/>'+
						'<div class="activeBox activeBox'+(j+1)+'">'+html;
						if(json.menus[j].id==1){
							bannerHtml+='<a href="consumer.html?id=1">了解消费端 &gt;</a>';
						}else if(json.menus[j].id==2){
							bannerHtml+='<a href="cityServiceInfo.html?id=2">了解城市服务商 &gt;</a>';
						}else if(json.menus[j].id==3){
							bannerHtml+='<a href="oneServiceInfo.html?id=3">了解1公里服务商 &gt;</a>';
						}else{
							bannerHtml+='<a href="salesman.html?id=4">了解业务员服务端 &gt;</a>';
						}
						
						bannerHtml+='</div>'+
					'</li>';
				}
				$(".activeList").html(bannerHtml);
			
				show();
			}else{
				Showbo.Msg.alert('获取服务器失败！');
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
   });
}
$(function(){
	getBanner();
	setSize(); //调用方法，设置加载的样式
	
})
$(window).resize(function(){  //窗口发送变化时，调用方法
//	getBanner();
	setSize();
	imgReload();
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
function imgReload(){ //幻灯片自适应
	var imgHeight = 0;
	var wtmp = $(window).width();
	$("#banner ul li").each(function(){
        $(this).css({width:wtmp + "px"});
    });
	$(".sliderimg").each(function(){
		$(this).css({width:wtmp + "px"});
		imgHeight = $(this).height();
	});
}

//$(document).ready(function(e) {  //页面加载完成，执行幻灯片事件
function show(){
//	getBanner();
	imgReload();
    var unslider06 = $('#banner').unslider({
		dots: true,
		fluid: true
	}),
	data06 = unslider06.data('unslider');
	
	var len=$('.dots li').length;
	var dotsLen=(len-1)*26+30;
	$('.dots').css({"width":dotsLen+'px','margin-left':-(dotsLen/2)+'px'});
	$('.dots li').html("");
	}
//});



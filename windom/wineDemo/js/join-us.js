$(function(){
	setSize(); //调用方法，设置加载的样式
	getJionUs();
})
$(window).resize(function(){  //窗口发送变化时，调用方法
	setSize();
});
function setSize(){
	var winW=$(window).width();
	if(winW<1430){  //浏览器窗口小于1430px时，引入样式
		$('head').append('<link href="css/less1430/common1430.css" type="text/css" rel="stylesheet" />');
		$('head').append('<link href="css/less1430/join-us1430.css" type="text/css" rel="stylesheet" />');
	}else{//浏览器窗口大于1430px时，删除样式
		$('head link[href="css/less1430/common1430.css"]').remove();
		$('head link[href="css/less1430/join-us1430.css"]').remove();
	}
}

function getJionUs(){
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/getJoinUs.do", //请求接口
		data:{},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				var html = '<a href="javascript:void(0)"><img src="'+json.imgPath.imgPath+'" /> </a>';
				$("#adBnner").html(html);
//				var htmlStr = "";
				console.log(json);
				for(var i=0;i<json.joinUs.length;i++){
					var htmlStr = "";
					var content = json.joinUs[i].dutyDescribe;
					htmlStr='<div class="mainDiv">'+
								'<div class="left-duty">'+json.joinUs[i].duty+'</div>'+
								'<div class="right-content">'+content+'</div>'+
							'</div>';
							console.log(htmlStr+"<br/>");
					if(i%2==0){
						$(".joinMain .leftBox").append(htmlStr);
					}else{
						$(".joinMain .rightBox").append(htmlStr);
					}
//				    var contentStr = content.split("\r\n");
//					htmlStr+='<div class="mainDiv">'+
//					'<div class="left-duty">'+json.joinUs[i].duty+'</div><div class="right-content">'+content+'</div></div>';
//					'<dd>'+
//						'<div class="joinList">';
//						for(var j=0;j<contentStr.length;j++){
//							if(j==0){
//								htmlStr+='<h3>'+contentStr[j]+'</h3>';
//							}else if(contentStr[j]=="岗位任职资格与薪资标准"){
//								htmlStr+='</div><div class="joinList"><h3>'+contentStr[j]+'</h3>';
//							}else if(j==contentStr.length-1){
//								htmlStr+='</div></dd></dl>';
//							}else{
//								htmlStr+='<p>'+contentStr[j]+'</p>';
//							}
//							
//						}
//					$(".joinMain").html(htmlStr);
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

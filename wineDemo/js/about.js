$(function(){
	setSize(); //调用方法，设置加载的样式
	getAboutUs();
})
$(window).resize(function(){  //窗口发送变化时，调用方法
	setSize();
});
function setSize(){
	var winW=$(window).width();
	if(winW<1430){  //浏览器窗口小于1430px时，引入样式
		$('head').append('<link href="css/less1430/common1430.css" type="text/css" rel="stylesheet" />');
		$('head').append('<link href="css/less1430/about1430.css" type="text/css" rel="stylesheet" />');
	}else{//浏览器窗口大于1430px时，删除样式
		$('head link[href="css/less1430/common1430.css"]').remove();
		$('head link[href="css/less1430/about1430.css"]').remove();
	}
}

function getAboutUs(){
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/getCompanyDescribe.do", //请求接口
		data:{},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				var html = '<a href="javascript:void(0)"><img src="'+json.imgPath.imgPath+'" /> </a>';
				$("#adBnner").html(html);
				var content = json.company.aboutContent;
//				var contentStr = content.split("\r\n\r\n");
//				var htmlp="";
//				for(var i=0;i<contentStr.length;i++){
//					htmlp+="<p>"+contentStr[i]+"</P>";
//				}
				$(".aboutTxt").html(content);
			}else{
				Showbo.Msg.alert('获取服务器失败！');
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
   });
}

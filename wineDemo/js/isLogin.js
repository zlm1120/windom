$(function(){
	var user = JSON.parse(sessionStorage.getItem("user"));
	if(user==undefined || user==null || user==""){
		$('.loginBefore').show();
		$('.loginAfter').hide();
	}else{
		
		if(user.type==1){
			$('.loginBefore').hide();
			$('.loginAfter').show();
			$(".loginAfter").html(
				'<a href="javascript:void(0)" class="title">'+user.accountName+'</a>'+
					'<div class="link-show">'+
						'<a href="personCenter.html?id='+user.id+'&type='+user.type+'&state='+user.state+'">个人资料</a>'+
						'<a onclick="exit()">退出</a>'+
				'</div>');
		}else if(user.type==2){
			$('.loginBefore').hide();
			$('.loginAfter').show();
//			if(user.state==1){
				$(".loginAfter").html(
				'<a href="javascript:void(0)" class="title">'+user.accountName+'</a>'+
					'<div class="link-show">'+
						'<a href="personCenterCity.html?id='+user.id+'&type='+user.type+'&state='+user.state+'">个人资料</a>'+
						'<a href="updateProcessCity.html?id='+user.id+'&type='+user.type+'">新增/修改酒品</a>'+
						'<a href="lookProcessCity.html?id='+user.id+'&type='+user.type+'">查看酒品进度</a>'+
						'<a onclick="exit()">退出</a>'+
					'</div>');
//			}else{
//				$(".loginAfter").html(
//				'<a href="javascript:void(0)" class="title">'+user.accountName+'</a>'+
//					'<div class="link-show">'+
//						'<a href="personCenterCity.html?id='+user.id+'&type='+user.type+'&state='+user.state+'">个人资料</a>'+
//						'<a onclick="exit()">退出</a>'+
//					'</div>');
//			}
			
		}else if(user.type==3){
		$('.loginBefore').hide();
		$('.loginAfter').show();
//		if(user.state==1){
			$(".loginAfter").html(
			'<a href="javascript:void(0)" class="title">'+user.userName+'</a>'+
				'<div class="link-show">'+
					'<a href="personCenterOne.html?id='+user.id+'&type='+user.type+'&state='+user.state+'">个人资料</a>'+
					'<a href="updateProcessOne.html?id='+user.id+'&type='+user.type+'">新增/修改酒品</a>'+
					'<a href="lookProcessOne.html?id='+user.id+'&type='+user.type+'">查看酒品进度</a>'+
					'<a href="chooseCity.html?id='+user.id+'&type='+user.type+'">设置城市服务商</a>'+
					'<a onclick="exit()">退出</a>'+
				'</div>');
//		}else{
//			$(".loginAfter").html(
//			'<a href="javascript:void(0)" class="title">'+user.userName+'</a>'+
//				'<div class="link-show">'+
//					'<a href="personCenterOne.html?id='+user.id+'&type='+user.type+'&state='+user.state+'">个人资料</a>'+
//					'<a onclick="exit()">退出</a>'+
//				'</div>');
//		}
		
		}
		
	}
	if($('.loginAfter').css('background') == "rgb(210, 12, 28) none repeat scroll 0% 0% / auto padding-box border-box"){
		$('.loginAfter .title').css('color','#fff');
		$('.loginAfter').css('background','rgb(210, 12, 28)');
	}

})

function exit(){
	Showbo.Msg.confirm("您确认退出此次登录吗？",function(name){
		if(name=="yes"){
			sessionStorage.removeItem("user");
			clearCookie("username");
			clearCookie("password");
			$('.loginBefore').show();
			$('.loginAfter').hide();
			location.href="index.html";
		}else{
			
		}
	});
	

	
}
//清除cookie  
function clearCookie(name) {  
    setCookie(name, "", -1);  
}
//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}



//$('.wineType div').each(function(num){
//	$(this).click(function(){
//		$('.wineType div').removeClass('checkIn');
//		$(this).addClass('checkIn');
//		$('.item').hide();
//		$('.item').eq(num).show();
//	})
//})
$(function(){
	getWine();
})


function getWine(){
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/getWines.do", //请求接口
		data:{},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				var html = "";
				for(var i=0;i<json.wines.length;i++){
					html += '<div class="chooseWine">'+
							'<label>'+json.wines[i].wine_name+' '+json.wines[i].degree+'度</label>'+
							'<input type="checkbox" name="checkbox" class="idStr" data-id="'+json.wines[i].id+'"/>'+
						    '</div>';
				}
				$(".item").html(html);
			}else if(json.status==4){
				Showbo.Msg.alert('对不起，您的手机号已注册',goIndex);
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
	})
}
var str = "";
function submitId(){
	sessionStorage.removeItem("wines");
	sessionStorage.removeItem("deposi");
    var cond = $(".idStr");
	for(var i=0;i<cond.length;i++){
	  if(cond[i].checked==true){
	  		str += $(cond[i]).attr("data-id");
		    if(i<(cond.length-1)){
		    	str += ",";
		    }
	  }
	    	
	}
//	var ids = str.substr(0,str.length-1);
	var cityUser = JSON.parse(sessionStorage.getItem("city"));
	var cityUname = cityUser.brandUname;
	var cityPwd = cityUser.brandPwd;
	var name = cityUser.name;
	var phone = cityUser.phone;
	var businessCode = cityUser.businessCode;
	var businessImgPath = cityUser.businessImgPath;
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/applyCityProvider.do", //请求接口
		data:{account:phone,passwd:cityPwd,businessImgPath:businessImgPath,businessNo:businessCode,contact:name,accountName:cityUname,wineIdAdd:str},
		dataType:"jsonp",
		timeout:5000,
		success:function(json){
			if(json.status==1){
				sessionStorage.setItem("wines",JSON.stringify(json.wines));
				sessionStorage.setItem("deposi",json.deposi);
				Showbo.Msg.alert('您已提交注册信息',goSuss);
			}else{
				Showbo.Msg.alert(json.message,goIndex);
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
   });
}

function goIndex(){
	location.href="index.html";
}
function goSuss(){
//	var ids = str.substr(0,str.length-1);
	location.href="show_choose_wine.html";
}

    

$(function(){
	providerSelectCityList();
});

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
var cityData = "";
var changeWine = new Array();
var delWine = new Array();
var isCheck = false;
function providerSelectCityList(){
	var wineId = new Array();
	var userId = getUrlValue("id");
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/providerSelectCityList.do", //请求接口
		data:{id:userId},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				var data = json.rs;
				var str ="";
				html = "";
				for(var i=0;i<data.length;i++){
					wineId.push(data[i].id);
					for(var j=0;j<data[i].lstCity.length;j++){
						if(data[i].lstCity[j].isChoose==true){
							isCheck = true;
							break;
						}else{
							isCheck = false;
						}
					}
					html+='<tr>'+
						'<td class="td-height-one"><img src="'+data[i].img_path+'" width="60" height="60"><span>'+data[i].wine_name+'</span></td>'+
						'<td class="td-defalue">'+data[i].standard+'Ml</td>'+
						'<td class="td-defalue">'+data[i].amount+'瓶</td>'+
						'<td class="td-defalue">￥'+(data[i].deposit_provider*data[i].amount)+'</td>'+
						'<td class="td-defalue">';
						if(isCheck==true){
							str = "已设置";
						}else{
							str = "未设置";
						}
						
						html+= str+'</td>'+
						'<td class="td-height">'+
							'<div class="select">'+
								'<select class="myselect">';
								cityData = data[i].lstCity;
								var id = data[i].id;
								for(var j=0;j<cityData.length;j++){
									if(cityData[j].isChoose==true){
										if(j==0){
											var str = id+","+cityData[j].id;
											delWine.push(str);
										}
										isCheck = true;
										html += '<option value="'+cityData[j].id+','+id+'" selected="selected">'+cityData[j].accountName+'</option>';
									}else{
										if(j==0){
											var str = id+","+cityData[j].id;
											delWine.push(str);
										}
										html +='<option value="'+cityData[j].id+','+id+'">'+cityData[j].accountName+'</option>';
									}
									
								}
								html +='</select>'+
							'</div>'+
						'</td>'+
					'</tr>';				
				}
				
				sessionStorage.setItem("wineId",wineId)
				$("tbody").html(html);
				 $('select').selectOrDie({
			        onChange: function(){
			        	var content = $(this).val();
			        	changeWine.push(content);
//			        	var wineInfoObj = {};
//			        	wineInfoObj.wineId = addIdArray[0];
//			        	wineInfoObj.cityId = addIdArray[1];
//			        	wineObjArray.push(wineInfoObj);
//			        	
//			        	sessionStorage.setItem("wine"+i,JSON.stringify(wineInfoObj));
			        }
			    });
			    
			}else{
				Showbo.Msg.alert(json.message);
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
  	})
}

$(".save").click(function(){
	providerSelectCity();
	$(".save").attr("disabled");
})

function providerSelectCity(){
	var userId = getUrlValue("id");
	for(var i=0;i<delWine.length;i++){
		var contStr = delWine[i].split(",");
		for(var j=0;j<changeWine.length;j++){
			var change = changeWine[j].split(",");
			if(change[1]==contStr[0]){
				contStr[1]=change[0];
				var str = contStr[0]+","+contStr[1];
				delWine[i] = str;
			}	
		}	
	}
	var id = new Array();
	var cityId = new Array();
	for(var i =0;i<delWine.length;i++){
		var contStr = delWine[i].split(",");
		id.push(contStr[0]);
		cityId.push(contStr[1]);
	}
	if(cityId!=undefined || cityId!=null || cityId!=""){
		var cityIds = eval("'"+cityId+"'");
	}else{
		var cityIds = "";
	}
	if(id!=undefined || id!=null || id!=""){
		var ids = eval("'"+id+"'");
	}else{
		var ids = "";
	}
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/providerSelectCity.do", //请求接口
		data:{cityId:cityIds,wineId:ids,id:userId},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				Showbo.Msg.alert("设置城市服务商成功！",goIndex);
			}else{
				Showbo.Msg.alert(json.message);
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
  	})	
}
function goIndex(){
	location.reload([true]); 
}

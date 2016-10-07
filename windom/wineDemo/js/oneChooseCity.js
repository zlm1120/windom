var ruleId = "";
var ruleIds = "";
var detailId = "";
var category = "";
$(function(){
	//获取套餐
	getBigComo();
	sessionStorage.removeItem("addId");
	sessionStorage.removeItem("addNum");
	sessionStorage.removeItem("ruleIds");
	addNum=new Array();
	addIdStr=new Array();
	mapId = new Array();
	addStation = -1;
})


$(".info").click(function(){
	$(".info_information").show("slow");
})
$(".info").mouseout(function(){
	$(".info_information").hide("slow");
})

Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
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

function getBigComo(){
	var gridId = getUrlValue("id");
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
				var htmls = "";
				for(var i=0;i<json.rules.length;i++){
					if(i==0){
						ruleId = json.rules[i].rule_id;
						ruleIds = json.rules[i].id;
						html+='<a href="javascript:void(0)" class="oneRadio" data-check="1" data-id="'+json.rules[i].id+'" data-ruleId="'+json.rules[i].rule_id+'">'+json.rules[i].name+'</a>';
					}else{
						html +='<a href="javascript:void(0)" class="oneRadio" data-check="0" data-id="'+json.rules[i].id+'" data-ruleId="'+json.rules[i].rule_id+'">'+json.rules[i].name+'</a>';
					}
				}
				htmls+='<p class="gridRule">'+json.rules[0].discript+'</p>';
				$(".wineTypeInfo").html(html);
				$(".info_information").html(htmls);
				//加载单选框样式
				$('.oneRadio').eq(0).css('background','url(img/ServerFocus.png)  no-repeat left center');
				var item = 0;
				$('.oneRadio').click(function(){
					$('.oneRadio').attr('data-check',0);
					$('.oneRadio').css('background','url(img/ServerBlur.png)  no-repeat left center');
					$(this).attr('data-check',1);
					$(this).css('background','url(img/ServerFocus.png)  no-repeat left center');
					var ruleId = $(this).attr('data-ruleId');
					var ruleIds = $(this).attr('data-id');
					$('.wineTypes div').removeClass('checkIn');
					$('.wineTypes div').eq(item).addClass('checkIn');
					sessionStorage.removeItem("addId");
					sessionStorage.removeItem("addNum");
					addNum=new Array();
					addIdStr=new Array();
					addStation = -1;
					getComo(ruleId,ruleIds);
				})
				getComo(ruleId,ruleIds);
				
			}else{
				Showbo.Msg.alert('服务器异常！');
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
  })
}


function getComo(ruleId,ruleIds){
	sessionStorage.setItem("ruleId",ruleId);
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/findByRuleId.do", //请求接口
		data:{id:ruleId,amountId:ruleIds},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				var html = "";
				for(var i=0;i<json.detail.length;i++){
					if(i==0){
						detailId = json.detail[i].detail_id;
						category = json.detail[i].num;
						html+='<div class="checkIn" data-len="'+json.detail[i].num+'" data-detailId="'+json.detail[i].detail_id+'">'+json.detail[i].name+'</div>';
					}else{
						html+='<div data-len="'+json.detail[i].num+'" data-detailId="'+json.detail[i].detail_id+'">'+json.detail[i].name+'</div>';
					}
				}
				$(".wineTypes").html(html);
				$('.wineTypes div').each(function(num){
					$(this).click(function(){
						$('.wineTypes div').removeClass('checkIn');
						$(this).addClass('checkIn');
						var detailId = $(this).attr("data-detailId");
						var category = $(this).attr("data-len");
						getWine(detailId,category,ruleIds);
					})
				})
				getWine(detailId,category,ruleIds);
			}else{
				Showbo.Msg.alert('服务器异常！');
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
  })
}


var addStation = -1;
var addIdStr = new Array();
var addNum = new Array();
var idArray = new Array();
var mapId = new Array();
var index = 0;
var isCheck = false;
function getWine(detailId,category,ruleIds){
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/findWinesByRuleId.do", //请求接口
		data:{id:detailId,ruleId:ruleIds},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			sessionStorage.setItem("ruleIds",ruleIds);
			if(json.status==1){
				var str = "";
				var html = '<div class="item">';
				for(var i=0;i<json.wines.length;i++){
					idArray[i] = json.wines[i].id;
				}
				var idstr = sessionStorage.getItem("addId");
				var numStr = sessionStorage.getItem("addNum");
				if(idstr==null){
					isCheck = false;
				}else{
					var addIdArray = idstr.split(",");
					var numArray = numStr.split(",");
				}
				
				
				for(var i=0;i<json.wines.length;i++){
					if(json.wines[i].allowChoose==true){
						html +='<div class="list isSelect"><div class="PicBox"><img src="'+json.wines[i].img_path+'" /></div>'+
						'<h1>'+json.wines[i].wine_name+' '+json.wines[i].degree+'度  '+json.wines[i].standard+'ML</h1>'+
						'<div class="num"><button class="miuns">-</button>';
						if(addIdArray != "" && addIdArray != undefined){
							for(var j =0 ;j < addIdArray.length;j++){
								if(json.wines[i].id == addIdArray[j]){
									
									str = '<input type="text" class="count" id="count" value="'+numArray[j]+'" /><button class="plus">+</button></div>'+
						'<div class="editBtn"><a href="javascript:void(0)" class="giveBtn" style="display: block;">取消</a><a href="javascript:void(0)" class="link" style="display: none;">选择</a>'+
									'</div><span data-id='+json.wines[i].id+' data-map='+json.wines[i].map_id+' style="visibility:visible"></span>';
									isCheck=true;
									break;
									
								}else{
									isCheck=false;
								}
							}
							if(isCheck==true){
								html += str+'</div>';
							}else{
								html += '<input type="text" class="count" id="count" value="1" /><button class="plus">+</button></div>'+
						'<div class="editBtn"><a href="javascript:void(0)" class="giveBtn">取消</a><a href="javascript:void(0)" class="link">选择</a>'+
									'</div><span data-id='+json.wines[i].id+' data-map='+json.wines[i].map_id+'></span></div>';
							}
						
						}else{
							html += '<input type="text" class="count" id="count" value="1" /><button class="plus">+</button></div>'+
						'<div class="editBtn"><a href="javascript:void(0)" class="giveBtn">取消</a><a href="javascript:void(0)" class="link">选择</a>'+
									'</div><span data-id='+json.wines[i].id+' data-map='+json.wines[i].map_id+'></span></div>';
						}
						
					}else{
						html +='<div class="list isSelect"><div class="PicBox"><img src="'+json.wines[i].img_path+'" /></div>'+
						'<h1>'+json.wines[i].wine_name+' '+json.wines[i].degree+'度  '+json.wines[i].standard+'ML</h1>'+
						'<div class="num"><button class="miuns">-</button>'+
						'<input type="text" class="count" id="count" value="1" /><button class="plus">+</button></div>'+
						'<div class="editBtn"><a href="javascript:void(0)" class="giveBtns">此酒不可代理</a>'+
						'</div><span data-id='+json.wines[i].id+' data-map='+json.wines[i].map_id+'></span></div>';
					}
					
				}
				html+='</div>';
				$(".oneMainWine").find("div").eq(0).html(html);
				
				$('.list').each(function(index){
					$(this).find('.count').attr('id','count'+index); 
					$(this).find('.miuns').click(function(){  //点击减号数量减1
						var count=parseInt($('#count'+index).val())-1;
						if(count<0){
							count = 0;
						}
						$('#count'+index).val(count);
						$('.list').eq(index).find("span").attr("data-num",count);
						var id = $('.list').eq(index).find("span").attr("data-id");
						var addId = sessionStorage.getItem("addId");
						var idStr = addId.split(",");
						for(var i =0;i<idStr.length;i++){
							if(id==idStr[i]){
								addNum[i] = count;
								sessionStorage.setItem("addNum",addNum);
							}
						}
					})
					$(this).find('.plus').click(function(){  //点击加号数量加1
						var count=parseInt($('#count'+index).val())+1;
						$('#count'+index).val(count);
						$('.list').eq(index).find("span").attr("data-num",count);
						
						var id = $('.list').eq(index).find("span").attr("data-id");
						var addId = sessionStorage.getItem("addId");
						var idStr = addId.split(",");
						for(var i =0;i<idStr.length;i++){
							if(id==idStr[i]){
								addNum[i] = count;
								sessionStorage.setItem("addNum",addNum);
							}
						}
					})
					$(this).find('.count').change(function(){  //点击加号数量加1
						var count=parseInt($('#count'+index).val());
						if(count<0){
							count = 0;
						}
						$('#count'+index).val(count);
						$('.list').eq(index).find("span").attr("data-num",count);
						
						var id = $('.list').eq(index).find("span").attr("data-id");
						var addId = sessionStorage.getItem("addId");
						var idStr = addId.split(",");
						for(var i =0;i<idStr.length;i++){
							if(id==idStr[i]){
								addNum[i] = count;
								sessionStorage.setItem("addNum",addNum);
							}
						}
					})
					
				})
				
				$('.isSelect').each(function(index){
					$('.isSelect').eq(index).find('.link').attr('id','selectBtn'+index);
					$('.isSelect').eq(index).find('.giveBtn').attr('id','giveBtn'+index);
					//鼠标移上去
					$(this).mouseover(function(){ 
						var state=$(this).find('span').css('visibility'); //判断span标签的属性值
						//当span标签的属性值为hidden时，选择按钮变为红色
						if(state=="hidden"){ 
							$(this).find('.link').addClass('selectBtn'); //添加样式，使按钮变成红色
						}else if(state=="visible"){
							
						}
					})
					//鼠标离开,按钮变为灰色
					$(this).mouseout(function(){ 
						$(this).find('.link').removeClass('selectBtn'); //添加样式，使按钮变成红色
					})
					//点击选择按钮后,显示span标签，显示取消按钮，隐藏确定按钮
					$('.isSelect').eq(index).find("#selectBtn"+index).click(function(){ 
						if(checkCount(category)==true){
							$('.isSelect').eq(index).find('span').css('visibility','visible');//显示span
							$('.isSelect').eq(index).find('.giveBtn').css('display','block'); //显示取消按钮
							$('.isSelect').eq(index).find('.link').css('display','none');//隐藏选择按钮
							$('.isSelect').eq(index).find(".count").removeAttr('disabled');
							$('.isSelect').eq(index).find(".miuns").removeAttr('disabled');
							$('.isSelect').eq(index).find(".plus").removeAttr('disabled');
							$('.isSelect').eq(index).find('.link').removeClass('selectBtn');
							var id = $('.isSelect').eq(index).find('span').attr("data-id");
							var num= $('.isSelect').eq(index).find("span").attr("data-num");
							var mapIds= $('.isSelect').eq(index).find("span").attr("data-map");
							if(num==undefined){
								var countStr= $('.isSelect').eq(index).find(".count").val();
							}else{
								var countStr= $('.isSelect').eq(index).find("span").attr("data-num");
							}
							addStation++;
							addNum[addStation] = countStr;
							addIdStr[addStation]=id;
							mapId[addStation]= mapIds;
							sessionStorage.setItem("addId",addIdStr);
							sessionStorage.setItem("addNum",addNum);
							sessionStorage.setItem("mapId",mapId);
						}else{
							
						}
					})
					$('.isSelect').eq(index).find('#giveBtn'+index).click(function(){
						$('.isSelect').eq(index).find(".count").prop('disabled',true);
						$('.isSelect').eq(index).find(".miuns").prop('disabled',true);
						$('.isSelect').eq(index).find(".plus").prop('disabled',true);
						$('.isSelect').eq(index).find('span').css('visibility','hidden');//隐藏span
						$('.isSelect').eq(index).find('.giveBtn').css('display','none'); //隐藏取消按钮
						$('.isSelect').eq(index).find('.link').css('display','block'); //显示选择按钮
						$('.isSelect').eq(index).find('.link').removeClass('selectBtn');
						var id = $('.isSelect').eq(index).find('span').attr("data-id");
						var num= $('.isSelect').eq(index).find("span").attr("data-num");
						var mapIds= $('.isSelect').eq(index).find("span").attr("data-map");
						if(num==undefined){
							var countStr= $('.isSelect').eq(index).find(".count").val();
						}else{
							var countStr= $('.isSelect').eq(index).find("span").attr("data-num");
						}
						addStation = addStation-1;
						addIdStr.remove(id);
						addNum.remove(countStr);
						mapId.remove(mapIds);
						sessionStorage.setItem("addId",addIdStr);
						sessionStorage.setItem("addNum",addNum);
						sessionStorage.setItem("mapId",mapId);
					})
				})
				
				
			}else{
				Showbo.Msg.alert('服务器异常！');
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
  })
}

function checkCount(countStr){
	var countArray = new Array();
	$('.list').each(function(index){
		var obj = $('.list').eq(index).find('span').css("visibility");
		if(obj=='visible'){
			countArray.push(index);
		}
	})
	if((countArray.length)+1>countStr){
		Showbo.Msg.alert('此类酒不能超过'+countStr+"种");
		return false;
	}else{
		return true;
	}
}
$(".brand_next").click(function(){
	getData();
})
function getData(){
	var oneService = JSON.parse(sessionStorage.getItem("oneInfo"));
	var wineId = sessionStorage.getItem("addId");
	var wineNum = sessionStorage.getItem("addNum");
	var mapId = sessionStorage.getItem("mapId");
	var rule = sessionStorage.getItem("ruleId");
	var ruleIds = sessionStorage.getItem("ruleIds");
	var gridId = getUrlValue("id");
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/applyKilometerProvider.do", //请求接口
		data:{account:oneService.phone,passwd:oneService.onePwd,businessImgPath:oneService.businessImgPath,
		cardImgPath:oneService.cardImgPath,contact:oneService.name,address:oneService.oneAddress,latitude:oneService.latitude,
		longitude:oneService.longitude,businessNo:oneService.businessCode,idNo:oneService.oneIdCard,gridId:gridId,ruleId:rule,
		wineIdAdd:wineId,wineIdAddNum:wineNum,mapIds:mapId,mapComboId:ruleIds},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				sessionStorage.setItem("wines",JSON.stringify(json.wines));
				Showbo.Msg.alert('您已提交注册信息',goSuss);
			}else{
				Showbo.Msg.alert(json.message,goIndex);
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
	  })
}
function goIndex(){
	location.href="index.html";
}
function goSuss(){
	location.href="show_one_service_wine.html";
}





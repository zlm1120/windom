var ruleId = "";
var detailId = "";
var category = "";
$(function(){
	//获取套餐
	getGrid();
//	sessionStorage.removeItem("addId");
//	sessionStorage.removeItem("addNum");
	
})


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
var oneService = JSON.parse(sessionStorage.getItem("user"));
function getGrid(){
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/getGrid.do", //请求接口
		data:{lat:oneService.latitude,lng:oneService.longitude},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				//4561f306a3094d2a9fc93e66c738ce2e
				getBigComo(json.grids.id);
			}else{
				Showbo.Msg.alert(json.message);
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
	})
}
function getBigComo(gridId){
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/getGridRules.do", //请求接口
		data:{id:gridId},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				var user = JSON.parse(sessionStorage.getItem("user"));
				var html = '<img src="img/updateWine_03.png" />';
				var j = 0;
				for(var i=0;i<json.rules.length;i++){
					if(json.rules[i].id==user.mapComboId){
						ruleId = json.rules[i].rule_id;
						ruleIds = json.rules[i].id;
						html+='<div class="check checkIn" data-id="'+json.rules[i].id+'" data-ruleId="'+json.rules[i].rule_id+'">'+json.rules[i].name+'</div>';
//						html +='<div class="check" data-id="'+json.rules[i].id+'" data-ruleId="'+json.rules[i].rule_id+'">'+json.rules[i].name+'</div>';
					}else{
						j=j+1;
					}
				}
				if(json.rules.length==j){
					for(var i=0;i<json.rules.length;i++){
						if(i==0){
							ruleId = json.rules[i].rule_id;
							ruleIds = json.rules[i].id;
							html+='<div class="check checkIn" data-id="'+json.rules[i].id+'" data-ruleId="'+json.rules[i].rule_id+'">'+json.rules[i].name+'</div>';
						}else{
							html +='<div class="check" data-id="'+json.rules[i].id+'" data-ruleId="'+json.rules[i].rule_id+'">'+json.rules[i].name+'</div>';
						}
					}
				}
				$(".navigation").html(html);
				var item = 0;
				$('.navigation .check').each(function(index){
					$(this).click(function(){
						$('.navigation .check').removeClass('checkIn');
						$(this).addClass('checkIn');
						$('.oneService div').removeClass('checkIn');
						$('.oneService div').eq(item).addClass('checkIn');
						var ruleId = $(this).attr('data-ruleId');
						var ruleIds = $(this).attr('data-id');
						getComo(ruleId,ruleIds);
					})
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
	sessionStorage.setItem("updaterule",ruleId);
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
				$(".oneService").html(html);
				$('.oneService div').each(function(num){
					$(this).click(function(){
						$('.oneService div').removeClass('checkIn');
						$(this).addClass('checkIn');
						var detailId = $(this).attr("data-detailId");
						var category = $(this).attr("data-len");
						getWineData(detailId,category);
					})
				})
				getWineData(detailId,category);
			}else{
				Showbo.Msg.alert('服务器异常！');
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
  })
}

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
var addIdStr = new Array();
var delIdStr = new Array();
var updateStr = new Array();
var addNum = new Array();
//var updateNum = new Array();
var idArray = [];
var addStation = -1;
var delStation = -1;
var updateStation = -1;

var isCheck = false;
sessionStorage.removeItem("addId");
sessionStorage.removeItem("delId");
sessionStorage.removeItem("updateId");
sessionStorage.removeItem("addNum");
sessionStorage.removeItem("updateId");
sessionStorage.removeItem("updateNum");
function getWineData(detailId,category){
	var userId = getUrlValue("id");
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/selectWine.do", //请求接口
		data:{id:userId,option:1,ruleId:detailId,mapComboId:oneService.mapComboId},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				var data = json.rs;
				for(var i=0;i<data.length;i++){
					idArray[i] = data[i].id;
				}
				var idstr = sessionStorage.getItem("addId");
				if(idstr==null){
					isCheck = false;
				}else{
					var addIdArray = idstr.split(",");
					console.log(addIdArray);
					for(var i=0;i<idArray.length;i++){
						for(var j= 0;j<addIdArray.length;j++){
							if(idArray[i]==addIdArray[j]){
								isCheck==true;
								//console.log(idArray[i]);
							}
						}
				    }
				}
				
				var html = '<div class="item">';
				for(var i=0;i<data.length;i++){
						if(data[i].wineCheck==-1){
							html += '<div class="list isNotVerify">';
						}else if(data[i].wineCheck==1 || data[i].wineCheck==2|| data[i].wineCheck==3){
							html += '<div class="list isVerify">'; 
						}else if(data[i].wineCheck==5 || data[i].wineCheck==6 || data[i].wineCheck==7){
							html += '<div class="list failure">';
						}else if(data[i].wineCheck==8 || data[i].wineCheck==4){
							html += '<div class="list isVerify">';
						}
					html +='<div class="PicBox">'+
						'<img src="'+data[i].img_path+'" />'+
					'</div>';
					if(data[i].wine_name.length>=9){
						var wineName =data[i].wine_name.replace(data[i].wine_name.substr(9, data[i].wine_name.length),"···");
						html +='<h1>'+wineName+'</h1>';
					}else{
						html += '<h1>'+data[i].wine_name+' '+data[i].degree+'度'+data[i].standard+'ML</h1>';
					}
					
					if(data[i].wineCheck==-1){
						
						html +='<div class="num">'+
									'<button class="miuns">-</button>'+
									'<input type="text" class="count" id="count" value="1" />'+
									'<button class="plus">+</button>'+
								'</div><div class="editBtn">'+
						'<a href="javascript:void(0)" class="giveBtn">取消</a>'+
						'<a href="javascript:void(0)" class="link">选择</a>'+
						'</div>';
						if(addIdArray != null && addIdArray != undefined){
								for(var j =0 ;j < addIdArray.length;j++){
									if(data[i].id == addIdArray[j]){
										 html += '<span data-id='+data[i].id+' style="visibility: visible;"></span>';
										 //break;
									}else{
										html+='<span data-id='+data[i].id+'></span>';
									}
								}
						}else{
							html+='<span data-id='+data[i].id+'></span>';
						}
						
						html +='</div>';
					}else if(data[i].wineCheck==1 || data[i].wineCheck==2|| data[i].wineCheck==3){
						if(data[i].cancel==1){
							html +='<div class="num">'+
									'<button class="miuns"  disabled="disabled">-</button>'+
									'<input type="text" class="count" id="count" value="'+data[i].amount+'"  disabled="disabled"/>'+
									'<button class="plus"  disabled="disabled">+</button>'+
								'</div><div class="isShenHe">'+
							'<a href="javascript:void(0)" class="inCheck">审核取消中</a>'+
							'</div>'+
							'<span data-id='+data[i].id+'></span>'+
							'</div>';
						}else{
							html +='<div class="num">'+
									'<button class="miuns"  disabled="disabled">-</button>'+
									'<input type="text" class="count" id="count" value="'+data[i].amount+'"  disabled="disabled"/>'+
									'<button class="plus"  disabled="disabled">+</button>'+
									'</div><div class="isShenHe">'+
							'<a href="javascript:void(0)" class="inCheck">审核中</a>'+
							'</div>'+
							'<span data-id='+data[i].id+'></span>'+
							'</div>';
						}
						
					}else if(data[i].wineCheck==5 || data[i].wineCheck==6 || data[i].wineCheck==7){
						if(data[i].hidden==0){
							html +='<div class="num">'+
									'<button class="miuns"  disabled="disabled">-</button>'+
									'<input type="text" class="count" id="count" value="'+data[i].amount+'"  disabled="disabled"/>'+
									'<button class="plus"  disabled="disabled">+</button>'+
									'</div><div class="isShenHe">'+
							'<a href="javascript:void(0)" class="inCheck">审核中</a>'+
							'</div>'+
							'<span data-id='+data[i].id+'></span>'+
							'</div>';
						}else if(data[i].hidden==1){
							html +='<div class="num">'+
									'<button class="miuns">-</button>'+
									'<input type="text" class="count" id="count" value="'+data[i].amount+'" />'+
									'<button class="plus">+</button>'+
								'</div><div class="isShenHe">'+
								'<a href="javascript:void(0)" class="verifyfile">审核失败</a>'+
								'<a href="javascript:void(0)" class="shenHeAgain">再次申请</a>'+
								'</div>'+
								'<div class="editBtn">'+
									'<a href="javascript:void(0)" class="giveBtn">取消</a>'+
								'</div>'+
								'<span data-id='+data[i].id+'></span>'+
								'</div>';
						}
						
					}else if(data[i].wineCheck==8){
						if(data[i].hidden==0){
							html +='<div class="num">'+
									'<button class="miuns"  disabled="disabled">-</button>'+
									'<input type="text" class="count" id="count" value="'+data[i].amount+'"  disabled="disabled"/>'+
									'<button class="plus"  disabled="disabled">+</button>'+
									'</div><div class="isShenHe">'+
							'<a href="javascript:void(0)" class="inCheck">审核中</a>'+
							'</div>'+
							'<span data-id='+data[i].id+'></span>'+
							'</div>';
						}else if(data[i].hidden==1){
							html +='<div class="num">'+
									'<button class="miuns">-</button>'+
									'<input type="text" class="count" id="count" value="'+data[i].amount+'" />'+
									'<button class="plus">+</button>'+
								'</div><div class="isShenHe">'+
								'<a href="javascript:void(0)" class="verify">审核成功</a>'+
								'<a href="javascript:void(0)" class="giveBtn">取消代理</a>'+
								'</div>'+
		//						'<div class="editBtn">'+
		//							'<a href="javascript:void(0)" class="link">取消代理中</a>'+
		//						'</div>'+
								'<span data-id='+data[i].id+'></span>'+
								'</div>';
						}
						
					}else if(data[i].wineCheck==4){
						if(data[i].hidden==0){
							html +='<div class="num">'+
									'<button class="miuns"  disabled="disabled">-</button>'+
									'<input type="text" class="count" id="count" value="'+data[i].amount+'"  disabled="disabled"/>'+
									'<button class="plus"  disabled="disabled">+</button>'+
								'</div><div class="isShenHe">'+
							'<a href="javascript:void(0)" class="inCheck">审核中</a>'+
							'</div>'+
							'<span data-id='+data[i].id+'></span>'+
							'</div>';
						}else if(data[i].hidden==1){
							html +='<div class="num">'+
									'<button class="miuns"  disabled="disabled">-</button>'+
									'<input type="text" class="count" id="count" value="'+data[i].amount+'"  disabled="disabled"/>'+
									'<button class="plus"  disabled="disabled">+</button>'+
								'</div><div class="isShenHe">'+
							'<a href="javascript:void(0)" class="inCheck">待支付</a>'+
							'</div>'+
							'<span data-id='+data[i].id+'></span>'+
							'</div>';
						}
					}
				}
				html+='</div>';
				$(".processBox").eq(1).html(html);
				$('.list').each(function(index){
					$(this).find('.count').attr('id','count'+index); 
					$(this).find('.miuns').click(function(){  //点击减号数量减1
						var count=parseInt($('#count'+index).val())-1;
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
				
				$('.isNotVerify').each(function(index){
					$('.isNotVerify').eq(index).find('.link').attr('id','selectBtn'+index);
					$('.isNotVerify').eq(index).find('.giveBtn').attr('id','giveBtn'+index);
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
					$('.isNotVerify').eq(index).find("#selectBtn"+index).click(function(){  
						if(checkCount(category)==true){
							$('.isNotVerify').eq(index).find('span').css('visibility','visible');//显示span
							$('.isNotVerify').eq(index).find('.giveBtn').css('display','block'); //显示取消按钮
							$('.isNotVerify').eq(index).find('.link').css('display','none');//隐藏选择按钮
							$('.isNotVerify').eq(index).find('.link').removeClass('selectBtn');
							var id =  $('.list').eq(index).find('span').attr("data-id");
							var num=  $('.list').eq(index).find("span").attr("data-num");
							var countStr = "";
							if(num==undefined){
								countStr = $('.list').eq(index).find(".count").val();							
							}else{
								countStr=  $('.list').eq(index).find("span").attr("data-num");
							}
							addStation++;
							addNum[addStation] = countStr;
							addIdStr[addStation]=id;
							sessionStorage.setItem("addId",addIdStr);
							sessionStorage.setItem("addNum",addNum);
						}else{
							
						}
					})
					$('.isNotVerify').eq(index).find('#giveBtn'+index).click(function(){
						$('.isNotVerify').eq(index).find('span').css('visibility','hidden');//隐藏span
						$('.isNotVerify').eq(index).find('.giveBtn').css('display','none'); //隐藏取消按钮
						$('.isNotVerify').eq(index).find('.link').css('display','block'); //显示选择按钮
						$('.isNotVerify').eq(index).find('.link').removeClass('selectBtn');
						var id =  $('.list').eq(index).find('span').attr("data-id");
						var num=  $('.list').eq(index).find("span").attr("data-num");
						var countStr = "";
						if(num==undefined){
							countStr = $('.list').eq(index).find(".count").val();							
						}else{
							countStr=  $('.list').eq(index).find("span").attr("data-num");	
						}
						addStation = addStation-1;
						addIdStr.remove(id);
						addNum.remove(countStr);
						sessionStorage.setItem("addId",addIdStr);
						sessionStorage.setItem("addNum",addNum);
					})
				})
				$('.isVerify').each(function(index){
					$(this).find('.isShenHe .giveBtn').click(function(){  
						
						Showbo.Msg.confirm("确认取消该酒代理吗？",function(name){
							if(name=="yes"){
								$('.isVerify').eq(index).find('span').css('visibility','hidden');//掩藏span
								$('.isVerify').eq(index).find('.editBtn').css('display','block');
								$('.isVerify').eq(index).find('.verify').css('display','none');
								$('.isVerify').eq(index).find('.giveBtn').html("你已经取消代理");
								$('.isVerify').eq(index).find('.giveBtn').addClass("delCheck");
								var id = $('.isVerify').eq(index).find('span').attr("data-id");
								delStation++;
								delIdStr[delStation]=id;
								var arrayLists = unique(delIdStr);
								sessionStorage.setItem("delId",arrayLists);
							}else{
								
							}
						});
						});	
					})
					$(this).mouseover(function(){ 
						var state=$(this).find('span').css('visibility'); //判断span标签的属性值
						//当span标签的属性值为hidden时，选择按钮变为红色
						if(state=="hidden"){ 
							$(this).find('.link').addClass('selectBtn'); //添加样式，使按钮变成红色
							//点击选择按钮后,显示span标签，显示取消按钮，隐藏确定按钮
							$(this).find('.selectBtn').click(function(){  
								$('.isVerify').eq(index).find('span').css('visibility','visible');//显示span
								$('.isVerify').eq(index).find('.editBtn').css('display','none');
								$('.isVerify').eq(index).find('.isShenHe').css('display','block');
							})
						}
					})
					//鼠标离开,按钮变为灰色
					$(this).mouseout(function(){ 
						$(this).find('.link').removeClass('selectBtn'); //添加样式，使按钮变成红色
					})
//				})
				$('.failure').each(function(index){
					$(this).find('.isShenHe .shenHeAgain').click(function(){  
						$('.failure').eq(index).find('span').css('visibility','visible');//显示span
						$('.failure').eq(index).find('.editBtn').css('display','block');
						$('.failure').eq(index).find('.editBtn').find('.giveBtn').css('display','block');
						$('.failure').eq(index).find('.isShenHe').css('display','none');
						var id =  $('.list').eq(index).find('span').attr("data-id");
						var num=  $('.list').eq(index).find("span").attr("data-num");
						var countStr = "";
						if(num==undefined){
							countStr = $('.list').eq(index).find(".count").val();							
						}else{
							countStr=  $('.list').eq(index).find("span").attr("data-num");
						}
						addStation++;
						addNum[addStation] = countStr;
						addIdStr[addStation]=id;
						sessionStorage.setItem("addId",addIdStr);
						sessionStorage.setItem("addNum",addNum);
					})
					$(this).mouseover(function(){ 
						var state=$(this).find('span').css('visibility'); //判断span标签的属性值
						//当span标签的属性值为hidden时，选择按钮变为红色
						if(state=="hidden"){ 
							//点击选择按钮后,显示span标签，显示取消按钮，隐藏确定按钮
							$(this).find('.giveBtn').click(function(){  
								$('.failure').eq(index).find('span').css('visibility','hidden');//显示span
								$('.failure').eq(index).find('.editBtn').css('display','none');
								$('.failure').eq(index).find('.isShenHe').css('display','block');
								var id =  $('.list').eq(index).find('span').attr("data-id");
								var num=  $('.list').eq(index).find("span").attr("data-num");
								var countStr = "";
								if(num==undefined){
									countStr = $('.list').eq(index).find(".count").val();							
								}else{
									countStr=  $('.list').eq(index).find("span").attr("data-num");
								}
								addStation = addStation-1;
								addIdStr.remove(id);
								addNum.remove(countStr);
								sessionStorage.setItem("addId",addIdStr);
								sessionStorage.setItem("addNum",addNum);
							})
						}
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









//
//$('.oneService div').each(function(num){
//	$(this).click(function(){
//		$('.oneService div').removeClass('checkIn');
//		$(this).addClass('checkIn');
//	})
//})
//
//$('.isNotVerify').each(function(index){
//	$('.isNotVerify').eq(index).find('.link').attr('id','selectBtn'+index);
//	$('.isNotVerify').eq(index).find('.giveBtn').attr('id','giveBtn'+index);
//	//鼠标移上去
//	$(this).mouseover(function(){ 
//		var state=$(this).find('span').css('visibility'); //判断span标签的属性值
//		//当span标签的属性值为hidden时，选择按钮变为红色
//		if(state=="hidden"){ 
//			$(this).find('.link').addClass('selectBtn'); //添加样式，使按钮变成红色
//		}else if(state=="visible"){
//			
//		}
//	})
//	//鼠标离开,按钮变为灰色
//	$(this).mouseout(function(){ 
//		$(this).find('.link').removeClass('selectBtn'); //添加样式，使按钮变成红色
//	})
//	//点击选择按钮后,显示span标签，显示取消按钮，隐藏确定按钮
//	$('.isNotVerify').eq(index).find("#selectBtn"+index).click(function(){  
//		$('.isNotVerify').eq(index).find('span').css('visibility','visible');//显示span
//		$('.isNotVerify').eq(index).find('.giveBtn').css('display','block'); //显示取消按钮
//		$('.isNotVerify').eq(index).find('.link').css('display','none');//隐藏选择按钮
//	})
//	$('.isNotVerify').eq(index).find('#giveBtn'+index).click(function(){
//		$('.isNotVerify').eq(index).find('span').css('visibility','hidden');//隐藏span
//		$('.isNotVerify').eq(index).find('.giveBtn').css('display','none'); //隐藏取消按钮
//		$('.isNotVerify').eq(index).find('.link').css('display','block'); //显示选择按钮
//		$('.isNotVerify').eq(index).find('.link').removeClass('selectBtn');
//	})
//})
//
//$('.isVerify').each(function(index){
//$(this).find('.isShenHe .giveBtn').click(function(){  
//	Showbo.Msg.confirm("确认取消该酒代理吗？",function(name){
//		if(name=="yes"){
//			$('.isVerify').eq(index).find('span').css('visibility','hidden');//掩藏span
//			$('.isVerify').eq(index).find('.editBtn').css('display','block');
//			$('.isVerify').eq(index).find('.verify').css('display','none');
//			$('.isVerify').eq(index).find('.giveBtn').html("你已经取消代理");
//			$('.isVerify').eq(index).find('.giveBtn').addClass("delCheck");
//		}else{
//			
//		}
//	});
//	});	
//})
//
//$('.failure').each(function(index){
//	$(this).find('.isShenHe .shenHeAgain').click(function(){  
//		$('.failure').eq(index).find('span').css('visibility','visible');//显示span
//		$('.failure').eq(index).find('.editBtn').css('display','block');
//		$('.failure').eq(index).find('.editBtn').find('.giveBtn').css('display','block');
//		$('.failure').eq(index).find('.isShenHe').css('display','none');
//	})
//	$(this).mouseover(function(){ 
//		var state=$(this).find('span').css('visibility'); //判断span标签的属性值
//		//当span标签的属性值为hidden时，选择按钮变为红色
//		if(state=="hidden"){ 
//			//点击选择按钮后,显示span标签，显示取消按钮，隐藏确定按钮
//			$(this).find('.giveBtn').click(function(){  
//				$('.failure').eq(index).find('span').css('visibility','hidden');//显示span
//				$('.failure').eq(index).find('.editBtn').css('display','none');
//				$('.failure').eq(index).find('.isShenHe').css('display','block');
//			})
//		}
//	})
//})








$('#oneAtOnceBtn').click(function(){
	Showbo.Msg.confirm("确认提交酒品审核？",function(name){
		if(name=="yes"){
			selectWineConfirm();
		}else{
			Showbo.Msg.alert('您已取消了此次代理酒品请求');
		}
	})
})


function selectWineConfirm(){
	var userId = getUrlValue("id");
	var i=0;
	var updateNum= new Array();
	var updateId = new Array();
	$(".list").each(function(index){
		var id = $('.list').eq(index).find('span').attr("data-id");
		var num = $('.list').eq(index).find('span').attr("data-num");
		if(num==undefined){
			
		}else{
			updateId.push(id);
			updateNum.push(num);
			i = i+1;
		}
	})
	sessionStorage.setItem("updateId",updateId);
	sessionStorage.setItem("updateNum",updateNum);
	var addId = sessionStorage.getItem("addId");
	var addNum = sessionStorage.getItem("addNum");
	var delId = sessionStorage.getItem("delId");
	var updateIds = sessionStorage.getItem("updateId");
	var updateNums = sessionStorage.getItem("updateNum");
	
	if(addId!=undefined || addId!=null || addId!=""){
		var addIds = eval("'"+addId+"'");
	}else{
		var addIds = "";
	}
	if(addNum!=undefined || addNum!=null || addNum!=""){
		var addNums = eval("'"+addNum+"'");
	}else{
		var addNums = "";
	}
	
	if(delId!=undefined || delId!=null || delId!=""){
		var delIds = eval("'"+delId+"'");
	}else{
		var delIds = "";
	}
	if(updateIds!=undefined || updateIds!=null || updateIds!=""){
		var updateIdss = eval("'"+updateIds+"'");
	}else{
		var updateIdss = "";
	}
	if(updateNums!=undefined || updateNums!=null || updateNums!=""){
		var updateNumss = eval("'"+updateNums+"'");
	}else{
		var updateNumss = "";
	}
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/selectWineConfirm.do", //请求接口
		data:{id:userId,wineIdAdd:addIds,
		wineIdAddNum:addNums,wineIdDel:delIds,
		wineIdUpdate:updateIdss,
		wineIdUpdateNum:updateNumss},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				Showbo.Msg.alert('酒品代理提交成功，请耐心等待',goIndex);
			}else{
				Showbo.Msg.alert('服务器异常！');
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
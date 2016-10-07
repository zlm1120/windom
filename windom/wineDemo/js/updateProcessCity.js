//$('.navigation .check').each(function(num){
//	$(this).click(function(){
//		$('.navigation .check').removeClass('checkIn');
//		$(this).addClass('checkIn');
//		$('.item').hide();
//		$('.item').eq(num).show();
//	})
//})

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

$(function(){
	getWineData();
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
var addIdStr=[];
var delIdStr= [];
var idArray = [];
var addStation = -1;
var delStation = -1;
var updateStation = -1;
var updateStr = [];
var isCheck = false;
sessionStorage.removeItem("addId");
sessionStorage.removeItem("delId");
sessionStorage.removeItem("updateId");
function getWineData(type){
	var userId = getUrlValue("id");
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/selectWine.do", //请求接口
		data:{id:userId,option:2,ruleId:"",mapComboId:""},
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
						html +='<h1>'+wineName+'</h1></div>';
					}else{
						html += '<h1>'+data[i].wine_name+' '+data[i].degree+'度'+data[i].standard+'ML</h1></div>';
					}
					if(data[i].wineCheck==-1){
						
						html +='<div class="editBtn">'+
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
							html +='<div class="isShenHe">'+
							'<a href="javascript:void(0)" class="inCheck">审核取消中</a>'+
							'</div>'+
							'<span data-id='+data[i].id+'></span>'+
							'</div>';
						}else{
							html +='<div class="isShenHe">'+
							'<a href="javascript:void(0)" class="inCheck">审核中</a>'+
							'</div>'+
							'<span data-id='+data[i].id+'></span>'+
							'</div>';
						}
						
					}else if(data[i].wineCheck==5 || data[i].wineCheck==6 || data[i].wineCheck==7){
						if(data[i].hidden==0){
							html +='<div class="isShenHe">'+
							'<a href="javascript:void(0)" class="inCheck">审核中</a>'+
							'</div>'+
							'<span data-id='+data[i].id+'></span>'+
							'</div>';
						}else if(data[i].hidden==1){
							html +='<div class="isShenHe">'+
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
							html +='<div class="isShenHe">'+
							'<a href="javascript:void(0)" class="inCheck">审核中</a>'+
							'</div>'+
							'<span data-id='+data[i].id+'></span>'+
							'</div>';
						}else if(data[i].hidden==1){
							html +='<div class="isShenHe">'+
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
							html +='<div class="isShenHe">'+
							'<a href="javascript:void(0)" class="inCheck">审核中</a>'+
							'</div>'+
							'<span data-id='+data[i].id+'></span>'+
							'</div>';
						}else if(data[i].hidden==1){
							html +='<div class="isShenHe">'+
							'<a href="javascript:void(0)" class="inCheck">待支付</a>'+
							'</div>'+
							'<span data-id='+data[i].id+'></span>'+
							'</div>';
						}
					}
				}
				html+='</div>';
				$(".processBox").eq(1).html(html);
				
				
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
						$('.isNotVerify').eq(index).find('span').css('visibility','visible');//显示span
						$('.isNotVerify').eq(index).find('.giveBtn').css('display','block'); //显示取消按钮
						$('.isNotVerify').eq(index).find('.link').css('display','none');//隐藏选择按钮
						$('.isNotVerify').eq(index).find('.link').removeClass('selectBtn');
						var id = $('.isNotVerify').eq(index).find('span').attr("data-id");
						addStation++;
						addIdStr[addStation]=id;
						var arrayList = unique(addIdStr);
						sessionStorage.setItem("addId",arrayList);
					})
					$('.isNotVerify').eq(index).find('#giveBtn'+index).click(function(){
						$('.isNotVerify').eq(index).find('span').css('visibility','hidden');//隐藏span
						$('.isNotVerify').eq(index).find('.giveBtn').css('display','none'); //隐藏取消按钮
						$('.isNotVerify').eq(index).find('.link').css('display','block'); //显示选择按钮
						$('.isNotVerify').eq(index).find('.link').removeClass('selectBtn');
						var id = $('.isNotVerify').eq(index).find('span').attr("data-id");
						addStation = addStation-1;
						addIdStr.remove(id)
						var arrayList = unique(addIdStr);
						sessionStorage.setItem("addId",arrayList);
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
						var id = $('.failure').eq(index).find('span').attr("data-id");
						updateStation++;
						updateStr[updateStation]=id;
						var arrayLists = unique(updateStr);
						sessionStorage.setItem("updateId",arrayLists);
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
								var id = $('.failure').eq(index).find('span').attr("data-id");
								updateStation = updateStation-1;
								updateStr.remove(id);
								var arrayList = unique(updateStr);
								sessionStorage.setItem("updateId",arrayList);
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
			checkAgainWine();
		}else{
			Showbo.Msg.alert('您已取消了此次代理酒品请求');
		}
	})
})
function checkAgainWine(){
	var addId = sessionStorage.getItem("addId");
	var delId = sessionStorage.getItem("delId");
	var updId = sessionStorage.getItem("updateId");
	if(delId!=undefined || delId!=null || delId!=""){
		var delIds = eval("'"+delId+"'");
	}else{
		var delIds = "";
	}
	if(addId!=undefined || addId!=null || addId!=""){
		var addIdStr = eval("'"+addId+"'");
	}else{
		var addIdStr =  "";
	}
	if(updId!=undefined || updId!=null || updId!=""){
		var updIdStr = eval("'"+updId+"'");
	}else{
		var updIdStr =  "";
	}
	var userId = getUrlValue("id");
	$.ajax({
		type: "GET",
		async : false,  //同步请求
		url: ipAddress+"/selectWineConfirm.do", //请求接口
		data:{id:userId,wineIdAdd:addIdStr,wineIdDel:delIds,wineIdUpdate:updIdStr},
		dataType:"jsonp",
		timeout:5000, 
		success:function(json){
			if(json.status==1){
				Showbo.Msg.alert('酒品代理提交成功，请耐心等待',goIndex);
			}else if(json.status==2){
				Showbo.Msg.alert(json.message,goIndex);
			}
		},
		error:function(){
			Showbo.Msg.alert('网络错误！');
		}
   });
}

function goIndex(){
	location.href="lookProcessCity.html";
}


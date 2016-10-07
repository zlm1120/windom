var longitude = "";
var latitude = "";
var ac = new BMap.Autocomplete({    //建立一个自动完成的对象
    "input" : "cityAddressName"
});
var myValue;
ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
	var _value = e.item.value;
    myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
     var myGeo=new BMap.Geocoder();
    myGeo.getPoint(myValue, function(point){
    	if (point) {
			latitude=point.lat; //获取纬度
			longitude=point.lng; //获取经度 
		  	}
	    })
});

//添加图片
function addPreview(source,idName) {
	var file = source.files[0];
	if (window.FileReader) {
		var fr = new FileReader();
		var addimg = document.createElement('img');
		var adda = document.createElement("a");
		var addspan = document.createElement("i");
		addspan.className='icon-remove';
		adda.appendChild(addimg);
		adda.appendChild(addspan);
		document.getElementById(idName).appendChild(adda);
		fr.onloadend = function(e) {

			addimg.src = e.target.result;

		};
		fr.readAsDataURL(file);
	}
	$('.icon-remove').click(function(){
		$(this).parent().remove();
	})
}

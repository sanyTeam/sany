mui.init()
(function(){
mui(".head_1").on('tap','.button_1',function(){
	$(".day").show()
	$(".week").hide()
	$(".month").hide()
	
	console.log(555)
	
})
mui(".head_1").on('tap','.button_2',function(){
	$(".day").hide()
	$(".week").show()
	$(".month").hide()
	console.log(555)
	
})
mui(".head_1").on('tap','.button_3',function(){
	$(".day").hide()
	$(".week").hide()
	$(".month").show()
	console.log(555)
	
})
	
})()

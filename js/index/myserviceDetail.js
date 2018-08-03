

//			侧栏选择条件   e		


//底部评价（服务）     s
mui('.ul_evaluate').on('tap','li',function(){
	$(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active')
})
//底部评价     e

mui.init();
			
  //			点击服务评价弹出框
	mui('.list').on('tap','._evaluate',function(){
		mui('.mui-popover').popover('show');
		})
  //			关闭底部弹框
	document.querySelector('.s_close').addEventListener('tap',function(){
		mui('.mui-popover').popover('hide');
	})
	
	
	
	
	
	
//			底部弹框关闭回调
	mui('.mui-scroll-wrapper').scroll();
	mui('body').on('shown', '.mui-popover', function(e) {
		//console.log('shown', e.detail.id);//detail为当前popover元素
	});
	mui('body').on('hidden', '.mui-popover', function(e) {
		//console.log('hidden', e.detail.id);//detail为当前popover元素
	});
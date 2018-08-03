//比例图(进度条)
var progressbar1 = mui('#demo1');
mui(progressbar1).progressbar().setProgress(10)
progressbar1.on('tap', 'a', function() {
	mui(progressbar1).progressbar().setProgress(this.getAttribute('data-progress'));
});

//mui.plusReady(function() {
//	var self = plus.webview.currentWebview();
//	/**
//	 * 防止 在write页面输入文字的时候 ， 输入法把选项卡撑起来
//	 */
//
//	var parentVebView = self.opener();
//	//防止 父页面选项卡被输入法撑起
//	window.addEventListener('resize', function() {
//		var a = plus.android.invoke(plus.android.currentWebview(), "getHeight");
//		var b = plus.navigator.getStatusbarHeight();
//		var c = plus.screen.resolutionHeight;
//		var d = (c - a - b);
////		console.info('webview高度：' + a + " 状态栏高度：" + b + " 屏幕高度：" + c + " 输入法高度:" + d)
////		d > 0 ? self.setStyle({
////			top: '45px',
////			bottom: '0px'
////		}) : self.setStyle({
////			top: '45px',
////			bottom: '50px'
////		});
//
//		d > 0 ? parentVebView.evalJS("mui('#tabBar').css('position','absolute');") : parentVebView.evalJS("mui('#tabBar').css('position','fixed');");
//	}, false);
//});


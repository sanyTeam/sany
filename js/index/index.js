//轮播图
mui("#slider").slider({
	interval: 2000
});
//底部导航

(function() {
	mui.init({
		swipeBack: true //启用右滑关闭功能
	});
	mui.plusReady(function() {
		var self = plus.webview.currentWebview(),
			leftPos = Math.ceil((window.innerWidth - 60) / 2); // 设置凸起大图标为水平居中

		/**	
		 * drawNativeIcon 绘制带边框的半圆，
		 * 实现原理：
		 *   id为bg的tag 创建带边框的圆
		 *   id为bg2的tag 创建白色矩形遮住圆下半部分，只显示凸起带边框部分
		 * 	 id为iconBg的红色背景图
		 *   id为icon的字体图标
		 *   注意创建先后顺序，创建越晚的层级越高
		 */
		var drawNativeIcon = util.drawNative('icon', {
			bottom: '5px',
			left: leftPos + 'px',
			width: '60px',
			height: '60px'
		}, [{
			tag: 'rect',
			id: 'bg',
			position: {
				top: '1px',
				left: '0px',
				width: '100%',
				height: '100%'
			},
			rectStyles: {
				color: '#fff',
				radius: '50%',
				borderColor: '#ccc',
				borderWidth: '1px'
			}
		}, {
			tag: 'rect',
			id: 'bg2',
			position: {
				bottom: '-0.5px',
				left: '0px',
				width: '100%',
				height: '45px'
			},
			rectStyles: {
				color: '#fff'
			}
		}, {
			tag: 'rect',
			id: 'iconBg',
			position: {
				top: '5px',
				left: '5px',
				width: '50px',
				height: '50px'
			},
			rectStyles: {
				color: '#d74b28',
				radius: '50%'
			}
		}, {
			tag: 'font',
			id: 'icon',
			text: '\ue600', //此为字体图标Unicode码'\e600'转换为'\ue600'
			position: {
				top: '0px',
				left: '5px',
				width: '50px',
				height: '100%'
			},
			textStyles: {
				fontSrc: '_www/fonts/iconfont.ttf',
				align: 'center',
				color: '#fff',
				size: '30px'
			}
		}]);
		// append 到父webview中
		self.append(drawNativeIcon);

		//自定义监听图标点击事件
		var active_color = '#fff';
		drawNativeIcon.addEventListener('click', function(e) {
			mui.alert('你点击了图标，你在此可以打开摄像头或者新窗口等自定义点击事件。', '悬浮球点击事件');
			// 重绘字体颜色
			if(active_color == '#fff') {
				drawNativeIcon.drawText('\ue600', {}, {
					fontSrc: '_www/fonts/iconfont.ttf',
					align: 'center',
					color: '#000',
					size: '30px'
				}, 'icon');
				active_color = '#000';
			} else {
				drawNativeIcon.drawText('\ue600', {}, {
					fontSrc: '_www/fonts/iconfont.ttf',
					align: 'center',
					color: '#fff',
					size: '30px'
				}, 'icon');
				active_color = '#fff';
			}

		});
		// 中间凸起图标绘制及监听点击完毕

		// 创建子webview窗口 并初始化
		var aniShow = {};
		util.initSubpage(aniShow);

		var nview = plus.nativeObj.View.getViewById('tabBar'),
			activePage = plus.webview.currentWebview(),
			targetPage,
			subpages = util.options.subpages,
			pageW = window.innerWidth,
			currIndex = 0;

		/**
		 * 根据判断view控件点击位置判断切换的tab
		 */
		nview.addEventListener('click', function(e) {
			var clientX = e.clientX;
			if(clientX > 0 && clientX <= parseInt(pageW * 0.25)) {
				currIndex = 0;
			} else if(clientX > parseInt(pageW * 0.25) && clientX <= parseInt(pageW * 0.45)) {
				currIndex = 1;
			} else if(clientX > parseInt(pageW * 0.45) && clientX <= parseInt(pageW * 0.8)) {
				currIndex = 2;
			} else {
				currIndex = 3;
			}
			// 匹配对应tab窗口	
			if(currIndex > 0) {
				targetPage = plus.webview.getWebviewById(subpages[currIndex - 1]);
			} else {
				targetPage = plus.webview.currentWebview();
			}

			if(targetPage == activePage) {
				return;
			}

			if(currIndex !== 3) {
				//底部选项卡切换
				util.toggleNview(currIndex);
				// 子页面切换
				util.changeSubpage(targetPage, activePage, aniShow);
				//更新当前活跃的页面
				activePage = targetPage;
			} else {
				//第四个tab 打开新窗口
				plus.webview.open('"pages/index/financing.html"', 'new', {}, 'slide-in-right', 200);
			}
		});
	});
})();

//公告轮播
textSwiper();
function textSwiper() {
	$(function() {
		//1文字轮播(2-5页中间)开始

		$(".font_inner li:eq(0)").clone(true).appendTo($(".font_inner")); //克隆第一个放到最后(实现无缝滚动)
		var liHeight = $(".swiper_wrap").height(); //一个li的高度
		//获取li的总高度再减去一个li的高度(再减一个Li是因为克隆了多出了一个Li的高度)
		var totalHeight = ($(".font_inner li").length * $(".font_inner li").eq(0).height()) - liHeight;
		$(".font_inner").height(totalHeight); //给ul赋值高度
		var index = 0;
		var autoTimer = 0; //全局变量目的实现左右点击同步
		var clickEndFlag = true; //设置每张走完才能再点击

		function tab() {
			$(".font_inner").stop().animate({
				top: -index * liHeight
			}, 400, function() {
				clickEndFlag = true; //图片走完才会true
				if(index == $(".font_inner li").length - 1) {
					$(".font_inner").css({
						top: 0
					});
					index = 0;
				}
			})
		}

		function next() {
			index++;
			if(index > $(".font_inner li").length - 1) { //判断index为最后一个Li时index为0
				index = 0;
			}
			tab();
		}

		function prev() {
			index--;
			if(index < 0) {
				index = $(".font_inner li").size() - 2; //因为index的0 == 第一个Li，减二是因为一开始就克隆了一个LI在尾部也就是多出了一个Li，减二也就是_index = Li的长度减二
				$(".font_inner").css("top", -($(".font_inner li").size() - 1) * liHeight); //当_index为-1时执行这条，也就是走到li的最后一个
			}
			tab();
		}
		//切换到下一张
		$(".swiper_wrap .gt").on("click", function() {
			if(clickEndFlag) {
				next();
				clickEndFlag = false;
			}
		});
		//切换到上一张
		$(".swiper_wrap .lt").on("click", function() {
			if(clickEndFlag) {
				prev();
				clickEndFlag = false;
			}
		});
		//自动轮播
		autoTimer = setInterval(next, 3000);
		$(".font_inner a").hover(function() {
			clearInterval(autoTimer);
		}, function() {
			autoTimer = setInterval(next, 3000);
		})

		//鼠标放到左右方向时关闭定时器
		$(".swiper_wrap .lt,.swiper_wrap .gt").hover(function() {
			clearInterval(autoTimer);
		}, function() {
			autoTimer = setInterval(next, 3000);
		})
		//1文字轮播(2-5页中间)结束
	})
}

//数据请求 ---









//测试跳转方法
//mui(document).on("tap","a",function(){
//	var id = this.getActiveAttrib('href')
//})
//function link(url){
//	mui.openWindow({
//		url: url,
//		id:"detail"
//		show: {
//			aniShow: aniShow,
//			duration: 300
//		}
//	});
//}

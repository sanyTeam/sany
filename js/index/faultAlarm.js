//筛选侧滑
var main,menu, mask = mui.createMask(_closeMenu);
var showMenu = false;

 //整体滑动暂不支持android手机，因为两个页面的移动动画，无法保证同步性；


mui.init({
	swipeBack: false,
	beforeback: back
});

function back() {
		if (showMenu) {
			//菜单处于显示状态，返回键应该先关闭菜单,阻止主窗口执行mui.back逻辑；
			closeMenu();
			return false;
		} else {
			//菜单处于隐藏状态，执行返回时，要先close菜单页面，然后继续执行mui.back逻辑关闭主窗口；
			menu.close('none');
			return true;
		}
	}
//plusReady事件后，自动创建menu窗口；
mui.plusReady(function() {
	main = plus.webview.currentWebview();
	//setTimeout的目的是等待窗体动画结束后，再执行create webview操作，避免资源竞争，导致窗口动画不流畅；
	setTimeout(function () {
		menu = mui.preload({
			id: 'offcanvas-drag-left-plus-menu',
			url: 'gzbj-menu.html',
			styles: {
				left: "30%",
				width: '70%',
				zindex: 9997
			}
		});
	},300);
});

/*
 * 显示菜单菜单
 */
function openMenu() {
		if (!showMenu) {
			//解决android 4.4以下版本webview移动时，导致fixed定位元素错乱的bug;
			if (mui.os.android && parseFloat(mui.os.version) < 4.4) {
				document.querySelector("header.mui-bar").style.position = "static";
				//同时需要修改以下.mui-contnt的padding-top，否则会多出空白；
				document.querySelector(".mui-bar-nav~.mui-content").style.paddingTop = "0px";
			}

			//侧滑菜单处于隐藏状态，则立即显示出来；
			//显示完毕后，根据不同动画效果移动窗体；
			menu.show('none', 0, function() {
				menu.setStyle({
					left: '30%',
					transition: {
						duration: 150
					}
				});
			});
			//显示主窗体遮罩
			mask.show();
			showMenu = true;
		}
	}
function closeMenu () {
	//窗体移动
	_closeMenu();
	//关闭遮罩
	mask.close();
}

/**
 * 关闭侧滑菜单(业务部分)
 */
function _closeMenu() {
	if (showMenu) {
		//解决android 4.4以下版本webview移动时，导致fixed定位元素错乱的bug;
		if (mui.os.android && parseFloat(mui.os.version) < 4.4) {
			document.querySelector("header.mui-bar").style.position = "fixed";
			//同时需要修改以下.mui-contnt的padding-top，否则会多出空白；
			document.querySelector(".mui-bar-nav~.mui-content").style.paddingTop = "44px";
		}

			//主窗体开始侧滑；
			menu.setStyle({
				left: '100%',
				transition: {
					duration: 150
				}
			});

		//等窗体动画结束后，隐藏菜单webview，节省资源；
		setTimeout(function() {
			menu.hide();
		}, 300);
		showMenu = false;
	}
}

 //点击侧滑图标，打开侧滑菜单；
document.querySelector('.mui-action-menu').addEventListener('tap', openMenu);
 //在android4.4中的swipe事件，需要preventDefault一下，否则触发不正常
 //故，在dragleft，dragright中preventDefault
window.addEventListener('dragright', function(e) {
	e.detail.gesture.preventDefault();
});
window.addEventListener('dragleft', function(e) {
	e.detail.gesture.preventDefault();
});
 //主界面向左滑动，若菜单未显示，则显示菜单；否则不做任何操作；
window.addEventListener("swipeleft", openMenu);
 //主界面向右滑动，若菜单已显示，则关闭菜单；否则，不做任何操作；
window.addEventListener("swiperight", closeMenu);
 //menu页面向右滑动，关闭菜单；
window.addEventListener("menu:swiperight", closeMenu);

 //重写mui.menu方法，Android版本menu按键按下可自动打开、关闭侧滑菜单；
mui.menu = function() {
	if (showMenu) {
		closeMenu();
	} else {
		openMenu();
	}
}
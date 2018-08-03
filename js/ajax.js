/**
 * AJAX网络请求 
 * @param {Object} root
 * @param {Object} factory
 */
(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.ajax = factory();
  }
}(this, function () {

    /**
     * @param {String}  url                  接口URL
     * @param {Object}  [options]            参数
     * @param {String}  [options.url]        URL参数
     * @param {String}  [options.method=GET] 请求方式GET/POST
     * @param {Boolean} [options.async=true] 是否异步调用TRUE/FLASH
     * @param {String}  [options.user]       认证用户名
     * @param {String}  [options.password]   认证密码
     * @param {Object}  [options.headers]    HTTP请求头
     * @param {*}       [options.data]       请求数据
     *
     * 调用实例
     ajax('/saas-aba-base/api/device-regions', {
				method: 'get',
			    headers: {
			        'Content-Type': 'application/json',
			        'app_token': config.app_token,
			        'current_tenant': '3YSPA08',
			        'current_app': 'A0001'
			    },
			    data: JSON.stringify({
					username:"13920983321",
					password:"983321"
			    })
			}).then(function(res) {
			    //成功
			}, function(err) {
			    //失败
			
		});
     */
    function ajax(path, options) {
    	//根据全局configURI和path参数拼接完整的url
    	url = config.uri + path;
        if (typeof url == 'undefined') {
            throw new TypeError('A URL is required for xhr-ajax');
        }

        if (typeof options === 'undefined' && typeof url === 'object' && url.url) {
            options = url;
            url = options.url;
        } else if (typeof url !== 'string') {
            throw new TypeError('Options must be an object for xhr-ajax');
        }

        options = options || {};

        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();

            xhr.open(
                options.method || 'GET',
                url,
                typeof options.async === 'undefined' ? true : options.async,
                options.user,
                options.password
            );

            Object.keys(options.headers || {}).forEach(function(name) {
                xhr.setRequestHeader(name, options.headers[name]);
            });

            xhr.onreadystatechange = function() {
                if (this.readyState !== 4) {
                    return;
                }

                if (this.status === 200) {
                    resolve(xhr);
                } else {
                    reject(xhr);
                }
            };

            xhr.send(options.data);
        });
    }

    return ajax;
}));

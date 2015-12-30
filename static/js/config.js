(function (global, $, document, undefined) {
    'use strict';

    //除chrome外，其他支持需要在服务器上运行才支持
    if (!global.localStorage) {
        global.alert('This browser does NOT support localStorage');
    }

    /*
     * config 奖项设置
     * localStorage 存储设置
     * board面板计奖函数
     */
    var config = {
        awards: 'grateful',

        total: global.dataSource.length,

        /*
         * 一等奖1名
         * 二等奖3名
         * 三等奖5名
         * 四等奖10名
         * 五等奖20名
         * 六等奖30名
         */
        keycode: {
            '49': { 'class': 'first',    'name': '一等奖', 'total': 1 },
            '50': { 'class': 'second',   'name': '二等奖', 'total': 3 },
            '51': { 'class': 'third',    'name': '三等奖', 'total': 5 },
            '52': { 'class': 'fourth',   'name': '四等奖', 'total': 10 },
            '53': { 'class': 'fifth',    'name': '五等奖', 'total': 20 },
            '54': { 'class': 'grateful', 'name': '感恩奖', 'total': 30 }
        },

        get: function (key) {
            return global.localStorage.getItem(key) || '';
        },

        set: function (key, val) {
            global.localStorage.setItem(key, val);
        },

        //获取当前locals
        getCurrent: function () {
            return config.get(config.awards);
        },

        //追加并去掉前后','
        setCurrent: function (val) {
            var oldval = config.getCurrent(),
                newval = [oldval, val].join(',').replace(/(^,*)|(,*$)/g, '');

            config.set(config.awards, newval);
        },

        /*
         *移除选定某项
         *去2个以上','  去前后','
         */
        remove: function (key, val) {
            var newval;

            key = key || config.awards;
            newval = config.get(key).
                replace(val, '').
                replace(/,{2,}/g, ',').
                replace(/(^,*)|(,*$)/g, '');

            config.set(key,  newval);
        },

        //查询当前是否有中奖记录！
        query: function (val) {
            var keys,
                i,
                len,
                result = false;

            keys = $.map(config.keycode, function(value) {
                return value.class;
            });

            //console.log('go', keys.join(','));
            for (i = 0, len = keys.length; i < len; i += 1) {
                var tmp = config.get(keys[i]).split(',');
                //console.log(tmp.join(','), val);
                result = tmp.indexOf('' + val) >= 0;
                //console.log(result);
                if (result) {
                    return true;
                }
            }

            return false;
        },

        //清空设置
        clear: function () {
            global.localStorage.clear();
        },

        //读取本地中奖数据
        reading: function () {
            var key,
                awards,
                locals,
                nums,
                selector,
                i;

            for (key in config.keycode) {
                awards = config.keycode[key].class;
                locals = config.get(awards);

                if (!!locals) {
                    nums = locals.split(',');
                    selector = $('.' + awards);

                    for (i = 0; i < nums.length; i += 1) {
                        config.appear(selector, nums[i]);
                    }
                }
            }
        },

        initTemplate: function (data) {
	        var html = '<div class="' + data.class + '">' +
					'<h1>' + data.name + '</h1>' +
					'<fieldset>' +
						'<legend></legend>' +
					'</fieldset>' +
					'<div class="list">' +
						'<ul class="win">' +
						'</ul>' +
						'<code>0/' + data.total + '</code>' +
					'</div>' +
				'</div>';
            return html;
        },

        init: function () {
            var $board = $('.board'),
                that = this;
            $.each(config.keycode, function (key, data) {
                $board.append(that.initTemplate(data));
            });
            $board.find('div:last-child').addClass('active');
            that.reading();
        },

        appearTemplate: function (img, name) {
            var html = '<li style="margin-left: 300px;">' +
					'<div class="avatar"><img width="34" src="' + img + '"/></div>' +
					'<div class="name">' + name + '</div>' +
					'<button class="icon icon-delete" title="删除">删除</button>' +
				'</li>';

            return html;
        },
    
        appear: function (selector, num) {
            var data = global.dataSource[num],
                code = selector.find('code'),
                ratio = code.html(),
                min = ~~/(\d+)\/\d+/.exec(ratio)[1],
                max = ~~/\d+\/(\d+)/.exec(ratio)[1],
                awards,
                reg,
                name,
                img,
                newItem;

            if (min == max) {
                awards = selector.attr('class').split(/\s+/)[0];
                reg = new RegExp('(\\d+,*){'+ max +'}');
    
                //过滤超过max位
                config.set(awards, reg.exec(config.get(awards))[0].replace(/(^,*)|(,*$)/g, ''));
                return;
            }
    
            name = data['name'];
            img = data['image'];
            newItem = $(config.appearTemplate(img, name)).attr({'data-num': num});
    
            newItem.prependTo(selector.find('.win'));
    
            setTimeout(function () {
                newItem.css({'margin-left': 0});
            }, 0);
            
            code.html(ratio.replace(/^\d+/, min + 1));
    
            newItem.one('click', 'button', function() {
                var awards = newItem.closest('.active').
                    attr('class').
                    replace('active', '').
                    replace(/^\s*|\s*$/g, '');

                config.remove(awards, newItem.data('num'));
                newItem.css({'transition-delay': 0, 'margin-left': 300});
                code.html(ratio.replace(/^\d+/, ~~/(\d+)\/\d+/.exec(code.html())[1] - 1));
    
                setTimeout(function(){
                    newItem.remove();
                }, 600);
            });
        }
    };

    global.config = config;

}(this, this.jQuery, this.document));

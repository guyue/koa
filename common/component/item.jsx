
    appearTemplate: function (img, name) {
        var html = '<li style="margin-left: 300px;">' +
                '<div class="avatar"><img width="34" src="' + img + '"/></div>' +
                '<div class="name">' + name + '</div>' +
                '<button class="icon icon-delete" title="删除">删除</button>' +
            '</li>';

        return html;
    },

    appear: function (selector, num) {
        var data = global.users[num],
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

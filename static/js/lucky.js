function Lucky(){
    var timer,
		flicker = $('.flicker > img');

	return {
		//顺序运动
		start: function() {
			this.avatar();

			return false;
		},

		lottery: function() {
            var x;

            if (timer) {
                clearTimeout(timer);
            }

            this.randit();

			return true;
		},

        random: function () {
			return Math.random() * config.total >>> 0;
        },

		/*
		 * 头像变换！
		 */
		avatar: function() {
            this.update(this.random());

			timer = setTimeout(arguments.callee.bind(this), 100)
		},

        update: function (index) {
            var result = dataSource[index],
				image = result.image,
                name = result.name;

			flicker.attr('src', image);
            $('.name-container > .name').html(name);
        },

		/*
		 * 随机抽取！
		 */
		randit: function() {
			var that = this,
                result = this.random();

			if(config.query(result)){
                //console.log(result);
				this.randit();
                return;
			}

			//html5存储序列号
			config.setCurrent(result);

			//停止头像
			clearTimeout(timer);
            that.update(result);
			config.appear($('.' +  config.awards), result);
		}
	}
}

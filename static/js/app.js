(function (global, $, document, undefined) {
    'use strict';

    /* 
     * 加载完毕后
     */
    function loader() {
    
        //空格控制
        var lock = true,
            boot = Lucky();

        $(document).on('keydown.lazyloader', function (e) {
    
            if ([32, 13, 38, 40].indexOf(e.keyCode) > 0) {//空格，回车，上方向键，下方向键
                if (lock) {
                    lock = boot.start();
                } else {
                    lock = boot.lottery();
                }
            }
        });
    }


    $(document).ready(function() {
    
        loader();
    
        $('.trigger').on('click', function(){
            if( !$(this).data('active') ){
                $('.zone-container').addClass('active');
    
                $('.flicker').css({'margin-left': 15});
                $('.name-container').css({'margin-left': -293});
    
                $(this).data('active', true);
            } else {
                $('.zone-container').removeClass('active');
    
                $('.flicker').css({'margin-left': -128});
                $('.name-container').css({'margin-left': -443});
    
                $(this).data('active', false);
            }
        });
    
        config.init();
    
        /*
         *更换壁纸、设置全局抽奖奖项
         *键盘操作[1: 一等奖, 2: 二等奖, 3: 三等奖, 4: 感恩奖，0: 全显]
         *CTRL + DEL 重置
         */
        $( document ).on('keydown', function( e ) {
            var k = config.keycode[ e.keyCode ];
            if( !!k ) {
                config.awards = k.class;
    
                $('.' + config.awards).addClass('active').siblings().removeClass('active')
    
                //background
    
            } else if (e.keyCode == 48){
                config.awards = 'grateful';
    
                $('.board > div').addClass('active');
            } else if (e.ctrlKey && e.keyCode == 192) {
                // 192 = 反单引号(1左侧)
    
                config.clear();
    
                window.location.reload()
            }
        })

    });
}(this, this.$, this.document));

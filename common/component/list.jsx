
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

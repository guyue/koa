$(function () {
    $('a[data-toggle="tooltip"]').click(function (e) {
        e.preventDefault();
    }).tooltip({
        trigger: 'hover',
        html: true,
        title: function (e) {
            return $($(this).html()).attr('class', 'img-rounded');
        },
    });
});

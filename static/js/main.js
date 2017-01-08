var Main = (function() {
    $('.toggle-wrap button').on('click', function() {
        var $btn = $(this),
            $form = $btn.closest('form'),
            val = parseInt($btn.val(), 10),
            data = {};

        data['pair'] = val;
        $.post($form.attr('action'), data).done(function (data) {
            var v = data.status;
            $btn.toggleClass('enabled', v);
        });
        return false;
    });

    var socket = io.connect(window.location.toString());
    socket.on('toggle', function (data) {
        $('button[name=switchIx][value="' + data.zoneId + '"]').toggleClass('enabled', data.val);
    });
});

var Edit = (function() {

});
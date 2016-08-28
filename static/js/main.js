var Main = (function() {
    $('.toggle-wrap button').on('click', function() {
        var $btn = $(this),
            $form = $btn.closest('form'),
            val = parseInt($btn.val(), 10),
            data = {};

        data['value'] = $btn.is('.enabled') ? 1 : 0;
        data['pair'] = val;
        $.post($form.attr('action'), data).done(function(data){
            var v = data['switch' + val];
            $btn.toggleClass('enabled', v);
        });
        return false;
    });

    var socket = io.connect(window.location.toString());
    socket.on('toggle', function (data) {
        $('button[name=switchIx][value="' + data.pair + '"]').toggleClass('enabled', data.val === 0);
    });
});
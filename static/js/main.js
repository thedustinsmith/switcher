var Main = (function() {
    $('.toggle-wrap button').on('click', function() {
        var $btn = $(this),
            $form = $btn.closest('form'),
            val = parseInt($btn.val(), 10),
            data = {};

        data['value'] = $btn.is('.enabled') ? 1 : 0;
        data['pair'] = val;
        $.post($form.attr('action'), data).done(function(data){
            console.log(data);
            $btn.toggleClass('enabled');
        });
        return false;
    })
});
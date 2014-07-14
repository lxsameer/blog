var API = {
    get: function(url) {
        return $.ajax({url: url});
    },
}
$(function(){
    $('[data-remote="true"]').each(function(index){
        var url = $(this).data('url');
        API.get(url)
            .done(function(data){
            })
            .fail(function(data){});

    });
});

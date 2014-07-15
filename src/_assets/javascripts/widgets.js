var API_PREFIX = "http://localhost"
var API = {
    get: function(url) {
        return $.ajax({ url: API_PREFIX + url });
    }
};

$(function() {
    $('[data-remote="true"]').each(function(index) {
        var url = $(this).data('url');
        API.get(url)
            .done(function(data) {
                $(that).find('[data-template]').each(function(x) {
                    var key = $(this).data('key');
                    if (data[key] !== undefined) {
                        $(this).html(data[key]);
                    }
                });
            })
            .fail(function(data) {
                alert(data);
           });
    });
});

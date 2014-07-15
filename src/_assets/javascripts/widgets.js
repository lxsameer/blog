var API_PREFIX = "http://localhost:3000";
var API = {
    get: function(url, callback) {
        return $.getJSON(API_PREFIX + url + "?callback=?", callback);
    }
};

$(function() {
    $('[data-remote="true"]').each(function(index) {
        var url = $(this).data('url');
        var that = this;
        API.get(url, function(data) {
            $(that).find('[data-template]').each(function(x) {
                var key = $(this).data('key');
                if (data[key] !== undefined) {
                    $(this).html(data[key]);
                }
            });
        }).fail(function(data) {
            alert(data);
        });
    });
});

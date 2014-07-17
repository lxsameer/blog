function show_error(msg) {
    console.log($("#msg").is(":hidden"));
    if ($("#msg").is(":hidden")) {
        $("#msg #msgbody").html(msg);
        $("#msg").fadeIn().delay(4000).fadeOut();
    }
}

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
            show_error("Can't connect to 'api.lxsameer.com' please try again.");
        });
    });
});

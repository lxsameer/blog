function show_error(msg) {
    if (!$("#msg").is(":visible")) {
        $("#msg #msgbody").html(msg);
        $("#msg").fadeIn().delay(4000).fadeOut();
    }
}

var API_PREFIX = "http://api.lxsameer.com";
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


function link_helper (resource) {
    return "<a href='https://www.github.com/" + resource + "'> " + resource + "</a>";
};

function date_helper(result) {
    return  moment().calendar(result.created_at);
};

function push_event(result) {
    var user = result.actor.login;
    var repo = result.repo.name;
    var ref = result.payload.ref.split("/");

    var str = "<div class='push item'><i class='circular cloud upload icon'></i>" +
        "<div class='content'><div class='header'>pushed to <span class='branch'>" + ref[ref.length -1] + "</span> at " +
        link_helper(repo) + "</div><div class='description'>" + date_helper(result) + "</div></div><div class='list'>";

        result.payload.commits.forEach(function(commit){
          str = str + "<div class='item'><a href='https://www.github.com/" + repo + "/commit/" + commit.sha + "'>" + commit.sha.substr(0, 15) + "</a> " + commit.message + "</div>";

        });

    str = str + "</div></div>";
    return str;
};


function create_event(result){
    var user = result.actor.login;
    var repo = result.repo.name;

    var str = "<div class='create item'>" +
        "<img  class='ui avatar image' src='" + result.actor.avatar_url + "'>" +
        "<div class='content'> <div class='header'>" +
        "create a new <span class='marked'>" + result.payload.ref_type + "</span> at " + link_helper(repo) + "</div>" +
        "<div class='description'>" + date_helper(result) +  "</div><div class='list'>";
    if (result.payload.ref != null) {
        str = str + "<div class='desc'><span class='marked'>" + result.payload.ref + ":</span> " + result.payload.description + "</div>";
    }
    else {
        str = str + "<div class='desc'><span class='marked'>" + repo + ":</span> " + result.payload.description + "</div>";
    }
    str = str + "</div></div>";
    return str;
};

event_handlers = {
    PushEvent: push_event,
    CreateEvent: create_event
};


function loadgithub(){
    var loading = $("#loading");
    var atom = $("#atom");
    var loadicon = $("#loadicon");
    var msg = $("#act_msg");
    var retry = $("#err");

    retry.hide();

    loading.fadeIn(800);

    $.ajax({url: "https://api.github.com/users/lxsameer/events",
            dataType: "json"})
        .fail(function (){
            loading.hide();
            retry.show();
        })
        .done(function(data, status, xhr){
            var results = data;
            results.forEach(function(result) {
                if (event_handlers[result.type] !== undefined) {
                    handler = event_handlers[result.type];
                    atom.append(handler(result));
                }

            });

            loading.hide();
            atom.show();
        });
}

$(function() {
    loadgithub();

    $('.latest .item').on('click', function(){
        window.location.href =  $(this).data('url');
    });

    $('.with.popup').popup({
    });


});

// <span title='" +user  + "'><img class='avatar' src='" + result.actor.avatar_url + "'></span>"

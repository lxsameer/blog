function rand(num) {
  return Math.floor(Math.random() * num) + 1;
}

function random_color() {
  var colors = ['blue', 'orange', 'teal', 'olive', 'purple', 'brown', 'violet'];
  return colors[rand(colors.length - 1)];

}

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

function date_helper(result) {
  return  moment().calendar(result.created_at);
};

function push_event(result) {
  var user     = result.actor.login;
  var repo     = result.repo.name;
  var ref      = result.payload.ref.split("/");
  var template = $("#push-template").html();
  var context  = {
    repo: repo,
    date: date_helper(result),
    branch: ref[ref.length -1],
    commits: result.payload.commits,
    color: random_color,
    short_sha: function() {
      return this.sha.slice(1,10);
    }
  };
  //Mustache.parse(template);
  return  Mustache.to_html(template, context);
};


function create_event(result){
  var user = result.actor.login;
  var repo = result.repo.name;
  var template = $("#create-template").html();
  var context  = {
    date: date_helper(result),
    repo: repo,
    type: result.payload.ref_type,
    commits: result.payload.commits,
    color: random_color,
  };

  if (result.payload.ref != null) {
    context.ref  = result.payload.ref;
    context.desc = result.payload.description;
  }
  else {
    context.ref  = repo;
    context.desc = result.payload.description;
  }

  //Mustache.parse(template);
  return  Mustache.to_html(template, context);
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
  Mustache.tags = ['[[', ']]'];
  loadgithub();

  $('.latest .item').on('click', function(){
    window.location.href =  $(this).data('url');
  });

  $('.with.popup').popup({
  });


});

// <span title='" +user  + "'><img class='avatar' src='" + result.actor.avatar_url + "'></span>"
;

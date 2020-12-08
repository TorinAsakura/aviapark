requirejs.config({
  baseUrl: './'
});

define(['router', 'behaviors/behaviors', 'helpers/mediator'], function(Router, Behaviors, Mediator) {
  var App;
  SVGInjector(document.getElementById('icons-svg'));
  App = new Backbone.Marionette.Application();
  Backbone.Marionette.Behaviors.behaviorsLookup = function() {
    return Behaviors;
  };
  App.router = new Router;
  Backbone.history.start({
    pushState: true
  });
  Backbone.history.length = 0;
  Mediator.on('navigate', (function(_this) {
    return function(url) {
      return App.router.navigate(url, {
        trigger: true
      });
    };
  })(this));
  $(document).scrollTop(0);
  $(document).on('click', function(e) {
    return Mediator.trigger("document:click", e);
  });
  return $(document).on('click', "a[href^='/']", function(e) {
    var a, href, stat, url;
    if ((a = $(e.currentTarget).attr('href').split('.')).length > 1) {
      if (a[1].search('html') >= 0) {
        stat = true;
      }
    }
    if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey && !stat) {
      e.preventDefault();
      href = $(e.currentTarget).attr('href');
      url = href.replace(/^\//, '').replace('\#\!\/', '');
      return App.router.navigate(url, {
        trigger: true
      });
    }
  });
});

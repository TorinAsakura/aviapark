var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['controller'], function(Controller) {
  var Router;
  return Router = (function(superClass) {
    extend(Router, superClass);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.controller = Controller;

    Router.prototype.appRoutes = {
      ":section": "section",
      ":section/:view": "section",
      ":section/map/:uid": "sectionItem",
      "": "home"
    };

    return Router;

  })(Backbone.Marionette.AppRouter);
});

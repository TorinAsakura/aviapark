var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['layouts/main'], function(MainLayout) {
  var HomeController;
  return HomeController = (function(superClass) {
    extend(HomeController, superClass);

    function HomeController() {
      return HomeController.__super__.constructor.apply(this, arguments);
    }

    HomeController.prototype.initialize = function(options) {
      return this.$el = options.$el;
    };

    HomeController.prototype.go = function() {
      return this.mainLayout || (this.mainLayout = new MainLayout().render());
    };

    return HomeController;

  })(Marionette.Controller);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['controllers/sections', 'controllers/home'], function(SectionsController, HomeController) {
  var Controller;
  return Controller = (function(superClass) {
    extend(Controller, superClass);

    function Controller() {
      return Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.$el = $('#content');

    Controller.sectionsController = new SectionsController({
      $el: Controller.$el
    });

    Controller.homeController = new HomeController({
      $el: Controller.$el
    });

    Controller.baseAction = function(action, layout) {
      Backbone.history.length += 1;
      action();
      if (this.$el.find(layout.$el).length === 0) {
        this.$el.append(layout.el);
        layout.onShow();
      }
      return this.update(layout);
    };

    Controller.home = function() {
      return this.baseAction(((function(_this) {
        return function() {
          return $('a.nav__link.active').removeClass('active');
        };
      })(this)), this.homeController.go());
    };

    Controller.section = function(section, view) {
      if (view == null) {
        view = '';
      }
      return this.baseAction(((function(_this) {
        return function() {
          $('a.nav__link.active').removeClass('active');
          return $("a.nav__link[href='/" + section + "']").addClass('active');
        };
      })(this)), this.sectionsController.go(section, null, view));
    };

    Controller.sectionItem = function(section, uid) {
      return this.baseAction(((function(_this) {
        return function() {
          $('a.nav__link.active').removeClass('active');
          return $("a.nav__link[href='/" + section + "']").addClass('active');
        };
      })(this)), this.sectionsController.go(section, uid, 'map'));
    };

    Controller.update = function(layout) {
      this.$el.children('section[class^="layout__"],section[class*="layout__"]').hide();
      return layout.$el.show();
    };

    return Controller;

  })(Marionette.Controller);
});

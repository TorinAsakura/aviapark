var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['templates/index', 'snap-main-animations', 'main'], function(IndexTemplate, animations, main, gm) {
  var MainLayout;
  return MainLayout = (function(superClass) {
    extend(MainLayout, superClass);

    function MainLayout() {
      return MainLayout.__super__.constructor.apply(this, arguments);
    }

    MainLayout.prototype.el = $('<section class="section-main layout__home" id="main">');

    MainLayout.prototype.template = IndexTemplate;

    MainLayout.prototype.onShow = function() {
      animations();
      return main();
    };

    return MainLayout;

  })(Backbone.Marionette.LayoutView);
});

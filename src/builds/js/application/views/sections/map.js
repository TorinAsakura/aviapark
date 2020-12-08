var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['map'], function(Map) {
  var MapView;
  return MapView = (function(superClass) {
    extend(MapView, superClass);

    function MapView() {
      return MapView.__super__.constructor.apply(this, arguments);
    }

    MapView.prototype.itemViews = {};

    MapView.prototype.events = {
      'click .leaflet-control-layers-base label': 'toggleControl'
    };

    MapView.prototype.behaviors = {
      OpenItemView: {
        selector: '.leaflet-popup-content'
      }
    };

    MapView.prototype.render = function() {
      this.triggerMethod('before:render', this);
      Map.init(true, this.$el[0]);
      this.isRendered = true;
      this.triggerMethod('render', this);
      return this;
    };

    MapView.prototype.onRender = function() {
      $('.leaflet-control-layers-base label:first').addClass('active');
      return Mediator.trigger('map:render');
    };

    MapView.prototype.toggleControl = function(e) {
      $(".leaflet-control-layers-base label.active").removeClass('active');
      return $(e.currentTarget).addClass('active');
    };

    return MapView;

  })(Marionette.ItemView);
});

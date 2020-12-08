var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['templates/section', 'views/sections/filter', 'views/sections/map', 'views/sections/boxes'], function(SectionTemplate, FilterLayout, MapView, BoxesView) {
  var SectionLayout;
  return SectionLayout = (function(superClass) {
    extend(SectionLayout, superClass);

    function SectionLayout() {
      return SectionLayout.__super__.constructor.apply(this, arguments);
    }

    SectionLayout.MapView = MapView;

    SectionLayout.FilterLayout = FilterLayout;

    SectionLayout.BoxesView = BoxesView;

    SectionLayout.prototype.el = $('<section class="layout__section" id="section">');

    SectionLayout.prototype.template = SectionTemplate;

    SectionLayout.prototype.regions = {
      filters: "#filters",
      map: "#map"
    };

    SectionLayout.prototype.goToMap = function() {
      return this.$el.addClass('map');
    };

    SectionLayout.prototype.goToBoxes = function() {
      this.$el.removeClass('map');
      return Mediator.trigger("boxes:show");
    };

    SectionLayout.prototype.onRender = function() {
      return this.filters.show(this.filterView = new FilterLayout());
    };

    SectionLayout.prototype.onShow = function() {
      this.mapView = new MapView({
        el: this.map.el
      }).render();
      return this.boxesView = new BoxesView();
    };

    SectionLayout.prototype.setSection = function(section) {
      var placeholder;
      placeholder = section === 'food' ? 'Поиск по ресторанам' : 'Найти в Авиапарке';
      this.filters.$el.find('.js-search__text-field').attr('placeholder', placeholder);
      return this.section = section;
    };

    return SectionLayout;

  })(Backbone.Marionette.LayoutView);
});

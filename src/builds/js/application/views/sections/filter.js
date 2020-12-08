var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['templates/section/filter', 'collections/items', 'views/sections/dropdown', 'views/sections/categories'], function(FilterTemplate, Items, Dropdown, CategoriesView) {
  var FilterLayout;
  return FilterLayout = (function(superClass) {
    extend(FilterLayout, superClass);

    function FilterLayout() {
      this.template = bind(this.template, this);
      return FilterLayout.__super__.constructor.apply(this, arguments);
    }

    FilterLayout.Dropdown = Dropdown;

    FilterLayout.prototype.template = function() {
      return FilterTemplate({
        section: this.options.section
      });
    };

    FilterLayout.prototype.categories = {};

    FilterLayout.prototype.action_types = {
      sale: false,
      collection: false,
      event: false,
      news: false
    };

    FilterLayout.prototype.events = {
      'click': 'stopPropagation',
      'focus input': 'focus',
      'input input': 'search',
      'click .js-filter__item': 'action',
      'click .filter__droplist-item': 'categoryToggle',
      'click .js-filter__cleaning': 'clearFilters',
      'click .filter__route-item': 'changeViews'
    };

    FilterLayout.prototype.stopPropagation = function(e) {
      return e.stopPropagation();
    };

    FilterLayout.prototype.onRender = function() {
      this.dropdownView = new Dropdown({
        el: this.$el.find('.search-drop.js-search-drop'),
        section: this.options.section
      });
      return this.categoriesView = new CategoriesView({
        el: this.$el.find('.filter-droplist__list'),
        collection: new Backbone.Collection
      });
    };

    FilterLayout.prototype.focus = function(e) {
      return this.$el.find('.js-search-drop').removeClass('is-hidden');
    };

    FilterLayout.prototype.search = function(e) {
      var src;
      src = $(e.currentTarget).val().trim();
      return Mediator.trigger("section:filter:search", src);
    };

    FilterLayout.prototype.action = function(e) {
      var action_types, el;
      el = $(e.currentTarget);
      el.toggleClass('is-active');
      this.action_types[el.data('action')] = el.hasClass('is-active');
      action_types = [];
      _.each(this.action_types, function(at, k) {
        if (at) {
          return action_types.push(k);
        }
      });
      return Mediator.trigger("section:filter:action", action_types);
    };

    FilterLayout.prototype.clear = function() {
      return this.$el.find('input').val("").trigger('input');
    };

    FilterLayout.prototype.onChooseItem = function(m) {
      return this.$el.find('input').val(m.get('title'));
    };

    FilterLayout.prototype.categoryToggle = function(e) {
      var el;
      el = $(e.currentTarget);
      return el.find('.js-filter-droplist').toggleClass('is-hidden');
    };

    FilterLayout.prototype.clearFilters = function() {
      this.clear();
      return Mediator.trigger("section:filter:clear");
    };

    FilterLayout.prototype.changeViews = function() {
      return Mediator.trigger("section:switch:view");
    };

    return FilterLayout;

  })(Marionette.LayoutView);
});

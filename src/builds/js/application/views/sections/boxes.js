var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['templates/section/boxes/shop', 'templates/section/boxes/action', 'views/lazy_list'], function(ShopTemplate, ActionTemplate, LazyList) {
  var BoxView, BoxesView;
  BoxView = (function(superClass) {
    extend(BoxView, superClass);

    function BoxView() {
      this.template = bind(this.template, this);
      return BoxView.__super__.constructor.apply(this, arguments);
    }

    BoxView.prototype.template = function() {
      if (this.model.collection.type === 'actions') {
        return ActionTemplate(this.model.toJSON());
      } else {
        return ShopTemplate(this.model.toJSON());
      }
    };

    BoxView.prototype.className = function() {
      if (this.model.collection.type === 'actions') {
        switch (this.model.get('type')) {
          case 'sale':
            return 'stock-item stock-item--theme-yellow';
          case 'collection':
            return 'stock-item stock-item--theme-skyblue';
          case 'news':
            return 'stock-item stock-item--theme-purple';
          case 'event':
            return 'stock-item stock-item--theme-pink';
          default:
            return 'stock-item stock-item--theme-yellow';
        }
      } else {
        return 'stock-item stock-item--theme-yellow';
      }
    };

    return BoxView;

  })(Marionette.ItemView);
  return BoxesView = (function(superClass) {
    var $cacheEl;

    extend(BoxesView, superClass);

    function BoxesView() {
      return BoxesView.__super__.constructor.apply(this, arguments);
    }

    BoxesView.prototype.behaviors = {
      Tooltips: {}
    };

    BoxesView.prototype.itemsCount = 30;

    BoxesView.prototype.childView = BoxView;

    BoxesView.prototype.search_str = "";

    $cacheEl = $("<div id='items' class='shares__items js-store__items'>");

    BoxesView.prototype.initialize = function() {
      return this.$els = {};
    };

    BoxesView.prototype.clear = function() {
      return this.$el = $cacheEl.clone();
    };

    BoxesView.prototype.render = function(c) {
      this.clear();
      this.triggerMethod('before:render', this);
      c.each((function(_this) {
        return function(m) {
          return _this.addChild(m);
        };
      })(this));
      this.$els[c.type] = this.$el.clone();
      this.isRendered = true;
      this.triggerMethod('render', this);
      return this;
    };

    BoxesView.prototype.addChild = function(model) {
      var action_types, view;
      view = new this.childView({
        model: model
      });
      view.render();
      if (!_.isEmpty(model.get('action_types'))) {
        action_types = _.values(model.get('action_types'));
        view.$el.addClass(action_types.join(' '));
      }
      view.$el.addClass(model.get('category'));
      view.$el.addClass(model.get('type'));
      view.$el.data('title', model.get('title'));
      this.children.add(view);
      return this.$el.append(view.$el);
    };

    BoxesView.prototype.loadImage = function() {
      var $els;
      $els = this.$el.find(".stock-item:visible");
      $els.find('img').unveil();
      return $els.find('img').trigger("unveil");
    };

    BoxesView.prototype.onShow = function() {
      this.loadImage();
      return this.isotopeInit();
    };

    BoxesView.prototype.isotopeInit = function(afterInit) {
      if (afterInit == null) {
        afterInit = (function() {});
      }
      return this.$el.imagesLoaded((function(_this) {
        return function() {
          _this.$el.isotope({
            itemSelector: '.stock-item',
            isFitWidth: true,
            columnWidth: 269
          });
          return afterInit();
        };
      })(this));
    };

    BoxesView.prototype.getPaginationClass = function() {
      return "*:nth-child(-n+" + this.itemsCount + ")";
    };

    BoxesView.prototype.filtered = function(filter_class, str) {
      this.filter_class = filter_class;
      this.search_str = str;
      this.$el.isotope({
        filter: function() {
          return $(this).is("" + filter_class) && $($.parseHTML($(this).data('title'))).text().toLowerCase().search(str.toLowerCase()) >= 0;
        }
      });
      return this.onShow();
    };

    return BoxesView;

  })(Marionette.CollectionView);
});

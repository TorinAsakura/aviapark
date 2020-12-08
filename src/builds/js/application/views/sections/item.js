var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['models/item', 'collections/items', 'templates/section/item', 'views/sections/boxes'], function(Item, Items, ItemTemplate, BoxesView) {
  var ItemView;
  return ItemView = (function(superClass) {
    extend(ItemView, superClass);

    function ItemView() {
      return ItemView.__super__.constructor.apply(this, arguments);
    }

    ItemView.prototype.template = ItemTemplate;

    ItemView.prototype.events = {
      'click .js-btn-show-more-info': 'showMore',
      'click .js-store__close': 'closed'
    };

    ItemView.prototype.behaviors = {
      Tooltips: {}
    };

    ItemView.prototype.initialize = function() {
      if (_.isUndefined(this.options.model)) {
        this.model = new Item({
          id: this.options.id
        });
      } else {
        this.model = this.options.model;
      }
      return this.boxesView = new BoxesView();
    };

    ItemView.prototype.render = function() {
      if (this.model.isNew()) {
        this.model.once('sync', (function(_this) {
          return function() {
            return _this.show();
          };
        })(this));
        return this.model.fetch();
      } else {
        return this.show();
      }
    };

    ItemView.prototype.show = function(callback) {
      var collection;
      if (callback == null) {
        callback = (function() {});
      }
      this.triggerMethod('before:render', this);
      this.$el.hide();
      this.$el.html(this.template(this.model.toJSON()));
      collection = new Items();
      collection.type = 'actions';
      collection.reset(collection.parse(this.model.get('childs')));
      this.boxesView.render(collection);
      this.$el.find(".js-store__items").html(this.boxesView.$el);
      this.boxesView.$el.ready((function(_this) {
        return function() {
          return _this.boxesView.onShow();
        };
      })(this));
      return $("#modals").ready((function(_this) {
        return function() {
          $("#modals").append(_this.$el);
          _this.isRendered = true;
          return _this.triggerMethod('render', _this);
        };
      })(this));
    };

    ItemView.prototype.showMore = function(e) {
      var btn, el;
      btn = $(e.currentTarget);
      el = this.$el.find('.store__more-info');
      if (el.is(':hidden')) {
        el.slideDown(400, function() {
          return btn.text('Свернуть');
        });
      } else {
        el.slideUp(400, function() {
          return btn.text('Подробнее');
        });
      }
      return e.preventDefault();
    };

    ItemView.prototype.closed = function() {
      return this.close((function(_this) {
        return function() {
          return Mediator.trigger('item:close', _this);
        };
      })(this));
    };

    ItemView.prototype.close = function(callback) {
      if (callback == null) {
        callback = (function() {});
      }
      return this.$el.slideUp(400, (function(_this) {
        return function() {
          callback();
          return _this.onClose();
        };
      })(this));
    };

    ItemView.prototype.open = function(callback) {
      if (callback == null) {
        callback = (function() {});
      }
      return this.$el.slideDown(400, (function(_this) {
        return function() {
          callback();
          return _this.onOpen();
        };
      })(this));
    };

    ItemView.prototype.onOpen = function() {
      return this.boxesView.onShow();
    };

    ItemView.prototype.onClose = function() {
      return false;
    };

    ItemView.prototype.hide = function() {
      return this.$el.hide();
    };

    return ItemView;

  })(Marionette.ItemView);
});

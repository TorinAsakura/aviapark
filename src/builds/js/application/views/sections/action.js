var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['models/item', 'templates/section/action', 'views/sections/item'], function(Item, ActionTemplate, ItemView) {
  var ActionView;
  return ActionView = (function(superClass) {
    extend(ActionView, superClass);

    function ActionView() {
      return ActionView.__super__.constructor.apply(this, arguments);
    }

    ActionView.prototype.template = ActionTemplate;

    ActionView.prototype.events = {
      'click .js-btn-show-more-info': 'showMore',
      'click .js-store__close': 'closed'
    };

    ActionView.prototype.initialize = function() {
      if (_.isUndefined(this.options.model)) {
        return this.model = new Item({
          id: this.options.id,
          section: 'action'
        });
      } else {
        return this.model = this.options.model;
      }
    };

    ActionView.prototype.render = function() {
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

    ActionView.prototype.show = function(callback) {
      if (callback == null) {
        callback = (function() {});
      }
      this.triggerMethod('before:render', this);
      this.$el.hide();
      this.$el.html(this.template(this.model.toJSON()));
      return $("#modals").ready((function(_this) {
        return function() {
          $("#modals").append(_this.$el);
          _this.isRendered = true;
          return _this.triggerMethod('render', _this);
        };
      })(this));
    };

    ActionView.prototype.onOpen = function() {
      return false;
    };

    return ActionView;

  })(ItemView);
});

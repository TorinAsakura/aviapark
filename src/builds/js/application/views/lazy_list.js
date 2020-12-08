var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(function() {
  var LazyList;
  return LazyList = (function(superClass) {
    extend(LazyList, superClass);

    function LazyList() {
      return LazyList.__super__.constructor.apply(this, arguments);
    }

    LazyList.prototype.step = 20;

    LazyList.prototype.$cache_el = $("<div>");

    LazyList.prototype.scroll = function(e) {
      if ($(e.currentTarget).height() + $(e.currentTarget).scrollTop() + 100 >= this.$el[0].scrollHeight) {
        return this.addItemsToList();
      }
    };

    LazyList.prototype.clear = function() {
      this.$el.html("");
      return this.$cache_el.html("");
    };

    LazyList.prototype.render = function(c) {
      this.clear();
      this.triggerMethod('before:render', this);
      c.each((function(_this) {
        return function(m) {
          return _this.addChild(m);
        };
      })(this));
      this.beforeRender((function(_this) {
        return function() {
          return _this.addItemsToList();
        };
      })(this));
      return this;
    };

    LazyList.prototype.addItemsToList = function() {
      if (this.$cache_el.children().length === 0) {
        return this.isRendered = true;
      }
      if (this.$cache_el.children().length > this.step) {
        this.$el.append(this.$cache_el.children().slice(0, +this.step + 1 || 9e9));
      } else {
        this.$el.append(this.$cache_el.children().slice(0, +(this.$cache_el.children().length - 1) + 1 || 9e9));
      }
      return this.triggerMethod('render', this);
    };

    LazyList.prototype.beforeRender = function(addItemFunc) {
      return addItemFunc();
    };

    return LazyList;

  })(Marionette.CollectionView);
});

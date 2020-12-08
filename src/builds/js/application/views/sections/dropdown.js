var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['templates/section/filter/dropdown/item', 'templates/section/filter/dropdown/title', 'views/lazy_list'], function(ItemTemplate, TitleTemplate, LazyList) {
  var Dropdown, ItemDropdown;
  ItemDropdown = (function(superClass) {
    extend(ItemDropdown, superClass);

    function ItemDropdown() {
      return ItemDropdown.__super__.constructor.apply(this, arguments);
    }

    ItemDropdown.prototype.template = ItemTemplate;

    ItemDropdown.prototype.behaviors = {
      OpenItemView: {
        selector: ''
      }
    };

    return ItemDropdown;

  })(Marionette.ItemView);
  return Dropdown = (function(superClass) {
    extend(Dropdown, superClass);

    function Dropdown() {
      return Dropdown.__super__.constructor.apply(this, arguments);
    }

    Dropdown.prototype.currentClass = null;

    Dropdown.prototype.childView = ItemDropdown;

    Dropdown.prototype.behaviors = {
      Tooltips: {}
    };

    Dropdown.prototype.initialize = function() {
      this.$el.scroll((function(_this) {
        return function(e) {
          return _this.scroll(e);
        };
      })(this));
      if (window.innerHeight > 1000) {
        return this.$el.addClass('search-drop--extended');
      }
    };

    Dropdown.prototype.addChild = function(model) {
      var view;
      if (this.currentClass !== model.get('class')) {
        this.$cache_el.append(TitleTemplate({
          title: model.get('class')
        }));
      }
      view = new this.childView({
        model: model
      });
      _.each(this.childEvents, (function(_this) {
        return function(cb, name) {
          return view.on(name, function(m) {
            return _this[cb](m);
          });
        };
      })(this));
      view.render();
      this.children.add(view);
      this.$cache_el.append(view.$el);
      return this.currentClass = model.get('class');
    };

    Dropdown.prototype.clear = function() {
      Dropdown.__super__.clear.apply(this, arguments);
      return this.currentClass = null;
    };

    Dropdown.prototype.hide = function() {
      return this.$el.addClass('is-hidden');
    };

    Dropdown.prototype.addItemsToList = function() {
      Dropdown.__super__.addItemsToList.apply(this, arguments);
      this.$el.find('.search-drop__brand-img-container img').unveil();
      return this.$el.find('.search-drop__brand-img-container img').trigger("unveil");
    };

    return Dropdown;

  })(LazyList);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['models/item'], function(Item) {
  var Items;
  return Items = (function(superClass) {
    extend(Items, superClass);

    function Items() {
      return Items.__super__.constructor.apply(this, arguments);
    }

    Items.prototype.model = Item;

    Items.prototype.type = 'shops';

    Items.prototype.url = function() {
      if (_.isUndefined(this.type)) {
        return "http://api.avia.kknopka.ru/items/list";
      } else if (this.type === 'actions') {
        return "http://api.avia.kknopka.ru/actions/list";
      } else {
        return "http://api.avia.kknopka.ru/items/list/" + this.type;
      }
    };

    Items.prototype.parse = function(model) {
      var data, fn, i, len, ref;
      data = [];
      ref = _.values(model);
      fn = (function(_this) {
        return function(model) {
          return data.push(Item.prototype.parse(model));
        };
      })(this);
      for (i = 0, len = ref.length; i < len; i++) {
        model = ref[i];
        fn(model);
      }
      return data;
    };

    Items.prototype.reset = function(models, options) {
      if (options && options.parse) {
        delete options.parse;
        models = this.parse(models);
      }
      return Backbone.Collection.prototype.reset.call(this, models, options);
    };

    return Items;

  })(Backbone.Collection);
});

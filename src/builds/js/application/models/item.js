var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(function() {
  var Item;
  return Item = (function(superClass) {
    extend(Item, superClass);

    function Item() {
      return Item.__super__.constructor.apply(this, arguments);
    }

    Item.prototype.idAttribute = "id";

    Item.prototype["default"] = {
      type: 'shop',
      category_title: [],
      tags: [],
      floor: [],
      contact_phone: '',
      contact_url: ''
    };

    Item.prototype.type = 'item';

    Item.prototype.initialize = function(data) {
      if (_.has(data, 'section')) {
        this.type = data.section;
        delete data.section;
      }
      return Item.__super__.initialize.call(this, data);
    };

    Item.prototype.toJSON = function() {
      var data;
      data = _.clone(this.attributes);
      data.type_title = (function() {
        switch (data.type) {
          case "sale":
            return 'скидка';
          case "collection":
            return 'коллекция';
          case "event":
            return 'событие';
          case "news":
            return 'новость';
        }
      })();
      if (_.has(data, 'parent') && (data.parent instanceof Backbone.Model)) {
        data.parent = data.parent.toJSON();
      }
      return data;
    };

    Item.prototype.parse = function(data) {
      data['class'] = _.first(data.title);
      data['category_link'] = (function() {
        switch (data['section']) {
          case "shops":
            return "магазин";
          case "food":
            return "ресторан";
          default:
            return "объект";
        }
      })();
      data['type_rr'] = (function() {
        switch (data['type']) {
          case "sale":
            return "скидку";
          case "event":
            return "событие";
          case "collection":
            return "коллекцию";
          case "news":
            return "новость";
        }
      })();
      data['class_ico'] = (function() {
        switch (data['section']) {
          case "food":
            return "stock-item__burger-ico";
          default:
            return "stock-item__shop-ico";
        }
      })();
      data = _.extend(_.clone(this["default"]), data);
      _.each(data, (function(_this) {
        return function(attr, k) {
          if ((_.isEmpty(attr) || _.isNull(attr)) && _.has(_this["default"], k)) {
            return data[k] = _this["default"][k];
          }
        };
      })(this));
      return data;
    };

    Item.prototype.url = function() {
      if (this.type === 'action') {
        return "http://api.avia.kknopka.ru/actions/" + (this.get('id'));
      } else {
        return "http://api.avia.kknopka.ru/items/" + (this.get('id'));
      }
    };

    Item.prototype.isNew = function() {
      return !this.get('title');
    };

    return Item;

  })(Backbone.Model);
});

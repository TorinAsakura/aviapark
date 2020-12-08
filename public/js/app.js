
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('models/item',[],function() {
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

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('collections/items',['models/item'], function(Item) {
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

define('templates/section',['require','exports','module'],function(require,exports,module){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"centered-content\"><div id=\"filters\"></div><div id=\"modals\"></div></div><div id=\"map\"></div><div id=\"box\" class=\"centered-content\"></div>");;return buf.join("");
};

});

define('templates/section/filter',['require','exports','module'],function(require,exports,module){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"filter\"><div class=\"filter__route-item\"><svg class=\"icon icon-switch\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-switch\"></use></svg><svg class=\"icon icon-fo-icon-2 icon-grid-display\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-fo-icon-2\"></use></svg><i class=\"icon icon-grid-display\"></i></div><div id=\"search\" class=\"filter__search\"><input type=\"text\" placeholder=\"\" class=\"search__text-field js-search__text-field\"/><div class=\"search-drop search-drop--filter js-search-drop is-hidden\"></div></div><div data-action=\"sale\" class=\"filter__item js-filter__item filter__action-item\"><i><svg class=\"icon icon-badge\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-badge\"></use></svg></i><span class=\"fi-text\">Акции</span></div><div data-action=\"collection\" class=\"filter__item js-filter__item filter__col-item\"><i><svg class=\"icon icon-collection\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-collection\"></use></svg></i><span class=\"fi-text\">Коллекции</span></div><div data-action=\"event\" class=\"filter__item js-filter__item filter__events-item\"><i><svg class=\"icon icon-calendar\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-calendar\"></use></svg></i><span class=\"fi-text\">События</span></div><div data-action=\"news\" class=\"filter__item js-filter__item filter__news-item\"><i><svg class=\"icon icon-rupor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-rupor\"></use></svg></i><span class=\"fi-text\">Новости</span></div><div class=\"filter__favor js-filter__favor\"><div class=\"badge badge--favor\"><div class=\"badge__bottom\"></div><svg class=\"icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg></div></div><div class=\"filter__droplist-item\"><div class=\"filter__droplist-point js-filter__droplist-point\"><i class=\"filter__droplist-ico\"></i><span class=\"fi-text\">Категории</span></div><div class=\"filter-droplist js-filter-droplist is-hidden\"><ul class=\"filter-droplist__list\"></ul></div></div><div class=\"filter__cleaning js-filter__cleaning\"><span class=\"fi-text\">Очистить фильтр</span><i><svg class=\"icon icon-close\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-close\"></use></svg></i></div></div>");;return buf.join("");
};

});

define('templates/section/filter/dropdown/item',['require','exports','module'],function(require,exports,module){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (_, action_types, category_title, floor, id, logo, title) {
buf.push("<div" + (jade.attr("data-itemid", '' + (id) + '', true, false)) + " class=\"search-drop__item\"><div class=\"search-drop__brand-img-container\"><img" + (jade.attr("data-src", 'http://api.avia.kknopka.ru' + (logo) + '', true, false)) + " alt=\"\" class=\"search-drop__brand-img\"/></div><div class=\"search-drop__brand\"><div class=\"search-drop__brand-name\">" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)) + "</div><div class=\"search-drop__brand-info\">" + (jade.escape(null == (jade_interp = category_title) ? "" : jade_interp)) + "</div></div><!--.search-drop__cost--><!--    span.search-drop__cost-highlight $--><!--    | $$--><div class=\"search-drop__storey\"><span class=\"search-drop__storey-val\">" + (jade.escape(null == (jade_interp = floor.join(', ')) ? "" : jade_interp)) + "</span> этаж</div><div class=\"search-drop__offers\"><i data-tooltip=\"Акции\"" + (jade.cls(['search-drop__offer-badge','search-drop__badge-ico','js-tooltip-top',_.indexOf(action_types, 'sale') < 0 ? "is-hidden" : ""], [null,null,null,true])) + "><svg class=\"icon icon-badge\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-badge\"></use></svg></i><i data-tooltip=\"Коллекции\"" + (jade.cls(['search-drop__offer-collection','search-drop__collection-ico','js-tooltip-top',_.indexOf(action_types, 'collection') < 0 ? "is-hidden" : ""], [null,null,null,true])) + "><svg class=\"icon icon-collection\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-collection\"></use></svg></i><i data-tooltip=\"События\"" + (jade.cls(['search-drop__offer-calendar','search-drop__calendar-ico','js-tooltip-top',_.indexOf(action_types, 'event') < 0 ? "is-hidden" : ""], [null,null,null,true])) + "><svg class=\"icon icon-calendar\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-calendar\"></use></svg></i><i data-tooltip=\"Новости\"" + (jade.cls(['search-drop__offer-rupor','search-drop__rupor-ico','js-tooltip-top',_.indexOf(action_types, 'news') < 0 ? "is-hidden" : ""], [null,null,null,true])) + "><svg class=\"icon icon-rupor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-rupor\"></use></svg></i></div><div data-tooltip=\"Добавить в избранное\" class=\"badge badge--favor badge--favor-search js-tooltip-top\"><svg class=\"icon icon-star badge__ico--favor-active\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg><div class=\"badge__bottom\"></div><svg class=\"icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg></div><div class=\"search-drop__parking is-hidden\">С</div></div>");}.call(this,"_" in locals_for_with?locals_for_with._:typeof _!=="undefined"?_:undefined,"action_types" in locals_for_with?locals_for_with.action_types:typeof action_types!=="undefined"?action_types:undefined,"category_title" in locals_for_with?locals_for_with.category_title:typeof category_title!=="undefined"?category_title:undefined,"floor" in locals_for_with?locals_for_with.floor:typeof floor!=="undefined"?floor:undefined,"id" in locals_for_with?locals_for_with.id:typeof id!=="undefined"?id:undefined,"logo" in locals_for_with?locals_for_with.logo:typeof logo!=="undefined"?logo:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));;return buf.join("");
};

});

define('templates/section/filter/dropdown/title',['require','exports','module'],function(require,exports,module){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (title) {
buf.push("<div class=\"search-drop__char-title\">" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)) + "</div>");}.call(this,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));;return buf.join("");
};

});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('views/lazy_list',[],function() {
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

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('views/sections/dropdown',['templates/section/filter/dropdown/item', 'templates/section/filter/dropdown/title', 'views/lazy_list'], function(ItemTemplate, TitleTemplate, LazyList) {
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

define('templates/section/filter/category',['require','exports','module'],function(require,exports,module){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (category, category_title) {
buf.push("<li" + (jade.attr("data-category", '' + (category) + '', true, false)) + " class=\"filter-droplist__item\"><a href=\"#\" class=\"filter-droplist__link\"><i></i>" + (jade.escape((jade_interp = category_title) == null ? '' : jade_interp)) + "</a></li>");}.call(this,"category" in locals_for_with?locals_for_with.category:typeof category!=="undefined"?category:undefined,"category_title" in locals_for_with?locals_for_with.category_title:typeof category_title!=="undefined"?category_title:undefined));;return buf.join("");
};

});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('views/sections/categories',['templates/section/filter/category'], function(CategoryTemplate) {
  var CategoriesView, CategoryView;
  CategoryView = (function(superClass) {
    extend(CategoryView, superClass);

    function CategoryView() {
      return CategoryView.__super__.constructor.apply(this, arguments);
    }

    CategoryView.prototype.template = CategoryTemplate;

    CategoryView.prototype.events = {
      'click a': 'chooseCategory'
    };

    CategoryView.prototype.chooseCategory = function(e) {
      var category, li;
      e.stopPropagation();
      e.preventDefault();
      li = $(e.currentTarget).parent('li');
      li.toggleClass('active');
      category = {
        title: li.data('category'),
        active: li.hasClass('active')
      };
      return Mediator.trigger("section:filter:category", category);
    };

    return CategoryView;

  })(Marionette.ItemView);
  return CategoriesView = (function(superClass) {
    extend(CategoriesView, superClass);

    function CategoriesView() {
      return CategoriesView.__super__.constructor.apply(this, arguments);
    }

    CategoriesView.prototype.childView = CategoryView;

    CategoriesView.prototype.hide = function() {
      return this.$el.parent().addClass('is-hidden');
    };

    return CategoriesView;

  })(Marionette.CollectionView);
});

var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('views/sections/filter',['templates/section/filter', 'collections/items', 'views/sections/dropdown', 'views/sections/categories'], function(FilterTemplate, Items, Dropdown, CategoriesView) {
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

define( 'map',[],function() {
        return Map = {
            popups: [],

            // !!Важно все масивы слоев этажей начинаются с инекса 1 что бы удобнее было вызывать 0й индекс пустой везде.
            iconUrl: 'http://api.avia.kknopka.ru/',
            // магазины
            Style: {
                // цвет обводки
                "color": "#525765",
                // это вроде ни на что не влияет
                "strokeColor": "#525765",
                "stroke-Width": 2,
                "weight": 2,
                // цвет заливки
                "fillColor": "#484c5b",
                "fillOpacity": 1
            },
            // кинозалы
            kinoStyle: {
                "color": "#3A3E4E",
                "strokeColor": "#3A3E4E",
                "stroke-Width": 2,
                "weight": 2,
                "fillColor": "#3d4252",
                "fillOpacity": 1
            },
            // кинозалы ховер
            kinoStyle2: {
                "color": "#A7F0DD",
                "strokeColor": "#A7F0DD",
                "stroke-Width": 2,
                "weight": 2,
                "fillColor": "#414554",
                "fillOpacity": 1
            },
            // кинозалы клик
            kinoStyle3: {
                "color": "#A7F0DD",
                "strokeColor": "#A7F0DD",
                "stroke-Width": 2,
                "weight": 2,
                "fillColor": "#A7F0DD",
                "fillOpacity": 1
            },
            // общие границы ТРЦ и фон
            staticStyle1: {
                "color": "#3A3E4E",
                "strokeColor": "#3A3E4E",
                "stroke-Width": 0,
                "weight": 0,
                "fillColor": "#3A3E4E",
                "fillOpacity": 1
            },
            // внутренние стены, атриумы (без магазинов)
            staticStyle2: {
                "color": "#414554",
                "strokeColor": "#414554",
                "stroke-Width": 0,
                "weight": 0,
                "fillColor": "#414554",
                "fillOpacity": 1
            },
            // магазины ховер
            hoverStyle: {
                "color": "#A7F0DD",
                "strokeColor": "#A7F0DD",
                "stroke-Width": 2,
                "weight": 2,
                "fillColor": "#A7F0DD",
                "fillOpacity": 1
            },
            LGroup: [],
            LLevels: [],
            LStatic: [],
            LMarkers: [],
            LPromo: [],
            Level: [],
            geojsonFeatureL: [],
            mapMinZoom: 10,
            mapMaxZoom: 13,
            mapCurZoom: 10,
            mapCurLevel: 1,
            mapCenter: [2.220972689603263, 1.0725402832031248],

            //Можно не грузить слои автоматически не передав в loadlayers ничего
            init: function (loadlayers, el) {
                Map.southWest = L.latLng(0.4212104387885494, -1.5657958984375);
                Map.northEast = L.latLng(4.023955250363652, 3.7);
                Map.mapBounds = L.latLngBounds(Map.southWest, Map.northEast);
                for (var i = 1; i < 5; i++) {
                    Map.LGroup[i] = new L.LayerGroup();
                    Map.LLevels[i] = new L.LayerGroup();
                    Map.LMarkers[i] = new L.LayerGroup();
                    Map.LPromo[i] = new L.LayerGroup();
                    Map.LStatic[i] = new L.LayerGroup();
                    Map.LStatic[i].addTo(Map.LGroup[i]);
                    Map.LMarkers[i].addTo(Map.LGroup[i]);
                    Map.LPromo[i].addTo(Map.LGroup[i]);
                }
                Map.LKino = new L.LayerGroup();
                Map.baseLayers = {
                    4: Map.LGroup[4],
                    2: Map.LGroup[2],
                    3: Map.LGroup[3],
                    1: Map.LGroup[1]
                };
                Map.map = L.map(el, {
                    maxZoom: Map.mapMaxZoom,
                    minZoom: Map.mapMinZoom,
                    layers: [Map.LGroup[1]],
                    tap: false,
                    zoomControl: false,
                    inertia: false,
                    bounceAtZoomLimits: false
                }).setView(Map.mapCenter, Map.mapMinZoom);

                if (Map.map.getBounds().getNorthEast().lat > Map.mapBounds.getNorthEast().lat) {
                    Map.map.fitBounds(Map.map.getBounds());
                    Map.map.setMaxBounds(Map.map.getBounds());
                } else {
                    Map.map.fitBounds(Map.mapBounds);
                    Map.map.setMaxBounds(Map.mapBounds);
                }
                L.control.layers(Map.baseLayers).addTo(Map.map);
                L.control.zoom({position: 'topright'}).addTo(Map.map);
                if (!(loadlayers === undefined)) {
                    Map.loadLayers();
                }
            },

            loadLayers: function () {
                Map.loadStatic(1);
                Map.startListeners();
                return true;
            },


            loadLayer: function (i) {
                $.getJSON("/map/" + i + "-level.json", function (data) {
                    Map.geojsonFeatureL[i] = data;
                    Map.Level[i] = L.geoJson(Map.geojsonFeatureL[i], {
                        onEachFeature: function (feature, layer) {
                            // гадость лагучая обнуляем стили
                            layer.setStyle(Map.Style);
                            (function (layer, properties) {
                                if (properties.magId != '4003') {
                                    layer.on("mouseover", function (e) {
                                        layer.setStyle(Map.hoverStyle);
                                    });
                                    layer.on("mouseout", function (e) {
                                        layer.setStyle(Map.Style);
                                    });
                                }


                            })(layer, feature.properties);
                        }
                    }).addTo(Map.LLevels[i]);
                    Map.LLevels[i].addTo(Map.LGroup[i]);
                    itemsL = {};
                    $.getJSON("http://api.avia.kknopka.ru/items/map/" + i + "?nocache", function (data) {
                        $.each(data, function (key, val) {
                            itemsL[key] = val;
                        });
                        Map.Level[i].eachLayer(function (layer) {
                            try {
                                tmagId = layer.feature.properties.magId;
                                tcenter = [itemsL[tmagId]['x'], itemsL[tmagId]['y']];

                                if ( itemsL[tmagId]['category_title'].length > 16){
                                    var category_title = itemsL[tmagId]['category_title'].substr(0,16) + '...';
                                } else {
                                    var category_title = itemsL[tmagId]['category_title'];
                                }
                                popuphtml = "<div class='leaflet-popup-text modal-link' data-itemid='" + itemsL[tmagId]['id'] + "' data-target='#link-modal-shop'><div class='leaflet-popup-text-title'>" + itemsL[tmagId]['title'] + "</div><div class='leaflet-popup-text-category'>" + category_title + "</div></div><div class='leaflet-popup-logo'><img src='" + Map.iconUrl + itemsL[tmagId]['logo'] + "'></img></div>";
                                popup = layer.bindPopup(popuphtml);
                                Map.popups[itemsL[tmagId]['id']] = popup;
                                //TODO ID магазина
                                obj = {};
                                if (itemsL[tmagId]['actions']) {
                                    obj = L.marker(tcenter, {icon: Icon}).bindLabel(itemsL[tmagId]['title'], {
                                        noHide: true,
                                        offset: [-40, 10]
                                    });
                                    PromoIcon = L.Icon.extend({options: {iconSize: [55, 55], iconAnchor: [27, 55]}});
                                    PIcon = new PromoIcon({iconUrl: Map.iconUrl + itemsL[tmagId]['actions'][0]});
                                    promo = L.marker(tcenter, {icon: PIcon});//.bindLabel("<img class='leaflet-action-icon' src='" + Map.iconUrl + itemsL[tmagId]['actions'][0] + "'></img>", {noHide: true, offset: [-40, 10] });
                                    promo.addTo(Map.LPromo[i]);
                                    obj.addTo(Map.LMarkers[i]);
                                    promo.zoomLevel = 0;
                                    promo.isPromo = true;
                                } else {
                                    MarkerIcon = L.Icon.extend({options: {iconSize: [20, 20]}});
                                    Icon = new MarkerIcon({iconUrl: Map.iconUrl + itemsL[tmagId]['icon']});
                                    obj = L.marker(tcenter, {icon: Icon}).bindLabel(itemsL[tmagId]['title'], {
                                        noHide: true,
                                        offset: [-40, 10]
                                    });
                                    obj.addTo(Map.LMarkers[i]);
                                }
                                obj.zoomLevel = itemsL[tmagId]['zoom'] || 99;
                            } catch (e) {
                            }
                        });
                        if (i == 1) {
                            Map.LMarkers[i].eachLayer(function (layer) {
                                if (layer.zoomLevel < 11) {
                                    layer.showLabel();
                                } else {
                                    layer._icon.style.display = 'none';
                                }
                            });
                        }
                    });
                }).done(function () {
                    ////console.log("load Layer L:" + i);
                    return Map.loadStatic(i + 1);
                })
            },


            // Отложено
            loadStatic: function (i) {
                if (i > 4) {
                    return Map.loadKino();
                }
                $.getJSON("/map/" + i + "-level-static.json", function (data) {
                    Map.geojsonFeatureL[i] = data;
                    //            //console.log( Map.geojsonFeatureL[i].features.slice(1));
                    //            //console.log( Map.geojsonFeatureL[i].features.slice(1,-1));
                    l0 = {"type": "FeatureCollection", "features": [Map.geojsonFeatureL[i].features[0]]};
                    //            //console.log(Map.geojsonFeatureL[i]);
                    Map.LStatic[i] = L.geoJson(l0, {
                        onEachFeature: function (feature, layer) {
                            layer.setStyle(Map.staticStyle1);
                        }
                    }).addTo(Map.LStatic[i]);
                    Map.geojsonFeatureL[i].features = Map.geojsonFeatureL[i].features.slice(1, Map.geojsonFeatureL[i].features.length);

                    Map.LStatic[i] = L.geoJson(Map.geojsonFeatureL[i], {
                        onEachFeature: function (feature, layer) {
                            if (layer.feature.properties['icon']) {
                                Icon = L.icon({
                                    iconUrl: Map.iconUrl + '/site/assets/icons/poi-' + layer.feature.properties['icon'] + '.svg',
                                    iconSize: [32, 32],
                                    iconAnchor: [16, 16]
                                });
                                layer.setIcon(Icon);
                            } else {
                                layer.setStyle(Map.staticStyle2);
                            }
                            //                    (function (layer, properties) {
                            //                        layer.on("mouseover", function (e) {
                            //                            layer.setStyle(Map.hoverStyle);
                            //                        });
                            //                        layer.on("mouseout", function (e) {
                            //                            layer.setStyle(Map.Style);
                            //                        });
                            //
                            //                    })(layer, feature.properties);
                        }
                    }).addTo(Map.LStatic[i]);

                    //            Map.LStatic[i].bringToFront();

                }).done(function () {
                    ////console.log("load Static L:" + i);
                    Map.loadLayer(i);
                })

            },


            loadKino: function () {
                $.getJSON("/map/kino.json", function (data) {
                    Map.LKino = L.geoJson(data, {
                        onEachFeature: function (feature, layer) {
                            properties = feature.properties;
                            tcenter = [properties['x'], properties['y']];
                            layer.setStyle(Map.kinoStyle);
                            popuphtml = "<div class='modal-link' data-toggle='modal' data-target='#link-modal-cinema'>" + properties['desc'] + "</div>";
                            popup = layer.bindPopup(popuphtml);
                            MarkerIcon = L.Icon.extend({options: {iconSize: [20, 20]}});
                            Icon = new MarkerIcon({iconUrl: Map.iconUrl + 'site/assets/icons/karo-' + properties['icon'] + '.svg'});
                            obj = L.marker(tcenter, {icon: Icon});
                            //console.log(obj);
                            //console.log(layer);
                            obj.addTo(Map.LMarkers[4]);
                            obj.zoomLevel = 11;
                            (function (layer) {
                                layer.on("mouseover", function (e) {
                                    if (!layer._popup._isOpen) {
                                        //console.log(layer);
                                        layer.setStyle(Map.kinoStyle2);
                                    }
                                });
                                layer.on("mouseout", function (e) {
                                    if (!layer._popup._isOpen) {
                                        //console.log(layer);
                                        layer.setStyle(Map.kinoStyle);
                                    }
                                });
                                layer.on("popupopen", function (e) {
                                    layer.setStyle(Map.kinoStyle3);
                                    //console.log('Wtf?')
                                });
                                layer.on("popupclose", function (e) {
                                    layer.setStyle(Map.kinoStyle);
                                });

                            })(layer);
                        }
                    }).addTo(Map.LLevels[4]);

                }).done(function () {
                    //console.log("Load kino");
                    return true;
                })
            },

            startListeners: function () {
                Map.map.on('zoomend', function (e) {
                    newZoom = e.target._zoom;
                    //if (newZoom > Map.mapCurZoom) {
                    //    //console.log('zoomed');
                    //}
                    //else {
                    //    //console.log('unzoomed');
                    //}
                    Map.LMarkers[Map.mapCurLevel].eachLayer(function (layer) {
                        if (layer.zoomLevel > newZoom) {
                            layer.hideLabel();
                            layer._icon.style.display = 'none';
                        } else {
                            layer.showLabel();
                            layer._icon.style.display = '';
                        }
                    });
                    Map.mapCurZoom = newZoom;
                });
                Map.map.on('baselayerchange', function (e) {
                    Map.LMarkers[e.name].eachLayer(function (layer) {
                        if (layer.zoomLevel > Map.mapCurZoom) {
                            layer.hideLabel();
                            layer._icon.style.display = 'none';
                        } else {
                            layer.showLabel();
                            layer._icon.style.display = '';
                        }
                    });
                    Map.mapCurLevel = e.name
                });

                // при необходимости вернуть
                //        Map.map.on('click', function (e) {
                //            //console.log(e.latlng.lat + ' ' + e.latlng.lng + ' ' + Map.map.getZoom());
                //        });

                //        Map.end();
            },


            hidePromo: function () {
                Map.LMarkers[Map.mapCurLevel].eachLayer(function (layer) {
                    if (layer.isPromo) {
                        layer._icon.style.display = 'none';
                    }
                });
                return true;
            },

            showPromo: function () {
                Map.LMarkers[Map.mapCurLevel].eachLayer(function (layer) {
                    if (layer.isPromo) {
                        layer._icon.style.display = '';
                    }
                });
                return true;
            },

            //Вызывать с передачей масива в котором есть x,y icon
            //    {"1": {
            //        "x": "",
            //        "y": "",
            //        "icon": "\/site\/assets\/icons\/cat-.svg"
            //    }}
            loadPromo: function (data) {
                $.each(data, function (item) {
                    tcenter = [item['x'], item['y']];
                    PromoIcon = L.Icon.extend({options: {iconSize: [55, 55], iconAnchor: [27, 55]}});
                    PIcon = new PromoIcon({iconUrl: Map.iconUrl + item['icon']});
                    promo = L.marker(tcenter, {icon: PIcon});
                    promo.addTo(Map.LPromo[Map.mapCurLevel]);
                    promo.zoomLevel = 0;
                    promo.isPromo = true;
                });
                Map.LPromo[Map.mapCurLevel].addTo(Map.LGroup[Map.mapCurLevel]);
                return true;
            },


            clearPromo: function () {
                Map.LPromo[Map.mapCurLevel].clearLayers();
                //console.log(Map.LPromo[Map.mapCurLevel]);
                return true;
            },


            setFocus: function (magID, x, y) {

                Map.LLevels[Map.mapCurLevel].eachLayer(function (layer) {
                    layer.eachLayer(function (layer) {
                        if (layer.feature.properties['magId'] == magID) {
                            //console.log(layer.feature.properties['magId']);
                            //console.log(layer.feature.geometry.coordinates[0]);
                            Map.map.setView([x, y], 12, {animate: true});
                        }
                    });
                });
            },

            clearFocus: function () {
                Map.map.setView(Map.mapCenter, Map.mapMinZoom, {animate: true});
            },


            end: function () {
                Map.LLevels[Map.mapCurLevel].eachLayer(function (layer) {
                    //console.log(layer);

                });
            }
        }
    }
);
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('views/sections/map',['map'], function(Map) {
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

define('templates/section/boxes/shop',['require','exports','module'],function(require,exports,module){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (_, action_types, category_link, id, logo, section, title, url) {
buf.push("<div data-tooltip=\"Удалить из избранного\" class=\"badge badge--favor badge--favor-stock js-tooltip-top\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg></div>");
if(id == 1492){url = "/kino"}else{url = "/"+section+"/map/"+id+"-"+title}
buf.push("<a" + (jade.attr("href", "" + (url) + "", true, false)) + " class=\"stock-item__img-link\"><img data-no-retina=\"\"" + (jade.attr("data-src", "http://api.avia.kknopka.ru/" + (logo) + "", true, false)) + " alt=\"\" class=\"stock-item__img\"/><div class=\"stock-item__hidden-info\"><ul>");
if(_.indexOf(action_types, 'sale') >= 0)
{
buf.push("<li><i data-tooltip=\"Акции\" class=\"ico ico-yellow js-tooltip-top\"><svg class=\"icon icon-badge\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-badge\"></use></svg></i></li>");
}
if(_.indexOf(action_types, 'collection') >= 0)
{
buf.push("<li><i data-tooltip=\"Коллекции\" class=\"ico ico-aquamarine js-tooltip-top\"><svg class=\"icon icon-collection\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-collection\"></use></svg></i></li>");
}
if(_.indexOf(action_types, 'event') >= 0)
{
buf.push("<li><i data-tooltip=\"События\" class=\"ico ico-purple js-tooltip-top\"><svg class=\"icon icon-calendar\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-calendar\"></use></svg></i></li>");
}
if(_.indexOf(action_types, 'news') >= 0)
{
buf.push("<li><i data-tooltip=\"Новость\" class=\"ico ico-pink js-tooltip-top\"><svg class=\"icon icon-calendar\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-rupor\"></use></svg></i></li>");
}
buf.push("</ul></div></a><div class=\"stock-item__info\"><div class=\"stock-item__desc\">" + (null == (jade_interp = title) ? "" : jade_interp) + "</div><div class=\"stock-item__details\">");
if(section == 'food')
{
buf.push("<i class=\"stock-item__burger-ico\"><svg class=\"ico icon icon-burger\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-burger\"></use></svg></i>");
}
else
{
buf.push("<i class=\"stock-item__shop-ico\"><svg class=\"ico icon icon-bag\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-bag\"></use></svg></i>");
}
buf.push("<a" + (jade.attr("href", "" + (url) + "", true, false)) + " class=\"stock-item__detail-text-link\">Перейти в " + (jade.escape((jade_interp = category_link) == null ? '' : jade_interp)) + "</a></div></div><div class=\"stock-item__colors stock-colors\">");
if(_.indexOf(action_types, 'sale') >= 0)
{
buf.push("<div class=\"stock-item__color stock-colors__yellow\"></div>");
}
if(_.indexOf(action_types, 'collection') >= 0)
{
buf.push("<div class=\"stock-item__color stock-colors__aquamarine\"></div>");
}
if(_.indexOf(action_types, 'event') >= 0)
{
buf.push("<div class=\"stock-item__color stock-colors__purple\"></div>");
}
if(_.indexOf(action_types, 'news') >= 0)
{
buf.push("<div class=\"stock-item__color stock-colors__pink\"></div>");
}
buf.push("</div>");}.call(this,"_" in locals_for_with?locals_for_with._:typeof _!=="undefined"?_:undefined,"action_types" in locals_for_with?locals_for_with.action_types:typeof action_types!=="undefined"?action_types:undefined,"category_link" in locals_for_with?locals_for_with.category_link:typeof category_link!=="undefined"?category_link:undefined,"id" in locals_for_with?locals_for_with.id:typeof id!=="undefined"?id:undefined,"logo" in locals_for_with?locals_for_with.logo:typeof logo!=="undefined"?logo:undefined,"section" in locals_for_with?locals_for_with.section:typeof section!=="undefined"?section:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"url" in locals_for_with?locals_for_with.url:typeof url!=="undefined"?url:undefined));;return buf.join("");
};

});

define('templates/section/boxes/action',['require','exports','module'],function(require,exports,module){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (_, date_end, date_start, discount, id, image_promo, longtitle, name, parent_title, price, title, type, type_rr) {
buf.push("<div data-tooltip=\"Добавить в избранное\" class=\"badge badge--favor badge--favor-stock js-tooltip-top\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></div><a" + (jade.attr("href", "/actions/map/" + (id) + "-" + (name) + "", true, false)) + " class=\"stock-item__img-link\"><img data-no-retina=\"\"" + (jade.attr("data-src", "http://api.avia.kknopka.ru/" + (image_promo) + "", true, false)) + " alt=\"\" class=\"stock-item__img\"/></a><div class=\"stock-item__info\"><div class=\"stock-item__shop\">" + (jade.escape(null == (jade_interp = parent_title) ? "" : jade_interp)) + "</div>");
if(_.isEmpty(longtitle))
{
buf.push("<div class=\"stock-item__desc\">" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)) + "</div>");
}
else
{
buf.push("<div class=\"stock-item__desc\">" + (jade.escape(null == (jade_interp = longtitle) ? "" : jade_interp)) + "</div>");
}
buf.push("<div class=\"stock-item__details\">");
if(!_.isEmpty(date_start))
{
buf.push("<i class=\"stock-item__calendar-ico\"><svg class=\"icon icon-calendar\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-calendar\"></use></svg></i><span class=\"stock-item__detail-text\">С " + (jade.escape((jade_interp = date_start) == null ? '' : jade_interp)) + "</span>");
if(!_.isEmpty(date_end))
{
buf.push(" по " + (jade.escape((jade_interp = date_end) == null ? '' : jade_interp)) + "");
}
}
else
{
if(type == 'sale')
{
buf.push("<i class=\"stock-item__discount-ico\"><svg class=\"ico icon icon-badge\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-badge\"></use></svg></i>");
}
else if(type == 'collection')
{
buf.push("<i class=\"stock-item__collection-ico\"><svg class=\"icon icon-collection\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-collection\"></use></svg></i>");
}
else if(type == 'news')
{
buf.push("<i class=\"stock-item__rupor-ico\"><svg class=\"icon icon-rupor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-rupor\"></use></svg></i>");
}
else if(type == 'event')
{
buf.push("<i class=\"stock-item__calendar-ico\"><svg class=\"icon icon-calendar\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-calendar\"></use></svg></i>");
}
buf.push("<a" + (jade.attr("href", "/actions/map/" + (id) + "-" + (name) + "", true, false)) + " class=\"stock-item__detail-text-link\">Показать " + (jade.escape((jade_interp = type_rr) == null ? '' : jade_interp)) + "</a>");
}
buf.push("</div></div>");
if(!_.isEmpty(discount) && !_.isEmpty(price))
{
buf.push("<div class=\"stock-item__footer\">");
if(!_.isEmpty(discount))
{
buf.push("<div class=\"stock-item__discount\"><i class=\"stock-item__discount-ico stock-item__discount-ico--perc\"><svg class=\"ico icon icon-badge\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-badge\"></use></svg></i>" + (jade.escape(null == (jade_interp = discount) ? "" : jade_interp)) + "</div>");
}
if(!_.isEmpty(price))
{
buf.push("<div class=\"stock-item__price\"><span class=\"stock-item__price-val\">" + (jade.escape(null == (jade_interp = price) ? "" : jade_interp)) + "</span><span class=\"stock-item__currency\">руб</span></div>");
}
buf.push("</div>");
}}.call(this,"_" in locals_for_with?locals_for_with._:typeof _!=="undefined"?_:undefined,"date_end" in locals_for_with?locals_for_with.date_end:typeof date_end!=="undefined"?date_end:undefined,"date_start" in locals_for_with?locals_for_with.date_start:typeof date_start!=="undefined"?date_start:undefined,"discount" in locals_for_with?locals_for_with.discount:typeof discount!=="undefined"?discount:undefined,"id" in locals_for_with?locals_for_with.id:typeof id!=="undefined"?id:undefined,"image_promo" in locals_for_with?locals_for_with.image_promo:typeof image_promo!=="undefined"?image_promo:undefined,"longtitle" in locals_for_with?locals_for_with.longtitle:typeof longtitle!=="undefined"?longtitle:undefined,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined,"parent_title" in locals_for_with?locals_for_with.parent_title:typeof parent_title!=="undefined"?parent_title:undefined,"price" in locals_for_with?locals_for_with.price:typeof price!=="undefined"?price:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"type" in locals_for_with?locals_for_with.type:typeof type!=="undefined"?type:undefined,"type_rr" in locals_for_with?locals_for_with.type_rr:typeof type_rr!=="undefined"?type_rr:undefined));;return buf.join("");
};

});

var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('views/sections/boxes',['templates/section/boxes/shop', 'templates/section/boxes/action', 'views/lazy_list'], function(ShopTemplate, ActionTemplate, LazyList) {
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

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('layouts/section',['templates/section', 'views/sections/filter', 'views/sections/map', 'views/sections/boxes'], function(SectionTemplate, FilterLayout, MapView, BoxesView) {
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

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('helpers/mediator',[],function() {
  var Mediator;
  Mediator = (function(superClass) {
    extend(Mediator, superClass);

    function Mediator() {
      return Mediator.__super__.constructor.apply(this, arguments);
    }

    return Mediator;

  })(Marionette.Object);
  return window.Mediator || (window.Mediator = new Mediator);
});

define('templates/section/item',['require','exports','module'],function(require,exports,module){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (_, category_title, contact_fb, contact_phone, contact_url, contact_vk, count_photo, descr, floor, hours_close, hours_hd_close, hours_hd_open, hours_wd_close, hours_wd_open, image_gallery, image_promo, logo, section_title, tags, title) {
buf.push("<div class=\"store js-store\"><div class=\"store__header\">");
if(!_.isEmpty(image_promo))
{
buf.push("<div" + (jade.attr("style", "background-image: url(http://api.avia.kknopka.ru/" + (image_promo) + ")", true, false)) + " class=\"store__store-img\"></div>");
}
else
{
buf.push("<div style=\"background-image: url(img/store-default-bg.jpg)\" class=\"store__store-img\"></div>");
}
buf.push("<div class=\"store__store-img-blackout\"></div><div class=\"store__header-inn\"><div class=\"store__logo\"><img" + (jade.attr("src", "http://api.avia.kknopka.ru/" + (logo) + "", true, false)) + " alt=\"\"/></div><div class=\"store__breadcrumbs\"><i class=\"store__share-ico\"><svg class=\"icon icon-share-2\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-share-2\"></use></svg></i><span>" + (null == (jade_interp = section_title+" / "+title) ? "" : jade_interp) + "</span></div><div class=\"store__controls\"><span class=\"store__control-btn\"><svg class=\"ico icon icon-route store__control-ico store__route-ico\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-route\"></use></svg></span><span class=\"store__control-btn\"><svg class=\"ico icon icon-close-2 store__control-ico store__close-ico js-store__close\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-close-2\"></use></svg></span></div><div class=\"store__fotos-leng\"><i class=\"store__fotos-ico\"><svg class=\"icon icon-picture\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-picture\"></use></svg></i>");
if(_.isEmpty(image_gallery) || (count_photo = image_gallery.split(",").length) == 0)
{
buf.push("<span>Нет фото</span>");
}
else
{
buf.push("<span class=\"store__fotos-link js-store__fotos-link\">Посмотреть " + (jade.escape((jade_interp = count_photo) == null ? '' : jade_interp)) + " фото</span>");
}
buf.push("</div><div data-tooltip=\"Добавить в избранное\" class=\"badge badge--favor badge--store js-tooltip-top\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg></div></div></div><div class=\"store__content\"><div class=\"store__info\"><div class=\"store__text-info\"><h2>" + (null == (jade_interp = title) ? "" : jade_interp) + "</h2><p>" + (jade.escape(null == (jade_interp = category_title.join(", ")) ? "" : jade_interp)) + "</p></div><div class=\"store__rside-info\">");
if(!_.isEmpty(contact_phone))
{
buf.push("<div class=\"store__phone\"><i class=\"store__phone-ico\"><svg class=\"icon icon-handset\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-handset\"></use></svg></i>" + (jade.escape(null == (jade_interp = contact_phone) ? "" : jade_interp)) + "</div>");
}
if(!_.isEmpty(hours_close))
{
buf.push("<div class=\"store__worktime\"><i class=\"store__watch-ico\"><svg class=\"icon icon-watch\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-watch\"></use></svg></i>Сегодня работает до " + (jade.escape((jade_interp = hours_close) == null ? '' : jade_interp)) + ":00</div>");
}
buf.push("</div></div><div class=\"store__info\"><div class=\"store__tags\">");
if(!_.isEmpty(tags))
{
buf.push("<h3>tags</h3>" + (jade.escape(null == (jade_interp = tags.join(" / ")) ? "" : jade_interp)));
}
buf.push("</div><div class=\"social social--store\"><ul class=\"social__list\">");
if(!_.isEmpty(contact_vk))
{
buf.push("<li class=\"social__item\"><a" + (jade.attr("href", "" + (contact_vk) + "", true, false)) + " target=\"_blank\" class=\"social__link\"><svg class=\"social__ico icon icon-vk\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-vk\"></use></svg></a></li>");
}
if(!_.isEmpty(contact_fb))
{
buf.push("<li class=\"social__item\"><a" + (jade.attr("href", "" + (contact_fb) + "", true, false)) + " target=\"_blank\" class=\"social__link\"><svg class=\"social__ico icon icon-facebook\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-facebook\"></use></svg></a></li>");
}
if(!_.isEmpty(contact_fb))
{
buf.push("<li class=\"social__item\"><a" + (jade.attr("href", "" + (contact_fb) + "", true, false)) + " target=\"_blank\" class=\"social__link\"><svg class=\"social__ico icon icon-odnoklassniki\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-odnoklassniki\"></use></svg></a></li>");
}
buf.push("</ul></div></div><div class=\"store__more-info\"><div class=\"store__more-info-head\"><ul><li class=\"store__more-info-head-item\"><i class=\"store__more-info-head-ico store__more-info-head-watch-ico\"><svg class=\"icon icon-time\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-time\"></use></svg></i>Пн-Чт + Вс " + (jade.escape((jade_interp = hours_wd_open) == null ? '' : jade_interp)) + ":00-" + (jade.escape((jade_interp = hours_wd_close) == null ? '' : jade_interp)) + ":00 / Пт-Сб " + (jade.escape((jade_interp = hours_hd_open) == null ? '' : jade_interp)) + ":00-" + (jade.escape((jade_interp = hours_hd_close) == null ? '' : jade_interp)) + ":00</li><li class=\"store__more-info-head-item\"><i class=\"store__more-info-head-ico store__more-info-head-floor-ico\"><svg class=\"icon icon-layers\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-layers\"></use></svg></i>Этаж " + (jade.escape((jade_interp = floor.join(", ")) == null ? '' : jade_interp)) + "</li>");
if(!_.isEmpty(contact_url))
{
buf.push("<li class=\"store__more-info-head-item\"><i class=\"store__more-info-head-ico store__more-info-head-site-ico\"><svg class=\"icon icon-screen\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-screen\"></use></svg></i><a" + (jade.attr("href", "" + (contact_url) + "", true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = contact_url) == null ? '' : jade_interp)) + "</a></li>");
}
buf.push("</ul></div>" + (null == (jade_interp = descr) ? "" : jade_interp) + "</div><div class=\"store__show-more-info\"><a href=\"#\" class=\"btn btn--show-more-info js-btn-show-more-info\">Подробнее</a></div><div class=\"store__items-wrap\"><h3>Что новенького</h3><div class=\"store__items js-store__items\"></div></div></div></div>");}.call(this,"_" in locals_for_with?locals_for_with._:typeof _!=="undefined"?_:undefined,"category_title" in locals_for_with?locals_for_with.category_title:typeof category_title!=="undefined"?category_title:undefined,"contact_fb" in locals_for_with?locals_for_with.contact_fb:typeof contact_fb!=="undefined"?contact_fb:undefined,"contact_phone" in locals_for_with?locals_for_with.contact_phone:typeof contact_phone!=="undefined"?contact_phone:undefined,"contact_url" in locals_for_with?locals_for_with.contact_url:typeof contact_url!=="undefined"?contact_url:undefined,"contact_vk" in locals_for_with?locals_for_with.contact_vk:typeof contact_vk!=="undefined"?contact_vk:undefined,"count_photo" in locals_for_with?locals_for_with.count_photo:typeof count_photo!=="undefined"?count_photo:undefined,"descr" in locals_for_with?locals_for_with.descr:typeof descr!=="undefined"?descr:undefined,"floor" in locals_for_with?locals_for_with.floor:typeof floor!=="undefined"?floor:undefined,"hours_close" in locals_for_with?locals_for_with.hours_close:typeof hours_close!=="undefined"?hours_close:undefined,"hours_hd_close" in locals_for_with?locals_for_with.hours_hd_close:typeof hours_hd_close!=="undefined"?hours_hd_close:undefined,"hours_hd_open" in locals_for_with?locals_for_with.hours_hd_open:typeof hours_hd_open!=="undefined"?hours_hd_open:undefined,"hours_wd_close" in locals_for_with?locals_for_with.hours_wd_close:typeof hours_wd_close!=="undefined"?hours_wd_close:undefined,"hours_wd_open" in locals_for_with?locals_for_with.hours_wd_open:typeof hours_wd_open!=="undefined"?hours_wd_open:undefined,"image_gallery" in locals_for_with?locals_for_with.image_gallery:typeof image_gallery!=="undefined"?image_gallery:undefined,"image_promo" in locals_for_with?locals_for_with.image_promo:typeof image_promo!=="undefined"?image_promo:undefined,"logo" in locals_for_with?locals_for_with.logo:typeof logo!=="undefined"?logo:undefined,"section_title" in locals_for_with?locals_for_with.section_title:typeof section_title!=="undefined"?section_title:undefined,"tags" in locals_for_with?locals_for_with.tags:typeof tags!=="undefined"?tags:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));;return buf.join("");
};

});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('views/sections/item',['models/item', 'collections/items', 'templates/section/item', 'views/sections/boxes'], function(Item, Items, ItemTemplate, BoxesView) {
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

define('templates/section/action',['require','exports','module'],function(require,exports,module){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (_, count_photo, image_promo, parent, title, type_title) {
buf.push("<div class=\"store js-store\"><div class=\"store__header\"><div" + (jade.attr("style", "background-image: url(http://api.avia.kknopka.ru/" + (image_promo) + ")", true, false)) + " class=\"store__store-img\"></div><div class=\"store__store-img-blackout\"></div><div class=\"store__header-inn\"><div class=\"store__logo\"><img" + (jade.attr("src", "http://api.avia.kknopka.ru/" + (parent.logo) + "", true, false)) + " alt=\"\"/></div><div class=\"store__breadcrumbs\"><i class=\"store__share-ico\"><svg class=\"icon icon-share-2\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-share-2\"></use></svg></i>" + (jade.escape((jade_interp = parent.section_title) == null ? '' : jade_interp)) + " / " + (jade.escape((jade_interp = parent.title) == null ? '' : jade_interp)) + " / " + (jade.escape((jade_interp = type_title) == null ? '' : jade_interp)) + "</div><div class=\"store__back-to-shop store__back-to-shop--head\"><a" + (jade.attr("href", "/" + (parent.section) + "/map/" + (parent.id) + "-" + (parent.title) + "", true, false)) + ">Вернуться к магазину</a><i class=\"ico\"><svg class=\"icon icon-leftarrow23\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-leftarrow23\"></use></svg></i></div><div class=\"store__fotos-leng\"><i class=\"store__fotos-ico\"><svg class=\"icon icon-picture\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-picture\"></use></svg></i>");
if(_.isEmpty(parent.image_gallery) || (count_photo = parent.image_gallery.split(",").length) == 0)
{
buf.push("<span>Нет фото</span>");
}
else
{
buf.push("<span class=\"store__fotos-link js-store__fotos-link\">Посмотреть " + (jade.escape((jade_interp = count_photo) == null ? '' : jade_interp)) + " фото</span>");
}
buf.push("</div><div data-tooltip=\"Добавить в избранное\" class=\"badge badge--favor badge--store js-tooltip-top\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg></div></div></div><div class=\"store__content\"><div class=\"store__wide-info\"><h2>" + (jade.escape((jade_interp = title) == null ? '' : jade_interp)) + "</h2>" + (null == (jade_interp = parent.descr) ? "" : jade_interp) + "<!--.store__show-new-collection-link--><!--    i.ico--><!--        svg.icon.icon-collection--><!--            use(xmlns:xlink='http://www.w3.org/1999/xlink', xlink:href='#icon-collection')--><!--    a(href='#') Показать всю новую колекцию--></div><div class=\"store__back-to-shop store__back-to-shop--content\"><i class=\"ico\"><svg class=\"icon icon-leftarrow23\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-leftarrow23\"></use></svg></i><a" + (jade.attr("href", "/" + (parent.section) + "/map/" + (parent.id) + "-" + (parent.title) + "", true, false)) + ">Вернуться к магазину</a></div></div></div>");}.call(this,"_" in locals_for_with?locals_for_with._:typeof _!=="undefined"?_:undefined,"count_photo" in locals_for_with?locals_for_with.count_photo:typeof count_photo!=="undefined"?count_photo:undefined,"image_promo" in locals_for_with?locals_for_with.image_promo:typeof image_promo!=="undefined"?image_promo:undefined,"parent" in locals_for_with?locals_for_with.parent:typeof parent!=="undefined"?parent:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"type_title" in locals_for_with?locals_for_with.type_title:typeof type_title!=="undefined"?type_title:undefined));;return buf.join("");
};

});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('views/sections/action',['models/item', 'templates/section/action', 'views/sections/item'], function(Item, ActionTemplate, ItemView) {
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

define('templates/section/cinema',['require','exports','module'],function(require,exports,module){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"store js-store cinema\"><div class=\"store__header\"><div style=\"background-image: url(img/kino-head-bg.jpg)\" class=\"store__store-img\"></div><div class=\"store__header-inn\"><div class=\"store__logo\"><img src=\"img/logos/kapo.jpg\" alt=\"\"/></div><div class=\"store__breadcrumbs\"><i class=\"store__share-ico\"><svg class=\"icon icon-share-2\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-share-2\"></use></svg></i>                кинотеатр / Каро</div><div class=\"store__controls\"><span class=\"store__control-btn\"><svg class=\"ico icon icon-route store__control-ico store__route-ico\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-route\"></use></svg></span><span class=\"store__control-btn\"><svg class=\"ico icon icon-close-2 store__control-ico store__close-ico js-store__close\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-close-2\"></use></svg></span></div><div class=\"store__fotos-leng\"><i class=\"store__fotos-ico\"><svg class=\"icon icon-picture\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-picture\"></use></svg></i><span class=\"store__fotos-link js-store__fotos-link\">Посмотреть 1 видео и 4 фото</span></div><div data-tooltip=\"Добавить в избранное\" class=\"badge badge--favor badge--store js-tooltip-top\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg></div><svg class=\"icon icon-play cinema__play\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-play\"></use></svg></div></div><div class=\"store__content\"><div class=\"cinema__info\"><div class=\"cinema__lside-info\"><h2 class=\"cinema__title cinema__title--about\"><i class=\"cinema__about-ico\"><svg class=\"icon icon-film\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-film\"></use></svg></i>                  О кинотеатре</h2><div class=\"swiper-container cinema__about-slider js-cinema__about-slider\"><div class=\"swiper-wrapper\"><div class=\"swiper-slide\"><div class=\"cinema__about-text-title\"><span>17</span> кинозалов разных форматов</div><div class=\"cinema__about-text\">Кинотеатр занимает более 10 000 кв.м. на 4 этаже ТЦ «АВИАПАРК» и вмещает до 4000 человек.</div></div><div class=\"swiper-slide\"><div class=\"cinema__about-text-title\"><span>5</span> супер фильмов</div><div class=\"cinema__about-text\">ТЦ «АВИАПАРК».</div></div></div><div class=\"cinema__about-slider-pagination js-cinema__about-slider-pagination\"></div></div></div><div class=\"cinema__rside-info\"><div class=\"store__rside-info store__rside-info--cinema-info\"><div class=\"store__phone\"><i class=\"store__phone-ico\"><svg class=\"icon icon-handset\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-handset\"></use></svg></i>                    +495-232-11-57</div><div class=\"store__worktime\"><i class=\"store__watch-ico\"><svg class=\"icon icon-watch\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-watch\"></use></svg></i>                    Сегодня работает до 23:00</div></div><div class=\"cinema__info-links cinema__rside-padding\"><ul><li><a href=\"#\"><i class=\"ico-1\"><svg class=\"icon icon-fleet\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-fleet\"></use></svg></i>Удобый заезд в автопарк</a></li><li><a href=\"#\"><i class=\"ico-2\"><svg class=\"icon icon-route-2\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-route-2\"></use></svg></i>Показать удобную парковку</a></li></ul></div></div></div><div class=\"store__more-info\"><div class=\"store__more-info-head\"><ul><li class=\"store__more-info-head-item\"><i class=\"store__more-info-head-ico store__more-info-head-watch-ico\"><svg class=\"icon icon-time\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-time\"></use></svg></i>Пн-Чт + Вс 10:00-22:00 / Пт-Сб 10:00-23:00</li><li class=\"store__more-info-head-item\"><i class=\"store__more-info-head-ico store__more-info-head-floor-ico\"><svg class=\"icon icon-layers\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-layers\"></use></svg></i>Этаж 1</li><li class=\"store__more-info-head-item\"><i class=\"store__more-info-head-ico store__more-info-head-site-ico\"><svg class=\"icon icon-screen\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-screen\"></use></svg></i>www.h&m.com</li></ul></div><p>С 2004 года компания ввела в практику выпуск коллекций в сотрудничестве с известными дизайнерами. Так, в ноябре 2004 года в некоторых магазинах H&M была представлена коллекция Карла Лагерфельда. Пресса сообщала об огромном ажиотаже на данные вещи, в крупных городах коллекция была распродана в течение часа.</p><p>Далее, в ноябре 2005 года была выпущена коллекция от Стеллы Маккартни, в ноябре 2006 — коллекция от авангардного нидерландского модного дома Viktor & Rolf (англ. Viktor & Rolf). В марте 2006 года компания начала сотрудничество с Мадонной.</p><p>В июне 2007 года разработчик игр Maxis совместно с H&M выпустила дополнение к игре The Sims 2 — H&M Fashion Stuff, в которых были включены 60 моделей одежды и 3 магазина H&M.</p><p>Далее, в ноябре 2007 года была представлена коллекция итальянского дизайнера Роберто Кавалли. Также в 2007 году в Шанхае была представлена коллекция купальников от Кайли Миноуг. Осенью 2008 года была выпущена коллекция в сотрудничестве с японским брендом Comme des Garçons (англ. Comme des Garçons).</p></div><div class=\"store__show-more-info\"><a href=\"#\" class=\"btn btn--show-more-info js-btn-show-more-info\">Подробнее</a></div><div class=\"films\"><div class=\"films__filter\"><i class=\"films__filter-ico\"><svg class=\"icon icon-calendar-2\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-calendar-2\"></use></svg></i>                Сеансы на сегодня<i class=\"films__filter-drop-ico\"></i></div><div class=\"films__list\"><div class=\"film\"><div class=\"film__name\">Мстители: Эра Альтрона</div><div class=\"film__desc\">18 +, Боевики, Приключенческие фильмы,Фэнтези, 2015 г.</div><div class=\"film__sessions\"><div class=\"film__session\"><div class=\"film__session-title\">Сеансы 3D от 417 руб.</div><ul class=\"film__session-timelist\"><li class=\"film__session-time\">10:30</li><li class=\"film__session-time\">11:30</li><li class=\"film__session-time\">12:30</li><li class=\"film__session-time\">13:30</li><li class=\"film__session-time\">14:30</li><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">15:30</a></li><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">16:30</a></li><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">17:30</a></li><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">18:30</a></li><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">19:30</a></li><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">20:30</a></li><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">21:30</a></li><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">22:30</a></li><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">23:30</a></li><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">24:30</a></li></ul></div><div class=\"film__session\"><div class=\"film__session-title\">Сеансы RealD от 600 руб.</div><ul class=\"film__session-timelist\"><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">15:00</a></li><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">16:00</a></li><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">17:00</a></li><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">18:00</a></li><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">19:00</a></li><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">20:00</a></li><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">21:00</a></li><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">22:00</a></li><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">23:00</a></li><li class=\"film__session-time film__session-time--next-session\"><a href=\"#\">24:00</a></li></ul></div></div><div data-tooltip=\"Добавить в избранное\" class=\"badge badge--favor badge--film js-tooltip-top\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg></div></div></div></div></div></div>");;return buf.join("");
};

});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('views/sections/cinema',['models/item', 'templates/section/cinema', 'views/sections/item'], function(Item, CinemaTemplate, ItemView) {
  var CinemaView;
  return CinemaView = (function(superClass) {
    extend(CinemaView, superClass);

    function CinemaView() {
      return CinemaView.__super__.constructor.apply(this, arguments);
    }

    CinemaView.prototype.template = CinemaTemplate;

    CinemaView.prototype.events = {
      'click .js-btn-show-more-info': 'showMore',
      'click .js-store__close': 'closed'
    };

    CinemaView.prototype.initialize = function() {
      return this.model = new Item({
        id: 1492,
        type: "store",
        category_title: [],
        tags: [],
        floor: [4],
        contact_phone: "",
        contact_url: "",
        title: "KAPO Sky 17",
        title_alt: "",
        map_id: "4003",
        map_x: 2.1027,
        map_y: 1.7976,
        map_zoom: "10",
        hours_wd_open: "10",
        hours_wd_close: "22",
        hours_hd_open: "10",
        hours_hd_close: "22",
        longtitle: "",
        descr: "<p>\"Сеть кинотеатров «КАРО», основанная в 1997 году, установила новые стандарты оформления кинозалов в России. На сегодняшний день «КАРО» является ведущей сетью кинотеатров в России, управляющей 30 современными кинотеатрами (221 экрана) в Москве, Московской области, Санкт-Петербурге, Самаре, Казани, Калининграде, Екатеринбурге и Сургуте, которые посещают почти 12 млн. человек в год. С 2012 года контролирующим акционером «КАРО» является консорциум в составе ведущего инвестора Baring Vostok Private Equity, UFG Private Equity, Российского фонда прямых инвестиций (РФПИ) и предпринимателя Пола Хета.<br />\nНОВЫЙ ТЕЛЕФОН ЕДИНОЙ СПРАВОЧНОЙ СЛУЖБЫ СЕТИ КИНОТЕАТРОВ «КАРО»: 8 800 555 23 23.\"</p>",
        category: [],
        logo: "/site/assets/files/1492/aviapark_karo.jpg",
        image_promo: "",
        image_gallery: "",
        contact_fb: "https://www.facebook.com/karofilm",
        contact_vk: "http://vk.com/karofilm_vk",
        contact_ok: "",
        contact_ig: "http://instagram.com/karocinema",
        contact_yt: "",
        contact_tw: "",
        hours_close: "22",
        section: "entertain",
        section_title: "Развлечения",
        childs: [],
        "class": "K",
        category_link: "объект",
        type_rr: null,
        class_ico: "stock-item__shop-ico"
      });
    };

    CinemaView.prototype.render = function() {
      return this.show();
    };

    CinemaView.prototype.show = function(callback) {
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

    CinemaView.prototype.onOpen = function() {
      return false;
    };

    CinemaView.prototype.open = function(callback) {
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

    return CinemaView;

  })(ItemView);
});

var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('controllers/sections',['collections/items', 'layouts/section', 'helpers/mediator', 'models/item', 'views/sections/item', 'views/sections/action', 'views/sections/cinema'], function(Items, SectionLayout, Mediator, Item, ItemView, ActionView, CinemaView) {
  var SectionsController;
  return SectionsController = (function(superClass) {
    extend(SectionsController, superClass);

    function SectionsController() {
      this.search = bind(this.search, this);
      return SectionsController.__super__.constructor.apply(this, arguments);
    }

    SectionsController.prototype.timeout = 500;

    SectionsController.prototype.resetObjects = function() {
      this.modals = {};
      this.collections = {};
      this.filtredCollections = {};
      this.filtredBoxesEls = {};
      this.filtredEls = {};
      this["default"] = {
        filters: {
          section: '',
          search: '',
          action_types: [],
          categories: []
        }
      };
      return this.filters = {
        section: '',
        search: '',
        action_types: [],
        categories: []
      };
    };

    SectionsController.prototype.initialize = function(options) {
      this.resetObjects();
      this.viewType = 'map';
      this.$el = options.$el;
      this.collectionItems = new Items;
      this.collectionActions = new Items;
      this.collection = new Items;
      return this.collectionActions.type = 'actions';
    };

    SectionsController.prototype.delegateEvents = function() {
      Mediator.on("document:click", (function(_this) {
        return function(e) {
          _this.sectionLayout.filterView.dropdownView.hide();
          return _this.sectionLayout.filterView.categoriesView.hide();
        };
      })(this));
      Mediator.on("boxes:show", (function(_this) {
        return function() {
          if (_this.collection.length === 0) {
            return _this.collection.once('sync', function() {
              return _this.sectionLayout.boxesView.onShow();
            });
          } else {
            return _this.sectionLayout.boxesView.onShow();
          }
        };
      })(this));
      Mediator.on("section:filter:search", (function(_this) {
        return function(str) {
          return _this.search(str);
        };
      })(this));
      $(document).scroll((function(_this) {
        return function(e) {
          if ($('body').height() + $('body').scrollTop() >= $('body')[0].scrollHeight - 200) {
            _this.sectionLayout.boxesView.itemsCount += 10;
            return _this.update();
          }
        };
      })(this));
      Mediator.on("section:filter:category", (function(_this) {
        return function(category) {
          var added, i;
          added = (i = _.indexOf(_this.filters.categories, category.title)) >= 0;
          if (category.active) {
            _this.filters.categories.push(category.title);
          } else {
            _this.filters.categories[i] = null;
          }
          _this.filters.categories = _.compact(_this.filters.categories);
          return _this.update();
        };
      })(this));
      Mediator.on("section:filter:action", (function(_this) {
        return function(filters) {
          _this.filters.action_types = filters;
          return _this.update();
        };
      })(this));
      Mediator.on("section:filter:clear", (function(_this) {
        return function() {
          _this.clear();
          return _this.update();
        };
      })(this));
      Mediator.on("section:switch:view", (function(_this) {
        return function() {
          if (_this.sectionLayout.$el.hasClass('map')) {
            return Mediator.trigger('navigate', "/" + _this.sectionLayout.section);
          } else {
            return Mediator.trigger('navigate', "/" + _this.sectionLayout.section + "/map");
          }
        };
      })(this));
      Mediator.on("item:choose", (function(_this) {
        return function(id) {
          return _this.onChooseItem(id);
        };
      })(this));
      Mediator.on("cinema:choose", (function(_this) {
        return function() {
          return _this.openCinemaModal();
        };
      })(this));
      return Mediator.on("item:close", (function(_this) {
        return function(view) {
          return _this.onCloseItem(view);
        };
      })(this));
    };

    SectionsController.prototype.clear = function() {
      if (!_.isUndefined(this.currendItemModal)) {
        this.currendItemModal.hide();
      }
      this.filters = _.clone(this["default"].filters);
      this.filters.categories = [];
      this.filters.action_types = [];
      this.sectionLayout.filterView.clear();
      this.sectionLayout.filterView.$el.find('.js-filter__item').removeClass('is-active');
      return this.sectionLayout.filterView.$el.find('.filter-droplist__item').removeClass('active');
    };

    SectionsController.prototype.search = function(src) {
      if (this.timerSearch) {
        clearTimeout(this.timerSearch);
      }
      this.filters.search = src;
      return this.timerSearch = setTimeout(((function(_this) {
        return function() {
          return _this.update();
        };
      })(this)), this.timeout);
    };

    SectionsController.prototype.go = function(section, uid, view) {
      if (_.isEmpty(this.sectionLayout)) {
        this.sectionLayout = new SectionLayout();
        this.sectionLayout.setSection(section);
        this.sectionLayout.render();
        this.dropdownView = this.sectionLayout.filterView.dropdownView;
        this.delegateEvents();
      }
      this.sectionLayout.setSection(section);
      if (!_.isEmpty(view)) {
        this.sectionLayout.goToMap();
      } else {
        this.sectionLayout.goToBoxes();
      }
      _.defer((function(_this) {
        return function() {
          if (_.isUndefined(uid) || _.isNull(uid)) {
            return _this.goToSection(section);
          } else {
            return _this.goToItem(section, uid);
          }
        };
      })(this));
      return this.sectionLayout;
    };

    SectionsController.prototype.goToItem = function(section, uid) {
      var View, arr, base, collection, id, model;
      if ((arr = uid.split('-')).length > 0) {
        id = arr[0];
      }
      collection = section === 'actions' ? this.collectionActions : this.collectionItems;
      model = collection.get(id);
      View = section === 'actions' ? ActionView : ItemView;
      (base = this.modals)[id] || (base[id] = _.isUndefined(model) ? new View({
        id: id
      }) : new View({
        model: model
      }));
      this.modals[id].onRender = (function(_this) {
        return function() {
          collection.add(_this.modals[id].model);
          return _this.openItemModal(_this.modals[id]);
        };
      })(this);
      return this.modals[id].render();
    };

    SectionsController.prototype.goToSection = function(section) {
      if (section === 'kino') {
        this.sectionLayout.goToMap();
        this.openCinemaModal();
      }
      return this.filterBySection(section);
    };

    SectionsController.prototype.openItemModal = function(view) {
      var floor, latlng, model;
      this.currentItemModal = view;
      this.dropdownView.hide();
      if (_.isEmpty(this.currendItemModal)) {
        view.open();
      } else {
        this.currendItemModal.close((function(_this) {
          return function() {
            return view.open();
          };
        })(this));
      }
      this.currendItemModal = view;
      model = view.model;
      floor = _.first(model.get('floor'));
      this.checkFloor(floor);
      if (model.get('map_x') && model.get('map_y')) {
        Map.map.setView([model.get('map_x'), model.get('map_y') - 0.2], 11, {
          animate: true
        });
        if (_.has(Map.popups, model.get('id'))) {
          latlng = [model.get('map_x'), model.get('map_y')];
          if (!_.isUndefined(Map.popups[model.get('id')]._map)) {
            return Map.popups[model.get('id')].openPopup(latlng);
          }
        }
      }
    };

    SectionsController.prototype.checkFloor = function(floor) {
      return $(".leaflet-control-layers-base input:eq(" + (floor - 1) + ")").trigger('click');
    };

    SectionsController.prototype.renderItems = function(collection) {
      return this.dropdownView.render(collection);
    };

    SectionsController.prototype.onCloseItem = function(view) {
      var model;
      Mediator.trigger('navigate', "/" + this.sectionLayout.section + "/map");
      model = view.model;
      this.sectionLayout.filterView.clear();
      this.sectionLayout.filterView.dropdownView.hide();
      this.sectionLayout.filterView.categoriesView.hide();
      if (_.has(Map.popups, model.get('id')) && !_.isUndefined(Map.popups[model.get('id')]) && !_.isUndefined(Map.popups[model.get('id')]._map)) {
        Map.popups[model.get('id')].closePopup();
      }
      return Map.clearFocus();
    };

    SectionsController.prototype.onChooseItem = function(id) {
      var model;
      model = this.collection.get(id);
      if (_.isUndefined(model)) {
        model = new Item({
          id: id
        });
        model.once('sync', (function(_this) {
          return function() {
            return _this.navigateToModel(model);
          };
        })(this));
        return model.fetch();
      } else {
        return this.navigateToModel(model);
      }
    };

    SectionsController.prototype.navigateToModel = function(model) {
      var url;
      if (_.indexOf(['shops', 'food', 'entertain', 'kids', 'service'], model.get('section')) < 0) {
        url = "/actions/map/" + (model.get('id')) + "-" + (model.get('title'));
      } else {
        url = "/" + (model.get('section')) + "/map/" + (model.get('id')) + "-" + (model.get('title'));
      }
      return Mediator.trigger('navigate', url);
    };

    SectionsController.prototype.filterBySection = function(section) {
      var floor;
      floor = 1;
      if (section === 'food' || section === 'kino') {
        floor = 4;
      }
      if (_.isUndefined(this.sectionLayout.mapView)) {
        Mediator.once('map:render', (function(_this) {
          return function() {
            return _this.checkFloor(floor);
          };
        })(this));
      } else {
        this.checkFloor(floor);
      }
      this.clear();
      this.sectionLayout.setSection(section);
      this["default"].filters.section = section;
      this.filters.section = section;
      this.dropdownView.hide();
      this.currentSection = section;
      if (!_.isUndefined(Map.map)) {
        Map.clearFocus();
      }
      if (_.isUndefined(this.collections[section])) {
        this.collections[section] = new Items();
        this.collections[section].type = section;
        this.collection = this.collections[section];
        this.collection.on('sync', (function(_this) {
          return function() {
            _this.updateBoxes(_this.collection);
            _this.updateCategories(_this.collection);
            return _this.update();
          };
        })(this));
        return this.collection.fetch();
      } else {
        this.collection = this.collections[section];
        this.updateBoxes(this.collection);
        this.updateCategories(this.collection);
        return this.update();
      }
    };

    SectionsController.prototype.filterByTitle = function(str, collection) {
      return collection.filter(function(m) {
        return $($.parseHTML(m.get('title'))).text().toLowerCase().search(str.toLowerCase()) >= 0;
      });
    };

    SectionsController.prototype.filterByAction = function(filters, collection) {
      return collection.filter(function(m) {
        return (_.intersection(m.get('action_types'), filters)).length > 0;
      });
    };

    SectionsController.prototype.filterByCategory = function(categories, collection) {
      return collection.filter(function(m) {
        return (_.indexOf(categories, m.get('category'))) >= 0;
      });
    };

    SectionsController.prototype.update = function() {
      var _filters, a, action_types, categories, collection, filter, filter_class, filters, fn, fn1, j, k, key, len, len1, models, str;
      if (_.isUndefined(this.collection) || this.collection.length === 0) {
        return;
      }
      filters = [];
      action_types = _.clone(this.filters.action_types);
      categories = _.clone(this.filters.categories);
      if (action_types.length === 0 && categories.length === 0) {
        filter_class = this.sectionLayout.boxesView.getPaginationClass();
      } else {
        if (action_types.length === 0 || categories.length === 0) {
          _filters = action_types.length === 0 ? categories : action_types;
          fn = function(filter) {
            return filters.push("." + filter);
          };
          for (j = 0, len = _filters.length; j < len; j++) {
            filter = _filters[j];
            fn(filter);
          }
          filter_class = filters.join(', ');
        } else {
          fn1 = function(a) {
            var c, l, len2, results;
            results = [];
            for (l = 0, len2 = categories.length; l < len2; l++) {
              c = categories[l];
              results.push((function(c) {
                return filters.push("." + a + "." + c);
              })(c));
            }
            return results;
          };
          for (k = 0, len1 = action_types.length; k < len1; k++) {
            a = action_types[k];
            fn1(a);
          }
          filter_class = filters.join(', ');
        }
      }
      str = this.filters.search.trim();
      this.sectionLayout.boxesView.filtered(filter_class, str);
      this.sectionLayout.boxesView.loadImage();
      this.$el.imagesLoaded((function(_this) {
        return function() {
          return _this.sectionLayout.boxesView.$el.isotope();
        };
      })(this));
      collection = this.collection;
      key = JSON.stringify(this.filters);
      if (_.has(this.filtredCollections, key)) {
        this.updateFloorControls(this.filtredCollections[key]);
        return this.renderItems(this.filtredCollections[key]);
      }
      if (!_.isEmpty(this.filters.search.trim())) {
        models = this.filterByTitle(this.filters.search.trim(), collection);
        collection = new Backbone.Collection(models);
      }
      if (!_.isEmpty(this.filters.action_types)) {
        models = this.filterByAction(this.filters.action_types, collection);
        collection = new Backbone.Collection(models);
      }
      if (!_.isEmpty(this.filters.categories)) {
        models = this.filterByCategory(this.filters.categories, collection);
        collection = new Backbone.Collection(models);
      }
      this.filtredCollections[key] = collection;
      this.updateFloorControls(collection);
      return this.renderItems(collection);
    };

    SectionsController.prototype.updateFloorControls = function(collection) {
      var floor_obj_counts;
      floor_obj_counts = _.groupBy(_.flatten(collection.pluck('floor')));
      $(".leaflet-control-layers-base label").removeClass('show-counter');
      return _.each(floor_obj_counts, function(arr, floor) {
        return $(".leaflet-control-layers-base label:nth-child(" + floor + ")").addClass('show-counter').attr('data-content', arr.length);
      });
    };

    SectionsController.prototype.updateBoxes = function(collection) {
      var models;
      if (collection.type === 'actions') {
        if (this.collectionActions.length > 0 && collection.length <= this.collectionActions.length) {
          collection = this.collectionActions;
        } else {
          models = [];
          collection.each((function(_this) {
            return function(model) {
              var childs, fn, j, len, v, values;
              if (_.isUndefined(childs = model.get('childs'))) {
                return;
              }
              values = _.values(childs);
              fn = function(v) {
                v.floor = model.get('floor');
                return v.parent = model;
              };
              for (j = 0, len = values.length; j < len; j++) {
                v = values[j];
                fn(v);
              }
              return models.push(values);
            };
          })(this));
          this.collectionActions.reset(_.flatten(models), {
            parse: true
          });
          collection = this.collectionActions;
        }
      }
      this.sectionLayout.boxesView.render(collection);
      return this.sectionLayout.boxesView.$el.ready((function(_this) {
        return function() {
          _this.$el.find('#box').html(_this.sectionLayout.boxesView.$el);
          return _this.$el.find('#box').ready(function() {
            return _this.sectionLayout.boxesView.onShow();
          });
        };
      })(this));
    };

    SectionsController.prototype.updateCategories = function(collection) {
      var categories;
      categories = {};
      collection.each((function(_this) {
        return function(m) {
          if (_.isEmpty(m.get('category_title'))) {
            return;
          }
          return categories[m.get('category')] = {
            category: m.get('category'),
            category_title: m.get('category_title')
          };
        };
      })(this));
      this.sectionLayout.filterView.categoriesView.collection.reset(_.values(categories));
      return this.sectionLayout.filterView.categoriesView.render();
    };

    SectionsController.prototype.openCinemaModal = function() {
      return setTimeout(((function(_this) {
        return function() {
          var base;
          (base = _this.modals)['cinema'] || (base['cinema'] = new CinemaView());
          _this.modals['cinema'].onRender = function() {
            return _this.openItemModal(_this.modals['cinema']);
          };
          return _this.modals['cinema'].render();
        };
      })(this)), 500);
    };

    return SectionsController;

  })(Marionette.Controller);
});

define('templates/index',['require','exports','module'],function(require,exports,module){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"afisha\"><div class=\"centered-content afisha--content\"><div class=\"afisha__sliders\"><div class=\"swiper-container promo-slider js-promo-slider is-hidden\"><div class=\"swiper-wrapper\"><div class=\"swiper-slide\"><img data-no-retina=\"\" src=\"/img/promo/800_01.jpg\" alt=\"\"/></div><div class=\"swiper-slide\"><img data-no-retina=\"\" src=\"/img/promo/800_02.jpg\" alt=\"\"/></div><div class=\"swiper-slide\"><img data-no-retina=\"\" src=\"img/promo/800_03.jpg\" alt=\"\"/></div></div><div class=\"promo-slider__caption is-hidden\"><ul class=\"promo-slider__brand-info-list\"><li class=\"promo-slider__brand-item js-promo-slider__brand-item is-active\"><img data-no-retina=\"\" src=\"/img/logos/200_01.jpg\" alt=\"\" class=\"promo-slider__brand-img\"/><svg class=\"ico icon icon-badge promo-slider__badge\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-badge\"></use></svg><div class=\"promo-slider__brand-info\"><div class=\"promo-slider__brand-name\">ADIDAS И АВИАПАРК</div><div class=\"promo-slider__brand-info-text\">ЗАСТАВЯТ МОСКВУ ПОБЕГАТЬ</div></div><div class=\"promo-slider__storey\"><div data-tooltip=\"Добавить в избранное\" class=\"badge badge--favor badge--storey js-tooltip-top\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg></div><span>1 этаж</span></div></li><li class=\"promo-slider__brand-item js-promo-slider__brand-item\"><img data-no-retina=\"\" src=\"/img/logos/200_02.jpg\" alt=\"\" class=\"promo-slider__brand-img\"/><svg class=\"ico icon icon-badge promo-slider__badge\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-badge\"></use></svg><div class=\"promo-slider__brand-info\"><div class=\"promo-slider__brand-name\">МАРАФОН</div><div class=\"promo-slider__brand-info-text\">ДЕТСКИХ СКИДОК ПРОЙДЕТ В АВИАПАРКЕ</div></div><div class=\"promo-slider__storey\"><div data-tooltip=\"Добавить в избранное\" class=\"badge badge--favor badge--storey js-tooltip-top\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg></div><span>1 этаж</span></div></li><li class=\"promo-slider__brand-item js-promo-slider__brand-item\"><img data-no-retina=\"\" src=\"/img/logos/200_03.jpg\" alt=\"\" class=\"promo-slider__brand-img\"/><svg class=\"ico icon icon-badge promo-slider__badge\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-badge\"></use></svg><div class=\"promo-slider__brand-info\"><div class=\"promo-slider__brand-name\">В САЛОНЕ КРАСОТЫ \"ОСТРОВА\"</div><div class=\"promo-slider__brand-info-text\">СОСТОИТСЯ ДЕНЬ  КРАСОТЫ С MOROCCANOIL</div></div><div class=\"promo-slider__storey\"><div data-tooltip=\"Добавить в избранное\" class=\"badge badge--favor badge--storey js-tooltip-top\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg></div><span>3 этаж</span></div></li></ul><div class=\"promo-slider__pagination js-promo-slider__pagination\"></div></div><div class=\"promo-slider__arrows\"><div class=\"promo-slider__arrow promo-slider__arrow-next js-promo-slider__arrow-next\"><svg class=\"ico icon icon-arrow-next\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-arrow-next\"></use></svg></div><div class=\"promo-slider__arrow promo-slider__arrow-prev js-promo-slider__arrow-prev\"><svg class=\"ico icon icon-arrow-prev\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-arrow-prev\"></use></svg></div></div></div><div class=\"afisha-slider\"><div class=\"afisha-slider__caption is-hidden\"><div class=\"afisha-slider__caption-i\"><ul class=\"afisha-slider__films\"><li class=\"afisha-slider__film js-afisha-slider__film is-active\"><div class=\"afisha-slider__name\"><i class=\"afisha-slider__play\"><svg class=\"ico icon icon-play-2\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-play-2\"></use></svg></i>                        Jurassic park</div><a href=\"#\" class=\"afisha-slider__booking\">Бронировать билеты</a></li><li class=\"afisha-slider__film js-afisha-slider__film\"><div class=\"afisha-slider__name\"><i class=\"afisha-slider__play\"><svg class=\"ico icon icon-play-2\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-play-2\"></use></svg></i>                        Пила 6</div><a href=\"#\" class=\"afisha-slider__booking\">Бронировать билеты</a></li><li class=\"afisha-slider__film js-afisha-slider__film\"><div class=\"afisha-slider__name\"><i class=\"afisha-slider__play\"><svg class=\"ico icon icon-play-2\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-play-2\"></use></svg></i>                        Голодные игры</div><a href=\"#\" class=\"afisha-slider__booking\">Бронировать билеты</a></li><li class=\"afisha-slider__film js-afisha-slider__film\"><div class=\"afisha-slider__name\"><i class=\"afisha-slider__play\"><svg class=\"ico icon icon-play-2\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-play-2\"></use></svg></i>                        Mad Max</div><a href=\"#\" class=\"afisha-slider__booking\">Бронировать билеты</a></li><li class=\"afisha-slider__film js-afisha-slider__film\"><div class=\"afisha-slider__name\"><i class=\"afisha-slider__play\"><svg class=\"ico icon icon-play-2\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-play-2\"></use></svg></i>                        Мстители. Эра Альтрона</div><a href=\"#\" class=\"afisha-slider__booking\">Бронировать билеты</a></li></ul><div class=\"afisha-slider__pagination js-afisha-slider__pagination\"></div></div></div><div class=\"swiper-container afisha-slider__i js-afisha-slider is-hidden\"><div class=\"swiper-wrapper\"><div class=\"swiper-slide\"><img data-no-retina=\"\" src=\"/img/films/560_01.jpg\" alt=\"\"/></div><div class=\"swiper-slide\"><img data-no-retina=\"\" src=\"/img/films/560_02.jpg\" alt=\"\"/></div><div class=\"swiper-slide\"><img data-no-retina=\"\" src=\"/img/films/560_03.jpg\" alt=\"\"/></div><div class=\"swiper-slide\"><img data-no-retina=\"\" src=\"/img/films/560_04.jpg\" alt=\"\"/></div><div class=\"swiper-slide\"><img data-no-retina=\"\" src=\"/img/films/560_05.jpg\" alt=\"\"/></div></div></div></div></div><div class=\"afisha-grid\"><div class=\"afisha-grid__item grid-cell-1 is-hidden\"><div class=\"afisha-grid__wrap afisha-grid--purple-bg\"><div class=\"svg-anim is-hidden\"><a href=\"/food\"><svg id=\"svgrest\" width=\"100%\" height=\"100%\" viewbox=\"0 0 280 230\"><path id=\"curtain\" fill=\"#FCADC5\" transform=\"matrix(1,0,0,1,0,-100)\" d=\"M 247.2071,0.4957763 V 49.996676 c -4.21073,2.392 -8.99092,3.7451 -14.06052,3.7451 -5.57486,0 -10.80103,-1.6351 -15.30332,-4.4906 -0.005,0 -0.0104,0.01 -0.0156,0.01 V 0.4960763 H 187.87165 V 49.641476 c -0.0219,-0.013 -0.0445,-0.025 -0.0665,-0.039 -4.37141,2.6376 -9.39262,4.1395 -14.73436,4.1395 -5.56102,0 -10.77517,-1.6272 -15.26973,-4.4695 V 0.4957763 H 127.15377 V 49.246876 c -0.003,0 -0.005,0 -0.008,0 -4.50542,2.8611 -9.73686,4.4996 -15.31747,4.4996 -5.48761,0 -10.63722,-1.5852 -15.091279,-4.3585 V 0.5004763 H 66.249911 V 49.744676 c -4.315931,2.5504 -9.251529,4.0018 -14.497782,4.0018 -5.574855,0 -10.801353,-1.6351 -15.303645,-4.4906 -0.01021,0.01 -0.02058,0.013 -0.03079,0.019 V 0.5003763 H 0.39413794 V 48.969476 c 5.45549796,5.5194 12.74365306,8.8927 20.75107606,8.8927 5.574854,0 10.801352,-1.6351 15.303645,-4.4906 4.502292,2.8556 9.72879,4.4906 15.303644,4.4906 5.341739,0 10.362944,-1.502 14.734356,-4.1395 4.371411,2.6375 9.392616,4.1395 14.734355,4.1395 5.574854,0 10.801352,-1.6351 15.303645,-4.4906 4.502291,2.8556 9.728791,4.4906 15.303651,4.4906 5.58061,0 10.81205,-1.6386 15.31747,-4.4997 4.50542,2.8611 9.73686,4.4997 15.31747,4.4997 5.57486,0 10.80119,-1.6351 15.30381,-4.4906 4.50213,2.8556 9.72846,4.4906 15.30348,4.4906 5.34174,0 10.36295,-1.502 14.73436,-4.1395 4.37124,2.6375 9.39294,4.1395 14.73435,4.1395 5.57486,0 10.80119,-1.6351 15.30381,-4.4906 4.50229,2.8556 9.72846,4.4906 15.30332,4.4906 5.07668,0 9.86329,-1.3566 14.07847,-3.7549 4.21485,2.3983 9.00195,3.7549 14.0783,3.7549 7.2205,0 13.85623,-2.7433 19.09079,-7.3292 V 0.5003763 H 247.2071 z\"></path><path id=\"chair_r\" fill=\"#FCADC5\" transform=\"matrix(1,0,0,1,0,300)\" d=\"m 178.45825,226.31568 c 3.47714,0.1282 4.44302,-4.2504 5.34404,-7.125 1.87908,-5.9955 2.52476,-13.5691 2.67178,-21.8202 -0.33502,-1.671 1.70095,-0.9706 1.78129,-2.2266 -1.17134,-5.6595 1.86427,-14.0103 6.3929,-15.3598 l 5.01067,0.2904 c 3.92082,1.8154 2.3142,10.006 5.59099,10.5292 -0.31675,4.7685 0.59612,10.3431 0.81804,15.228 0.16562,3.644 -1.44018,8.9884 1.33597,10.2421 2.73779,-1.3335 1.4736,-5.0522 1.33581,-8.0157 -0.24876,-5.3488 0.51693,-12.9852 -0.29469,-17.5996 0,0 1.37976,-0.726 1.63049,-3.7753 0,0 6.00898,4.0712 5.34371,10.2421 -1.17825,1.3393 1.10533,2.7322 1.7813,3.5625 -0.0486,8.2359 0.47693,17.7337 1.3358,25.8282 0.33519,3.1586 -0.0612,7.5527 4.00791,6.2344 -2.31074,-19.1311 -3.44339,-42.3105 7.57017,-52.5468 4.10339,2.1311 1.21793,11.2508 5.34371,13.3593 -0.0471,6.0184 0.59283,12.2771 1.78146,17.8125 0.77442,3.6067 1.24822,9.2871 5.34371,9.3514 -5.44051,-22.9857 -7.54382,-82.7145 3.85497,-90.8546 2.26745,-1.6193 3.60605,-5.0752 0.65638,-6.082 -10.2398,-3.4954 -31.37594,-2.4488 -39.69106,-1.4775 -4.30474,0.5029 -5.24625,1.4099 -5.79414,3.6167 -0.19048,1.8228 1.145,2.3345 1.34091,3.5085 1.35013,8.089 0.50706,17.8167 0.89064,25.8282 0.0991,2.0679 -0.1396,13.7784 -0.1396,13.7784 0,0 -15.28093,1.4904 -22.1259,5.37 -1.34437,14.4736 2.54699,30.5694 -0.89065,43.6407 -0.75565,2.8726 -3.29835,5.5663 -2.22661,8.4605 z m 62.34361,-96.6328 c 0,0 -8.97298,8.08 -16.71057,15.5706 0,0 -9.54852,-11.2771 -14.4614,-16.016 8.46707,-1.3045 21.12594,-1.5389 31.17197,0.4454 z m -5.78888,32.5079 c -3.67799,-7.6357 -8.69919,-14.1386 -8.69919,-14.1386 0.89706,-1.3964 10.25643,-10.2575 12.2603,-11.8974 -2.79871,8.0668 -2.92317,17.619 -3.56111,26.036 z m -1.78145,16.9218 c 1.73009,-0.2234 2.37001,2.9441 1.33597,4.0077 0.1536,-1.9347 -1.07701,-2.4852 -1.33597,-4.0077 z m -12.70217,1.8135 6.46813,-1.8135 c -3.26394,2.6736 -4.37355,7.5015 -6.23436,11.5781 0,-3.711 -0.23377,-6.0536 -0.23377,-9.7646 z m -7.47896,-0.01 3.62481,0.1556 0.37964,9.8801 c -0.96308,-3.0103 -4.91222,-6.4361 -6.2258,-7.1476 0.6656,-1.9145 2.22135,-2.8881 2.22135,-2.8881 z m -5.64663,-12.0456 c 3.10557,-5.3981 16.50346,-18.4739 16.50346,-18.4739 4.28136,6.4064 9.14008,14.0292 11.55091,21.1455 -6.07862,-2.1517 -23.71968,-3.1948 -28.05437,-2.6716 z m -1.33597,-37.8517 c 6.49941,5.3447 15.63636,16.2103 15.63636,16.2103 0,0 -10.76316,11.1385 -14.80169,16.24 0.20546,-10.2752 -0.17566,-20.7667 -0.83467,-32.4503 z m -21.23147,47.4535 4.16941,0.6367 c -2.99823,1.3893 -4.05861,8.0273 -4.05861,8.0273 l -0.1108,-8.664 z\"></path><path id=\"chair_l\" fill=\"#FCADC5\" transform=\"matrix(1,0,0,1,0,300)\" d=\"m 100.10341,217.85488 c -3.437628,-13.0713 0.45373,-29.1671 -0.890643,-43.6407 -6.844972,-3.8797 -22.125898,-5.3701 -22.125898,-5.3701 0,0 -0.238548,-11.7106 -0.139606,-13.7783 0.383587,-8.0116 -0.459481,-17.7392 0.890647,-25.8283 0.195744,-1.1739 1.53122,-1.6854 1.341073,-3.5084 -0.548052,-2.2067 -1.489569,-3.1138 -5.794306,-3.6167 -8.315115,-0.9714 -29.451424,-2.0181 -39.691225,1.4775 -2.949505,1.0067 -1.610737,4.4626 0.656543,6.0819 11.398629,8.1401 9.295485,67.8689 3.854968,90.8547 4.095657,-0.064 4.569132,-5.7448 5.343715,-9.3515 1.188955,-5.5353 1.828541,-11.7942 1.781293,-17.8124 4.125784,-2.1087 1.240649,-11.2282 5.343714,-13.3594 11.013725,10.2364 9.881073,33.4157 7.570331,52.5469 4.069151,1.3183 3.672723,-3.076 4.007744,-6.2344 0.858873,-8.0945 1.384536,-17.5922 1.33597,-25.8283 0.67597,-0.8302 2.959548,-2.2231 1.781293,-3.5624 -0.665268,-6.171 5.343715,-10.2421 5.343715,-10.2421 0.250895,3.0491 1.630492,3.7753 1.630492,3.7753 -0.81146,4.6144 -0.04577,12.2508 -0.294687,17.5996 -0.137795,2.9636 -1.402151,6.6823 1.335805,8.0156 2.77615,-1.2536 1.170352,-6.598 1.33597,-10.2421 0.22192,-4.8849 1.134792,-10.4594 0.818044,-15.2279 3.276954,-0.5232 1.670168,-8.7138 5.591153,-10.5292 l 5.010504,-0.2904 c 4.528633,1.3494 7.564404,9.7003 6.392899,15.3598 0.08034,1.2559 2.116479,0.5556 1.781293,2.2266 0.147015,8.2511 0.792528,15.8247 2.671775,21.8202 0.900854,2.8746 1.866736,7.2534 5.344044,7.125 1.07191,-2.8939 -1.47096,-5.5876 -2.22662,-8.4605 z m -28.945349,-88.6174 c -4.912879,4.7389 -14.4614,16.016 -14.4614,16.016 -7.737594,-7.4906 -16.710569,-15.5706 -16.710569,-15.5706 10.046031,-1.9843 22.70523,-1.7499 31.171969,-0.4454 z m -28.943871,6.9173 c 2.004036,1.6399 11.362904,10.5009 12.260136,11.8974 0,0 -5.021205,6.5029 -8.699032,14.1386 -0.63794,-8.417 -0.7624,-17.9692 -3.561104,-26.036 z m 4.006427,46.9655 c -1.034039,-1.0636 -0.393959,-4.2311 1.33597,-4.0077 -0.258798,1.5225 -1.489734,2.073 -1.33597,4.0077 z m 13.804527,7.5704 c -1.860974,-4.0766 -2.970578,-8.9045 -6.234361,-11.5781 l 6.467971,1.8135 c 0,3.711 -0.23361,6.0536 -0.23361,9.7646 z m 9.934413,-6.8865 c -1.31391,0.7115 -5.263211,4.1373 -6.22613,7.1476 l 0.379801,-9.8801 3.624816,-0.1556 c -1.65e-4,0 1.555421,0.9736 2.221513,2.8881 z m -24.629586,-12.2619 c 2.411001,-7.1165 7.269717,-14.7392 11.551076,-21.1456 0,0 13.397727,13.0759 16.503465,18.4739 -4.334534,-0.5233 -21.975755,0.5198 -28.054541,2.6717 z m 28.556003,-8.0732 c -4.038695,-5.1015 -14.802018,-16.24 -14.802018,-16.24 0,0 9.136947,-10.8656 15.636526,-16.2103 -0.659177,11.6836 -1.04013,22.1751 -0.834508,32.4503 z m 21.955013,23.6672 c 0,0 -1.06038,-6.6379 -4.058286,-8.0273 l 4.169246,-0.6367 -0.11096,8.664 z\" style=\"fill-rule:evenodd\"></path><path id=\"table\" fill=\"#FCADC5\" transform=\"matrix(0,0,0,0,170,287)\" d=\"m 171.01287,160.90948 c 2.29082,-3.7903 3.40816,-7.1647 3.92609,-9.1707 8.71895,-1.1019 14.11963,-2.6303 14.11963,-4.3192 0,-3.3585 -21.35263,-6.0811 -47.69272,-6.0811 -0.32482,0 -0.64832,6e-4 -0.97165,0 -0.32317,-0.001 -0.64666,0 -0.97164,0 -26.33993,0 -47.69256,2.7225 -47.69256,6.0811 0,1.6891 5.400511,3.2173 14.11963,4.3192 0.51776,2.0062 1.6351,5.3804 3.92592,9.1707 2.9477,4.8775 8.43332,11.3089 18.19883,15.6759 -3.77167,0.5408 -5.98676,3.6508 -5.98676,6.6675 0,2.9485 1.38371,5.9279 4.04758,6.7829 -3.57839,1.0116 -8.01565,2.5848 -11.92824,5.0923 -6.97305,4.4682 -10.69681,10.7778 -11.06789,18.7536 -0.0421,0.9084 0.65984,1.6787 1.5681,1.7209 0.0259,0 0.0519,0 0.0777,0 0.87419,0 1.60202,-0.6879 1.64317,-1.5698 0.67614,-14.5414 13.83499,-19.3874 25.22324,-21.9841 1.7999,-0.4106 3.16847,-1.0043 4.2109,-1.6885 -0.28333,0.363 -0.5874,0.7216 -0.91287,1.0734 -0.48944,0.4608 -3.92247,3.8033 -7.46777,10.1214 -3.42923,6.1122 -7.62778,16.319 -8.15476,30.234 -0.0344,0.9087 0.67416,1.6732 1.58275,1.7077 0.0212,0 0.0425,0 0.0634,0 0.88077,0 1.61041,-0.6964 1.64399,-1.5839 0.49932,-13.1842 4.44155,-22.8369 7.66071,-28.6128 3.4941,-6.2688 6.91774,-9.4601 6.95182,-9.4916 l 0.091,-0.091 c 1.35721,-1.4576 2.42351,-3.0382 3.1739,-4.6481 0.75054,1.6099 1.81701,3.1907 3.17389,4.6481 l 0.0914,0.091 c 0.0341,0.032 3.45755,3.2228 6.95165,9.4916 3.21917,5.7759 7.16139,15.4286 7.66072,28.6128 0.0336,0.8875 0.76355,1.5839 1.64415,1.5839 0.0209,0 0.0421,0 0.0632,0 0.90892,-0.034 1.61716,-0.7992 1.58275,-1.7077 -0.52714,-13.915 -4.72536,-24.1218 -8.1546,-30.234 -3.5453,-6.3183 -6.97865,-9.6608 -7.46777,-10.1214 -0.32547,-0.3518 -0.62987,-0.7102 -0.9132,-1.0734 1.04227,0.6842 2.41117,1.2779 4.2109,1.6885 11.38842,2.5967 24.54711,7.4427 25.2234,21.9841 0.0412,0.8819 0.76915,1.5698 1.64301,1.5698 0.0255,0 0.0515,0 0.0777,0 0.9086,-0.042 1.61041,-0.8126 1.5681,-1.7209 -0.37107,-7.9758 -4.09467,-14.2854 -11.06772,-18.7536 -3.91259,-2.5073 -8.34985,-4.0807 -11.92841,-5.0923 2.66371,-0.855 4.04775,-3.8344 4.04775,-6.7829 0,-3.0167 -2.21509,-6.1267 -5.98692,-6.6675 9.76534,-4.367 15.25096,-10.7984 18.19849,-15.6759 z m -58.33883,-1.5699 c -1.70984,-2.8 -2.71145,-5.367 -3.28123,-7.1958 3.64144,0.3768 7.7264,0.6868 12.14029,0.9148 -0.0359,2.0856 0.0914,4.8245 0.68782,7.8071 0.92966,4.6485 2.76495,8.662 5.41829,11.9312 -6.42747,-3.1894 -11.44884,-7.6991 -14.96517,-13.4573 z m 22.27061,25.7051 c -0.31609,2.0292 -1.6109,3.0089 -2.70454,3.39 0.77953,-0.982 1.18023,-2.3479 1.18023,-4.0793 0,-1.6402 -0.41964,-2.8756 -1.24706,-3.6718 -0.75796,-0.7293 -1.83349,-1.073 -3.2009,-1.0195 -2.31519,0.089 -3.68984,1.5212 -3.67717,3.8309 l 1.7e-4,0.033 c 0,1.4438 0.81524,3.0075 2.60543,3.0286 0.93081,0.013 1.48726,-0.3762 1.79462,-0.703 0.76175,-0.81 0.69968,-1.9797 0.68997,-2.1102 -0.0331,-0.4534 -0.42788,-0.7975 -0.8811,-0.7608 -0.45158,0.033 -0.79138,0.4244 -0.76108,0.8755 0.008,0.1512 -0.0202,0.6302 -0.25041,0.8708 -0.0439,0.046 -0.17566,0.1878 -0.57274,0.1814 -0.93148,-0.011 -0.97856,-1.1534 -0.97856,-1.3823 l -1.7e-4,-0.042 c -0.008,-1.43 0.65754,-2.1216 2.09426,-2.1769 0.91452,-0.034 1.56727,0.1481 1.99613,0.5607 0.49258,0.474 0.74232,1.3103 0.74232,2.4856 0,2.9981 -1.23802,4.2771 -4.13945,4.2771 -2.627,0 -4.00132,-2.7064 -4.00132,-5.3798 0,-2.509 2.06379,-5.1045 5.51772,-5.1045 5.37582,1e-4 6.04274,5.2978 5.79365,6.8965 z m 22.21002,-1.792 c 0,2.6732 -1.37432,5.3798 -4.00132,5.3798 -2.9016,0 -4.13961,-1.2792 -4.13961,-4.2771 0,-1.1753 0.24974,-2.0116 0.74248,-2.4856 0.42886,-0.4126 1.08145,-0.5951 1.99613,-0.5607 1.43673,0.055 2.10199,0.7469 2.09409,2.1769 l -1.6e-4,0.042 c 0,0.229 -0.0469,1.3714 -0.9784,1.3823 -0.39708,0.01 -0.52895,-0.1353 -0.57307,-0.1814 -0.22983,-0.2406 -0.25798,-0.7196 -0.25008,-0.8708 0.0303,-0.4511 -0.30966,-0.8424 -0.76108,-0.8755 -0.45339,-0.037 -0.84784,0.3074 -0.8811,0.7608 -0.01,0.1305 -0.0718,1.3002 0.68997,2.1102 0.30736,0.3266 0.86364,0.7161 1.79446,0.703 1.79035,-0.021 2.60543,-1.5849 2.60543,-3.0286 l 1.6e-4,-0.033 c 0.0127,-2.3096 -1.36181,-3.7418 -3.677,-3.8309 -1.36758,-0.053 -2.44327,0.2904 -3.20106,1.0195 -0.82743,0.7962 -1.24707,2.0316 -1.24707,3.6718 0,1.7316 0.40071,3.0973 1.1804,4.0793 -1.09364,-0.3809 -2.38845,-1.3608 -2.7047,-3.39 -0.24876,-1.5987 0.41783,-6.8965 5.79364,-6.8965 3.45393,1e-4 5.51789,2.5955 5.51789,5.1045 z m -13.70871,-6.8751 c -1.22748,0.6062 -2.98128,2.2513 -3.0519,2.7157 -0.0989,-0.4512 -1.8241,-2.1095 -3.05174,-2.7157 -6.3473,-3.1354 -10.34171,-8.5379 -11.87227,-16.0572 -0.54871,-2.6951 -0.66906,-5.2023 -0.6414,-7.1102 4.60041,0.1885 9.50259,0.2911 14.59376,0.2911 0.32515,0 0.64832,-0.001 0.97165,0 0.32349,0 0.64666,0 0.97164,0 5.09134,0 9.99352,-0.1026 14.59376,-0.2911 0.0277,1.9081 -0.0927,4.4151 -0.64156,7.1102 -1.5304,7.5192 -5.52481,12.9218 -11.87194,16.0572 z m 9.70278,-3.5807 c 2.65334,-3.2691 4.48863,-7.2826 5.41846,-11.9312 0.59645,-2.9826 0.72354,-5.7215 0.68782,-7.8071 4.41372,-0.228 8.49851,-0.538 12.14012,-0.9148 -0.56995,1.8288 -1.57139,4.3958 -3.28107,7.1958 -3.51632,5.7582 -8.53753,10.2679 -14.96533,13.4573 z\"></path><path id=\"cup_r\" fill=\"#FCADC5\" transform=\"matrix(1,0,0,1,0,168)\" d=\"m 177.89456,134.13998 c -1.10895,-1.1999 -3.5379,-1.0312 -3.5379,-1.0312 h -17.66723 c -0.007,0.1411 -0.0109,0.2827 -0.0109,0.4254 0,4.9312 4.06042,8.9285 9.07043,8.9285 2.06561,0 3.9684,-0.681 5.49336,-1.8254 1.37335,-0.09 6.63096,-0.6218 7.25194,-3.544 0.26456,-1.2426 0.0622,-2.2361 -0.59974,-2.9533 z m -0.84933,2.6453 c -0.23921,1.1244 -2.18809,1.8193 -4.0787,2.1547 0.9621,-1.2428 1.59971,-2.7411 1.79068,-4.3739 0.5711,-0.02 1.56793,0.059 2.04881,0.5795 0.31692,0.3431 0.39775,0.8948 0.23921,1.6397 z\"></path><path id=\"cup_l\" fill=\"#FCADC5\" transform=\"matrix(1,0,0,1,0,168)\" d=\"m 99.429255,137.44098 c 0.621145,2.9222 5.878765,3.4543 7.252105,3.544 1.5248,1.1444 3.42792,1.8254 5.49353,1.8254 5.00968,0 9.0706,-3.9973 9.0706,-8.9285 0,-0.1427 -0.004,-0.2843 -0.0109,-0.4254 h -17.66723 c 0,0 -2.42911,-0.1687 -3.5379,1.0312 -0.6623,0.717 -0.864301,1.7105 -0.600235,2.9533 z m 1.688445,-1.9479 c 0.48088,-0.5205 1.47804,-0.5994 2.04898,-0.5795 0.19097,1.6328 0.82842,3.1313 1.79068,4.3739 -1.8911,-0.3353 -3.83983,-1.0302 -4.07887,-2.1547 -0.15837,-0.7449 -0.0777,-1.2966 0.23921,-1.6397 z\"></path></svg></a></div><div class=\"afisha-grid--i\"><div class=\"afisha-grid__item-name\">70</div><div class=\"afisha-grid__item-desc\">Ресторанов</div></div></div></div><div class=\"afisha-grid__item grid-cell-2 is-hidden\"><div class=\"afisha-grid__wrap afisha-grid--pink-bg\"><div class=\"svg-anim\"><a href=\"/shops\"><svg id=\"svgstores\" height=\"100%\" viewbox=\"0 0 280 230\" width=\"100%\"><g id=\"pants\" style=\"stroke:#ffffff;fill:#ffffff;\" transform=\"translate(-150, -180) skewX(-30)\"><polygon id=\"polygon10\" points=\"122.54,246.65,168.79,246.65,164.11,347.98,127.22,347.98\"></polygon><path id=\"path17\" d=\"m181.75,241.03c-0.594-4.008-4.471-7.009-10.891-8.453l-22.732-5.531v-3.295c0-0.337-0.068-0.672-0.208-0.995-0.776-2.285-3.432-2.968-3.472-2.974-1.582-0.517-2.643-1.979-2.643-3.639,0-2.111,1.717-3.828,3.828-3.828,1.953,0,3.58,1.451,3.805,3.383v1.777c0,1.359,1.105,2.463,2.462,2.463,1.359,0,2.464-1.104,2.464-2.463v-1.94c0-0.23-0.034-0.46-0.107-0.695-0.637-4.24-4.328-7.426-8.623-7.426-4.814,0-8.729,3.914-8.729,8.729,0,3.828,2.517,7.216,6.155,8.338v2.599l-22.571,5.492c-6.441,1.448-10.314,4.452-10.908,8.457l-0.012,1.765c0,5.702,4.479,9.53,11.146,9.53h49.902c6.666,0,11.145-3.828,11.145-9.53v-1.614l-0.011-0.15zm-59.526,6.394h-1.51c-1.879,0-6.244-0.451-6.244-4.63v-1.254c0.436-1.724,3.074-3.284,7.109-4.188l22.254-5.417c0.93,0.911,2.616,0.902,3.545-0.03l22.389,5.449c4.018,0.902,6.656,2.461,7.092,4.186v1.254c0,4.179-4.365,4.63-6.242,4.63h-48.393z\"></path><g id=\"g19\" style=\"opacity:0.69999999999999996;stroke:#ffffff;\"><polygon id=\"polygon32\" points=\"156.02,251.96,195.18,251.96,191.22,337.74,159.99,337.74\"></polygon><path id=\"path34\" d=\"m206.15,247.2c-0.503-3.393-3.784-5.933-9.22-7.156l-19.244-4.682v-2.79c0-0.285-0.058-0.569-0.176-0.842-0.656-1.934-2.904-2.512-2.939-2.518-1.338-0.438-2.235-1.675-2.235-3.081,0-1.787,1.454-3.241,3.24-3.241,1.653,0,3.03,1.228,3.221,2.864v1.505c0,1.15,0.935,2.084,2.085,2.084s2.085-0.935,2.085-2.084v-1.644c0-0.194-0.028-0.389-0.091-0.587-0.539-3.59-3.664-6.287-7.3-6.287-4.075,0-7.389,3.314-7.389,7.389,0,3.24,2.13,6.109,5.21,7.059v2.199l-19.106,4.65c-5.454,1.227-8.732,3.769-9.235,7.16l-0.01,1.494c0,4.827,3.791,8.067,9.436,8.067h42.245c5.642,0,9.434-3.24,9.434-8.067v-1.487zm-50.391,5.413h-1.278c-1.59,0-5.285-0.382-5.285-3.919v-1.062c0.367-1.459,2.603-2.78,6.018-3.545l18.84-4.586c0.786,0.771,2.215,0.763,3-0.025l18.953,4.613c3.4,0.763,5.635,2.084,6.004,3.543v1.062c0,3.537-3.695,3.919-5.284,3.919h-40.968z\"></path></g><g id=\"g36\" style=\"opacity:0.40000000000000002;stroke:#ffffff;\" transform=\"translate(4.5935774,4.5935774)\"><polygon id=\"polygon54\" points=\"183.7,255.28,216.06,255.28,212.78,326.15,186.98,326.15\"></polygon><path id=\"path51\" d=\"m225.12,251.35c-0.416-2.804-3.127-4.902-7.618-5.913l-15.899-3.868v-2.304c0-0.235-0.047-0.47-0.146-0.696-0.542-1.597-2.399-2.075-2.429-2.08-1.104-0.361-1.847-1.383-1.847-2.545,0-1.477,1.2-2.678,2.677-2.678,1.366,0,2.504,1.016,2.661,2.367v1.243c0,0.95,0.772,1.723,1.722,1.723,0.951,0,1.724-0.773,1.724-1.723v-1.357c0-0.161-0.024-0.322-0.075-0.486-0.445-2.965-3.027-5.193-6.031-5.193-3.367,0-6.104,2.738-6.104,6.104,0,2.677,1.76,5.047,4.305,5.833v1.817l-15.786,3.841c-4.506,1.014-7.215,3.114-7.631,5.916l-0.008,1.235c0,3.987,3.133,6.665,7.796,6.665h34.903c4.662,0,7.795-2.677,7.795-6.665v-1.13l-0.009-0.106zm-41.635,4.472h-1.056c-1.313,0-4.366-0.316-4.366-3.238v-0.877c0.305-1.207,2.15-2.297,4.973-2.929l15.564-3.79c0.65,0.638,1.83,0.632,2.479-0.02l15.659,3.811c2.811,0.631,4.655,1.722,4.959,2.928v0.877c0,2.921-3.053,3.238-4.365,3.238h-33.847z\"></path></g></g><g id=\"dress\" style=\"stroke:#ffffff;fill:#ffffff;\" transform=\"translate(-50, -180) skewX(30)\"><g id=\"g54\" style=\"opacity:0.40000000000000002;stroke:#ffffff;\"><path id=\"path56\" d=\"m416.84,250.34c-0.378-2.551-2.844-4.461-6.932-5.38l-14.468-3.521v-2.097c0-0.214-0.044-0.427-0.132-0.633-0.494-1.454-2.185-1.888-2.21-1.893-1.006-0.329-1.682-1.259-1.682-2.316,0-1.344,1.093-2.437,2.436-2.437,1.244,0,2.279,0.923,2.423,2.154v1.131c0,0.865,0.702,1.567,1.566,1.567,0.865,0,1.568-0.703,1.568-1.567v-1.235c0-0.146-0.022-0.292-0.068-0.442-0.405-2.699-2.755-4.726-5.489-4.726-3.063,0-5.555,2.491-5.555,5.555,0,2.437,1.602,4.593,3.918,5.307v1.654l-14.366,3.496c-4.099,0.922-6.564,2.833-6.942,5.383l-0.008,1.123c0,3.629,2.852,6.065,7.094,6.065h31.762c4.241,0,7.093-2.437,7.093-6.065v-1.027l-0.008-0.096zm-37.885,4.07h-0.962c-1.195,0-3.974-0.287-3.974-2.947v-0.798c0.277-1.098,1.956-2.09,4.524-2.666l14.165-3.448c0.591,0.58,1.664,0.574,2.256-0.019l14.23,3.48c2.558,0.574,4.236,1.566,4.514,2.664v0.798c0,2.66-2.778,2.947-3.973,2.947h-30.799z\"></path><path id=\"path58\" d=\"m406.18,337.79s3.652-26.046,3.652-37.974-4.043-15.509-4.043-15.509c-4.336-6.698-0.535-8.244,0.726-10.07,1.781-1.686,3.189-5.395,3.189-8.058,0-3.07-0.652-5.726-2.927-7.403v-14.59c0-0.55-0.447-0.997-0.998-0.997-0.549,0-0.995,0.446-0.995,0.997v15.205c-1.222,2.338-5.602,4.091-10.913,4.226-5.312-0.135-9.691-1.888-10.915-4.226v-15.205c0-0.55-0.445-0.997-0.996-0.997-0.55,0-0.996,0.446-0.996,0.997v14.59c-2.276,1.677-2.927,4.333-2.927,7.403,0,2.664,1.409,6.373,3.19,8.058,1.261,1.826,5.063,3.372,0.725,10.07,0,0-4.042,3.581-4.042,15.509s3.65,37.974,3.65,37.974,12,4.154,24.62,0z\"></path></g><g id=\"g60\" style=\"opacity:0.69999999999999996;stroke:#ffffff;\" transform=\"translate(0,2.4760962)\"><path id=\"path62\" d=\"m449.81,242.25c-0.448-3.021-3.369-5.284-8.21-6.372l-17.137-4.169v-2.484c0-0.254-0.052-0.506-0.156-0.75-0.585-1.722-2.587-2.237-2.617-2.242-1.191-0.39-1.991-1.492-1.991-2.743,0-1.591,1.294-2.886,2.885-2.886,1.474,0,2.699,1.094,2.869,2.551v1.339c0,1.024,0.832,1.857,1.855,1.857,1.024,0,1.857-0.833,1.857-1.857v-1.463c0-0.173-0.026-0.347-0.081-0.523-0.48-3.196-3.263-5.598-6.501-5.598-3.628,0-6.579,2.951-6.579,6.58,0,2.886,1.896,5.44,4.64,6.286v1.958l-17.015,4.14c-4.855,1.092-7.775,3.356-8.224,6.375l-0.009,1.331c0,4.298,3.377,7.184,8.402,7.184h37.619c5.023,0,8.4-2.886,8.4-7.184v-1.217l-0.007-0.113zm-44.872,4.82h-1.139c-1.416,0-4.707-0.34-4.707-3.49v-0.946c0.328-1.3,2.317-2.476,5.359-3.157l16.776-4.083c0.7,0.687,1.972,0.68,2.673-0.022l16.877,4.108c3.028,0.68,5.018,1.855,5.346,3.155v0.946c0,3.15-3.291,3.49-4.705,3.49h-36.48z\"></path><path id=\"path64\" d=\"m437.19,345.83s4.326-30.85,4.326-44.978c0-14.127-4.789-18.368-4.789-18.368-5.136-7.934-0.634-9.765,0.859-11.928,2.11-1.996,3.778-6.389,3.778-9.544,0-3.636-0.772-6.781-3.467-8.768v-17.281c0-0.651-0.529-1.18-1.182-1.18-0.65,0-1.179,0.529-1.179,1.18v18.009c-1.447,2.769-6.635,4.845-12.926,5.005-6.291-0.16-11.479-2.236-12.928-5.005v-18.009c0-0.651-0.528-1.18-1.18-1.18s-1.181,0.529-1.181,1.18v17.281c-2.695,1.987-3.466,5.132-3.466,8.768,0,3.155,1.669,7.548,3.778,9.544,1.493,2.163,5.996,3.994,0.858,11.928,0,0-4.787,4.241-4.787,18.368,0,14.128,4.323,44.978,4.323,44.978s14.215,4.92,29.163,0z\"></path></g><path id=\"path66\" d=\"m481.36,237.73c-0.51-3.438-3.834-6.012-9.342-7.25l-19.498-4.744v-2.826c0-0.289-0.059-0.576-0.178-0.854-0.666-1.959-2.943-2.545-2.979-2.551-1.355-0.443-2.266-1.697-2.266-3.121,0-1.811,1.473-3.283,3.283-3.283,1.676,0,3.07,1.244,3.264,2.902v1.523c0,1.166,0.947,2.113,2.111,2.113,1.166,0,2.113-0.947,2.113-2.113v-1.664c0-0.197-0.029-0.395-0.092-0.596-0.547-3.637-3.713-6.369-7.396-6.369-4.129,0-7.486,3.357-7.486,7.486,0,3.283,2.158,6.189,5.279,7.152v2.229l-19.359,4.711c-5.525,1.242-8.848,3.818-9.357,7.254l-0.01,1.514c0,4.891,3.842,8.174,9.561,8.174h42.803c5.717,0,9.559-3.283,9.559-8.174v-1.385l-0.01-0.128zm-51.057,5.484h-1.295c-1.611,0-5.355-0.387-5.355-3.971v-1.076c0.373-1.479,2.637-2.816,6.098-3.592l19.088-4.646c0.797,0.781,2.244,0.773,3.041-0.025l19.203,4.674c3.445,0.773,5.709,2.111,6.082,3.59v1.076c0,3.584-3.744,3.971-5.354,3.971h-41.508z\" style=\"stroke:#ffffff;stroke-width:1;\"></path><path id=\"path68\" d=\"m466.99,355.58s4.922-35.102,4.922-51.176-5.449-20.899-5.449-20.899c-5.844-9.027-0.721-11.11,0.979-13.571,2.4-2.271,4.299-7.27,4.299-10.859,0-4.137-0.879-7.716-3.945-9.977v-19.662c0-0.741-0.602-1.343-1.344-1.343-0.74,0-1.342,0.602-1.342,1.343v20.491c-1.646,3.15-7.549,5.513-14.707,5.694-7.158-0.182-13.061-2.544-14.709-5.694v-20.491c0-0.741-0.602-1.343-1.342-1.343-0.742,0-1.344,0.602-1.344,1.343v19.662c-3.066,2.261-3.943,5.84-3.943,9.977,0,3.59,1.898,8.588,4.299,10.859,1.699,2.461,6.822,4.544,0.977,13.571,0,0-5.447,4.825-5.447,20.899s4.92,51.176,4.92,51.176,16.169,5.597,33.176,0z\" style=\"stroke:#ffffff;stroke-width:1;\"></path></g><g id=\"lines_l\" style=\"stroke:#ffffff;fill:#ffffff;\" transform=\"translate(-360, -174)\"><line id=\"line102\" style=\"opacity:0.50000000000000000;stroke:#ffffff;\" y2=\"150.23\" y1=\"206.37\" x2=\"129.47\" x1=\"288.04\"></line><line id=\"line92\" style=\"opacity:0.50000000000000000;stroke:#ffffff;\" y2=\"193.83\" y1=\"252\" x2=\"70.285\" x1=\"235\"></line><line id=\"line94\" style=\"opacity:0.50000000000000000;stroke:#ffffff;\" y2=\"406.97\" y1=\"358.83\" x2=\"74.879\" x1=\"233.45\"></line><line id=\"line98\" style=\"opacity:0.50000000000000000;stroke:#ffffff;\" y2=\"450.26\" y1=\"400\" x2=\"131.77\" x1=\"290.34\"></line></g><g id=\"lines_r\" style=\"stroke:#ffffff;fill:#ffffff;\" transform=\"translate(260, -174)\"><line id=\"line90\" style=\"opacity:0.50000000000000000;stroke:#ffffff;\" y2=\"191.53\" y1=\"243.67\" x2=\"522.15\" x1=\"363.58\"></line><line id=\"line96\" style=\"opacity:0.50000000000000000;stroke:#ffffff;\" y2=\"404.67\" y1=\"352.53\" x2=\"529.04\" x1=\"370.47\"></line><line id=\"line100\" style=\"opacity:0.50000000000000000;stroke:#ffffff;\" y2=\"450.56\" y1=\"398.12\" x2=\"474.45\" x1=\"315.88\"></line><line id=\"line104\" style=\"opacity:0.50000000000000000;stroke:#ffffff;\" y2=\"150.23\" y1=\"202.37\" x2=\"472.15\" x1=\"313.58\"></line></g></svg></a></div><div class=\"afisha-grid--i\"><div class=\"afisha-grid__item-name\">500</div><div class=\"afisha-grid__item-desc\">Магазинов</div></div></div></div><div class=\"afisha-grid__item grid-cell-3 is-hidden\"><div class=\"afisha-grid__wrap afisha-grid--light-blue-bg\"><div class=\"svg-anim\"><svg id=\"svgaqua\" viewbox=\"0 -150 280 280\" width=\"100%\"><g id=\"water\" transform=\"translate(-2, 130)\"><path id=\"waves\" style=\"fill-rule:evenodd;fill:#5c6abd;\" d=\"m280.55,108.92-282.02,0,0-108.55c3.9611,9.2971,14.921,15.786,25.339,15.786s19.378-6.4897,23.339-15.786c3.9611,9.2971,12.921,15.786,23.339,15.786s19.378-6.4897,23.339-15.786c3.9617,9.2971,12.921,15.786,23.339,15.786s19.378-6.4897,23.339-15.786c3.9611,9.2971,12.921,15.786,23.339,15.786,10.419,0,19.379-6.4897,23.339-15.786,3.9611,9.2971,12.921,15.786,23.341,15.786,10.418,0,19.378-6.4897,23.339-15.786,3.9611,9.2971,12.921,15.786,23.339,15.786s19.378-6.4897,23.339-15.786\"></path><g id=\"shark\" style=\"opacity:0.3;\" transform=\"matrix(0.56003347,0,0,0.56003347,150,-200)\"><path id=\"path15\" style=\"stroke:#ffffff;stroke-width:3;stroke-miterlimit:10;fill:none;\" d=\"m462.83,507.4c0.252-0.238,0.503-0.479,0.754-0.721-9.769-0.946-20.63-5.366-29.748-12.064-0.565,0.056-1.139,0.107-1.717,0.151,9.979,8.474,21.599,12.909,31.568,13.301-0.284-0.223-0.57-0.445-0.857-0.667z\"></path><path id=\"path17\" style=\"stroke:#ffffff;stroke-width:3;stroke-miterlimit:10;fill:none;\" d=\"m466.82,503.41c7.623-8.146,13.881-18.085,17.633-31.311-15.657,0.509-37.809,18.395-49.817,22.445-0.158,0.017-0.321,0.031-0.482,0.046,10.981,7.383,23.223,10.479,32.666,8.82z\"></path><path id=\"path19\" style=\"stroke:#ffffff;stroke-width:3;stroke-miterlimit:10;fill:none;\" d=\"m441.24,518.34c13.152,13.368,29.543,21.065,43.921,22.709,0.294,0.037,0.588,0.066,0.882,0.096-0.238-0.996-0.505-1.978-0.793-2.943-1.14-0.161-2.29-0.352-3.444-0.583-14.704-2.803-30.47-11.581-42.58-24.383,13.84,14.163,30.516,21.038,44.96,21.763-0.319-0.868-0.661-1.726-1.023-2.572-2.394-0.226-4.831-0.617-7.297-1.19-11.798-2.62-24.184-9.338-34.501-18.805-1.36-1.232-2.698-2.533-4.003-3.916,1.295,1.354,2.629,2.658,4.003,3.916,12.68,11.48,27.51,16.521,40.142,16.483-0.404-0.783-0.83-1.56-1.273-2.325-14.993-0.976-32.21-8.397-44.614-22.4,13.007,13.5,29.187,19.333,42.465,18.985-0.462-0.68-0.942-1.353-1.436-2.018-14.229-0.784-30.774-7.902-42.684-20.893,12.309,12.365,27.544,17.876,39.978,17.516-0.514-0.597-1.042-1.187-1.583-1.769-13.305-0.837-28.747-7.612-39.983-19.265,11.39,10.911,25.276,16.094,36.758,16.009-0.58-0.551-1.177-1.095-1.785-1.63-11.756-1.08-25.082-6.968-35.314-16.351-19.989,1.49-48.329-4.61-75.685-9.816,3.391-1.563,6.687-3.447,9.854-5.75-7.474-11.321-11.489-24.629-13.413-28.739-10.286,2.517-15.927,15.688-23.813,32.848-27.627-5.368-95.927,7.148-107.85,31.75,8.667,22.312,48.699,36.235,95.256,35.858,6.326,14.676,12.794,23.98,19.433,26.825,6.339-7.241,9.155-15.271,6.022-24.635l-9.309-3.833,35.04-4.652c9.033,7.094,18.192,12.774,27.919,12.043,4.194-11.924,10.158-21.675,16.971-30.383l-15.35-1.65c12.655-3.006,25.263-4.534,37.772-3.011,8.886,4.559,17.763,9.178,26.771,12.852-7.34-4.249-14.333-9.691-20.439-16.148z\"></path></g><g id=\"fish\" transform=\"translate(-200,-345)\"><g id=\"g7\" transform=\"matrix(0.56003347,0,0,0.56003347,0,147.73724)\"><path id=\"path11\" d=\"m87.993,397.44c3.876,2.172,6.933,7.049,10.954,14.832,0.158-0.003,0.316-0.004,0.474-0.004,5.764,0,11.281,1.657,16.642,4.342,8.254,4.967,19.584,14.672,18.408,18.711,0.101,2.91-6.842,9.822-14.859,14.451-9.021-4.816-14.736-16.1-10.217-28.275-5.776,10.26-2.924,22.986,5.524,30.641-3.088,1.323-6.166,2.155-8.917,2.155-0.302,0-0.6-0.01-0.893-0.03-5.328,4.406-8.205,10.689-10.497,17.117-3.035-4.098-4.465-9.127-4.336-15.063,1.34-0.234,2.64-0.729,3.88-1.598l-18.713-2.281c-3.849,4.744-7.646,9.174-11.639,10.041,1.187-5.098,1.276-10.193-0.457-15.291,0.801,0.459,1.585,0.688,2.352,0.688,1.083,0,2.129-0.459,3.126-1.372l-2.738-2.738c-1.158-0.96-1.925-1.322-2.607-1.322-1.074,0-1.938,0.897-3.784,1.777-8.548,4.617-16.378,8.766-23.048,8.977,3.289-4.793,8.04-11.291,10.041-17.646-0.627-5.254-5.823-15.309-8.9-20.311,0.251-0.018,0.502-0.025,0.755-0.025,6.795,0,14.168,6.128,22.292,12.805,1.026,0.707,2.04,1.004,3.017,1.004,2.734,0,5.182-2.319,6.797-4.428-0.854-1.648-2.382-2.321-4.388-2.321-0.278,0-0.564,0.013-0.86,0.038,1.078-5.449,9.647-13.759,22.591-24.874m33.776,38.476c2.975,0,5.386-2.412,5.386-5.387s-2.411-5.387-5.386-5.387c-2.976,0-5.387,2.412-5.387,5.387s2.41,5.387,5.387,5.387m-33.766-41.5c-0.702,0-1.398,0.246-1.955,0.724-13.979,12.004-22.319,20.199-23.58,26.566-0.183,0.924,0.079,1.881,0.707,2.583,0.572,0.639,1.387,1,2.236,1,0.084,0,0.168-0.004,0.252-0.011,0.028-0.002,0.057-0.005,0.084-0.007-0.688,0.473-1.333,0.729-1.885,0.729-0.395,0-0.795-0.136-1.223-0.413l-0.179-0.147c-8.289-6.813-16.118-13.248-23.907-13.248-0.322,0-0.641,0.011-0.96,0.032-1.048,0.072-1.981,0.687-2.462,1.62-0.48,0.934-0.438,2.051,0.112,2.945,2.966,4.821,7.521,13.771,8.382,18.478-1.77,5.118-5.46,10.452-8.449,14.771-0.342,0.494-0.674,0.975-0.993,1.438-0.64,0.932-0.701,2.145-0.158,3.137,0.527,0.964,1.538,1.561,2.631,1.561,0.032,0,0.063,0,0.095-0.002,7.303-0.23,15.567-4.579,23.605-8.918,0.009,0.294,0.061,0.589,0.159,0.876,1.419,4.172,1.542,8.636,0.375,13.646-0.233,1.001,0.063,2.053,0.785,2.785,0.57,0.578,1.343,0.895,2.137,0.895,0.212,0,0.425-0.022,0.637-0.068,4.483-0.974,8.268-4.934,12.279-9.795l10.548,1.286c-0.025,6.34,1.633,11.809,4.933,16.263,0.571,0.771,1.469,1.215,2.41,1.215,0.146,0,0.294-0.011,0.441-0.032,1.096-0.163,2.013-0.917,2.385-1.96,1.954-5.478,4.372-11.067,8.76-15.096,2.941-0.034,6.272-0.84,9.904-2.396,0.939-0.403,1.608-1.256,1.777-2.264,0.021-0.122,0.033-0.244,0.038-0.366,0.094,0.052,0.188,0.103,0.283,0.153,0.442,0.236,0.928,0.354,1.413,0.354,0.519,0,1.036-0.134,1.5-0.402,6.684-3.858,15.936-11.443,16.346-16.653,1.609-8.496-19.629-21.545-19.848-21.677-0.066-0.04-0.134-0.077-0.204-0.112-5.776-2.893-11.231-4.414-16.628-4.632-3.958-7.501-7.059-12.086-11.318-14.473-0.458-0.26-0.963-0.385-1.465-0.385zm33.775,38.476c-1.316,0-2.387-1.07-2.387-2.387s1.071-2.387,2.387-2.387c1.315,0,2.386,1.07,2.386,2.387s-1.071,2.387-2.386,2.387z\" style=\"fill:#dcfcff;\"></path></g><g id=\"bubbles\" style=\"opacity:0.3;stroke:#ffffff;stroke-width:2;stroke-miterlimit:10;fill:none;\"><circle id=\"circle21\" d=\"m 133.48999,405.51099 c 0,2.77909 -2.2529,5.032 -5.032,5.032 -2.77909,0 -5.032,-2.25291 -5.032,-5.032 0,-2.7791 2.25291,-5.032 5.032,-5.032 2.7791,0 5.032,2.2529 5.032,5.032 z\" cx=\"128.46\" transform=\"matrix(0.56003347,0,0,0.56003347,0,147.73724)\" cy=\"405.51\" r=\"5.032\"></circle><circle id=\"circle23\" d=\"m 127.339,384.935 c 0,4.11783 -3.33816,7.456 -7.456,7.456 -4.11783,0 -7.456,-3.33817 -7.456,-7.456 0,-4.11784 3.33817,-7.456 7.456,-7.456 4.11784,0 7.456,3.33816 7.456,7.456 z\" cx=\"119.88\" transform=\"matrix(0.56003347,0,0,0.56003347,0,147.73724)\" cy=\"384.94\" r=\"7.456\"></circle></g></g></g></svg></div><div class=\"afisha-grid--i aqua\"><div class=\"afisha-grid__item-name\">4X</div><div class=\"afisha-grid__item-desc\">Этажный аквариум<br/>2500 рыб</div></div></div></div><div class=\"afisha-grid__item grid-cell-4 is-hidden\"><div class=\"afisha-grid__wrap afisha-grid--map\"><div class=\"svg-anim\"><a href=\"/about.html#route\"><svg id=\"svgmap\" width=\"100%\" viewbox=\"0 0 280 230\" enable-background=\"new 0 0 280 230\"><g><g id=\"pin1\" fill=\"#CBF5FF\" opacity=\"0\"><path d=\"M221.063,87.95l-0.935-1.133c-0.59-0.892-14.831-16.924-14.831-25.232c0-8.582,7.069-15.585,15.766-15.585                                           c8.697,0,15.767,7.003,15.767,15.585c0,8.308-14.276,24.374-14.9,25.267L221.063,87.95L221.063,87.95z M221.063,47.923                                           c-7.623,0-13.79,6.145-13.79,13.663c0,6.351,10.811,18.984,13.79,22.898c3.327-4.429,13.791-16.272,13.791-22.898                                           C234.819,54.068,228.651,47.923,221.063,47.923L221.063,47.923z\"></path><path d=\"M221.063,66.873c-2.944,0-5.336-2.369-5.336-5.287c0-2.883,2.392-5.252,5.336-5.252c2.911,0,5.301,2.369,5.301,5.252                                           C226.363,64.504,223.974,66.873,221.063,66.873L221.063,66.873z M221.063,58.393c-1.802,0-3.257,1.442-3.257,3.192                                           c0,1.786,1.455,3.228,3.257,3.228c1.768,0,3.223-1.442,3.223-3.228C224.285,59.835,222.83,58.393,221.063,58.393L221.063,58.393z\"></path></g><g id=\"pin2\" fill=\"#CBF5FF\"><path d=\"M140.604,117.096l-1.697-2.094c-1.108-1.614-27.201-30.999-27.201-46.173c0-15.792,12.959-28.63,28.898-28.63                                           c15.939,0,28.899,12.839,28.899,28.63c0,15.174-26.161,44.628-27.271,46.241L140.604,117.096L140.604,117.096z M140.604,43.77                                           c-13.929,0-25.294,11.225-25.294,25.06c0,11.568,19.854,34.741,25.294,41.951c6.099-8.103,25.261-29.832,25.261-41.951                                           C165.865,54.995,154.534,43.77,140.604,43.77L140.604,43.77z\"></path><path d=\"M140.604,78.441c-5.371,0-9.736-4.325-9.736-9.646s4.366-9.612,9.736-9.612c5.371,0,9.737,4.291,9.737,9.612                                           S145.941,78.441,140.604,78.441L140.604,78.441z M140.604,62.925c-3.292,0-5.925,2.644-5.925,5.904                                           c0,3.228,2.633,5.871,5.925,5.871c3.257,0,5.926-2.643,5.926-5.871C146.53,65.568,143.861,62.925,140.604,62.925L140.604,62.925z\"></path></g><g id=\"pin3\" fill=\"#CBF5FF\" opacity=\"0\"><path d=\"M61.671,87.95l-0.936-1.133c-0.589-0.892-14.831-16.924-14.831-25.232C45.905,53.003,52.974,46,61.671,46                                           c8.698,0,15.766,7.003,15.766,15.585c0,8.308-14.275,24.374-14.865,25.267L61.671,87.95L61.671,87.95z M61.671,47.923                                           c-7.623,0-13.791,6.145-13.791,13.663c0,6.351,10.846,18.984,13.791,22.898c3.327-4.429,13.791-16.272,13.791-22.898                                           C75.462,54.068,69.26,47.923,61.671,47.923L61.671,47.923z\"></path><path d=\"M61.671,66.873c-2.91,0-5.301-2.369-5.301-5.287c0-2.883,2.391-5.252,5.301-5.252c2.911,0,5.302,2.369,5.302,5.252                                           C66.973,64.504,64.582,66.873,61.671,66.873L61.671,66.873z M61.671,58.393c-1.802,0-3.257,1.442-3.257,3.192                                           c0,1.786,1.456,3.228,3.257,3.228c1.768,0,3.223-1.442,3.223-3.228C64.894,59.835,63.439,58.393,61.671,58.393L61.671,58.393z\"></path></g><g id=\"lines\" stroke=\"#CBF5FF\"><line fill=\"none\" stroke-width=\"2.2148\" stroke-miterlimit=\"10\" stroke-dasharray=\"8.9705,2.2356\" x1=\"217.979\" y1=\"87.95\" x2=\"144.243\" y2=\"117.096\"></line><line fill=\"none\" stroke-width=\"2.2148\" stroke-miterlimit=\"10\" stroke-dasharray=\"8.9705,2.2356\" x1=\"137.174\" y1=\"117.096\" x2=\"64.305\" y2=\"87.95\"></line></g><rect id=\"svg-map-rect\" fill=\"#CBF5FF\" x=\"0\" y=\"0\" width=\"280\" height=\"0\"></rect></g></svg></a></div><div class=\"afisha-grid-map-content\"><a href=\"/about.html#route\" class=\"btn btn--skyblue\">Как добраться</a><div class=\"afisha-grid--map__on-map\">На карте</div></div></div></div><div class=\"afisha-grid__item grid-cell-5 is-hidden\"><div class=\"afisha-grid__wrap afisha-grid--yellow-bg afisha-grid--kidzania\"><div class=\"svg-anim\"><a href=\"/kids/1496-KidZania\"><svg id=\"svgkidz\" viewbox=\"0 0 280 230\"><path id=\"helic\" opacity=\"0.7\" transform=\"translate(0,-150)\" style=\"fill:#ffffff;\" d=\"m24.539,41.434c0.14165,0.015,0.28592,0.0447,0.43265,0.0891l7.8401,2.3742,6.8321,2.069c0.39255-0.21541,0.79206-0.40781,1.1922-0.57914l0.18979-0.0748c0.71766-0.27712,1.4709-0.48777,2.2348-0.61856l0.002-0.007c0.84567-0.14784,1.73-0.19342,2.6109-0.13559,0.85343,0.0565,1.72,0.20748,2.5684,0.46441l3.0046,0.90989,1.02-3.3682-19.099-5.7839c-0.74637-0.22602-1.1733-1.0239-0.9473-1.7702,0.22603-0.74638,1.0239-1.1733,1.7703-0.94729l19.099,5.7839,1.0219-3.3746-15.482-4.6886c-0.75275-0.22796-1.1752-1.0175-0.94729-1.7703,0.22602-0.74637,1.0156-1.1689,1.7683-0.94091,13.639,4.1302,20.043,6.0698,33.676,10.198,0.74636,0.22602,1.1752,1.0175,0.94922,1.7639-0.22796,0.75276-1.0239,1.1733-1.7702,0.9473l-15.482-4.6886-1.0219,3.3746,19.099,5.7839c0.74636,0.22603,1.1669,1.022,0.94091,1.7683-0.22602,0.74636-1.0175,1.1752-1.7639,0.94923l-19.099-5.7839-1.02,3.3682,3.011,0.91183c1.4608,0.44239,2.7754,1.1608,3.8998,2.0933,1.1716,0.96066,2.1255,2.134,2.8257,3.4325,0.70018,1.2985,1.1388,2.7475,1.2945,4.2572,0.14562,1.4509,0.0185,2.9515-0.42388,4.4123-0.44239,1.4608-1.1692,2.7798-2.0952,3.9062-0.96512,1.1633-2.1404,2.1236-3.4389,2.8238-1.2984,0.70018-2.7475,1.1388-4.2552,1.2882-1.4528,0.15199-2.9515,0.0185-4.4059-0.42196l-4.3698-1.3233-4.3634-1.3214c-1.244-0.37671-2.3776-0.95677-3.3933-1.6962-1.0457-0.75541-1.9422-1.6816-2.6539-2.7119-0.70535-1.0284-1.2495-2.1752-1.595-3.3801-0.20947-0.7111-0.33912-1.4329-0.40227-2.1902l-5.7074-3.2535-6.8605-3.9301c-0.19061-0.10652-0.36326-0.2493-0.51484-0.39269-1.5559,0.76846-3.3996,0.96924-5.1921,0.42639-1.8691-0.56602-3.3342-1.8454-4.1925-3.4494l-0.005-0.009c-0.85198-1.6021-1.11-3.5327-0.54397-5.4018,0.56602-1.8691,1.8473-3.3405,3.4514-4.1989l0.009-0.005c1.6021-0.85197,3.5327-1.11,5.4018-0.54396,1.8691,0.56603,3.3405,1.8473,4.1989,3.4514l0.005,0.009c0.32272,0.61309,0.55731,1.2413,0.69795,1.9037zm-3.1804-0.55922c-0.51338-0.94939-1.393-1.7242-2.5285-2.068-1.1291-0.34193-2.2889-0.19171-3.2446,0.31973l-0.009,0.005c-0.95576,0.51145-1.7242,1.393-2.068,2.5285-0.34386,1.1355-0.19809,2.287,0.31973,3.2446l0.005,0.009c0.51145,0.95577,1.3911,1.7306,2.5202,2.0725,1.1355,0.34387,2.2953,0.19365,3.253-0.32417l0.009-0.005c0.95577-0.51145,1.7222-1.3866,2.0661-2.5222,0.34387-1.1355,0.19809-2.287-0.32225-3.2594zm42.119,28.243c0.22602-0.74637,1.0175-1.1752,1.7639-0.94923,0.75275,0.22796,1.1733,1.0239,0.94729,1.7702-0.70125,2.3157-2.2829,4.1349-4.2775,5.2023-1.978,1.0585-4.3729,1.3779-6.695,0.67468l-25.804-7.8142c-0.74637-0.22603-1.1733-1.0239-0.9473-1.7703,0.22603-0.74637,1.0239-1.1733,1.7703-0.9473l25.804,7.8142c1.5693,0.47523,3.1953,0.25728,4.5334-0.45875,1.3464-0.72048,2.4298-1.9524,2.905-3.5217zm-32.027-20.702-6.1432-1.8604,5.1272,2.9386,6.8708,3.9192c0.74775,0.42841,1.2282,1.2564,1.1882,2.1705-0.0409,0.73279,0.0428,1.4685,0.24974,2.1649,0.20503,0.70279,0.52312,1.3772,0.94037,1.9771,0.42615,0.61653,0.95144,1.1586,1.5498,1.5975,0.57669,0.41839,1.2398,0.75848,1.9861,0.9845l4.3634,1.3214,4.3698,1.3233c0.8612,0.2608,1.7363,0.33777,2.5709,0.24928,0.86848-0.0852,1.7215-0.34922,2.4963-0.76922,0.77292-0.41359,1.4702-0.96848,2.0249-1.6502,0.52837-0.64088,0.94982-1.4116,1.2126-2.2792,0.26273-0.86759,0.33969-1.7427,0.25757-2.5754-0.0852-0.86847-0.35559-1.7234-0.77113-2.4899-0.41166-0.77931-0.97488-1.4722-1.6502-2.0249-0.63894-0.53476-1.4097-0.9562-2.2773-1.2189l-4.3698-1.3233-4.3634-1.3214c-0.51033-0.15455-1.0145-0.23743-1.5111-0.27653-0.50684-0.0281-1.0164-0.001-1.5075,0.0797l-0.007-0.002-0.007-0.002c-0.44709,0.0735-0.87386,0.195-1.2892,0.34778l-0.12083,0.0539c-0.43779,0.1808-0.8489,0.41151-1.2217,0.65377-0.5802,0.44411-1.3621,0.61127-2.1212,0.38138l-7.8464-2.3761-0.002,0.007z\"></path><path id=\"horse\" transform=\"translate(150,50)\" style=\"fill:#ffffff;\" d=\"m280.73,156.24,1.1791,14.02,22.461-1.8891-1.1791-14.02c-7.5015,0.6309-14.974,1.2594-22.461,1.8891zm66.973,34.28c1.8269-2.1624,5.0489-2.448,7.2256-0.62301,2.1624,1.8269,2.4491,5.0633,0.62301,7.2256-32.681,38.731-91.717,43.449-130.16,10.947-2.148-1.8281-2.4203-5.0658-0.59262-7.2282,1.8281-2.1479,5.0657-2.4202,7.2282-0.59262,3.98,3.3625,8.2934,6.3622,12.862,8.9328l0.75485-2.1013c4.2059-11.606,7.4972-33.047,4.4388-45.701-2.1134-8.6869-2.0523,0.34718-6.4868,2.8308-1.9614,1.082-3.8768,0.98108-6.7056,0.22919-0.74457-0.19939-1.4362-0.46145-2.0568-0.74406l-0.001-0.0152-0.0151,0.001c-1.928-0.94412-3.4011-2.3632-4.2721-4.0657-0.88422-1.6869-1.1508-3.6441-0.69222-5.6332l0.0613-0.3107c0.15731-0.55179,0.35812-1.1073,0.61909-1.6387l0.0139-0.0166c0.91764-1.8967,0.68276-3.4781,0.35463-5.6484l-0.002-0.0274-0.001-0.0152c-0.0944-0.60345-0.19984-1.3369-0.32946-2.3595-0.30071-2.5366,0.28561-4.5655,1.0506-6.0272l-5.0553-2.8208c-0.21321-0.11307-0.40132-0.27181-0.58937-0.43077-1.2464-1.147-1.3093-3.1068-0.16245-4.3532,5.445-5.8728,10.757-9.1725,15.793-10.557,4.5378-1.255,8.813-0.95965,12.742,0.41305,3.8231,1.3233,7.2928,3.637,10.371,6.4931,7.294,6.7665,12.505,16.809,14.827,23.469,8.1664-0.68681,16.347-1.3748,24.514-2.0617,7.4168-12.196,26.203-13.645,34.412-1.5404,0.86574,1.1208,0.85611,2.7373-0.097,3.8655l-5.1617,6.1255c-0.66193,0.78349-1.718,1.2071-2.807,1.0658-8.9762-1.3266-7.269,5.4731-4.9469,11.275,3.1149,7.7875,9.7185,26.941,13.703,30.361,3.0768-2.7042,5.9318-5.6226,8.5385-8.7239zm-97.276,21.485c0.93988,0.44499,1.8918,0.85982,2.8425,1.2602,0.95068,0.4004,1.9146,0.78514,2.8918,1.1542,18.337-34.832,45.958-32.308,71.114-6.4904,1.2474-0.74536,2.4766-1.5329,3.6877-2.3625,1.2124-0.81524,2.3922-1.6714,3.5564-2.5407-4.8664-4.729-11.598-24.017-14.747-31.86-3.6121-9.0266-3.7369-20.894,9.814-19.865l2.5152-2.9772c-6.2654-6.8239-18.566-4.5812-22.97,3.2855l1.3688,16.275c0.14102,1.6766-0.42392,3.2671-1.43,4.458s-2.4799,2.0135-4.1565,2.1546l-22.562,1.8976c-1.6766,0.14101-3.2671-0.42393-4.4579-1.43-1.1909-1.0061-2.0135-2.4798-2.1545-4.1565-0.68316-8.1231-0.4458-15.858-3.8845-23.341-2.4735-5.3524-6.3377-11.665-11.311-16.283-2.4795-2.3096-5.2406-4.1589-8.1793-5.1782-2.8326-0.96989-5.8936-1.1928-9.1236-0.30981-3.1577,0.87694-6.5206,2.7755-10.105,6.0173l4.6275,2.5803c1.481,0.82155,2.0185,2.7123,1.1969,4.1934-0.0638,0.10718-0.24044,0.42781-0.33691,0.49412l-0.32137,0.3326c-0.60057,0.64731-1.8088,2.2045-1.6038,3.9486,0.065,0.59134,0.1877,1.367,0.30877,2.1138,0.30516,3.6279,0.79575,5.8282-0.90472,9.3192-0.10002,0.19768-0.16946,0.40723-0.22709,0.58674l-0.0347,0.10469c-0.0899,0.48792-0.0209,0.96246,0.17336,1.3682,0.2774,0.52978,0.78373,1.0112,1.4971,1.3588,0.28787,0.13593,0.61815,0.25358,0.94708,0.35704l0.0151-0.001c1.2205,0.31949,1.9156,0.45025,2.1396,0.34407,0.4166-0.23876,0.96275-1.1872,1.8178-2.9622,1.08-2.216,2.2076-3.6936,3.3296-4.5449l0.16483-0.11569c2.6631-1.9125,5.591-0.84869,7.3262,1.6109,1.2059,1.7035,2.1282,4.3625,2.7964,7.1156,1.7582,7.2321,1.7315,16.434,0.70723,25.37-1.0243,8.9362-3.0726,17.638-5.3288,23.869l-0.50725,1.4109-0.49036,1.4386zm11.665,4.3902c9.8326,2.8557,20.144,3.7934,30.286,2.8822,10.142-0.91124,20.113-3.6712,29.278-8.2411-23.198-21.237-41.989-24.518-59.564,5.3589z\"></path><path id=\"ball\" transform=\"translate(-100,50)\" style=\"fill:#ffffff;\" d=\"m31.692,166.32c18.04,0,32.784,14.745,32.784,32.777,0,9.0447-3.6862,17.235-9.6211,23.17l0.0135,0.008c-5.9349,5.9278-14.133,9.6068-23.184,9.6068-18.039,0-32.77-14.745-32.77-32.777,0-18.039,14.73-32.784,32.777-32.784zm-15.584,13.286c-0.11384-0.59063-0.27754-1.779-0.2633-3.2734-7.2016,5.024-11.727,13.35-11.884,22.267,0.2633-0.54795,0.54082-1.0959,0.83259-1.6296,1.779-3.2308,4.1132-6.1128,6.8813-8.5394-0.0135-0.29887,0-0.60486,0.0285-0.91086,0.24907-3.1311,1.957-6.0061,4.4049-7.9132zm2.9034-5.1806c-0.19213,1.3876-0.16367,2.6401-0.0711,3.5581,0.97491-0.38428,1.9854-0.61911,2.9888-0.7045,1.3236-0.0996,2.6401,0.064,3.8356,0.49814,1.4303-1.2667,4.7394-4.1203,8.1338-6.3405-0.72584-0.057-1.4588-0.0853-2.2131-0.0853-4.5544,0.0135-8.8667,1.1172-12.674,3.0742zm19.541-2.1989c-3.43,1.594-7.8634,5.2731-10.076,7.2087l0.23483,0.23484c1.0176,1.0176,1.7079,2.2345,2.085,3.5652,4.3338-0.54795,17.15-1.2524,27.355,7.5147-2.8607-9.0945-10.34-16.168-19.598-18.523zm20.722,23.917c-9.6993-11.372-23.932-10.475-28.159-9.9199l-0.0135,0.23483c-0.16368,2.0708-1.0034,4.1986-2.4764,6.0132,2.4337,3.6292,11.799,16.872,23.989,24.843,4.2412-4.8675,6.8102-11.236,6.8102-18.21,0.007-1.0034-0.0498-1.9925-0.14939-2.9603zm-8.7956,23.362c-11.955-8.0057-21.156-20.665-24.06-24.921-1.7079,1.2453-3.6577,1.9569-5.5577,2.1135l-0.54084,0.0213c-2.3199,6.9383-1.8644,14.723,1.2667,21.356,1.5015,3.188,3.5723,6.063,6.0843,8.4754,1.3094,0.19213,2.6543,0.29175,4.0135,0.29175,7.2443-0.008,13.848-2.7895,18.794-7.3368zm-28.002,5.7641c-1.4161-1.8218-2.6401-3.8071-3.6292-5.9135-3.3802-7.1802-3.921-15.527-1.5584-23.078-1.1955-0.39139-2.2914-1.0461-3.2094-1.9641-0.72584-0.72585-1.2809-1.5513-1.6652-2.448-1.957,1.9285-3.6293,4.1416-4.96,6.554-1.224,2.1918-2.1562,4.5686-2.754,7.0664,2.1491,9.1585,8.9166,16.666,17.776,19.783zm-0.306-44.967c-3.7929,0.29888-7.1589,3.6577-7.4649,7.4506-0.12809,1.6652,0.36292,3.2734,1.5157,4.4191,0.84683,0.86105,1.9712,1.3521,3.1809,1.4873h0.0285c0.39139,0.0355,0.7899,0.0427,1.1955,0.0135,3.7929-0.29888,7.1589-3.6648,7.4648-7.4506,0.12809-1.6652-0.36292-3.2734-1.5015-4.4191-1.1528-1.1386-2.754-1.6367-4.4192-1.5015z\"></path><path id=\"pult\" transform=\"translate(0,150)\" style=\"fill:#ffffff;\" d=\"m134.39,191.54v-2.7101h-9.3902c-3.5701,0-6.5202,2.9501-6.5202,6.5402v2.8601h8.3002c0.20993-3.7301,3.3801-6.6902,7.1102-6.6902h0.50001zm0-6.9602v-9.7203c0-1.15,0.55002-2.1901,1.41-2.8301v-14.27c0-1.17,0.96003-2.12,2.1301-2.12,1.17,0,2.1301,0.95002,2.1301,2.12v14.27c0.86002,0.64002,1.43,1.6801,1.43,2.8301v9.7203h9.3802c5.9002,0,10.78,4.8901,10.78,10.79v2.8601h5.7202c6.8402,0,12.48,5.6402,12.48,12.47v24.941c0,6.8402-5.6402,12.48-12.48,12.48h-58.872c-6.8202,0-12.48-5.6601-12.48-12.48v-24.941c0-6.8402,5.6401-12.47,12.48-12.47h5.7202v-2.8601c0-5.9202,4.8801-10.79,10.78-10.79h9.3902zm7.0902,4.2501v2.7101h0.51003c3.7101,0,6.8802,2.9901,7.1102,6.6902h8.3002v-2.8601c0-3.5701-2.9701-6.5402-6.5402-6.5402h-9.3803zm13.63,30.801c1.9501,0,3.5501,1.59,3.5501,3.5501,0,1.95-1.6,3.5401-3.5501,3.5401s-3.5401-1.58-3.5401-3.5401c0.0105-1.9601,1.59-3.5501,3.5401-3.5501zm-34.371,0c1.95,0,3.5501,1.59,3.5501,3.5501,0,1.95-1.6,3.5401-3.5501,3.5401s-3.5401-1.58-3.5401-3.5401,1.59-3.5501,3.5401-3.5501zm34.371-9.5702c3.6101,0,6.8902,1.47,9.2802,3.8501,2.3601,2.3601,3.8501,5.6502,3.8501,9.2703,0,3.6001-1.46,6.8802-3.8501,9.2702h-0.019v0.0105c-2.3601,2.3701-5.6601,3.8401-9.2602,3.8401-3.6101,0-6.8902-1.46-9.2802-3.8501-2.3601-2.3601-3.8301-5.6401-3.8301-9.2702,0-3.6101,1.46-6.9002,3.8301-9.2702,2.3901-2.3801,5.6702-3.8501,9.2802-3.8501zm6.2702,6.8502c-1.6-1.6-3.8301-2.6001-6.2702-2.6001s-4.6701,1-6.2702,2.6001c-1.6,1.5901-2.6001,3.8101-2.6001,6.2602s1,4.6801,2.6001,6.2702c1.6,1.6,3.8301,2.6001,6.2702,2.6001,2.4601,0,4.6701-1,6.2702-2.59v-0.0105c1.6-1.59,2.6001-3.8201,2.6001-6.2702s-1-4.6701-2.6001-6.2602zm-40.641-6.8502c3.6101,0,6.9102,1.47,9.2802,3.8501,2.3601,2.3601,3.8501,5.6502,3.8501,9.2703,0,3.6001-1.46,6.8802-3.8501,9.2702h-0.019v0.0105c-2.3601,2.3701-5.6402,3.8401-9.2602,3.8401-3.6201,0-6.8902-1.46-9.2802-3.8501-2.3601-2.3601-3.8301-5.6401-3.8301-9.2702,0-3.6101,1.46-6.9002,3.8501-9.2702,2.3601-2.3801,5.6501-3.8501,9.2602-3.8501zm6.2702,6.8502c-1.6-1.6-3.8301-2.6001-6.2702-2.6001s-4.6701,1-6.2702,2.6001c-1.6,1.5901-2.6001,3.8101-2.6001,6.2602s1,4.6801,2.6001,6.2702c1.6,1.6,3.8301,2.6001,6.2702,2.6001,2.46,0,4.6701-1,6.2702-2.59v-0.0105c1.6-1.59,2.6001-3.8201,2.6001-6.2702s-1-4.6701-2.6001-6.2602zm3.2801-11.6h-21.801c-2.9501,0-5.3901,2.4401-5.3901,5.3901v24.941c0,2.9301,2.46,5.3901,5.3901,5.3901h58.872c2.9501,0,5.3901-2.4501,5.3901-5.3901v-24.941c0-2.9501-2.4201-5.3901-5.3901-5.3901h-21.8c-1.9501,0-3.5401-1.58-3.5401-3.5401v-3.1101l-0.019-0.019-0.019-0.019h-8.1102l-0.019,0.0105-0.019,0.0105v3.129c0.0105,1.96-1.59,3.5401-3.5401,3.5401z\"></path><path id=\"plane\" opacity=\"0.7\" transform=\"translate(0,-150)\" style=\"fill:#ffffff;\" d=\"m193.26,39.994c-1.354,0-2.4581-1.0971-2.4581-2.4581s1.1041-2.465,2.4581-2.465h28.053v-10.527c0-0.81242,0.6666-1.479,1.479-1.479,0.81242,0,1.479,0.66659,1.479,1.479v10.527h28.046c1.354,0,2.4581,1.1041,2.4581,2.465,0,1.354-1.0971,2.4581-2.4581,2.4581h-4.6384l-6.5896,18.13h8.5408c1.354,0,2.4581,1.0971,2.4581,2.4581,0,1.354-1.0971,2.4581-2.4581,2.4581h-18.456l4.5829,6.8882h1.8193v-2.1942c0-0.81242,0.66659-1.4721,1.479-1.4721,0.81242,0,1.479,0.65964,1.479,1.4721v7.3534c0,0.81241-0.66659,1.479-1.479,1.479-0.81243,0-1.479-0.66659-1.479-1.479v-2.1942h-2.6039c-0.54159,0-1.0277-0.30552-1.2915-0.74297l-5.8883-8.8533-0.0833-0.14575c-0.44441,0.21524-0.90965,0.40272-1.3957,0.54855-0.0833,0.90268-0.28469,1.7706-0.56939,2.59-0.43746,1.1804-1.0554,2.2636-1.8193,3.201-0.52773,0.62495-1.4512,0.70828-2.0901,0.18749-0.11108-0.0903-0.20136-0.18749-0.27081-0.31246-0.74298-0.90965-1.3263-1.9512-1.7359-3.0761-0.29859-0.82632-0.49995-1.6943-0.58329-2.59-0.47912-0.14577-0.94434-0.34025-1.3818-0.54855l-0.0902,0.14575-5.8952,8.8533c-0.25692,0.43745-0.73603,0.74297-1.2915,0.74297h-2.6109v2.1942c0,0.81241-0.65967,1.479-1.4721,1.479-0.81242,0-1.479-0.66659-1.479-1.479v-7.3534c0-0.81242,0.66659-1.4721,1.479-1.4721s1.4721,0.65964,1.4721,1.4721v2.1942h1.8262l4.5968-6.8882h-18.463c-1.354,0-2.4581-1.1041-2.4581-2.4581,0-1.361,1.1041-2.4581,2.4581-2.4581h8.5408l-6.5965-18.13h-4.6176zm28.053,1.4096v-1.4096h-20.29l6.5896,18.13h5.0203c-0.84019-1.5971-1.3193-3.4163-1.3193-5.3467,0-0.81936,0.0902-1.6248,0.24998-2.4025-0.73606-0.52079-1.3888-1.1249-1.9512-1.7915-0.79853-0.9513-1.4235-2.0206-1.854-3.1733-0.27775-0.75686,0.10421-1.597,0.86102-1.8818,0.0972-0.0347,0.18055-0.0556,0.27081-0.0764v-0.007c1.2082-0.19443,2.4511-0.19443,3.6732,0.0278,0.86797,0.14577,1.7151,0.41662,2.5345,0.78464,1.6873-1.5137,3.8399-2.5484,6.2146-2.8539zm2.958-1.4096v1.4096c2.3748,0.30552,4.5134,1.3402,6.2146,2.8608,0.82633-0.37495,1.6665-0.63881,2.5206-0.78462,1.236-0.2222,2.4789-0.22915,3.6732-0.0278,0.81242,0.13888,1.3402,0.90268,1.2082,1.7012-0.0132,0.13185-0.0556,0.24997-0.11107,0.36107-0.42358,1.111-1.0277,2.1595-1.8193,3.083-0.55551,0.65966-1.2082,1.2707-1.9512,1.7915,0.17358,0.77076,0.25691,1.5762,0.25691,2.3956,0,1.9234-0.47217,3.7427-1.3124,5.3467h5.0064l6.5896-18.13h-20.276v-0.007zm0.0625,16.401c0.9235,1.2568,1.5346,2.6942,1.8331,4.2079,1.0068-0.43051,1.8956-1.0346,2.6456-1.7915,1.5485-1.5484,2.4928-3.6732,2.4928-6.0341,0-0.32636-0.0132-0.65271-0.0555-0.97906-0.51383,0.17359-1.0416,0.31247-1.5623,0.40969-1.0069,0.18052-2.0068,0.21525-2.9997,0.11796,0.0278,0.15276,0.0278,0.30552,0.0278,0.45829v0.007c0.007,1.5623-0.94435,2.9997-2.3817,3.6038zm-4.937,4.2079c0.29859-1.5068,0.92352-2.958,1.8332-4.2079-1.4235-0.61799-2.3748-2.0206-2.3748-3.6038h-0.007v-0.007c0-0.15276,0.007-0.30553,0.0278-0.45829-0.98601,0.1042-1.9998,0.0625-2.9997-0.11796-0.52077-0.0971-1.0485-0.22915-1.5693-0.40968-0.0278,0.32635-0.0557,0.6527-0.0557,0.97906,0,2.3609,0.95822,4.4857,2.4928,6.0341,0.76382,0.74993,1.6596,1.3679,2.6525,1.7915zm3.3955-1.0277c-0.8263,2.0692-0.8263,4.1246,0,6.1938,0.78463-1.9998,0.86796-4.201,0-6.1938zm2.347-9.9434c0.40969-0.90964,0.95131-1.7707,1.5971-2.5345,0.34025-0.40968,0.72215-0.79852,1.1388-1.1526-3.0136-2.2359-7.159-2.2359-10.173-0.007,0.41662,0.36108,0.79157,0.74992,1.1388,1.1596,0.65272,0.76381,1.1804,1.6248,1.5901,2.5345,0.6666-0.48608,1.479-0.78464,2.3609-0.78464,0.88186,0,1.6943,0.29856,2.347,0.78464zm3.5205-0.24303c2.2637-0.32635,3.944-1.3054,5.3675-3.09-2.1942,0.22219-4.0065,1.3888-5.3675,3.09zm-11.756,0c-1.2707-1.7637-3.2427-2.7914-5.3536-3.09,1.3401,1.6943,3.1663,2.8608,5.3536,3.09zm6.5757,4.0968c0.38191-0.38884,0.38191-1.0138,0-1.3957-0.38191-0.38191-1.0138-0.38191-1.3957,0-0.38191,0.38884-0.38191,1.0138,0,1.3957,0.3958,0.38191,1.0207,0.37498,1.3957,0z\"></path></svg></a></div></div></div><div class=\"afisha-grid__item grid-cell-6 is-hidden\"><div class=\"afisha-grid__wrap afisha-grid--dark-blue-bg afisha-grid--internet\"><div class=\"svg-anim\"><svg id=\"svgwifi\" viewbox=\"0 -40 280 230\" width=\"100%\"><g id=\"g1\"><path id=\"center\" style=\"fill:#87decd;\" d=\"m138.56,82.427c-3.4105,0-6.1852-2.7761-6.1852-6.1881,0-3.4091,2.7746-6.1837,6.1852-6.1837,3.4105,0,6.1852,2.7739,6.1852,6.1837,0,3.412-2.7746,6.1881-6.1852,6.1881zm0-9.4106c-1.7774,0-3.224,1.4458-3.224,3.2225,0,1.7797,1.4465,3.2269,3.224,3.2269,1.7774,0,3.224-1.4473,3.224-3.2269,0-1.7767-1.4465-3.2225-3.224-3.2225z\"></path><path id=\"w1\" style=\"fill:#87decd;\" d=\"m153.78,66.31c-0.42716,0-0.8506-0.18359-1.1438-0.53968-3.5171-4.2708-8.7051-6.7197-14.234-6.7197-5.3494,0-10.427,2.3201-13.932,6.3673-0.53524,0.61741-1.4702,0.68551-2.0884,0.1488-0.61814-0.53597-0.68477-1.4702-0.14954-2.0891,4.0687-4.695,9.9629-7.3874,16.171-7.3874,6.4169,0,12.438,2.842,16.519,7.7983,0.51969,0.63221,0.42937,1.5642-0.20136,2.0839-0.27613,0.22727-0.61,0.33757-0.94091,0.33757z\"></path><path id=\"w2\" style=\"fill:#87decd;\" d=\"m164.33,53.93c-0.40643,0-0.81137-0.16657-1.1038-0.49304-6.3162-7.0543-15.367-11.1-24.83-11.1-9.2781,0-18.21,3.9162-24.504,10.743-0.55448,0.60038-1.4902,0.63962-2.0921,0.08439-0.60186-0.55448-0.63887-1.491-0.0851-2.0921,6.8536-7.434,16.578-11.697,26.681-11.697,10.304,0,20.158,4.4055,27.036,12.085,0.54486,0.60926,0.49378,1.545-0.11548,2.0906-0.28279,0.25392-0.63517,0.37903-0.98681,0.37903z\"></path><path id=\"w3\" style=\"fill:#87decd;\" d=\"m174.16,42.286c-0.39828,0-0.79507-0.1599-1.0875-0.47601-8.9094-9.6416-21.546-15.172-34.67-15.172-13.125,0-25.317,5.2605-34.328,14.813-0.56188,0.59594-1.4991,0.62185-2.0928,0.06144-0.5952-0.56188-0.62259-1.4984-0.0614-2.0928,9.5757-10.152,22.532-15.742,36.482-15.742,13.946,0,27.375,5.8765,36.844,16.124,0.55522,0.60112,0.5182,1.5376-0.0822,2.0928-0.28501,0.26206-0.64553,0.39236-1.0053,0.39236z\"></path></g></svg></div><div class=\"afisha-grid--i afisha-grid-wi-fi\"><div>Скоростной<br/>интернет</div></div></div></div></div></div></div><div class=\"centered-content\"><div class=\"events-bar is-hidden\"><a href=\"/actions\" class=\"events-bar__all-events\"><div><svg class=\"ico icon icon-calendar events-bar__all-events-ico\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-calendar\"></use></svg><div class=\"events-bar__text-link\">Все события</div></div></a><div class=\"events-bar__map\"><div><div class=\"events-bar__map-ico-wrap\"><svg class=\"ico icon icon-marker-2 events-bar__map-ico\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-marker-2\"></use></svg></div><a href=\"/actions\" class=\"events-bar__map-link\">Показать на карте</a></div></div></div><div class=\"swiper-container stock-slider js-stock-slider\"><div class=\"swiper-wrapper\"><div class=\"swiper-slide stock-item is-hidden stock-item--theme-skyblue\"><div data-tooltip=\"Добавить в избранное\" class=\"badge badge--favor badge--favor-stock js-tooltip-top\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg></div><a href=\"/actions/1811-corsocomo-summer-collection\" class=\"stock-item__img-link\"><img data-no-retina=\"\" src=\"/img/uploads/269_01.jpg\" alt=\"\" class=\"stock-item__img\"/></a><div class=\"stock-item__info\"><div class=\"stock-item__shop\">CorsoComo</div><div class=\"stock-item__desc\">Более 100 новых моделей босоножек из актуальной летней коллекции появились в продаже в магазинах сети CORSOCOMO!</div><div class=\"stock-item__details\"><i class=\"stock-item__collection-ico\"><svg class=\"icon icon-collection\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-collection\"></use></svg></i><a href=\"/actions/1811-corsocomo-summer-collection\" class=\"stock-item__detail-text-link\">Показать коллекцию</a></div></div><div class=\"stock-item__footer\"><div class=\"stock-item__discount\"><i class=\"stock-item__discount-ico stock-item__discount-ico--perc\"><svg class=\"ico icon icon-badge\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-badge\"></use></svg></i>                  10%</div><div class=\"stock-item__price\"><span class=\"stock-item__price-val\">6400</span><span class=\"stock-item__currency\">руб</span></div></div></div><div class=\"swiper-slide stock-item is-hidden stock-item--theme-skyblue\"><div data-tooltip=\"Добавить в избранное\" class=\"badge badge--favor badge--favor-stock js-tooltip-top\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg></div><a href=\"/actions/1804-m-a-c-wash-dry\" class=\"stock-item__img-link\"><img data-no-retina=\"\" src=\"/img/uploads/269_02.jpg\" alt=\"\" class=\"stock-item__img\"/></a><div class=\"stock-item__info\"><div class=\"stock-item__shop\">M∙A∙C</div><div class=\"stock-item__desc\">M∙A∙C открывает новый сезон! Яркие свежие цвета из летней коллекции Wash & Dry идеально подойдут для жаркого дня.</div><div class=\"stock-item__details\"><i class=\"stock-item__collection-ico\"><svg class=\"icon icon-collection\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-collection\"></use></svg></i><span href=\"/actions/1804-m-a-c-wash-dry\" class=\"stock-item__detail-text-link\">Показать коллекцию</span></div></div><div class=\"stock-item__footer\"><div class=\"stock-item__discount\"><i class=\"stock-item__discount-ico stock-item__discount-ico--perc\"><svg class=\"ico icon icon-badge\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-badge\"></use></svg></i>                  50%</div><div class=\"stock-item__price\"><span class=\"stock-item__price-val\">10000</span><span class=\"stock-item__currency\">руб</span></div></div></div><div class=\"swiper-slide stock-item is-hidden stock-item--theme-skyblue\"><div data-tooltip=\"Добавить в избранное\" class=\"badge badge--favor badge--favor-stock js-tooltip-top\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg></div><a href=\"http://dev.avia.kknopka.ru/shops/1522-Mango\" class=\"stock-item__img-link\"><img data-no-retina=\"\" src=\"/img/uploads/269_03.jpg\" alt=\"\" class=\"stock-item__img\"/></a><div class=\"stock-item__info\"><div class=\"stock-item__shop\">Mango</div><div class=\"stock-item__desc\">Две иконы стиля Кейт Мосс и Кара Делевень представят новую рекламную кампанию испанского бренда MANGO сезона Осень-Зима 2015-16.</div><div class=\"stock-item__details\"><i class=\"stock-item__collection-ico\"><svg class=\"icon icon-collection\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-collection\"></use></svg></i><a href=\"http://dev.avia.kknopka.ru/shops/1522-Mango\" class=\"stock-item__detail-text-link\">Показать коллекцию</a></div></div></div><div class=\"swiper-slide stock-item is-hidden stock-item--theme-yellow\"><div data-tooltip=\"Добавить в избранное\" class=\"badge badge--favor badge--favor-stock js-tooltip-top\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg></div><a href=\"/actions/1817-pri-pokupke-pidzhaka-50-na-briuki-v-lexmer\" class=\"stock-item__img-link\"><img data-no-retina=\"\" src=\"/img/uploads/269_04.jpg\" alt=\"\" class=\"stock-item__img\"/></a><div class=\"stock-item__info\"><div class=\"stock-item__shop\">Lexmer</div><div class=\"stock-item__desc\">При покупке пиджака -50% на брюки в LEXMER</div><div class=\"stock-item__details\"><i class=\"stock-item__discount-ico\"><svg class=\"icon icon-badge\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-badge\"></use></svg></i><a href=\"/actions/1817-pri-pokupke-pidzhaka-50-na-briuki-v-lexmer\" class=\"stock-item__detail-text-link\">Показать скидку</a></div></div></div><div class=\"swiper-slide stock-item is-hidden stock-item--theme-pink\"><div data-tooltip=\"Добавить в избранное\" class=\"badge badge--favor badge--favor-stock js-tooltip-top\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg></div><div class=\"badge badge--send badge--send-stock\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-share badge__ico badge__ico--send\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-share\"></use></svg></div><a href=\"http://dev.avia.kknopka.ru/actions/1806-15-skidki-na-ves-assortiment\" class=\"stock-item__img-link\"><img data-no-retina=\"\" src=\"/img/uploads/269_05.jpg\" alt=\"\" class=\"stock-item__img\"/></a><div class=\"stock-item__info\"><div class=\"stock-item__shop\">Wellensteyn</div><div class=\"stock-item__desc\">С 15 по 30 июня 2015г. в магазинах Wellensteyn -15% cкидки на весь ассортимент</div><div class=\"stock-item__details\"><i class=\"stock-item__calendar-ico\"><svg class=\"icon icon-calendar\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-calendar\"></use></svg></i><span class=\"stock-item__detail-text\">С 1 апреля по 14 апреля</span></div></div><div class=\"stock-item__footer\"><div class=\"stock-item__discount\"><i class=\"stock-item__discount-ico stock-item__discount-ico--perc\"><svg class=\"ico icon icon-badge\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-badge\"></use></svg></i>30%</div><div class=\"stock-item__price\"><span class=\"stock-item__price-val\">10000</span><span class=\"stock-item__currency\">руб</span></div></div><ul class=\"stock-item__offers\"><li data-tooltip=\"Летняя распродажа\" class=\"stock-item__offer js-tooltip-top\"><svg class=\"icon icon-percents stock-item__offer-ico stock-item__offer-ico--sale\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-percents\"></use></svg></li><li data-tooltip=\"Скидка\" class=\"stock-item__offer js-tooltip-top\"><svg class=\"icon icon-sun stock-item__offer-ico stock-item__offer-ico--summer-sale\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-sun\"></use></svg></li><li data-tooltip=\"Подарок\" class=\"stock-item__offer js-tooltip-top\"><svg class=\"icon icon-gift stock-item__offer-ico stock-item__offer-ico--gift\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-gift\"></use></svg></li><li data-tooltip=\"Программа лояльности\" class=\"stock-item__offer js-tooltip-top\"><svg class=\"icon icon-pig stock-item__offer-ico stock-item__offer-ico--loyalty\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-pig\"></use></svg></li></ul></div><div class=\"swiper-slide stock-item is-hidden stock-item--theme-purple\"><div data-tooltip=\"Добавить в избранное\" class=\"badge badge--favor badge--favor-stock js-tooltip-top\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg></div><a href=\"/actions/1797-pitctca-barbekiu-na-tonkom-teste-vsego-75-rublei-za-kusok\" class=\"stock-item__img-link\"><img data-no-retina=\"\" src=\"/img/uploads/269_06.jpg\" alt=\"\" class=\"stock-item__img\"/></a><div class=\"stock-item__info\"><div class=\"stock-item__shop\">SBARRO</div><div class=\"stock-item__desc\">Пицца Барбекю на тонком тесте – всего 75 рублей за кусок</div><div class=\"stock-item__details\"><i class=\"stock-item__rupor-ico\"><svg class=\"ico icon icon-rupor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-rupor\"></use></svg></i><a href=\"/actions/1797-pitctca-barbekiu-na-tonkom-teste-vsego-75-rublei-za-kusok\" class=\"stock-item__detail-text-link\">Показать новость</a></div></div></div></div></div><div class=\"clear\"></div><div class=\"shops-slider-wrap\"><div class=\"all-shops\"><a href=\"/shops\" class=\"all-shops__link btn btn--dark\">Все магазины</a></div><div class=\"swiper-container shops-slider js-shops-slider\"><div class=\"swiper-wrapper\"><div class=\"swiper-slide shops-slider__item js-shops-slider__item\"><img data-no-retina=\"\" src=\"img/uploads/shop_01.jpg\" alt=\"\"/><div class=\"shops-slider__hidden-content\"><div><img data-no-retina=\"\" src=\"img/uploads/shop_01.jpg\" alt=\"\" class=\"shop-popup__img\"/><p class=\"shop-popup__text\"></p><div class=\"shop-popup__shop\">Признанный лидер среди гипермаркетов в России</div></div></div></div><div class=\"swiper-slide shops-slider__item js-shops-slider__item\"><img data-no-retina=\"\" src=\"img/uploads/shop_02.jpg\" alt=\"\"/><div class=\"shops-slider__hidden-content\"><div><img data-no-retina=\"\" src=\"img/uploads/shop_02.jpg\" alt=\"\" class=\"shop-popup__img\"/><p class=\"shop-popup__text\"></p><div class=\"shop-popup__shop\">Актуальные тренды сезона, яркая молодежная мода</div></div></div></div><div class=\"swiper-slide shops-slider__item js-shops-slider__item\"><img data-no-retina=\"\" src=\"img/uploads/shop_03.jpg\" alt=\"\"/><div class=\"shops-slider__hidden-content\"><div><img data-no-retina=\"\" src=\"img/uploads/shop_03.jpg\" alt=\"\" class=\"shop-popup__img\"/><p class=\"shop-popup__text\"></p><div class=\"shop-popup__shop\">Флагманский магазин крупнейшей британской сети универмагов</div></div></div></div><div class=\"swiper-slide shops-slider__item js-shops-slider__item\"><img data-no-retina=\"\" src=\"img/uploads/shop_04.jpg\" alt=\"\"/><div class=\"shops-slider__hidden-content\"><div><img data-no-retina=\"\" src=\"img/uploads/shop_04.jpg\" alt=\"\" class=\"shop-popup__img\"/><p class=\"shop-popup__text\"></p><div class=\"shop-popup__shop\">Гипермаркет спортивных товаров по непревзойденным ценам</div></div></div></div><div class=\"swiper-slide shops-slider__item js-shops-slider__item\"><img data-no-retina=\"\" src=\"img/uploads/shop_05.jpg\" alt=\"\"/><div class=\"shops-slider__hidden-content\"><div><img data-no-retina=\"\" src=\"img/uploads/shop_05.jpg\" alt=\"\" class=\"shop-popup__img\"/><p class=\"shop-popup__text\"></p><div class=\"shop-popup__shop\">Актуальные и качественные предметы гардероба по лучшей цене</div></div></div></div><div class=\"swiper-slide shops-slider__item js-shops-slider__item\"><img data-no-retina=\"\" src=\"img/uploads/shop_06.jpg\" alt=\"\"/><div class=\"shops-slider__hidden-content\"><div><img data-no-retina=\"\" src=\"img/uploads/shop_06.jpg\" alt=\"\" class=\"shop-popup__img\"/><p class=\"shop-popup__text\"></p><div class=\"shop-popup__shop\">Российская сеть мебели и аксессуаров для дома</div></div></div></div><div class=\"swiper-slide shops-slider__item js-shops-slider__item\"><img data-no-retina=\"\" src=\"img/uploads/shop_07.jpg\" alt=\"\"/><div class=\"shops-slider__hidden-content\"><div><img data-no-retina=\"\" src=\"img/uploads/shop_07.jpg\" alt=\"\" class=\"shop-popup__img\"/><p class=\"shop-popup__text\"></p><div class=\"shop-popup__shop\">Супертехнологичный  кинотеатр нового поколения SKY17</div></div></div></div><div class=\"swiper-slide shops-slider__item js-shops-slider__item\"><img data-no-retina=\"\" src=\"img/uploads/shop_08.jpg\" alt=\"\"/><div class=\"shops-slider__hidden-content\"><div><img data-no-retina=\"\" src=\"img/uploads/shop_08.jpg\" alt=\"\" class=\"shop-popup__img\"/><p class=\"shop-popup__text\"></p><div class=\"shop-popup__shop\">Образовательно-развлекательный парк для детей</div></div></div></div><div class=\"swiper-slide shops-slider__item js-shops-slider__item\"><img data-no-retina=\"\" src=\"img/uploads/shop_09.jpg\" alt=\"\"/><div class=\"shops-slider__hidden-content\"><div><img data-no-retina=\"\" src=\"img/uploads/shop_09.jpg\" alt=\"\" class=\"shop-popup__img\"/><p class=\"shop-popup__text\"></p><div class=\"shop-popup__shop\">Коллекции лучших европейских марок</div></div></div></div><div class=\"swiper-slide shops-slider__item js-shops-slider__item\"><img data-no-retina=\"\" src=\"img/uploads/shop_10.jpg\" alt=\"\"/><div class=\"shops-slider__hidden-content\"><div><img data-no-retina=\"\" src=\"img/uploads/shop_10.jpg\" alt=\"\" class=\"shop-popup__img\"/><p class=\"shop-popup__text\"></p><div class=\"shop-popup__shop\">Магазин одежды, представляющий новые тенденции в женской моде</div></div></div></div><div class=\"swiper-slide shops-slider__item js-shops-slider__item\"><img data-no-retina=\"\" src=\"img/uploads/shop_11.jpg\" alt=\"\"/><div class=\"shops-slider__hidden-content\"><div><img data-no-retina=\"\" src=\"img/uploads/shop_11.jpg\" alt=\"\" class=\"shop-popup__img\"/><p class=\"shop-popup__text\"></p><div class=\"shop-popup__shop\">Лидер европейского розничного рынка бытовой техники и электроники</div></div></div></div><div class=\"swiper-slide shops-slider__item js-shops-slider__item\"><img data-no-retina=\"\" src=\"img/uploads/shop_12.jpg\" alt=\"\"/><div class=\"shops-slider__hidden-content\"><div><img data-no-retina=\"\" src=\"img/uploads/shop_12.jpg\" alt=\"\" class=\"shop-popup__img\"/><p class=\"shop-popup__text\"></p><div class=\"shop-popup__shop\">Свыше 20 000 наименований бытовой техники и электроники</div></div></div></div><div class=\"swiper-slide shops-slider__item js-shops-slider__item\"><img data-no-retina=\"\" src=\"img/uploads/shop_13.jpg\" alt=\"\"/><div class=\"shops-slider__hidden-content\"><div><img data-no-retina=\"\" src=\"img/uploads/shop_13.jpg\" alt=\"\" class=\"shop-popup__img\"/><p class=\"shop-popup__text\"></p><div class=\"shop-popup__shop\">Магазин товаров для дома и сада</div></div></div></div><div class=\"swiper-slide shops-slider__item js-shops-slider__item\"><img data-no-retina=\"\" src=\"img/uploads/shop_14.jpg\" alt=\"\"/><div class=\"shops-slider__hidden-content\"><div><img data-no-retina=\"\" src=\"img/uploads/shop_14.jpg\" alt=\"\" class=\"shop-popup__img\"/><p class=\"shop-popup__text\"></p><div class=\"shop-popup__shop\">Коллекции одежды  — любимые виды спорта и музыкальные течения</div></div></div></div><div class=\"swiper-slide shops-slider__item js-shops-slider__item\"><img data-no-retina=\"\" src=\"img/uploads/shop_15.jpg\" alt=\"\"/><div class=\"shops-slider__hidden-content\"><div><img data-no-retina=\"\" src=\"img/uploads/shop_15.jpg\" alt=\"\" class=\"shop-popup__img\"/><p class=\"shop-popup__text\"></p><div class=\"shop-popup__shop\">Всё для спорта и активного отдыха для всей семьи</div></div></div></div><div class=\"swiper-slide shops-slider__item js-shops-slider__item\"><img data-no-retina=\"\" src=\"img/uploads/shop_16.jpg\" alt=\"\"/><div class=\"shops-slider__hidden-content\"><div><img data-no-retina=\"\" src=\"img/uploads/shop_16.jpg\" alt=\"\" class=\"shop-popup__img\"/><p class=\"shop-popup__text\"></p><div class=\"shop-popup__shop\">Крупнейших мировой бренд сфере  модной одежды.</div></div></div></div></div></div><div class=\"shops-slider-wrap__strip shops-slider-wrap__strip--left is-hidden\"></div><div class=\"shops-slider-wrap__strip shops-slider-wrap__strip--right is-hidden\"></div></div><div class=\"swiper-container social-slider js-social-slider\"><div id=\"avia-social-slider\" class=\"swiper-wrapper\"></div><div class=\"social-slider__pagination js-social-slider__pagination\"></div></div></div>");;return buf.join("");
};

});

define('snap-main-animations',[],function () {
    return function () {
        (function () {
            var svgrest = Snap('#svgrest');
            var tr_init = 't0,100,s1';
            var tr_init_top = 't0,-150';
            var chair_r = svgrest.select('#chair_r');
            var chair_l = svgrest.select('#chair_l');
            var table = svgrest.select('#table');
            var cup_l = svgrest.select('#cup_l');
            var cup_r = svgrest.select('#cup_r');
            var curtain = svgrest.select('#curtain');
            var rest_container = $('#svgrest');
            var rest_enter = function () {
                chair_l.stop().animate({
                    transform: 't0,65'
                }, 550, mina.backout);
                chair_r.stop().animate({
                    transform: 't0,65'
                }, 600, mina.backout);
                table.stop().animate({
                    transform: 't0,45'
                }, 650, mina.backout);
                cup_l.stop().animate({
                    transform: 't0,47'
                }, 550, mina.backout);
                cup_r.stop().animate({
                    transform: 't0,47'
                }, 500, mina.backout);
                curtain.stop().animate({
                    transform: 't0,-30'
                }, 600, mina.backout);
            };
            var rest_leave = function () {
                chair_r.stop().animate({
                    transform: 'r30,t0,150,s0'
                }, 500, mina.backout);
                chair_l.stop().animate({
                    transform: 'r-30,t0,150,s0'
                }, 500, mina.backout);
                table.stop().animate({
                    transform: tr_init
                }, 500, mina.backout);
                cup_l.stop().animate({
                    transform: tr_init
                }, 500, mina.backout);
                cup_r.stop().animate({
                    transform: tr_init
                }, 500, mina.backout);
                curtain.stop().animate({
                    transform: tr_init_top
                }, 500, mina.backout);
            }
            rest_container.on('mouseenter', function () {
                rest_enter()
            });
            rest_container.on('mouseleave', function () {
                rest_leave();
            });
        })();
        (function () {
            var s = Snap("#svgstores");
            var tr_init = 't0,100,s1';
            var tr_init_top = 't0,-150';
            var pants = s.select('#pants');
            var dress = s.select('#dress');
            var lines_l = s.select('#lines_l');
            var lines_r = s.select('#lines_r');
            var rest_container = $("#svgstores");
            rest_container.on("mouseenter", function (event) {
                rest_enter();
            });
            rest_container.on("mouseleave", function (event) {
                rest_leave();
            });
            var rest_enter = function () {
                pants.stop().animate({
                    transform: 'translate(-145, -174) skewX(0)'
                }, 550, mina.backout);

                dress.stop().animate({
                    transform: 'translate(-175, -174) skewX(0)'
                }, 600, mina.backout);

                lines_l.stop().animate({
                    transform: 'translate(-160, -184)'
                }, 300, mina.linear);
                lines_r.stop().animate({
                    transform: 'translate(-160, -180)'
                }, 300, mina.linear);
            };
            var rest_leave = function () {
                pants.stop().animate({
                    transform: 'translate(-345, -174) skewX(20)'
                }, 550, mina.backout);
                dress.stop().animate({
                    transform: 'translate(45, -174) skewX(-20)'
                }, 600, mina.backout);
                lines_l.stop().animate({
                    transform: 'translate(-360, -174)'
                }, 400, mina.linear);
                lines_r.stop().animate({
                    transform: 'translate(260, -174)'
                }, 400, mina.linear);
            }
        })();
        (function () {
            var svgaqua = Snap("#svgaqua");
            var water = svgaqua.select('#water');
            var fish = svgaqua.select('#fish');
            var bubbles = svgaqua.select('#bubbles');
            var shark = svgaqua.select('#shark');
            var rest_container = $("#svgaqua");
            rest_container.on("mouseenter", function (event) {
                rest_enter();
            });
            rest_container.on("mouseleave", function (event) {
                rest_leave();
            });
            var rest_enter = function () {
                water.stop().animate({
                    transform: 'translate(0, 0)'
                }, 500, mina.linear, rest_enter_fish);
            };
            var rest_enter_fish = function () {
                fish.stop().animate({
                    transform: 'translate(300,-345)'
                }, 1600, mina.linear);
                shark.stop().animate({
                    transform: 'matrix(0.56003347,0,0,0.56003347,-300,-200)'
                }, 1500, mina.linear);
                bubbles.stop().animate({
                    transform: 'translate(0, -50)'
                }, 1900, mina.linear);
            };
            var rest_leave = function () {
                water.stop().animate({
                    transform: 'translate(0, 150)'
                }, 600, mina.linear);
                fish.stop().animate({
                    transform: 'translate(-200,-345)'
                }, 0, mina.linear);
                bubbles.stop().animate({
                    transform: 'translate(0, 0)'
                }, 0, mina.linear);
                shark.stop().animate({
                    transform: 'matrix(0.56003347,0,0,0.56003347,150,-200)'
                }, 0, mina.linear);
            }
        })();
        (function () {
            var s = Snap("#svgmap");
            var rect = s.select('#svg-map-rect')
            var pin1 = s.select('#pin1');
            var pin3 = s.select('#pin3');
            var lines = s.select('#lines');
            rect.attr({
                mask: lines
            });
            var rest_container = $(".afisha-grid--map");
            rest_container.on("mouseenter", function (event) {
                rest_enter();
            });
            rest_container.on("mouseleave", function (event) {
                rest_leave();
            });
            var rest_enter = function () {
                pin1.stop().animate({opacity: 1, transform: 'scale(1.2) translate(-35, -15)'}, 700, mina.bounce);
                pin3.stop().animate({opacity: 1, transform: 'scale(1.2) translate(-10, -15)'}, 400, mina.bounce);
                rect.stop().animate({height: 150}, 800, mina.linear);
                lines.stop().animate({opacity: 1}, 1);
            }
            var rest_leave = function () {
                pin1.stop().animate({opacity: 0, transform: 'scale(1)'}, 600, mina.backout);
                pin3.stop().animate({opacity: 0, transform: 'scale(1)'}, 600, mina.backout);
                lines.stop().animate({opacity: 0}, 600, mina.linear);
                rect.stop().animate({height: 50}, 700, mina.linear);
            }
        })();
        (function () {
            var svgkidz = Snap("#svgkidz");
            var pult = svgkidz.select('#pult');
            var ball = svgkidz.select('#ball');
            var horse = svgkidz.select('#horse');
            var helic = svgkidz.select('#helic');
            var plane = svgkidz.select('#plane');
            var svgkidzcontainer = document.getElementById("svgkidz");
            var svgkidzcontainer = $("#svgkidz");
            svgkidzcontainer.on("mouseenter", function (event) {
                kidz_enter();
            });
            svgkidzcontainer.on("mouseleave", function (event) {
                kidz_leave();
            });
            var kidz_enter = function () {
                pult.stop().animate({
                    transform: 'translate(0, 0)'
                }, 300, mina.backout);
                ball.stop().animate({
                    transform: 'translate(0,0)'
                }, 400, mina.backout);
                horse.stop().animate({
                    transform: 'translate(0,0)'
                }, 450, mina.backout);
                helic.stop().animate({
                    transform: 'translate(0, 0)'
                }, 500, mina.backout);
                plane.stop().animate({
                    transform: 'translate(0, 0)'
                }, 550, mina.backout);
            };
            var kidz_leave = function () {
                pult.stop().animate({
                    transform: 'translate(0, 150)'
                }, 300, mina.linear);
                ball.stop().animate({
                    transform: 'translate(-100,50)'
                }, 400, mina.bounce);
                horse.stop().animate({
                    transform: 'translate(150,50)'
                }, 450, mina.linear);
                helic.stop().animate({
                    transform: 'translate(0,-150)'
                }, 500, mina.linear);
                plane.stop().animate({
                    transform: 'translate(0,-150)'
                }, 500, mina.linear);
            }
        })();
        (function () {
            var svgwifi = Snap("#svgwifi");
            var g1 = svgwifi.select('#g1');
            var center = svgwifi.select('#center');
            var w = [svgwifi.select('#w1'), svgwifi.select('#w2'), svgwifi.select('#w3')];
            var svgwificontainer = $("#svgwifi");
            svgwificontainer.on("mouseenter", function (event) {
                wifi_enter();
            });
            svgwificontainer.on("mouseleave", function (event) {
                wifi_leave();
            });
            var frame = 0;
            var interval;
            var wifi_enter = function () {
                w[0].stop().animate({
                    opacity: '0'
                }, 0, mina.linear);
                w[1].stop().animate({
                    opacity: '0'
                }, 0, mina.linear);
                w[2].stop().animate({
                    opacity: '0'
                }, 0, mina.linear);
                interval = setInterval(function () {
                    if (frame > 2) {
                        w[0].stop().animate({
                            opacity: '0'
                        }, 0, mina.linear);
                        w[1].stop().animate({
                            opacity: '0'
                        }, 0, mina.linear);
                        w[2].stop().animate({
                            opacity: '0'
                        }, 0, mina.linear);
                        frame = 0;
                    } else {
                        w[frame].stop().animate({
                            opacity: '1'
                        }, 200, mina.linear);
                        frame++;
                    }
                }, 150);
            };
            var wifi_leave = function () {
                clearInterval(interval);
                w[0].stop().animate({
                    opacity: '1'
                }, 0, mina.linear);
                w[1].stop().animate({
                    opacity: '1'
                }, 0, mina.linear);
                w[2].stop().animate({
                    opacity: '1'
                }, 0, mina.linear);
            }
        });
    };
});

define('main',[],function () {
  return function () {
    $(function () {

      function extendDroplistHeight() {
        if (window.innerHeight > 1000) {
          $('.js-search-drop').addClass('search-drop--extended');
        }
      }

      $(window).on('resize', extendDroplistHeight);
      extendDroplistHeight();

      var transitionEnd = transitionEndEventName(),
          $noTouch = $('.no-touch'),
          $body = $('body');

      if ($('.js-promo-slider').length) {
        new Swiper('.js-promo-slider', {
          pagination: '.js-promo-slider__pagination',
          paginationClickable: true,
          nextButton: '.js-promo-slider__arrow-next',
          prevButton: '.js-promo-slider__arrow-prev',
          //simulateTouch: false,
          paginationBulletRender: function (index, className) {
            return '<span class="' + className + ' slider-bullet"></span>';
          },
          onTransitionStart: function (swiper) {
            $('.js-promo-slider__brand-item').eq(swiper.activeIndex).addClass('is-active')
                .siblings().removeClass('is-active');
          }
        });
      }

      if ($('.js-afisha-slider').length) {
        new Swiper('.js-afisha-slider', {
          pagination: '.js-afisha-slider__pagination',
          paginationClickable: true,
          //simulateTouch: false,
          paginationBulletRender: function (index, className) {
            return '<span class="' + className + ' slider-bullet"></span>';
          },
          onTransitionStart: function (swiper) {
            $('.js-afisha-slider__film').eq(swiper.activeIndex).addClass('is-active')
                .siblings().removeClass('is-active');
          }
        });
      }

      if ($('.js-cinema__about-slider').length) {
        new Swiper('.js-cinema__about-slider', {
          pagination: '.js-cinema__about-slider-pagination',
          paginationClickable: true,
          simulateTouch: false,
          spaceBetween: 30,
          paginationBulletRender: function (index, className) {
            return '<span class="' + className + ' slider-bullet"></span>';
          }
        });
      }

      if ($('.js-stock-slider').length) {
        new Swiper('.js-stock-slider', {
          slidesPerView: 'auto',
          spaceBetween: 14,
          autoplay: 4000,
          simulateTouch: false,
          autoplayDisableOnInteraction: false
        });
      }

      if ($('.js-shops-slider').length) {
        new Swiper('.js-shops-slider', {
          slidesPerView: 'auto',
          autoplay: 4000,
          simulateTouch: false,
          autoplayDisableOnInteraction: false
        });
      }

      var timeout;
      $('.js-shops-slider__item').on('mouseenter', function () {
        var self = $(this),
            content = self.find('.shops-slider__hidden-content').html();
        $('.shop-popup').removeClass('visible');
        $('<div class="shop-popup">' + content + '</div>').appendTo(document.body);
        var pos = self.offset(),
            popups = $('.shop-popup');
        clearTimeout(timeout);
        popups.last().css({
          top: pos.top - 50,
          left: pos.left
        }).addClass('visible')
            .on('mouseleave', function (ev) {
              var self = $(this);
              self.removeClass('visible');
              timeout = setTimeout(function () {
                popups.remove();
              }, 1000);
            });
      });

      var displaySocialSlider = function(response, params) {
        var data = response.data;
        var blockList = document.getElementById(params);
        for(var i = 0; i < response.data.length; i++) {

          var listItem = document.createElement('div');
          listItem.className = 'swiper-test swiper-slide social-slider__item is-hidden';

          var iconBox = document.createElement('div');
          iconBox.className = 'badge badge--instagram badge--instagram-social-slider';

          var iconBox = document.createElement('div');
          iconBox.className = 'badge badge--instagram badge--instagram-social-slider';

          var iconBoxIn = document.createElement('div');
          iconBoxIn.className = 'badge__bottom';
          iconBox.appendChild(iconBoxIn);

          var iconBoxI = document.createElement('i');
          iconBoxI.className = 'badge__ico badge__ico--instagram';
          iconBox.appendChild(iconBoxI);

          var instaImg = document.createElement('img');
          instaImg.setAttribute("data-no-retina","");
          instaImg.src = response.data[i].images.low_resolution.url;

          listItem.appendChild(instaImg);
          listItem.appendChild(iconBox);
          blockList.appendChild(listItem);
        }

        if ($('.js-social-slider').length) {
          new Swiper('.js-social-slider', {
            slidesPerView: 'auto',
            pagination: '.js-social-slider__pagination',
            paginationClickable: true,
            autoplay: 4000,
            autoplayDisableOnInteraction: false,
            paginationBulletRender: function (index, className) {
              return '<span class="'+className+' slider-bullet slider-bullet--inline"></span>';
            }
          });
        }
      }
      $(function() {
        var fetcher = new Instafetch('b4bb5e8d5d524020aa9fea4618f6e2f3');
        fetcher.fetch({
          user: 1564684296,
          limit: 20,
          callback: displaySocialSlider,
          params: 'avia-social-slider'
        });
      });

      if ($('.js-about-gallery').length) {
        var aboutGallery = new Swiper('.js-about-gallery', {
          onTransitionStart: function (swiper) {
            $('.js-about-gallery-thumbs .about-gallery-thumbs__thumb').eq(swiper.activeIndex).addClass('is-active')
                .siblings().removeClass('is-active');
          }
        });
        $('.js-about-gallery-thumbs').on('click', '.about-gallery-thumbs__thumb', function (ev) {
          aboutGallery.slideTo($(this).index());
        });
      }

      var $win = $(window),
          $fixedHeader = $noTouch.find('#js-l-header:not(.l-header--fixed)'),
          $pusher = $('#js-l-pusher');

      window.addEventListener('scroll', function (event) {
        var s = $win.scrollTop();
        if (s >= 50) {
          s = 50;
          $fixedHeader.addClass('is-fixed');
        } else $fixedHeader.removeClass('is-fixed');
        $fixedHeader.css({
          '-webkit-transform': 'translate3d(0, ' + (-s) + 'px, 0)',
          '-moz-transform': 'translate3d(0, ' + (-s) + 'px, 0)',
          '-ms-transform': 'translate3d(0, ' + (-s) + 'px, 0)',
          'transform': 'translate3d(0, ' + (-s) + 'px, 0)'
        })
      }, false);

      // Lazy load
      if ($noTouch.length) {
        $('.promo-slider').removeClass('is-hidden')
        $('.promo-slider__caption').removeClass('is-hidden')
        $('.grid-cell-1').removeClass('is-hidden').one(transitionEnd, function () {
          $('.grid-cell-2').removeClass('is-hidden');
          $('.grid-cell-3').removeClass('is-hidden');
        });
        $('.grid-cell-3').one(transitionEnd, function () {
          $('.grid-cell-5').removeClass('is-hidden');
          $('.afisha-slider__caption').removeClass('is-hidden');
          $('.js-afisha-slider ').removeClass('is-hidden');
          $('.grid-cell-4').removeClass('is-hidden');
          $('.grid-cell-6').removeClass('is-hidden');
        });

        var $bar = $('.events-bar');
        $('.events-bar').waypoint({
          handler: function () {
            $bar.removeClass('is-hidden');
            $('.stock-slider').removeClass('is-hidden');
            $('.stock-item').removeClass('is-hidden');
          },
          offset: '80%'
        });
        $('.shops-slider-wrap').waypoint({
          handler: function () {
            $('.shops-slider-wrap__strip').removeClass('is-hidden');
          },
          offset: '80%'
        });
        $('.js-social-slider').waypoint({
          handler: function () {
            $('.social-slider__item').removeClass('is-hidden');
          },
          offset: '80%'
        });
      }

      var $shedule = $('.js-shedule-information');
      $('.js-shedule__link').on('click', function (ev) {
        $shedule.hasClass('is-hidden')
            ? $shedule.removeClass('is-hidden')
            : $shedule.addClass('is-hidden');
        ev.stopPropagation();
      });
      $(document).on('click', function (ev) {
        var target = $(ev.target);
        if (!target.closest('.js-shedule-information').length) {
          $shedule.addClass('is-hidden');
        }
      });

      $('.navbar-toggle').on('click', function () {
        $body.addClass('navOpened');
      });
      $('#navBackground').on('click', function () {
        $body.removeClass('navOpened');
      });

      // Tooltip
      var tooltipDefaultSettings = {
        content: {
          attr: 'data-tooltip'
        },
        style: {
          classes: 'tooltip--dark',
          tip: false
        },
        position: {
          my: 'bottom center',
          at: 'top center',
          container: $('#tooltips'),
          adjust: {
            y: -15,
            mouse: false
          },
          effect: function (api, pos) {
            $(this).css(pos);
          }
        },
        show: {
          delay: 60,
          solo: true,
          effect: function () {
            $(this).fadeIn(70);
          }
        },
        hide: {
          effect: function () {
            $(this).fadeOut(35);
          }
        }
      };
      $('.js-tooltip-top').qtip(tooltipDefaultSettings);
      $('.js-tooltip-bottom').qtip($.extend(true, tooltipDefaultSettings, {
        position: {
          my: 'top center',
          at: 'bottom center',
          adjust: {
            y: 12
          }
        }
      }));

      // Search
      $('.js-search-btn').on('click', function () {
        $('.js-search--main').removeClass('is-hidden');
        $('.overlay').removeClass('is-hidden');
      });
      $('.js-search__text-field').on('focus', function () {
        $('.js-search-drop').removeClass('is-hidden');
      });
      $(document).on('click', function (ev) {
        var target = $(ev.target);
        if (!target.closest('#search').length) {
          $('.js-search-drop').addClass('is-hidden');
          $('.overlay').removeClass('is-shown');
        }
      });
      $('.overlay').on('click', function () {
        $('.js-search--main').addClass('is-hidden');
        $('.js-search-drop').addClass('is-hidden');
        $('.overlay').addClass('is-hidden');
      });

      var $storeItems = $('.js-store__items');
      $storeItems.imagesLoaded().done(function () {
        $storeItems.isotope({
          itemSelector: '.stock-item'
        });
      });

      $storeItems.infinitescroll({
            navSelector: '#page_nav',    // selector for the paged navigation
            nextSelector: '#page_nav a',  // selector for the NEXT link (to page 2)
            itemSelector: '.element',     // selector for all items you'll retrieve
            loading: {
              finishedMsg: 'No more pages to load.',
              img: 'http://i.imgur.com/qkKy8.gif'
            }
          }, function (newElements) {
            $storeItems.isotope('appended', $(newElements));
            console.log('123');
          }
      );

      // Category
      $('.js-filter__droplist-point').on('click', function () {
        var categoryList = $('.js-filter-droplist');
        if (categoryList.is(':hidden')) {
          categoryList.removeClass('is-hidden');
        } else {
          categoryList.addClass('is-hidden');
        }
      });
      $(document).on('click', function (ev) {
        var target = $(ev.target);
        if (!target.closest('.filter__droplist-item').length) {
          $('.js-filter-droplist').addClass('is-hidden');
        }
      });

      // Filter
      $('.js-filter__item').on('click', function () {
        $(this).toggleClass('is-active');
      });
      $('.js-filter__favor').on('click', '.badge--favor', function () {
        $(this).toggleClass('is-active');
      });
      $('.js-filter__cleaning').on('click', function () {
        $('.js-filter__item').removeClass('is-active');
      });
      $('.js-filter__item').on('mouseenter', function () {
        $('.js-filter-droplist').addClass('is-hidden');
        $('.js-search-drop').addClass('is-hidden');
      });

      // Store
      $('.js-store__close').on('click', function () {
        $('.js-store').addClass('is-hidden');
      });
      $('.js-btn-show-more-info').on('click', function (ev) {
        var btn = $(this),
            moreInfoBox = $('.store__more-info');
        if (moreInfoBox.is(':hidden')) {
          $('.store__more-info').slideDown(400, function () {
            btn.text('Свернуть');
          });
        } else {
          $('.store__more-info').slideUp(400, function () {
            btn.text('Подробнее');
          });
        }
        ev.preventDefault();
      });
      $('.js-store__fotos-link').on('click', function () {
        $('.js-store-gallery').parent().removeClass('is-hidden');
      });
      if ($('.js-store-gallery').length) {
        var storeGallery = new Swiper('.js-store-gallery', {
          onTransitionStart: function (swiper) {
            $('.js-store-gallery__thumbs .store-gallery__thumb').eq(swiper.activeIndex).addClass('is-active')
                .siblings().removeClass('is-active');
          }
        });
        $('.js-store-gallery__thumbs').on('click', '.store-gallery__thumb', function (ev) {
          storeGallery.slideTo($(this).index());
        });
        $('.js-store-gallery__close').on('click', function () {
          $('.js-store-gallery').parent().addClass('is-hidden');
        });
        $(document).on('keydown', function (ev) {
          var code = ev.which;
          if (!$('.store-gallery').hasClass('is-hidden')) {
            switch (ev.which) {
              case 27:
                $('.store-gallery').addClass('is-hidden');
                break;
              case 37:
                storeGallery.slidePrev();
                break;
              case 39:
                storeGallery.slideNext();
                break;
            }
          }
        });
      }

      $('.jobs_list_text').on('click', function () {
        var $this = $(this);
        if ($this.hasClass('opened')) {
          $this.removeClass('opened').height('');
        } else {
          $('.jobs_list_text').not($this).removeClass('opened').height('').end()
              .filter($this).addClass('opened').css('height', 500);
        }
      });
      $(document).on('click', function (ev) {
        var target = $(ev.target);
        if (!target.closest('.jobs_list_text').length) {
          $('.jobs_list_text').removeClass('opened').css({
            height: ''
          });
        }
      });

      // Contact map
      var contactsMap;

      function initMap() {
        var myLatLng = new google.maps.LatLng(55.792063, 37.527699);
        var mapOptions = {
          center: myLatLng,
          zoom: 13,
          scrollwheel: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [{
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [{"visibility": "off"}, {"color": "#af2727"}]
          }, {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#444444"}]
          }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{"visibility": "on"}, {"color": "#ebe4d8"}]
          }, {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [{"visibility": "off"}]
          }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{"visibility": "simplified"}, {"color": "#e2d9c9"}]
          }, {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{"visibility": "off"}]
          }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{"saturation": -100}, {"lightness": 45}, {"visibility": "off"}, {"color": "#ffcfcf"}]
          }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{"visibility": "off"}, {"color": "#ffffff"}]
          }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{"visibility": "simplified"}]
          }, {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [{"visibility": "off"}]
          }, {
            "featureType": "road.highway",
            "elementType": "labels.icon",
            "stylers": [{"visibility": "off"}]
          }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "all",
            "stylers": [{"visibility": "simplified"}, {"color": "#ffffff"}]
          }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [{"visibility": "simplified"}, {"weight": "0.31"}]
          }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "labels",
            "stylers": [{"visibility": "off"}]
          }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "labels.icon",
            "stylers": [{"visibility": "off"}]
          }, {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [{"weight": "0.35"}, {"visibility": "on"}, {"color": "#ffffff"}]
          }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{"weight": "0.12"}, {"visibility": "on"}]
          }, {
            "featureType": "road.arterial",
            "elementType": "labels.text",
            "stylers": [{"visibility": "off"}]
          }, {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{"visibility": "off"}]
          }, {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [{"visibility": "off"}, {"hue": "#ff0000"}]
          }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{"weight": "0.39"}]
          }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{"visibility": "off"}, {"color": "#ffffff"}]
          }, {
            "featureType": "transit",
            "elementType": "labels.text",
            "stylers": [{"visibility": "off"}]
          }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{"color": "#75d9d1"}, {"visibility": "on"}]
          }, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "off"}]}]
        };
        contactsMap = new google.maps.Map(document.getElementById('contacts-map'), mapOptions);
        var marker = new google.maps.Marker({
          position: myLatLng,
        });
        marker.setMap(contactsMap);
      }

      if (document.getElementById('contacts-map')) {
        google.maps.event.addDomListener(window, 'load', initMap);
        google.maps.event.addDomListener(window, 'resize', function () {
          var center = contactsMap.getCenter();
          google.maps.event.trigger(contactsMap, 'resize');
          contactsMap.setCenter(center);
        });
      }

      $('.js-filter__route-switcher').on('click', function () {
        $('.content--map').toggleClass('map');
      });

    });

    function thumbThreeEnter() {
      thumbThreeCars.stop().animate({transform: 'translate(0, -60%)'}, 200, mina.easeout, function () {
        thumbThreeTopCar.stop().animate({transform: 'translate(0, 3%)'}, 100, mina.easeout, function () {
          thumbThreeTopCar.stop().animate({transform: 'translate(0, 0)'}, 100, mina.easeout);
        });
      });
      thumbThreeHand.stop().animate({transform: 'translate(0, -220%)'}, 200, mina.easeout);
    }

    function thumbThreeLeave() {
      thumbThreeCars.stop().animate({transform: 'translate(0, 0%)'}, 200, mina.easeout, function () {
        thumbThreeTopCar.stop().animate({transform: 'translate(0, 0%)'}, 100, mina.easeout, function () {
          thumbThreeTopCar.stop().animate({transform: 'translate(0, 0)'}, 100, mina.easeout);
        });
      });
      thumbThreeHand.stop().animate({transform: 'translate(0, 0%)'}, 200, mina.easeout);
    }

    function transitionEndEventName() {
      var i,
          undefined,
          el = document.createElement('div'),
          transitions = {
            'transition': 'transitionend',
            'OTransition': 'otransitionend',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
          };
      for (i in transitions) {
        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
          return transitions[i];
        }
      }
    }

    //new code
    $(document).ready(function () {
      //tabs
      $('.tab .tabs').delegate('li:not(.active)', 'click', function () {
        $(this).addClass('active').siblings().removeClass('active').parents('.tab').find('.box').hide().eq($(this).index()).fadeIn(250);
      });

      //------------------------------------------------------------------------//

      //open filter
      $('.open-fb').on('click', function () {
        if ($(this).hasClass('active')) {
          $('.fb-dropdown').hide();
          $(this).removeClass('active');
        } else {
          $('.fb-dropdown').hide();
          $('.open-fb').removeClass('active');
          $(this).addClass('active');
          $(this).parents('.fm--box').find('.fb-dropdown').show();
        }
        ;
      })

      //------------------------------------------------------------------------//

      //user menu
      $('.umb-link').on('click', function () {
        $(this).hide();
        $('.umb-close,.umb-box').show();
        return false;
      });
      $('.umb-close').on('click', function () {
        $(this).hide();
        $('.umb-box').hide();
        $('.umb-link').show();
        return false;
      });

    });

}});


var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('layouts/main',['templates/index', 'snap-main-animations', 'main'], function(IndexTemplate, animations, main, gm) {
  var MainLayout;
  return MainLayout = (function(superClass) {
    extend(MainLayout, superClass);

    function MainLayout() {
      return MainLayout.__super__.constructor.apply(this, arguments);
    }

    MainLayout.prototype.el = $('<section class="section-main layout__home" id="main">');

    MainLayout.prototype.template = IndexTemplate;

    MainLayout.prototype.onShow = function() {
      animations();
      return main();
    };

    return MainLayout;

  })(Backbone.Marionette.LayoutView);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('controllers/home',['layouts/main'], function(MainLayout) {
  var HomeController;
  return HomeController = (function(superClass) {
    extend(HomeController, superClass);

    function HomeController() {
      return HomeController.__super__.constructor.apply(this, arguments);
    }

    HomeController.prototype.initialize = function(options) {
      return this.$el = options.$el;
    };

    HomeController.prototype.go = function() {
      return this.mainLayout || (this.mainLayout = new MainLayout().render());
    };

    return HomeController;

  })(Marionette.Controller);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('controller',['controllers/sections', 'controllers/home'], function(SectionsController, HomeController) {
  var Controller;
  return Controller = (function(superClass) {
    extend(Controller, superClass);

    function Controller() {
      return Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.$el = $('#content');

    Controller.sectionsController = new SectionsController({
      $el: Controller.$el
    });

    Controller.homeController = new HomeController({
      $el: Controller.$el
    });

    Controller.baseAction = function(action, layout) {
      Backbone.history.length += 1;
      action();
      if (this.$el.find(layout.$el).length === 0) {
        this.$el.append(layout.el);
        layout.onShow();
      }
      return this.update(layout);
    };

    Controller.home = function() {
      return this.baseAction(((function(_this) {
        return function() {
          return $('a.nav__link.active').removeClass('active');
        };
      })(this)), this.homeController.go());
    };

    Controller.section = function(section, view) {
      if (view == null) {
        view = '';
      }
      return this.baseAction(((function(_this) {
        return function() {
          $('a.nav__link.active').removeClass('active');
          return $("a.nav__link[href='/" + section + "']").addClass('active');
        };
      })(this)), this.sectionsController.go(section, null, view));
    };

    Controller.sectionItem = function(section, uid) {
      return this.baseAction(((function(_this) {
        return function() {
          $('a.nav__link.active').removeClass('active');
          return $("a.nav__link[href='/" + section + "']").addClass('active');
        };
      })(this)), this.sectionsController.go(section, uid, 'map'));
    };

    Controller.update = function(layout) {
      this.$el.children('section[class^="layout__"],section[class*="layout__"]').hide();
      return layout.$el.show();
    };

    return Controller;

  })(Marionette.Controller);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('router',['controller'], function(Controller) {
  var Router;
  return Router = (function(superClass) {
    extend(Router, superClass);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.controller = Controller;

    Router.prototype.appRoutes = {
      ":section": "section",
      ":section/:view": "section",
      ":section/map/:uid": "sectionItem",
      "": "home"
    };

    return Router;

  })(Backbone.Marionette.AppRouter);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('behaviors/openItemView',[],function() {
  var OpenItemView;
  return OpenItemView = (function(superClass) {
    extend(OpenItemView, superClass);

    function OpenItemView() {
      return OpenItemView.__super__.constructor.apply(this, arguments);
    }

    OpenItemView.prototype.onRender = function() {
      return this.view.$el.on('click', this.options.selector, (function(_this) {
        return function(e) {
          var el, id;
          e.preventDefault();
          el = $(e.currentTarget).find('.modal-link');
          id = _.isUndefined(_this.view.model) ? el.data('itemid') : _this.view.model.get('id');
          if (el.data('target') === '#link-modal-cinema' || id === 1492) {
            return Mediator.trigger('cinema:choose');
          } else {
            return Mediator.trigger('item:choose', id);
          }
        };
      })(this));
    };

    return OpenItemView;

  })(Marionette.Behavior);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define('behaviors/tooltips',[],function() {
  var Tooltips;
  return Tooltips = (function(superClass) {
    extend(Tooltips, superClass);

    function Tooltips() {
      return Tooltips.__super__.constructor.apply(this, arguments);
    }

    Tooltips.prototype.tooltipDefaultSettings = {
      content: {
        attr: 'data-tooltip'
      },
      style: {
        classes: 'tooltip--dark',
        tip: false
      },
      position: {
        my: 'bottom center',
        at: 'top center',
        container: $('#tooltips'),
        adjust: {
          y: -15,
          mouse: false
        },
        effect: function(api, pos) {
          return $(this).css(pos);
        }
      },
      show: {
        delay: 60,
        solo: true,
        effect: function() {
          return $(this).fadeIn(70);
        }
      },
      hide: {
        effect: function() {
          return $(this).fadeOut(35);
        }
      }
    };

    Tooltips.prototype.onRender = function() {
      this.view.$el.find('.js-tooltip-top').qtip(this.tooltipDefaultSettings);
      return this.view.$el.find('.js-tooltip-bottom').qtip($.extend(true, this.tooltipDefaultSettings, {
        position: {
          my: 'top center',
          at: 'bottom center',
          adjust: {
            y: 12
          }
        }
      }));
    };

    return Tooltips;

  })(Marionette.Behavior);
});

define('behaviors/behaviors',['behaviors/openItemView', 'behaviors/tooltips'], function(OpenItemView, Tooltips) {
  return {
    OpenItemView: OpenItemView,
    Tooltips: Tooltips
  };
});

requirejs.config({
  baseUrl: './'
});

define('app',['router', 'behaviors/behaviors', 'helpers/mediator'], function(Router, Behaviors, Mediator) {
  var App;
  SVGInjector(document.getElementById('icons-svg'));
  App = new Backbone.Marionette.Application();
  Backbone.Marionette.Behaviors.behaviorsLookup = function() {
    return Behaviors;
  };
  App.router = new Router;
  Backbone.history.start({
    pushState: true
  });
  Backbone.history.length = 0;
  Mediator.on('navigate', (function(_this) {
    return function(url) {
      return App.router.navigate(url, {
        trigger: true
      });
    };
  })(this));
  $(document).scrollTop(0);
  $(document).on('click', function(e) {
    return Mediator.trigger("document:click", e);
  });
  return $(document).on('click', "a[href^='/']", function(e) {
    var a, href, stat, url;
    if ((a = $(e.currentTarget).attr('href').split('.')).length > 1) {
      if (a[1].search('html') >= 0) {
        stat = true;
      }
    }
    if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey && !stat) {
      e.preventDefault();
      href = $(e.currentTarget).attr('href');
      url = href.replace(/^\//, '').replace('\#\!\/', '');
      return App.router.navigate(url, {
        trigger: true
      });
    }
  });
});

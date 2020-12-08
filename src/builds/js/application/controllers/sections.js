var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['collections/items', 'layouts/section', 'helpers/mediator', 'models/item', 'views/sections/item', 'views/sections/action', 'views/sections/cinema'], function(Items, SectionLayout, Mediator, Item, ItemView, ActionView, CinemaView) {
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

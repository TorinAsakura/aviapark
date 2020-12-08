var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['templates/section/filter/category'], function(CategoryTemplate) {
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

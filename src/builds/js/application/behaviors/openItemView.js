var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(function() {
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

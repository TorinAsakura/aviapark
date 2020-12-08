var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(function() {
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

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(function() {
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

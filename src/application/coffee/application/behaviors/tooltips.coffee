define ->

  class Tooltips extends Marionette.Behavior

    tooltipDefaultSettings:
      content:
        attr: 'data-tooltip'
      style:
        classes: 'tooltip--dark'
        tip: false
      position:
        my: 'bottom center'
        at: 'top center'
        container: $('#tooltips')
        adjust:
          y: -15
          mouse: false
        effect: (api, pos) -> $(@).css(pos)
      show:
        delay: 60
        solo: true
        effect: -> $(@).fadeIn(70)
      hide:
        effect: -> $(@).fadeOut(35)

    onRender: ->
      @view.$el.find('.js-tooltip-top').qtip(@tooltipDefaultSettings)
      @view.$el.find('.js-tooltip-bottom').qtip(
        $.extend(true, @tooltipDefaultSettings, {
          position: {
            my: 'top center',
            at: 'bottom center',
            adjust: {
              y: 12
            }
          }
      }));
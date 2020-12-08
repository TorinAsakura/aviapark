define ['map'], (Map) ->

  class MapView extends Marionette.ItemView

    itemViews: {}

    events:
      'click .leaflet-control-layers-base label': 'toggleControl'

    behaviors:
      OpenItemView:
        selector: '.leaflet-popup-content'

    render: ->
      @triggerMethod('before:render', @)
      Map.init(true, @$el[0])
      @isRendered = true
      @triggerMethod('render', @)
      @

    onRender: ->
      $('.leaflet-control-layers-base label:first').addClass('active')
      Mediator.trigger 'map:render'

    toggleControl: (e) ->
      $(".leaflet-control-layers-base label.active").removeClass('active')
      $( e.currentTarget ).addClass('active')
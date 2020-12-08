define [
  'templates/section'
  'views/sections/filter'
  'views/sections/map'
  'views/sections/boxes'
], (SectionTemplate, FilterLayout, MapView, BoxesView) ->

  class SectionLayout extends Backbone.Marionette.LayoutView

    @MapView = MapView
    @FilterLayout = FilterLayout
    @BoxesView = BoxesView

    el: $('<section class="layout__section" id="section">')

    template: SectionTemplate

    regions:
      filters: "#filters"
      map: "#map"

    goToMap: ->
      @$el.addClass('map')

    goToBoxes: ->
      @$el.removeClass('map')
      Mediator.trigger("boxes:show")

    onRender: ->
      @filters.show( @filterView = new FilterLayout())

    onShow: ->
      @mapView = new MapView({el: @map.el}).render()
      @boxesView = new BoxesView()

    setSection: (section) ->
      placeholder = if section == 'food' then 'Поиск по ресторанам' else 'Найти в Авиапарке'
      @filters.$el.find('.js-search__text-field').attr('placeholder', placeholder)
      @section = section
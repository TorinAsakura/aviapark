define [

  'templates/section/filter/dropdown/item'
  'templates/section/filter/dropdown/title'
  'views/lazy_list'

], (ItemTemplate, TitleTemplate, LazyList) ->

  class ItemDropdown extends Marionette.ItemView

    template: ItemTemplate

    behaviors:
      OpenItemView:
        selector: ''

  class Dropdown extends LazyList

    currentClass: null

    childView: ItemDropdown

    behaviors:
      Tooltips: {}

    initialize: ->
      @$el.scroll (e) => @scroll(e)
      @$el.addClass('search-drop--extended') if (window.innerHeight > 1000)

    addChild: (model) ->
      if @currentClass != model.get('class')
        @$cache_el.append(TitleTemplate(title: model.get('class')))
      view = new @childView(model: model)

      _.each @childEvents, (cb, name) => view.on name, (m) => @[cb](m)

      view.render()
      @children.add view
      @$cache_el.append(view.$el)
      @currentClass = model.get('class')

    clear: ->
      super
      @currentClass = null

    hide: ->
      @$el.addClass 'is-hidden'

    addItemsToList: ->
      super
      @$el.find('.search-drop__brand-img-container img').unveil()
      @$el.find('.search-drop__brand-img-container img').trigger("unveil")
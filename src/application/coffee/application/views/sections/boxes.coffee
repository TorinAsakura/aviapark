define [

  'templates/section/boxes/shop'
  'templates/section/boxes/action'
  'views/lazy_list'

], (ShopTemplate, ActionTemplate, LazyList) ->

  class BoxView extends Marionette.ItemView

    template: =>
      if @model.collection.type == 'actions'
        ActionTemplate(@model.toJSON())
      else
        ShopTemplate(@model.toJSON())

    className: ->
      if @model.collection.type == 'actions'
        switch @model.get('type')
          when 'sale'
            return 'stock-item stock-item--theme-yellow'
          when 'collection'
            return 'stock-item stock-item--theme-skyblue'
          when 'news'
            return 'stock-item stock-item--theme-purple'
          when 'event'
            return 'stock-item stock-item--theme-pink'
          else
            'stock-item stock-item--theme-yellow'
      else
        'stock-item stock-item--theme-yellow'

  class BoxesView extends Marionette.CollectionView

    behaviors:
      Tooltips: {}

    itemsCount: 30
    childView: BoxView
    search_str: ""

    $cacheEl = $("<div id='items' class='shares__items js-store__items'>")

    initialize: ->
      @$els = {}

    clear: ->
      @$el = $cacheEl.clone()

    render: (c) ->
      @clear()
      @triggerMethod('before:render', @)
      c.each (m) => @addChild(m)
      @$els[c.type] = @$el.clone()
      @isRendered = true
      @triggerMethod('render', @)
      @

    addChild: (model) ->
      view = new @childView(model: model)
      view.render()
      unless _.isEmpty(model.get('action_types'))
        action_types = _.values(model.get('action_types'))
        view.$el.addClass action_types.join(' ')
      view.$el.addClass model.get('category')
      view.$el.addClass model.get('type')
      view.$el.data 'title', model.get('title')
      @children.add view
      @$el.append(view.$el)

    loadImage: ->
      $els = @$el.find(".stock-item:visible")
      $els.find('img').unveil()
      $els.find('img').trigger("unveil")

    onShow: ->
      @loadImage()
      @isotopeInit()

    isotopeInit: (afterInit = (->)) ->
      @$el.imagesLoaded =>
        @$el.isotope({
          itemSelector: '.stock-item',
          isFitWidth: true
          columnWidth: 269
        })
        afterInit()

    getPaginationClass: -> "*:nth-child(-n+#{@itemsCount})"

    filtered: (filter_class, str) ->

      @filter_class = filter_class
      @search_str = str

      @$el.isotope({
        filter: ->
          $(@).is("#{filter_class}") and
          $($.parseHTML($(@).data('title'))).text().toLowerCase().search(str.toLowerCase())>=0
      })

      @onShow()

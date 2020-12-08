define ->

  class LazyList extends Marionette.CollectionView

    step: 20
    $cache_el: $("<div>")

    scroll: (e) ->
      if $(e.currentTarget).height()+$(e.currentTarget).scrollTop()+100 >= @$el[0].scrollHeight
        @addItemsToList()

    clear: ->
      @$el.html("")
      @$cache_el.html("")

    render: (c) ->
      @clear()
      @triggerMethod('before:render', @)
      c.each (m) => @addChild(m)
      @beforeRender(=>@addItemsToList())
      @

    addItemsToList: ->
      return @isRendered = true if @$cache_el.children().length == 0

      if @$cache_el.children().length > @step
        @$el.append @$cache_el.children()[0..@step]
      else
        @$el.append @$cache_el.children()[0..@$cache_el.children().length-1]

      @triggerMethod('render', @)

    beforeRender: (addItemFunc) -> addItemFunc()
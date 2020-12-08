define [
  'models/item'
  'collections/items'
  'templates/section/item'
  'views/sections/boxes'
], (Item, Items, ItemTemplate, BoxesView) ->

  class ItemView extends Marionette.ItemView

    template: ItemTemplate

    events:
      'click .js-btn-show-more-info':'showMore'
      'click .js-store__close':'closed'

    behaviors:
      Tooltips: {}

    initialize: ->
      if _.isUndefined(@options.model)
        @model = new Item(id: @options.id)
      else
        @model = @options.model

      @boxesView = new BoxesView()

    render: ->
      if @model.isNew()
        @model.once 'sync', => @show()
        @model.fetch()
      else
        @show()

    show: (callback = (->)) ->
      @triggerMethod('before:render', @)
      @$el.hide()
      @$el.html(@template(@model.toJSON()))

      ##
      # Actions
      #
      collection = new Items()
      collection.type = 'actions'
      collection.reset collection.parse(@model.get('childs'))
      @boxesView.render(collection)
      @$el.find(".js-store__items").html(@boxesView.$el)
      #
      ##

      @boxesView.$el.ready( => @boxesView.onShow() )

      $("#modals").ready(=>
        $("#modals").append(@$el)
        @isRendered = true
        @triggerMethod('render', @)
      )

    showMore: (e) ->
      btn = $(e.currentTarget)

      el = @$el.find('.store__more-info')
      if el.is(':hidden')
        el.slideDown 400, -> btn.text('Свернуть')
      else
        el.slideUp 400, -> btn.text('Подробнее')

      e.preventDefault()

    closed: ->
      @close => Mediator.trigger('item:close', @)

    close: (callback = (->)) ->
      @$el.slideUp 400, =>
        callback()
        @onClose()

    open: (callback = (->)) ->
      @$el.slideDown 400, =>
        callback()
        @onOpen()

    onOpen: ->
      @boxesView.onShow()

    onClose: -> false

    hide: -> @$el.hide()


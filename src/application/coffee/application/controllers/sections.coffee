define [

  'collections/items'
  'layouts/section'
  'helpers/mediator'
  'models/item'
  'views/sections/item'
  'views/sections/action'
  'views/sections/cinema'

], (Items, SectionLayout, Mediator, Item, ItemView, ActionView, CinemaView) ->

  class SectionsController extends Marionette.Controller

    timeout: 500

    resetObjects: ->
      @modals = {}
      @collections = {}
      @filtredCollections = {}
      @filtredBoxesEls = {}
      @filtredEls = {}

      @default =
        filters:
          section: ''
          search: ''
          action_types: []
          categories: []

      @filters =
        section: ''
        search: ''
        action_types: []
        categories: []

    initialize: (options) ->
      @resetObjects()
      @viewType = 'map'

      @$el = options.$el

      # Items's collections for /items/:id
      @collectionItems = new Items

      # Items's collections for /actions/list
      @collectionActions = new Items
      @collection = new Items
      @collectionActions.type = 'actions'

    delegateEvents: ->
      Mediator.on "document:click", (e) =>
        @sectionLayout.filterView.dropdownView.hide()
        @sectionLayout.filterView.categoriesView.hide()

      Mediator.on "boxes:show", =>
        if @collection.length == 0
          @collection.once 'sync', => @sectionLayout.boxesView.onShow()
        else
          @sectionLayout.boxesView.onShow()

      Mediator.on "section:filter:search", (str) =>
        @search(str)

      $(document).scroll (e) =>
        if $('body').height()+$('body').scrollTop() >= $('body')[0].scrollHeight-200
          @sectionLayout.boxesView.itemsCount+=10
          @update()

      Mediator.on "section:filter:category", (category) =>
        added = (i = _.indexOf(@filters.categories, category.title)) >= 0

        if category.active
          @filters.categories.push category.title
        else
          @filters.categories[i] = null

        @filters.categories = _.compact(@filters.categories)

        @update()

      Mediator.on "section:filter:action", (filters) =>
        @filters.action_types = filters
        @update()

      Mediator.on "section:filter:clear", =>
        @clear()
        @update()

      Mediator.on "section:switch:view", =>
        if @sectionLayout.$el.hasClass('map')
          Mediator.trigger 'navigate', "/#{@sectionLayout.section}"
        else
          Mediator.trigger 'navigate', "/#{@sectionLayout.section}/map"

      Mediator.on "item:choose", (id) => @onChooseItem(id)
      Mediator.on "cinema:choose", => @openCinemaModal()

      Mediator.on "item:close", (view) => @onCloseItem(view)

    clear: ->
      @currendItemModal.hide() if not _.isUndefined(@currendItemModal)
      @filters = _.clone(@default.filters)

      @filters.categories = []
      @filters.action_types = []

      @sectionLayout.filterView.clear()

      @sectionLayout.filterView.$el
        .find('.js-filter__item')
        .removeClass('is-active')

      @sectionLayout.filterView.$el
        .find('.filter-droplist__item')
        .removeClass('active')

    search: (src) =>
      clearTimeout @timerSearch if @timerSearch
      @filters.search = src
      @timerSearch = setTimeout((=> @update() ), @timeout )

    go: (section, uid, view) ->

      if _.isEmpty @sectionLayout
        @sectionLayout = new SectionLayout()
        @sectionLayout.setSection(section)
        @sectionLayout.render()
        @dropdownView = @sectionLayout.filterView.dropdownView
        @delegateEvents()

      @sectionLayout.setSection(section)

      if not _.isEmpty(view)
        @sectionLayout.goToMap()
      else
        @sectionLayout.goToBoxes()

      _.defer =>
        if _.isUndefined(uid) or _.isNull(uid)
          @goToSection(section)
        else
          @goToItem(section, uid)

      @sectionLayout

    goToItem: (section, uid) ->

      id = arr[0] if (arr = uid.split('-')).length > 0
      collection = if section == 'actions' then @collectionActions else @collectionItems
      model = collection.get(id)

      View = if section == 'actions' then ActionView else ItemView
      @modals[id] ||= if _.isUndefined(model) then new View(id: id) else new View(model: model)

      @modals[id].onRender = =>
        collection.add @modals[id].model
        @openItemModal(@modals[id])

      @modals[id].render()

    goToSection: (section) ->
      if section == 'kino'
        @sectionLayout.goToMap()
        @openCinemaModal()

      @filterBySection(section)

    openItemModal: (view) ->
      @currentItemModal = view
      @dropdownView.hide()

      if _.isEmpty @currendItemModal
        view.open()
      else
        @currendItemModal.close(=>view.open())

      @currendItemModal = view
      model = view.model

      floor = _.first(model.get('floor'))
      @checkFloor(floor)

      if model.get('map_x') and model.get('map_y')
        Map.map.setView([model.get('map_x'), model.get('map_y')-0.2], 11, {animate: true})
        if _.has Map.popups, model.get('id')
          latlng = [model.get('map_x'), model.get('map_y')]
          if not _.isUndefined Map.popups[model.get('id')]._map
            Map.popups[model.get('id')].openPopup(latlng)

    checkFloor: (floor) ->
      $(".leaflet-control-layers-base input:eq(#{floor-1})").trigger('click')

    renderItems: (collection) ->
      @dropdownView.render(collection)

    onCloseItem: (view) ->
      Mediator.trigger 'navigate', "/#{@sectionLayout.section}/map"

      model = view.model
      @sectionLayout.filterView.clear()
      @sectionLayout.filterView.dropdownView.hide()
      @sectionLayout.filterView.categoriesView.hide()
      if _.has(Map.popups, model.get('id')) and
        not _.isUndefined(Map.popups[model.get('id')]) and
        not _.isUndefined Map.popups[model.get('id')]._map
          Map.popups[model.get('id')].closePopup()

      Map.clearFocus()

    onChooseItem: (id) ->
      model = @collection.get(id)
      if _.isUndefined(model)
        model = new Item(id: id)
        model.once 'sync', => @navigateToModel(model)
        model.fetch()
      else
        @navigateToModel(model)

    navigateToModel: (model) ->
      if _.indexOf(['shops', 'food', 'entertain', 'kids', 'service'], model.get('section')) < 0
        url = "/actions/map/#{model.get('id')}-#{model.get('title')}"
      else
        url = "/#{model.get('section')}/map/#{model.get('id')}-#{model.get('title')}"
      Mediator.trigger( 'navigate', url )

    filterBySection: (section) ->
      floor = 1
      floor = 4 if section == 'food' or section == 'kino'

      if _.isUndefined(@sectionLayout.mapView)
        Mediator.once 'map:render', => @checkFloor(floor)
      else
        @checkFloor(floor)

      @clear()
      @sectionLayout.setSection(section)

      @default.filters.section = section
      @filters.section = section

      @dropdownView.hide()
      @currentSection = section

      Map.clearFocus() unless _.isUndefined(Map.map)

      if _.isUndefined(@collections[section])
        @collections[section] = new Items()
        @collections[section].type = section

        @collection = @collections[section]

        @collection.on 'sync', =>
          @updateBoxes(@collection)
          @updateCategories(@collection)
          @update()

        @collection.fetch()
      else
        @collection = @collections[section]
        @updateBoxes(@collection)
        @updateCategories(@collection)
        @update()

    filterByTitle: (str, collection) ->
      collection.filter(
        (m) -> $($.parseHTML(m.get('title'))).text().toLowerCase().search(str.toLowerCase())>=0
      )

    filterByAction: (filters, collection) ->
      collection.filter(
        (m) ->(_.intersection(m.get('action_types'), filters)).length > 0
      )

    filterByCategory: (categories, collection) ->
      collection.filter(
        (m) -> (_.indexOf(categories, m.get('category'))) >= 0
      )

    update: ->
      return if _.isUndefined(@collection) or @collection.length == 0

      ##
      # Isotope filtering
      ##

      filters = []

      action_types = _.clone(@filters.action_types)
      categories = _.clone(@filters.categories)

      if action_types.length == 0 and categories.length == 0
        filter_class = @sectionLayout.boxesView.getPaginationClass()
      else
        if action_types.length == 0 or categories.length == 0
          _filters = if action_types.length == 0 then categories else action_types
          for filter in _filters
            do (filter) -> filters.push(".#{filter}")
          filter_class = filters.join(', ')
        else
          for a in action_types
            do (a) ->
              for c in categories
                do (c) -> filters.push ".#{a}.#{c}"
          filter_class = filters.join(', ')

      str = @filters.search.trim()

      @sectionLayout.boxesView.filtered(filter_class, str)

      @sectionLayout.boxesView.loadImage()
      @$el.imagesLoaded => @sectionLayout.boxesView.$el.isotope()

      collection = @collection

      key = JSON.stringify(@filters)

      if _.has @filtredCollections, key
        @updateFloorControls(@filtredCollections[key])
        return @renderItems @filtredCollections[key]

      if not _.isEmpty(@filters.search.trim())
        models = @filterByTitle(@filters.search.trim(), collection)
        collection = new Backbone.Collection models

      if not _.isEmpty(@filters.action_types)
        models = @filterByAction(@filters.action_types, collection)
        collection = new Backbone.Collection models

      if not _.isEmpty(@filters.categories)
        models = @filterByCategory(@filters.categories, collection)
        collection = new Backbone.Collection models

      @filtredCollections[key] = collection
      @updateFloorControls(collection)

      @renderItems collection

    updateFloorControls: (collection) ->
      floor_obj_counts = _.groupBy(_.flatten(collection.pluck('floor')))
      $(".leaflet-control-layers-base label").removeClass('show-counter')
      _.each floor_obj_counts, (arr, floor) ->
        $(".leaflet-control-layers-base label:nth-child(#{floor})")
          .addClass('show-counter')
          .attr('data-content', arr.length)

    updateBoxes: (collection) ->
      if collection.type == 'actions'

        if @collectionActions.length > 0 and collection.length <= @collectionActions.length
          collection = @collectionActions
        else
          models = []
          collection.each (model) =>
            return if _.isUndefined(childs = model.get('childs'))
            values = _.values(childs)
            for v in values
              do (v) ->
                v.floor = model.get 'floor'
                v.parent = model
            models.push values
          @collectionActions.reset(_.flatten(models), {parse:true})
          collection = @collectionActions

      @sectionLayout.boxesView.render(collection)
      @sectionLayout.boxesView.$el.ready(
        =>
          @$el.find('#box').html @sectionLayout.boxesView.$el
          @$el.find('#box').ready( => @sectionLayout.boxesView.onShow() )
      )

    updateCategories: (collection) ->
      categories = {}
      collection.each (m) =>
        return if _.isEmpty m.get('category_title')
        categories[m.get('category')] = {
          category: m.get('category')
          category_title: m.get('category_title')
        }

      @sectionLayout.filterView.categoriesView.collection.reset(_.values(categories))
      @sectionLayout.filterView.categoriesView.render()

    ##
    #
    # TODO Статичная страница
    #
    openCinemaModal: ->
      setTimeout ( =>
        @modals['cinema'] ||= new CinemaView()
        @modals['cinema'].onRender = =>
          @openItemModal(@modals['cinema'])
        @modals['cinema'].render()
      ), 500

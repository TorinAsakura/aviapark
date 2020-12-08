define ->

  class Item extends Backbone.Model

    idAttribute: "id"

    default:
      type: 'shop'
      category_title: []
      tags: []
      floor: []
      contact_phone: ''
      contact_url: ''

    type: 'item'

    initialize: (data) ->
      if _.has data, 'section'
        @type = data.section
        delete data.section
      super(data)

    toJSON: ->
      data = _.clone(@attributes)

      data.type_title = switch data.type
        when "sale" then 'скидка'
        when "collection" then 'коллекция'
        when "event" then 'событие'
        when "news" then 'новость'

      if _.has(data, 'parent') and ( data.parent instanceof Backbone.Model)
        data.parent = data.parent.toJSON()
      data

    parse: (data) ->
      data['class'] = _.first(data.title)

      data['category_link'] = switch data['section']
        when "shops" then "магазин"
        when "food" then "ресторан"
        else "объект"

      data['type_rr'] = switch data['type']
        when "sale" then "скидку"
        when "event" then "событие"
        when "collection" then "коллекцию"
        when "news" then "новость"

      data['class_ico'] = switch data['section']
        when "food" then "stock-item__burger-ico"
        else "stock-item__shop-ico"

      data = _.extend _.clone(@default), data
      _.each data, (attr, k) =>
        if (_.isEmpty(attr) or _.isNull(attr)) and _.has(@default, k)
          data[k] = @default[k]
      data

    url: ->
      if @type == 'action'
        "http://api.avia.kknopka.ru/actions/#{@get('id')}"
      else
        "http://api.avia.kknopka.ru/items/#{@get('id')}"

    isNew: -> !@get('title')
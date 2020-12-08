define [
  'models/item'
  'templates/section/cinema'
  'views/sections/item'
], (Item, CinemaTemplate, ItemView) ->

  class CinemaView extends ItemView

    template: CinemaTemplate

    events:
      'click .js-btn-show-more-info':'showMore'
      'click .js-store__close':'closed'

    initialize: ->
      @model = new Item({
        id: 1492
        type: "store"
        category_title: []
        tags: []
        floor: [4]
        contact_phone: ""
        contact_url: ""
        title: "KAPO Sky 17"
        title_alt: ""
        map_id: "4003"
        map_x: 2.1027
        map_y: 1.7976
        map_zoom: "10"
        hours_wd_open: "10"
        hours_wd_close: "22"
        hours_hd_open: "10"
        hours_hd_close: "22"
        longtitle: ""
        descr: "<p>\"Сеть кинотеатров «КАРО», основанная в 1997 году, установила новые стандарты оформления кинозалов в России. На сегодняшний день «КАРО» является ведущей сетью кинотеатров в России, управляющей 30 современными кинотеатрами (221 экрана) в Москве, Московской области, Санкт-Петербурге, Самаре, Казани, Калининграде, Екатеринбурге и Сургуте, которые посещают почти 12 млн. человек в год. С 2012 года контролирующим акционером «КАРО» является консорциум в составе ведущего инвестора Baring Vostok Private Equity, UFG Private Equity, Российского фонда прямых инвестиций (РФПИ) и предпринимателя Пола Хета.<br />\nНОВЫЙ ТЕЛЕФОН ЕДИНОЙ СПРАВОЧНОЙ СЛУЖБЫ СЕТИ КИНОТЕАТРОВ «КАРО»: 8 800 555 23 23.\"</p>"
        category: []
        logo: "/site/assets/files/1492/aviapark_karo.jpg"
        image_promo: ""
        image_gallery: ""
        contact_fb: "https://www.facebook.com/karofilm"
        contact_vk: "http://vk.com/karofilm_vk"
        contact_ok: ""
        contact_ig: "http://instagram.com/karocinema"
        contact_yt: ""
        contact_tw: ""
        hours_close: "22"
        section: "entertain"
        section_title: "Развлечения"
        childs: []
        class: "K"
        category_link: "объект"
        type_rr: null
        class_ico: "stock-item__shop-ico"
      })

    render: -> @show()

    show: (callback = (->)) ->
      @triggerMethod('before:render', @)
      @$el.hide()
      @$el.html(@template(@model.toJSON()))

      $("#modals").ready(=>
        $("#modals").append(@$el)
        @isRendered = true
        @triggerMethod('render', @)
      )

    onOpen: -> false

    open: (callback = (->)) ->
      @$el.slideDown 400, =>
        callback()
        @onOpen()
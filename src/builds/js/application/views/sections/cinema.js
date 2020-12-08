var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['models/item', 'templates/section/cinema', 'views/sections/item'], function(Item, CinemaTemplate, ItemView) {
  var CinemaView;
  return CinemaView = (function(superClass) {
    extend(CinemaView, superClass);

    function CinemaView() {
      return CinemaView.__super__.constructor.apply(this, arguments);
    }

    CinemaView.prototype.template = CinemaTemplate;

    CinemaView.prototype.events = {
      'click .js-btn-show-more-info': 'showMore',
      'click .js-store__close': 'closed'
    };

    CinemaView.prototype.initialize = function() {
      return this.model = new Item({
        id: 1492,
        type: "store",
        category_title: [],
        tags: [],
        floor: [4],
        contact_phone: "",
        contact_url: "",
        title: "KAPO Sky 17",
        title_alt: "",
        map_id: "4003",
        map_x: 2.1027,
        map_y: 1.7976,
        map_zoom: "10",
        hours_wd_open: "10",
        hours_wd_close: "22",
        hours_hd_open: "10",
        hours_hd_close: "22",
        longtitle: "",
        descr: "<p>\"Сеть кинотеатров «КАРО», основанная в 1997 году, установила новые стандарты оформления кинозалов в России. На сегодняшний день «КАРО» является ведущей сетью кинотеатров в России, управляющей 30 современными кинотеатрами (221 экрана) в Москве, Московской области, Санкт-Петербурге, Самаре, Казани, Калининграде, Екатеринбурге и Сургуте, которые посещают почти 12 млн. человек в год. С 2012 года контролирующим акционером «КАРО» является консорциум в составе ведущего инвестора Baring Vostok Private Equity, UFG Private Equity, Российского фонда прямых инвестиций (РФПИ) и предпринимателя Пола Хета.<br />\nНОВЫЙ ТЕЛЕФОН ЕДИНОЙ СПРАВОЧНОЙ СЛУЖБЫ СЕТИ КИНОТЕАТРОВ «КАРО»: 8 800 555 23 23.\"</p>",
        category: [],
        logo: "/site/assets/files/1492/aviapark_karo.jpg",
        image_promo: "",
        image_gallery: "",
        contact_fb: "https://www.facebook.com/karofilm",
        contact_vk: "http://vk.com/karofilm_vk",
        contact_ok: "",
        contact_ig: "http://instagram.com/karocinema",
        contact_yt: "",
        contact_tw: "",
        hours_close: "22",
        section: "entertain",
        section_title: "Развлечения",
        childs: [],
        "class": "K",
        category_link: "объект",
        type_rr: null,
        class_ico: "stock-item__shop-ico"
      });
    };

    CinemaView.prototype.render = function() {
      return this.show();
    };

    CinemaView.prototype.show = function(callback) {
      if (callback == null) {
        callback = (function() {});
      }
      this.triggerMethod('before:render', this);
      this.$el.hide();
      this.$el.html(this.template(this.model.toJSON()));
      return $("#modals").ready((function(_this) {
        return function() {
          $("#modals").append(_this.$el);
          _this.isRendered = true;
          return _this.triggerMethod('render', _this);
        };
      })(this));
    };

    CinemaView.prototype.onOpen = function() {
      return false;
    };

    CinemaView.prototype.open = function(callback) {
      if (callback == null) {
        callback = (function() {});
      }
      return this.$el.slideDown(400, (function(_this) {
        return function() {
          callback();
          return _this.onOpen();
        };
      })(this));
    };

    return CinemaView;

  })(ItemView);
});

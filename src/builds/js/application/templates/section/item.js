define(function(require,exports,module){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (_, category_title, contact_fb, contact_phone, contact_url, contact_vk, count_photo, descr, floor, hours_close, hours_hd_close, hours_hd_open, hours_wd_close, hours_wd_open, image_gallery, image_promo, logo, section_title, tags, title) {
buf.push("<div class=\"store js-store\"><div class=\"store__header\">");
if(!_.isEmpty(image_promo))
{
buf.push("<div" + (jade.attr("style", "background-image: url(http://api.avia.kknopka.ru/" + (image_promo) + ")", true, false)) + " class=\"store__store-img\"></div>");
}
else
{
buf.push("<div style=\"background-image: url(img/store-default-bg.jpg)\" class=\"store__store-img\"></div>");
}
buf.push("<div class=\"store__store-img-blackout\"></div><div class=\"store__header-inn\"><div class=\"store__logo\"><img" + (jade.attr("src", "http://api.avia.kknopka.ru/" + (logo) + "", true, false)) + " alt=\"\"/></div><div class=\"store__breadcrumbs\"><i class=\"store__share-ico\"><svg class=\"icon icon-share-2\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-share-2\"></use></svg></i><span>" + (null == (jade_interp = section_title+" / "+title) ? "" : jade_interp) + "</span></div><div class=\"store__controls\"><span class=\"store__control-btn\"><svg class=\"ico icon icon-route store__control-ico store__route-ico\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-route\"></use></svg></span><span class=\"store__control-btn\"><svg class=\"ico icon icon-close-2 store__control-ico store__close-ico js-store__close\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-close-2\"></use></svg></span></div><div class=\"store__fotos-leng\"><i class=\"store__fotos-ico\"><svg class=\"icon icon-picture\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-picture\"></use></svg></i>");
if(_.isEmpty(image_gallery) || (count_photo = image_gallery.split(",").length) == 0)
{
buf.push("<span>Нет фото</span>");
}
else
{
buf.push("<span class=\"store__fotos-link js-store__fotos-link\">Посмотреть " + (jade.escape((jade_interp = count_photo) == null ? '' : jade_interp)) + " фото</span>");
}
buf.push("</div><div data-tooltip=\"Добавить в избранное\" class=\"badge badge--favor badge--store js-tooltip-top\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg></div></div></div><div class=\"store__content\"><div class=\"store__info\"><div class=\"store__text-info\"><h2>" + (null == (jade_interp = title) ? "" : jade_interp) + "</h2><p>" + (jade.escape(null == (jade_interp = category_title.join(", ")) ? "" : jade_interp)) + "</p></div><div class=\"store__rside-info\">");
if(!_.isEmpty(contact_phone))
{
buf.push("<div class=\"store__phone\"><i class=\"store__phone-ico\"><svg class=\"icon icon-handset\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-handset\"></use></svg></i>" + (jade.escape(null == (jade_interp = contact_phone) ? "" : jade_interp)) + "</div>");
}
if(!_.isEmpty(hours_close))
{
buf.push("<div class=\"store__worktime\"><i class=\"store__watch-ico\"><svg class=\"icon icon-watch\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-watch\"></use></svg></i>Сегодня работает до " + (jade.escape((jade_interp = hours_close) == null ? '' : jade_interp)) + ":00</div>");
}
buf.push("</div></div><div class=\"store__info\"><div class=\"store__tags\">");
if(!_.isEmpty(tags))
{
buf.push("<h3>tags</h3>" + (jade.escape(null == (jade_interp = tags.join(" / ")) ? "" : jade_interp)));
}
buf.push("</div><div class=\"social social--store\"><ul class=\"social__list\">");
if(!_.isEmpty(contact_vk))
{
buf.push("<li class=\"social__item\"><a" + (jade.attr("href", "" + (contact_vk) + "", true, false)) + " target=\"_blank\" class=\"social__link\"><svg class=\"social__ico icon icon-vk\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-vk\"></use></svg></a></li>");
}
if(!_.isEmpty(contact_fb))
{
buf.push("<li class=\"social__item\"><a" + (jade.attr("href", "" + (contact_fb) + "", true, false)) + " target=\"_blank\" class=\"social__link\"><svg class=\"social__ico icon icon-facebook\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-facebook\"></use></svg></a></li>");
}
if(!_.isEmpty(contact_fb))
{
buf.push("<li class=\"social__item\"><a" + (jade.attr("href", "" + (contact_fb) + "", true, false)) + " target=\"_blank\" class=\"social__link\"><svg class=\"social__ico icon icon-odnoklassniki\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-odnoklassniki\"></use></svg></a></li>");
}
buf.push("</ul></div></div><div class=\"store__more-info\"><div class=\"store__more-info-head\"><ul><li class=\"store__more-info-head-item\"><i class=\"store__more-info-head-ico store__more-info-head-watch-ico\"><svg class=\"icon icon-time\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-time\"></use></svg></i>Пн-Чт + Вс " + (jade.escape((jade_interp = hours_wd_open) == null ? '' : jade_interp)) + ":00-" + (jade.escape((jade_interp = hours_wd_close) == null ? '' : jade_interp)) + ":00 / Пт-Сб " + (jade.escape((jade_interp = hours_hd_open) == null ? '' : jade_interp)) + ":00-" + (jade.escape((jade_interp = hours_hd_close) == null ? '' : jade_interp)) + ":00</li><li class=\"store__more-info-head-item\"><i class=\"store__more-info-head-ico store__more-info-head-floor-ico\"><svg class=\"icon icon-layers\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-layers\"></use></svg></i>Этаж " + (jade.escape((jade_interp = floor.join(", ")) == null ? '' : jade_interp)) + "</li>");
if(!_.isEmpty(contact_url))
{
buf.push("<li class=\"store__more-info-head-item\"><i class=\"store__more-info-head-ico store__more-info-head-site-ico\"><svg class=\"icon icon-screen\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-screen\"></use></svg></i><a" + (jade.attr("href", "" + (contact_url) + "", true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = contact_url) == null ? '' : jade_interp)) + "</a></li>");
}
buf.push("</ul></div>" + (null == (jade_interp = descr) ? "" : jade_interp) + "</div><div class=\"store__show-more-info\"><a href=\"#\" class=\"btn btn--show-more-info js-btn-show-more-info\">Подробнее</a></div><div class=\"store__items-wrap\"><h3>Что новенького</h3><div class=\"store__items js-store__items\"></div></div></div></div>");}.call(this,"_" in locals_for_with?locals_for_with._:typeof _!=="undefined"?_:undefined,"category_title" in locals_for_with?locals_for_with.category_title:typeof category_title!=="undefined"?category_title:undefined,"contact_fb" in locals_for_with?locals_for_with.contact_fb:typeof contact_fb!=="undefined"?contact_fb:undefined,"contact_phone" in locals_for_with?locals_for_with.contact_phone:typeof contact_phone!=="undefined"?contact_phone:undefined,"contact_url" in locals_for_with?locals_for_with.contact_url:typeof contact_url!=="undefined"?contact_url:undefined,"contact_vk" in locals_for_with?locals_for_with.contact_vk:typeof contact_vk!=="undefined"?contact_vk:undefined,"count_photo" in locals_for_with?locals_for_with.count_photo:typeof count_photo!=="undefined"?count_photo:undefined,"descr" in locals_for_with?locals_for_with.descr:typeof descr!=="undefined"?descr:undefined,"floor" in locals_for_with?locals_for_with.floor:typeof floor!=="undefined"?floor:undefined,"hours_close" in locals_for_with?locals_for_with.hours_close:typeof hours_close!=="undefined"?hours_close:undefined,"hours_hd_close" in locals_for_with?locals_for_with.hours_hd_close:typeof hours_hd_close!=="undefined"?hours_hd_close:undefined,"hours_hd_open" in locals_for_with?locals_for_with.hours_hd_open:typeof hours_hd_open!=="undefined"?hours_hd_open:undefined,"hours_wd_close" in locals_for_with?locals_for_with.hours_wd_close:typeof hours_wd_close!=="undefined"?hours_wd_close:undefined,"hours_wd_open" in locals_for_with?locals_for_with.hours_wd_open:typeof hours_wd_open!=="undefined"?hours_wd_open:undefined,"image_gallery" in locals_for_with?locals_for_with.image_gallery:typeof image_gallery!=="undefined"?image_gallery:undefined,"image_promo" in locals_for_with?locals_for_with.image_promo:typeof image_promo!=="undefined"?image_promo:undefined,"logo" in locals_for_with?locals_for_with.logo:typeof logo!=="undefined"?logo:undefined,"section_title" in locals_for_with?locals_for_with.section_title:typeof section_title!=="undefined"?section_title:undefined,"tags" in locals_for_with?locals_for_with.tags:typeof tags!=="undefined"?tags:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));;return buf.join("");
};

});

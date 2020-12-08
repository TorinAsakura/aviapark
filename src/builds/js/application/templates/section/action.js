define(function(require,exports,module){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (_, count_photo, image_promo, parent, title, type_title) {
buf.push("<div class=\"store js-store\"><div class=\"store__header\"><div" + (jade.attr("style", "background-image: url(http://api.avia.kknopka.ru/" + (image_promo) + ")", true, false)) + " class=\"store__store-img\"></div><div class=\"store__store-img-blackout\"></div><div class=\"store__header-inn\"><div class=\"store__logo\"><img" + (jade.attr("src", "http://api.avia.kknopka.ru/" + (parent.logo) + "", true, false)) + " alt=\"\"/></div><div class=\"store__breadcrumbs\"><i class=\"store__share-ico\"><svg class=\"icon icon-share-2\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-share-2\"></use></svg></i>" + (jade.escape((jade_interp = parent.section_title) == null ? '' : jade_interp)) + " / " + (jade.escape((jade_interp = parent.title) == null ? '' : jade_interp)) + " / " + (jade.escape((jade_interp = type_title) == null ? '' : jade_interp)) + "</div><div class=\"store__back-to-shop store__back-to-shop--head\"><a" + (jade.attr("href", "/" + (parent.section) + "/map/" + (parent.id) + "-" + (parent.title) + "", true, false)) + ">Вернуться к магазину</a><i class=\"ico\"><svg class=\"icon icon-leftarrow23\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-leftarrow23\"></use></svg></i></div><div class=\"store__fotos-leng\"><i class=\"store__fotos-ico\"><svg class=\"icon icon-picture\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-picture\"></use></svg></i>");
if(_.isEmpty(parent.image_gallery) || (count_photo = parent.image_gallery.split(",").length) == 0)
{
buf.push("<span>Нет фото</span>");
}
else
{
buf.push("<span class=\"store__fotos-link js-store__fotos-link\">Посмотреть " + (jade.escape((jade_interp = count_photo) == null ? '' : jade_interp)) + " фото</span>");
}
buf.push("</div><div data-tooltip=\"Добавить в избранное\" class=\"badge badge--favor badge--store js-tooltip-top\"><div class=\"badge__bottom\"></div><svg class=\"ico icon icon-star badge__ico badge__ico--favor\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-star\"></use></svg></div></div></div><div class=\"store__content\"><div class=\"store__wide-info\"><h2>" + (jade.escape((jade_interp = title) == null ? '' : jade_interp)) + "</h2>" + (null == (jade_interp = parent.descr) ? "" : jade_interp) + "<!--.store__show-new-collection-link--><!--    i.ico--><!--        svg.icon.icon-collection--><!--            use(xmlns:xlink='http://www.w3.org/1999/xlink', xlink:href='#icon-collection')--><!--    a(href='#') Показать всю новую колекцию--></div><div class=\"store__back-to-shop store__back-to-shop--content\"><i class=\"ico\"><svg class=\"icon icon-leftarrow23\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-leftarrow23\"></use></svg></i><a" + (jade.attr("href", "/" + (parent.section) + "/map/" + (parent.id) + "-" + (parent.title) + "", true, false)) + ">Вернуться к магазину</a></div></div></div>");}.call(this,"_" in locals_for_with?locals_for_with._:typeof _!=="undefined"?_:undefined,"count_photo" in locals_for_with?locals_for_with.count_photo:typeof count_photo!=="undefined"?count_photo:undefined,"image_promo" in locals_for_with?locals_for_with.image_promo:typeof image_promo!=="undefined"?image_promo:undefined,"parent" in locals_for_with?locals_for_with.parent:typeof parent!=="undefined"?parent:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"type_title" in locals_for_with?locals_for_with.type_title:typeof type_title!=="undefined"?type_title:undefined));;return buf.join("");
};

});

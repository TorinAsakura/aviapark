define(function(require,exports,module){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"store-gallery\"><div class=\"swiper-container js-store-gallery\"><div class=\"swiper-wrapper\"><div class=\"swiper-slide\"><img src=\"img/storegallery/1.jpg\" alt=\"\"/></div><div class=\"swiper-slide\"><img src=\"img/storegallery/2.jpg\" alt=\"\"/></div></div></div><div class=\"store-gallery__thumbs js-store-gallery__thumbs\"><div style=\"background-image: url(img/storegallery/1.jpg)\" class=\"store-gallery__thumb is-active\"></div><div style=\"background-image: url(img/storegallery/2.jpg)\" class=\"store-gallery__thumb\"></div></div><div class=\"store-gallery__close js-store-gallery__close\"></div></div>");;return buf.join("");
};

});

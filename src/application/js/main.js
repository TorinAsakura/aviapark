define(function () {
  return function () {
    $(function () {

      function extendDroplistHeight() {
        if (window.innerHeight > 1000) {
          $('.js-search-drop').addClass('search-drop--extended');
        }
      }

      $(window).on('resize', extendDroplistHeight);
      extendDroplistHeight();

      var transitionEnd = transitionEndEventName(),
          $noTouch = $('.no-touch'),
          $body = $('body');

      if ($('.js-promo-slider').length) {
        new Swiper('.js-promo-slider', {
          pagination: '.js-promo-slider__pagination',
          paginationClickable: true,
          nextButton: '.js-promo-slider__arrow-next',
          prevButton: '.js-promo-slider__arrow-prev',
          //simulateTouch: false,
          paginationBulletRender: function (index, className) {
            return '<span class="' + className + ' slider-bullet"></span>';
          },
          onTransitionStart: function (swiper) {
            $('.js-promo-slider__brand-item').eq(swiper.activeIndex).addClass('is-active')
                .siblings().removeClass('is-active');
          }
        });
      }

      if ($('.js-afisha-slider').length) {
        new Swiper('.js-afisha-slider', {
          pagination: '.js-afisha-slider__pagination',
          paginationClickable: true,
          //simulateTouch: false,
          paginationBulletRender: function (index, className) {
            return '<span class="' + className + ' slider-bullet"></span>';
          },
          onTransitionStart: function (swiper) {
            $('.js-afisha-slider__film').eq(swiper.activeIndex).addClass('is-active')
                .siblings().removeClass('is-active');
          }
        });
      }

      if ($('.js-cinema__about-slider').length) {
        new Swiper('.js-cinema__about-slider', {
          pagination: '.js-cinema__about-slider-pagination',
          paginationClickable: true,
          simulateTouch: false,
          spaceBetween: 30,
          paginationBulletRender: function (index, className) {
            return '<span class="' + className + ' slider-bullet"></span>';
          }
        });
      }

      if ($('.js-stock-slider').length) {
        new Swiper('.js-stock-slider', {
          slidesPerView: 'auto',
          spaceBetween: 14,
          autoplay: 4000,
          simulateTouch: false,
          autoplayDisableOnInteraction: false
        });
      }

      if ($('.js-shops-slider').length) {
        new Swiper('.js-shops-slider', {
          slidesPerView: 'auto',
          autoplay: 4000,
          simulateTouch: false,
          autoplayDisableOnInteraction: false
        });
      }

      var timeout;
      $('.js-shops-slider__item').on('mouseenter', function () {
        var self = $(this),
            content = self.find('.shops-slider__hidden-content').html();
        $('.shop-popup').removeClass('visible');
        $('<div class="shop-popup">' + content + '</div>').appendTo(document.body);
        var pos = self.offset(),
            popups = $('.shop-popup');
        clearTimeout(timeout);
        popups.last().css({
          top: pos.top - 50,
          left: pos.left
        }).addClass('visible')
            .on('mouseleave', function (ev) {
              var self = $(this);
              self.removeClass('visible');
              timeout = setTimeout(function () {
                popups.remove();
              }, 1000);
            });
      });

      var displaySocialSlider = function(response, params) {
        var data = response.data;
        var blockList = document.getElementById(params);
        for(var i = 0; i < response.data.length; i++) {

          var listItem = document.createElement('div');
          listItem.className = 'swiper-test swiper-slide social-slider__item is-hidden';

          var iconBox = document.createElement('div');
          iconBox.className = 'badge badge--instagram badge--instagram-social-slider';

          var iconBox = document.createElement('div');
          iconBox.className = 'badge badge--instagram badge--instagram-social-slider';

          var iconBoxIn = document.createElement('div');
          iconBoxIn.className = 'badge__bottom';
          iconBox.appendChild(iconBoxIn);

          var iconBoxI = document.createElement('i');
          iconBoxI.className = 'badge__ico badge__ico--instagram';
          iconBox.appendChild(iconBoxI);

          var instaImg = document.createElement('img');
          instaImg.setAttribute("data-no-retina","");
          instaImg.src = response.data[i].images.low_resolution.url;

          listItem.appendChild(instaImg);
          listItem.appendChild(iconBox);
          blockList.appendChild(listItem);
        }

        if ($('.js-social-slider').length) {
          new Swiper('.js-social-slider', {
            slidesPerView: 'auto',
            pagination: '.js-social-slider__pagination',
            paginationClickable: true,
            autoplay: 4000,
            autoplayDisableOnInteraction: false,
            paginationBulletRender: function (index, className) {
              return '<span class="'+className+' slider-bullet slider-bullet--inline"></span>';
            }
          });
        }
      }
      $(function() {
        var fetcher = new Instafetch('b4bb5e8d5d524020aa9fea4618f6e2f3');
        fetcher.fetch({
          user: 1564684296,
          limit: 20,
          callback: displaySocialSlider,
          params: 'avia-social-slider'
        });
      });

      if ($('.js-about-gallery').length) {
        var aboutGallery = new Swiper('.js-about-gallery', {
          onTransitionStart: function (swiper) {
            $('.js-about-gallery-thumbs .about-gallery-thumbs__thumb').eq(swiper.activeIndex).addClass('is-active')
                .siblings().removeClass('is-active');
          }
        });
        $('.js-about-gallery-thumbs').on('click', '.about-gallery-thumbs__thumb', function (ev) {
          aboutGallery.slideTo($(this).index());
        });
      }

      var $win = $(window),
          $fixedHeader = $noTouch.find('#js-l-header:not(.l-header--fixed)'),
          $pusher = $('#js-l-pusher');

      window.addEventListener('scroll', function (event) {
        var s = $win.scrollTop();
        if (s >= 50) {
          s = 50;
          $fixedHeader.addClass('is-fixed');
        } else $fixedHeader.removeClass('is-fixed');
        $fixedHeader.css({
          '-webkit-transform': 'translate3d(0, ' + (-s) + 'px, 0)',
          '-moz-transform': 'translate3d(0, ' + (-s) + 'px, 0)',
          '-ms-transform': 'translate3d(0, ' + (-s) + 'px, 0)',
          'transform': 'translate3d(0, ' + (-s) + 'px, 0)'
        })
      }, false);

      // Lazy load
      if ($noTouch.length) {
        $('.promo-slider').removeClass('is-hidden')
        $('.promo-slider__caption').removeClass('is-hidden')
        $('.grid-cell-1').removeClass('is-hidden').one(transitionEnd, function () {
          $('.grid-cell-2').removeClass('is-hidden');
          $('.grid-cell-3').removeClass('is-hidden');
        });
        $('.grid-cell-3').one(transitionEnd, function () {
          $('.grid-cell-5').removeClass('is-hidden');
          $('.afisha-slider__caption').removeClass('is-hidden');
          $('.js-afisha-slider ').removeClass('is-hidden');
          $('.grid-cell-4').removeClass('is-hidden');
          $('.grid-cell-6').removeClass('is-hidden');
        });

        var $bar = $('.events-bar');
        $('.events-bar').waypoint({
          handler: function () {
            $bar.removeClass('is-hidden');
            $('.stock-slider').removeClass('is-hidden');
            $('.stock-item').removeClass('is-hidden');
          },
          offset: '80%'
        });
        $('.shops-slider-wrap').waypoint({
          handler: function () {
            $('.shops-slider-wrap__strip').removeClass('is-hidden');
          },
          offset: '80%'
        });
        $('.js-social-slider').waypoint({
          handler: function () {
            $('.social-slider__item').removeClass('is-hidden');
          },
          offset: '80%'
        });
      }

      var $shedule = $('.js-shedule-information');
      $('.js-shedule__link').on('click', function (ev) {
        $shedule.hasClass('is-hidden')
            ? $shedule.removeClass('is-hidden')
            : $shedule.addClass('is-hidden');
        ev.stopPropagation();
      });
      $(document).on('click', function (ev) {
        var target = $(ev.target);
        if (!target.closest('.js-shedule-information').length) {
          $shedule.addClass('is-hidden');
        }
      });

      $('.navbar-toggle').on('click', function () {
        $body.addClass('navOpened');
      });
      $('#navBackground').on('click', function () {
        $body.removeClass('navOpened');
      });

      // Tooltip
      var tooltipDefaultSettings = {
        content: {
          attr: 'data-tooltip'
        },
        style: {
          classes: 'tooltip--dark',
          tip: false
        },
        position: {
          my: 'bottom center',
          at: 'top center',
          container: $('#tooltips'),
          adjust: {
            y: -15,
            mouse: false
          },
          effect: function (api, pos) {
            $(this).css(pos);
          }
        },
        show: {
          delay: 60,
          solo: true,
          effect: function () {
            $(this).fadeIn(70);
          }
        },
        hide: {
          effect: function () {
            $(this).fadeOut(35);
          }
        }
      };
      $('.js-tooltip-top').qtip(tooltipDefaultSettings);
      $('.js-tooltip-bottom').qtip($.extend(true, tooltipDefaultSettings, {
        position: {
          my: 'top center',
          at: 'bottom center',
          adjust: {
            y: 12
          }
        }
      }));

      // Search
      $('.js-search-btn').on('click', function () {
        $('.js-search--main').removeClass('is-hidden');
        $('.overlay').removeClass('is-hidden');
      });
      $('.js-search__text-field').on('focus', function () {
        $('.js-search-drop').removeClass('is-hidden');
      });
      $(document).on('click', function (ev) {
        var target = $(ev.target);
        if (!target.closest('#search').length) {
          $('.js-search-drop').addClass('is-hidden');
          $('.overlay').removeClass('is-shown');
        }
      });
      $('.overlay').on('click', function () {
        $('.js-search--main').addClass('is-hidden');
        $('.js-search-drop').addClass('is-hidden');
        $('.overlay').addClass('is-hidden');
      });

      var $storeItems = $('.js-store__items');
      $storeItems.imagesLoaded().done(function () {
        $storeItems.isotope({
          itemSelector: '.stock-item'
        });
      });

      $storeItems.infinitescroll({
            navSelector: '#page_nav',    // selector for the paged navigation
            nextSelector: '#page_nav a',  // selector for the NEXT link (to page 2)
            itemSelector: '.element',     // selector for all items you'll retrieve
            loading: {
              finishedMsg: 'No more pages to load.',
              img: 'http://i.imgur.com/qkKy8.gif'
            }
          }, function (newElements) {
            $storeItems.isotope('appended', $(newElements));
            console.log('123');
          }
      );

      // Category
      $('.js-filter__droplist-point').on('click', function () {
        var categoryList = $('.js-filter-droplist');
        if (categoryList.is(':hidden')) {
          categoryList.removeClass('is-hidden');
        } else {
          categoryList.addClass('is-hidden');
        }
      });
      $(document).on('click', function (ev) {
        var target = $(ev.target);
        if (!target.closest('.filter__droplist-item').length) {
          $('.js-filter-droplist').addClass('is-hidden');
        }
      });

      // Filter
      $('.js-filter__item').on('click', function () {
        $(this).toggleClass('is-active');
      });
      $('.js-filter__favor').on('click', '.badge--favor', function () {
        $(this).toggleClass('is-active');
      });
      $('.js-filter__cleaning').on('click', function () {
        $('.js-filter__item').removeClass('is-active');
      });
      $('.js-filter__item').on('mouseenter', function () {
        $('.js-filter-droplist').addClass('is-hidden');
        $('.js-search-drop').addClass('is-hidden');
      });

      // Store
      $('.js-store__close').on('click', function () {
        $('.js-store').addClass('is-hidden');
      });
      $('.js-btn-show-more-info').on('click', function (ev) {
        var btn = $(this),
            moreInfoBox = $('.store__more-info');
        if (moreInfoBox.is(':hidden')) {
          $('.store__more-info').slideDown(400, function () {
            btn.text('Свернуть');
          });
        } else {
          $('.store__more-info').slideUp(400, function () {
            btn.text('Подробнее');
          });
        }
        ev.preventDefault();
      });
      $('.js-store__fotos-link').on('click', function () {
        $('.js-store-gallery').parent().removeClass('is-hidden');
      });
      if ($('.js-store-gallery').length) {
        var storeGallery = new Swiper('.js-store-gallery', {
          onTransitionStart: function (swiper) {
            $('.js-store-gallery__thumbs .store-gallery__thumb').eq(swiper.activeIndex).addClass('is-active')
                .siblings().removeClass('is-active');
          }
        });
        $('.js-store-gallery__thumbs').on('click', '.store-gallery__thumb', function (ev) {
          storeGallery.slideTo($(this).index());
        });
        $('.js-store-gallery__close').on('click', function () {
          $('.js-store-gallery').parent().addClass('is-hidden');
        });
        $(document).on('keydown', function (ev) {
          var code = ev.which;
          if (!$('.store-gallery').hasClass('is-hidden')) {
            switch (ev.which) {
              case 27:
                $('.store-gallery').addClass('is-hidden');
                break;
              case 37:
                storeGallery.slidePrev();
                break;
              case 39:
                storeGallery.slideNext();
                break;
            }
          }
        });
      }

      $('.jobs_list_text').on('click', function () {
        var $this = $(this);
        if ($this.hasClass('opened')) {
          $this.removeClass('opened').height('');
        } else {
          $('.jobs_list_text').not($this).removeClass('opened').height('').end()
              .filter($this).addClass('opened').css('height', 500);
        }
      });
      $(document).on('click', function (ev) {
        var target = $(ev.target);
        if (!target.closest('.jobs_list_text').length) {
          $('.jobs_list_text').removeClass('opened').css({
            height: ''
          });
        }
      });

      // Contact map
      var contactsMap;

      function initMap() {
        var myLatLng = new google.maps.LatLng(55.792063, 37.527699);
        var mapOptions = {
          center: myLatLng,
          zoom: 13,
          scrollwheel: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [{
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [{"visibility": "off"}, {"color": "#af2727"}]
          }, {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#444444"}]
          }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{"visibility": "on"}, {"color": "#ebe4d8"}]
          }, {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [{"visibility": "off"}]
          }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{"visibility": "simplified"}, {"color": "#e2d9c9"}]
          }, {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{"visibility": "off"}]
          }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{"saturation": -100}, {"lightness": 45}, {"visibility": "off"}, {"color": "#ffcfcf"}]
          }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{"visibility": "off"}, {"color": "#ffffff"}]
          }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{"visibility": "simplified"}]
          }, {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [{"visibility": "off"}]
          }, {
            "featureType": "road.highway",
            "elementType": "labels.icon",
            "stylers": [{"visibility": "off"}]
          }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "all",
            "stylers": [{"visibility": "simplified"}, {"color": "#ffffff"}]
          }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [{"visibility": "simplified"}, {"weight": "0.31"}]
          }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "labels",
            "stylers": [{"visibility": "off"}]
          }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "labels.icon",
            "stylers": [{"visibility": "off"}]
          }, {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [{"weight": "0.35"}, {"visibility": "on"}, {"color": "#ffffff"}]
          }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{"weight": "0.12"}, {"visibility": "on"}]
          }, {
            "featureType": "road.arterial",
            "elementType": "labels.text",
            "stylers": [{"visibility": "off"}]
          }, {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{"visibility": "off"}]
          }, {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [{"visibility": "off"}, {"hue": "#ff0000"}]
          }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{"weight": "0.39"}]
          }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{"visibility": "off"}, {"color": "#ffffff"}]
          }, {
            "featureType": "transit",
            "elementType": "labels.text",
            "stylers": [{"visibility": "off"}]
          }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{"color": "#75d9d1"}, {"visibility": "on"}]
          }, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "off"}]}]
        };
        contactsMap = new google.maps.Map(document.getElementById('contacts-map'), mapOptions);
        var marker = new google.maps.Marker({
          position: myLatLng,
        });
        marker.setMap(contactsMap);
      }

      if (document.getElementById('contacts-map')) {
        google.maps.event.addDomListener(window, 'load', initMap);
        google.maps.event.addDomListener(window, 'resize', function () {
          var center = contactsMap.getCenter();
          google.maps.event.trigger(contactsMap, 'resize');
          contactsMap.setCenter(center);
        });
      }

      $('.js-filter__route-switcher').on('click', function () {
        $('.content--map').toggleClass('map');
      });

    });

    function thumbThreeEnter() {
      thumbThreeCars.stop().animate({transform: 'translate(0, -60%)'}, 200, mina.easeout, function () {
        thumbThreeTopCar.stop().animate({transform: 'translate(0, 3%)'}, 100, mina.easeout, function () {
          thumbThreeTopCar.stop().animate({transform: 'translate(0, 0)'}, 100, mina.easeout);
        });
      });
      thumbThreeHand.stop().animate({transform: 'translate(0, -220%)'}, 200, mina.easeout);
    }

    function thumbThreeLeave() {
      thumbThreeCars.stop().animate({transform: 'translate(0, 0%)'}, 200, mina.easeout, function () {
        thumbThreeTopCar.stop().animate({transform: 'translate(0, 0%)'}, 100, mina.easeout, function () {
          thumbThreeTopCar.stop().animate({transform: 'translate(0, 0)'}, 100, mina.easeout);
        });
      });
      thumbThreeHand.stop().animate({transform: 'translate(0, 0%)'}, 200, mina.easeout);
    }

    function transitionEndEventName() {
      var i,
          undefined,
          el = document.createElement('div'),
          transitions = {
            'transition': 'transitionend',
            'OTransition': 'otransitionend',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
          };
      for (i in transitions) {
        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
          return transitions[i];
        }
      }
    }

    //new code
    $(document).ready(function () {
      //tabs
      $('.tab .tabs').delegate('li:not(.active)', 'click', function () {
        $(this).addClass('active').siblings().removeClass('active').parents('.tab').find('.box').hide().eq($(this).index()).fadeIn(250);
      });

      //------------------------------------------------------------------------//

      //open filter
      $('.open-fb').on('click', function () {
        if ($(this).hasClass('active')) {
          $('.fb-dropdown').hide();
          $(this).removeClass('active');
        } else {
          $('.fb-dropdown').hide();
          $('.open-fb').removeClass('active');
          $(this).addClass('active');
          $(this).parents('.fm--box').find('.fb-dropdown').show();
        }
        ;
      })

      //------------------------------------------------------------------------//

      //user menu
      $('.umb-link').on('click', function () {
        $(this).hide();
        $('.umb-close,.umb-box').show();
        return false;
      });
      $('.umb-close').on('click', function () {
        $(this).hide();
        $('.umb-box').hide();
        $('.umb-link').show();
        return false;
      });

    });

}});


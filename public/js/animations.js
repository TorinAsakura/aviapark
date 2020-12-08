
// Animation event thumbs
var thumbOne = $('.et-one'),
  thumbTwo = $('.et-two'),
  thumbThree = $('.et-three'),
  thumbFour = $('.et-four'),
  thumbFive = $('.et-five'),
  thumbSix = $('.et-six');

// THUMB ONE ANIMATE (CSS)
thumbOne.hover(function() {
  var _this = $(this);
  _this.addClass('th-one-anim');
}, function() {
  var _this = $(this);
  _this.removeClass('th-one-anim');
});

// THUMB FIVE ANIMATE (CSS)
thumbFive.hover(function() {
  var _this = $(this);
  _this.addClass('th-five-anim');
}, function() {
  var _this = $(this);
  _this.removeClass('th-five-anim');
});

thumbFive.on('mousemove', function(ev) {
  $('.et-five__bg').css({
    'background-position': (100 * (ev.pageX - $(this).offset().left) / thumbFive.width()).toFixed(3)+'% 50%'
  });
});

// THUMB TWO ANIMATE (SNAP SVG)
(function () {

  if (document.getElementById('thumb-2')) {
    var svgThumbTwo = Snap (document.getElementById('thumb-2')),
      content = svgThumbTwo.select('#et-two-content'),
      textHead = svgThumbTwo.select('.et-two-text-head'),
      textBottom = svgThumbTwo.select('.et-two-text-bottom'),
      mustache = svgThumbTwo.select('.et-two-mustache');

    thumbTwo.on({
      mouseenter: function(){
        thumbThreeEnter();
      },
      mouseleave: function(){thumbThreeLeave();}
    });
  }

  function thumbThreeEnter() {
    thumbTwo.addClass('th-two-anim');
    svgThumbTwo.select('#et-two-content').stop().animate({
      transform: 'translate(0, -200%)'
    }, 300, mina.easeout, function() {
      mustache.attr({
        fill: '#d2f6ee'
      });
    });
    textHead.attr({
      opacity: 0
    });
    textBottom.stop().animate({
      transform: 'translate(0, -40%)'
    }, 300, mina.easeout).attr({
      fill: '#ffc2d2'
    });
  }

  function thumbThreeLeave() {
    thumbTwo.removeClass('th-two-anim');
    svgThumbTwo.select('#et-two-content').stop().animate({
      transform: 'translate(0, 0)'
    }, 300, mina.easeout, function() {
      mustache.attr({
        fill: 'black'
      });
      textHead.attr({
        opacity: 1
      });
    });
    textBottom.stop().animate({
      transform: 'translate(0, 0)'
    }, 300, mina.easeout).attr({
      fill: 'black'
    });
  }


}());

// THUMB THREE ANIMATE (SNAP SVG)
(function () {

  if (document.getElementById('thumb-3')) {
    var svgThumbThree = Snap (document.getElementById('thumb-3')),
      handWrap = svgThumbThree.select('#thump-map-on-phone'),
      hand = svgThumbThree.select('#thumb-3-hand'),
      cars = svgThumbThree.select('#thumb-3-cars'),
      topCar = svgThumbThree.select('#thumb-3-top-car'),
      pointEl = svgThumbThree.select('#point-move'),
      elBlur = svgThumbThree.filter(Snap.filter.blur(0, 2));

    thumbThree.on({
      mouseenter: function(){thumbThreeEnter();},
      mouseleave: function(){thumbThreeLeave();}
    });
  }

  function thumbThreeEnter() {
    cars
      .attr({filter: elBlur})
      .stop().animate({ transform: 'translate(0, -60%)' }, 200, mina.easeout, function() {
        cars.attr({filter: 0});
        topCar.stop().animate({ transform: 'translate(0, 3%)' }, 100, mina.easeout, function(){
          topCar.stop().animate({ transform: 'translate(0, 0)' }, 100, mina.easeout);
        });
      });
    handWrap.stop().animate({ transform: 'translate(0, -220%)' }, 200, mina.easeout, function() {
      movePoint();
    });
  }

  function thumbThreeLeave() {
    cars.stop().animate({ transform: 'translate(0, 0%)' }, 200, mina.easeout, function() {
      topCar.stop().animate({ transform: 'translate(0, 0%)' }, 100, mina.easeout, function(){
        topCar.stop().animate({ transform: 'translate(0, 0)' }, 100, mina.easeout);
        cars.attr({filter: 0});
      });
    });
    handWrap.stop().animate({ transform: 'translate(0, 0%)' }, 200, mina.easeout);
  }

  function movePoint() {

    // "Squiggly" Path
    var myPath = hand.path('M212.891,688.762l4-34l17.276,3.815l16.179-57.89l10.989,2.907').attr({fill: "none"});
    // Draw Path
    var len = myPath.getTotalLength();
    Snap.animate(0, len, function( value ) {
      var movePoint = myPath.getPointAtLength( value );
      pointEl.attr({ cx: movePoint.x, cy: movePoint.y }); // move along path via cx & cy attributes
    }, 2500, mina.lianer);

  }
}());

// THUMB FOUR ANIMATE (SNAP SVG)
(function () {

  if (document.getElementById('thumb-4')) {
    var svgThumbFour = Snap (document.getElementById('thumb-4')),
      maskUse = svgThumbFour.select('#thumb_4_fish'),
      textShow = svgThumbFour.select('.thumb-4-text-show'),
      fishes = svgThumbFour.select('#thumb-4-fishes'),
      fishMain = svgThumbFour.select('#thumb-4-fish-main'),
      fishOne = svgThumbFour.select('#thumb-4-fish-one'),
      fishTwo = svgThumbFour.select('#thumb-4-fish-two'),
      fishThree = svgThumbFour.select('#thumb-4-fish-three'),
      rulerContainer = svgThumbFour.select('#thumb-4-ruler');

    thumbFour.on({
      mouseenter: function(){thumbFourEnter();},
      mouseleave: function(){thumbFourLeave();}
    });
  }

  function thumbFourEnter() {
    fishOne.transform('translate(0, 0)');
    maskUse
      .stop()
      .animate({ transform: 'translate(0, -370%)' }, 300, mina.easeout, function() {
        textShow.attr({opacity: 1});
      });
    fishMain.stop().animate({ transform: 'translate(0, 20%)' }, 300, mina.easeout, function() {
      fishOne
        .stop()
        .animate({ transform: 'matrix(1,0,0,1,0,60)' }, 300, mina.backout, function() {
          this.animate({ transform: 'matrix(1,0,0,1,300,60)' }, 1500, mina.backout);
          thumbFourRuler(true);
          moveFish();
        });
    });
  }

  function thumbFourLeave() {
    // reset
    fishTwo.stop().transform('translate(0, 0)');
    fishThree.stop().transform('translate(0, 0)');
    textShow.attr({opacity: 0});
    fishMain.transform('translate(0, 0)');

    fishOne
      .stop()
      .animate({ transform: 'translate(0, 0)' }, 0, mina.backout);

    maskUse
      .stop()
      .animate({ transform: 'translate(0, 0)' }, 300, mina.easeout, function() {
      });
    thumbFourRuler(false);
  }

  function thumbFourRuler(isOpen) {
    var elList = rulerContainer.selectAll('g#thumb-4-ruler > g');
    value = isOpen ? -130 : 0;

    for (var i=0; i < elList.length; i++) {
      elList[i].stop().animate({ transform: 'translate(' + value + ', 0)' }, 300, mina.backout);
    }
  }

  function moveFish() {

    function forwardFishTwo() {
      fishTwo
        .stop()
        .animate({ transform: 'translate(530%, 0)' }, 1500, mina.linear, function() {
          backwardFishTwo();
        });
    }

    function forwardFishThree() {
      fishThree
        .stop()
        .animate({ transform: 'translate(-530%, 0)' }, 1500, mina.linear, function() {
          backwardFishThree();
        });
    }

    function backwardFishTwo() {
      fishTwo
        .stop()
        .animate({ transform: 'translate(0, 0)' }, 1500, mina.linear, function() {
          forwardFishTwo();
        });
    }

    function backwardFishThree() {
      fishThree
        .stop()
        .animate({ transform: 'translate(0, 0)' }, 1500, mina.linear, function() {
          forwardFishThree();
        });
    }
    forwardFishTwo();
    forwardFishThree();
  }
}());

// THUMB FOUR ANIMATE (SNAP SVG)
(function() {

  if (document.getElementById('thumb-6')) {
    var svgThumbSix = Snap (document.getElementById('thumb-6')),
      logo = svgThumbSix.select('#cinema-logo'),
      bottomText = svgThumbSix.select('#thumb-six-text-bottom'),
      camera = svgThumbSix.select('#th-six-camcorder'),
      reelSmal = svgThumbSix.select('#reel-of-film-small'),
      reelBig = svgThumbSix.select('#reel-of-film-big');

    thumbSix.on({
      mouseenter: function(){thumbFourEnter();},
      mouseleave: function(){thumbFourLeave();}
    });
  }

  function thumbFourEnter() {
    logo
      .stop()
      .animate({ transform: 'translate(0, -100%)' }, 300, mina.easeout, function() {

      });
    bottomText
      .stop()
      .animate({ transform: 'translate(0, 120)' }, 300, mina.easeout, function() {
        thumbSix.addClass('thb-six-anim');
        reelFilm();
      });
  }

  function thumbFourLeave() {
    thumbSix.removeClass('thb-six-anim');
    logo
      .stop()
      .animate({ transform: 'translate(0, 0)' }, 300, mina.easeout, function() {

      });
    bottomText
      .stop()
      .animate({ transform: 'translate(0, 0)' }, 300, mina.easeout, function() {

      });
    reelSmal.stop().transform('rotate(0, 202.5, 210)');
    reelBig.stop().transform('rotate(0, 256, 204)');
  }

  function reelFilm(){
    reelSmal.stop().animate(
      { transform: 'r360, 202.5, 210'}, // Basic rotation around a point. No frills.
      1000, // Nice slow turning rays
      function(){
        reelSmal.attr({ transform: 'rotate(0, 202.5, 210)'}); // Reset the position of the rays.
        //reelFilm(); // Repeat this animation so it appears infinite.
      });
    reelBig.stop().animate(
      { transform: 'r360, 256, 204'}, // Basic rotation around a point. No frills.
      1000, // Nice slow turning rays
      function(){
        reelBig.attr({ transform: 'rotate(0, 256, 204)'}); // Reset the position of the rays.
        reelFilm(); // Repeat this animation so it appears infinite.
      });
  }

}());


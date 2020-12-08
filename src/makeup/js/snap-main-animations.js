(function() {
    if (document.querySelector('#svgrest')) {
        var svgrest = Snap('#svgrest');
        var tr_init = 't0,100,s1';
        var tr_init_top = 't0,-150';
        var chair_r = svgrest.select('#chair_r');
        var chair_l = svgrest.select('#chair_l');
        var table = svgrest.select('#table');
        var cup_l = svgrest.select('#cup_l');
        var cup_r = svgrest.select('#cup_r');
        var curtain = svgrest.select('#curtain');
        var rest_container = $('#svgrest');
        var rest_enter = function () {
            chair_l.stop().animate({
                transform: 't0,65'
            }, 550, mina.backout);
            chair_r.stop().animate({
                transform: 't0,65'
            }, 600, mina.backout);
            table.stop().animate({
                transform: 't0,45'
            }, 650, mina.backout);
            cup_l.stop().animate({
                transform: 't0,47'
            }, 550, mina.backout);
            cup_r.stop().animate({
                transform: 't0,47'
            }, 500, mina.backout);
            curtain.stop().animate({
                transform: 't0,-30'
            }, 600, mina.backout);
        };
        var rest_leave = function () {
            chair_r.stop().animate({
                transform: 'r30,t0,150,s0'
            }, 500, mina.backout);
            chair_l.stop().animate({
                transform: 'r-30,t0,150,s0'
            }, 500, mina.backout);
            table.stop().animate({
                transform: tr_init
            }, 500, mina.backout);
            cup_l.stop().animate({
                transform: tr_init
            }, 500, mina.backout);
            cup_r.stop().animate({
                transform: tr_init
            }, 500, mina.backout);
            curtain.stop().animate({
                transform: tr_init_top
            }, 500, mina.backout);
        }
        rest_container.on('mouseenter', function() {
            rest_enter()
        });
        rest_container.on('mouseleave', function() {
            rest_leave();
        });
    }
})();
(function () {
    if (document.querySelector('#svgstores')) {
        var s = Snap("#svgstores");
        var tr_init = 't0,100,s1';
        var tr_init_top = 't0,-150';
        var pants = s.select('#pants');
        var dress = s.select('#dress');
        var lines_l = s.select('#lines_l');
        var lines_r = s.select('#lines_r');
        var rest_container = $("#svgstores");
        rest_container.on("mouseenter", function (event) {
            rest_enter();
        });
        rest_container.on("mouseleave", function (event) {
            rest_leave();
        });
        var rest_enter = function () {
            pants.stop().animate({
                transform: 'translate(-145, -174) skewX(0)'
            }, 550, mina.backout);

            dress.stop().animate({
                transform: 'translate(-175, -174) skewX(0)'
            }, 600, mina.backout);

            lines_l.stop().animate({
                transform: 'translate(-160, -184)'
            }, 300, mina.linear);
            lines_r.stop().animate({
                transform: 'translate(-160, -180)'
            }, 300, mina.linear);
        };
        var rest_leave = function () {
            pants.stop().animate({
                transform: 'translate(-345, -174) skewX(20)'
            }, 550, mina.backout);
            dress.stop().animate({
                transform: 'translate(45, -174) skewX(-20)'
            }, 600, mina.backout);
            lines_l.stop().animate({
                transform: 'translate(-360, -174)'
            }, 400, mina.linear);
            lines_r.stop().animate({
                transform: 'translate(260, -174)'
            }, 400, mina.linear);
        }
    }
})();
(function () {
    if (document.querySelector('#svgaqua')) {
        var svgaqua = Snap("#svgaqua");
        var water = svgaqua.select('#water');
        var fish = svgaqua.select('#fish');
        var bubbles = svgaqua.select('#bubbles');
        var shark = svgaqua.select('#shark');
        var rest_container = $("#svgaqua");
        rest_container.on("mouseenter", function (event) {
            rest_enter();
        });
        rest_container.on("mouseleave", function (event) {
            rest_leave();
        });
        var rest_enter = function () {
            water.stop().animate({
                transform: 'translate(0, 0)'
            }, 500, mina.linear, rest_enter_fish);
        };
        var rest_enter_fish = function () {
            fish.stop().animate({
                transform: 'translate(300,-345)'
            }, 1600, mina.linear);
            shark.stop().animate({
                transform: 'matrix(0.56003347,0,0,0.56003347,-300,-200)'
            }, 1500, mina.linear);
            bubbles.stop().animate({
                transform: 'translate(0, -50)'
            }, 1900, mina.linear);
        };
        var rest_leave = function () {
            water.stop().animate({
                transform: 'translate(0, 150)'
            }, 600, mina.linear);
            fish.stop().animate({
                transform: 'translate(-200,-345)'
            }, 0, mina.linear);
            bubbles.stop().animate({
                transform: 'translate(0, 0)'
            }, 0, mina.linear);
            shark.stop().animate({
                transform: 'matrix(0.56003347,0,0,0.56003347,150,-200)'
            }, 0, mina.linear);
        }
    }
})();
(function () {
    if (document.querySelector('#svgmap')) {
        var s = Snap("#svgmap");
        var rect = s.select('#svg-map-rect')
        var pin1 = s.select('#pin1');
        var pin3 = s.select('#pin3');
        var lines = s.select('#lines');
        rect.attr({
            mask: lines
        });
        var rest_container = $(".afisha-grid--map");
        rest_container.on("mouseenter", function (event) {
            rest_enter();
        });
        rest_container.on("mouseleave", function (event) {
            rest_leave();
        });
        var rest_enter = function () {
            pin1.stop().animate({opacity: 1, transform: 'scale(1.2) translate(-35, -15)'}, 700, mina.bounce);
            pin3.stop().animate({opacity: 1, transform: 'scale(1.2) translate(-10, -15)'}, 400, mina.bounce);
            rect.stop().animate({height: 150}, 800, mina.linear);
            lines.stop().animate({opacity: 1}, 1);
        }
        var rest_leave = function () {
            pin1.stop().animate({opacity: 0, transform: 'scale(1)'}, 600, mina.backout);
            pin3.stop().animate({opacity: 0, transform: 'scale(1)'}, 600, mina.backout);
            lines.stop().animate({opacity: 0}, 600, mina.linear);
            rect.stop().animate({height: 50}, 700, mina.linear);
        }
    }
})();
(function () {
    if (document.querySelector('#svgkidz')) {
        var svgkidz = Snap("#svgkidz");
        var pult = svgkidz.select('#pult');
        var ball = svgkidz.select('#ball');
        var horse = svgkidz.select('#horse');
        var helic = svgkidz.select('#helic');
        var plane = svgkidz.select('#plane');
        var svgkidzcontainer = document.getElementById("svgkidz");
        var svgkidzcontainer = $("#svgkidz");
        svgkidzcontainer.on("mouseenter", function (event) {
            kidz_enter();
        });
        svgkidzcontainer.on("mouseleave", function (event) {
            kidz_leave();
        });
        var kidz_enter = function () {
            pult.stop().animate({
                transform: 'translate(0, 0)'
            }, 300, mina.backout);
            ball.stop().animate({
                transform: 'translate(0,0)'
            }, 400, mina.backout);
            horse.stop().animate({
                transform: 'translate(0,0)'
            }, 450, mina.backout);
            helic.stop().animate({
                transform: 'translate(0, 0)'
            }, 500, mina.backout);
            plane.stop().animate({
                transform: 'translate(0, 0)'
            }, 550, mina.backout);
        };
        var kidz_leave = function () {
            pult.stop().animate({
                transform: 'translate(0, 150)'
            }, 300, mina.linear);
            ball.stop().animate({
                transform: 'translate(-100,50)'
            }, 400, mina.bounce);
            horse.stop().animate({
                transform: 'translate(150,50)'
            }, 450, mina.linear);
            helic.stop().animate({
                transform: 'translate(0,-150)'
            }, 500, mina.linear);
            plane.stop().animate({
                transform: 'translate(0,-150)'
            }, 500, mina.linear);
        }
    }
})();
(function () {
    if (document.querySelector('#svgwifi')) {
        var svgwifi = Snap("#svgwifi");
        var g1 = svgwifi.select('#g1');
        var center = svgwifi.select('#center');
        var w = [svgwifi.select('#w1'), svgwifi.select('#w2'), svgwifi.select('#w3')];
        var svgwificontainer = $("#svgwifi");
        svgwificontainer.on("mouseenter", function (event) {
            wifi_enter();
        });
        svgwificontainer.on("mouseleave", function (event) {
            wifi_leave();
        });
        var frame = 0;
        var interval;
        var wifi_enter = function () {
            w[0].stop().animate({
                opacity: '0'
            }, 0, mina.linear);
            w[1].stop().animate({
                opacity: '0'
            }, 0, mina.linear);
            w[2].stop().animate({
                opacity: '0'
            }, 0, mina.linear);
            interval = setInterval(function () {
                if (frame > 2) {
                    w[0].stop().animate({
                        opacity: '0'
                    }, 0, mina.linear);
                    w[1].stop().animate({
                        opacity: '0'
                    }, 0, mina.linear);
                    w[2].stop().animate({
                        opacity: '0'
                    }, 0, mina.linear);
                    frame = 0;
                } else {
                    w[frame].stop().animate({
                        opacity: '1'
                    }, 200, mina.linear);
                    frame++;
                }
            }, 150);
        };
        var wifi_leave = function () {
            clearInterval(interval);
            w[0].stop().animate({
                opacity: '1'
            }, 0, mina.linear);
            w[1].stop().animate({
                opacity: '1'
            }, 0, mina.linear);
            w[2].stop().animate({
                opacity: '1'
            }, 0, mina.linear);
        }
    }
})();

$(function() {
	var mapWidth = $('.event-thumbs').width(); // should be set to function with resize event
	var directionDisplay;
	var directionsService = new google.maps.DirectionsService();
	var pageWidth;
	var mapMarkersPos = [];
	var contactsMap, contactsMap2, contactsMap3;
	var mapOptions = {
		scrollwheel: false,
		disableDefaultUI: true,
		disableDoubleClickZoom: true,
		center: new google.maps.LatLng(55.790076,37.531059),
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"},{"color":"#af2727"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"on"},{"color":"#ebe4d8"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#e2d9c9"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"off"},{"color":"#ffcfcf"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"off"},{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#ffffff"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"visibility":"simplified"},{"weight":"0.31"}]},{"featureType":"road.highway.controlled_access","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"weight":"0.35"},{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"weight":"0.12"},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"off"},{"hue":"#ff0000"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"weight":"0.39"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"color":"#ffffff"}]},{"featureType":"transit","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#75d9d1"},{"visibility":"on"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]}]
	};
	var markers = [
		[55.790076,37.531059,'http://elje-design.com/live/avia-new-test/img/about/marker-avia.png','#46A2CC','','авиапарк'],
		[55.777350,37.519409,'http://elje-design.com/live/avia-new-test/img/about/marker-metro1b.png','#A31E8B','<div class="infobox"><div class="infoboxArrow"></div><p><strong>Короткий инфоблок</strong>Последний вагон из центра, выход в город (в переходе налево) на Хорошевское шоссе, Магистральные улицы, к Ходынскому полю, Ледовому дворцу</p></div>','Динамо'],
		[55.789421,37.559042,'http://elje-design.com/live/avia-new-test/img/about/marker-metro2b.png','#03A34B','<div class="infobox"><div class="infoboxArrow"></div><p><strong>Короткий инфоблок</strong>Последний вагон из центра, выход в город на Ленинградский проспект, к театру «Ромэн».</p></div>','Полежаевская'],
		[55.792988,37.588276,'http://elje-design.com/live/avia-new-test/img/about/marker-metro3b.png','#8A8A8A','<div class="infobox"><div class="infoboxArrow"></div><p><strong>Короткий инфоблок</strong>Первый вагон из центра, выход в город из подземного вестибюля на площадь Бутырской заставы, к улицам Бутырская и Нижняя Масловка.</p></div>','савеловская'],
		[55.782150,37.531838,'http://elje-design.com/live/avia-new-test/img/about/marker-metro4c.png','46A2CC','<div class="infobox"><div class="infoboxArrow"></div><p><strong>Короткий инфоблок</strong>маршрутное такси по Ходынскому полю. На машине: ул. Авиаконструктора Микояна, 10</p></div>','']
	];

	var pathViolet = [new google.maps.LatLng(55.777550,37.519409),
		new google.maps.LatLng(55.777485,37.519057),
		new google.maps.LatLng(55.777309,37.518136),
		new google.maps.LatLng(55.777303,37.518044),
		new google.maps.LatLng(55.777302,37.517923),
		new google.maps.LatLng(55.777306,37.517815),
		new google.maps.LatLng(55.777315,37.517615),
		new google.maps.LatLng(55.777357,37.517614),
		new google.maps.LatLng(55.777398,37.517610),
		new google.maps.LatLng(55.777458,37.517597),
		new google.maps.LatLng(55.777775,37.517428),
		new google.maps.LatLng(55.777808,37.517410),
		new google.maps.LatLng(55.777914,37.517353),
		new google.maps.LatLng(55.778708,37.516941),
		new google.maps.LatLng(55.779010,37.516781),
		new google.maps.LatLng(55.779515,37.516512),
		new google.maps.LatLng(55.779665,37.516435),
		new google.maps.LatLng(55.780511,37.515989),
		new google.maps.LatLng(55.780708,37.515886),
		new google.maps.LatLng(55.780821,37.515826),
		new google.maps.LatLng(55.780893,37.515786),
		new google.maps.LatLng(55.780953,37.515753),
		new google.maps.LatLng(55.781069,37.515694),
		new google.maps.LatLng(55.781314,37.515568),
		new google.maps.LatLng(55.781912,37.515244),
		new google.maps.LatLng(55.782231,37.515081),
		new google.maps.LatLng(55.782411,37.514988),
		new google.maps.LatLng(55.783536,37.514407),
		new google.maps.LatLng(55.784008,37.514144),
		new google.maps.LatLng(55.784115,37.514086),
		new google.maps.LatLng(55.784298,37.513987),
		new google.maps.LatLng(55.784475,37.513899),
		new google.maps.LatLng(55.785402,37.513416),
		new google.maps.LatLng(55.786454,37.512859),
		new google.maps.LatLng(55.786988,37.512592),
		new google.maps.LatLng(55.787119,37.512523),
		new google.maps.LatLng(55.787352,37.512403),
		new google.maps.LatLng(55.787612,37.512269),
		new google.maps.LatLng(55.787742,37.512204),
		new google.maps.LatLng(55.787859,37.512142),
		new google.maps.LatLng(55.788289,37.511912),
		new google.maps.LatLng(55.788576,37.511764),
		new google.maps.LatLng(55.788686,37.511703),
		new google.maps.LatLng(55.790432,37.510802),
		new google.maps.LatLng(55.790511,37.510761),
		new google.maps.LatLng(55.790592,37.510719),
		new google.maps.LatLng(55.791953,37.510012),
		new google.maps.LatLng(55.792036,37.510444),
		new google.maps.LatLng(55.792168,37.511215),
		new google.maps.LatLng(55.792264,37.511755),
		new google.maps.LatLng(55.792333,37.512153),
		new google.maps.LatLng(55.792622,37.513810),
		new google.maps.LatLng(55.792941,37.515602),
		new google.maps.LatLng(55.792983,37.515838),
		new google.maps.LatLng(55.793221,37.517192),
		new google.maps.LatLng(55.793353,37.518002),
		new google.maps.LatLng(55.793420,37.518384),
		new google.maps.LatLng(55.793481,37.518766),
		new google.maps.LatLng(55.793503,37.518932),
		new google.maps.LatLng(55.793523,37.519173),
		new google.maps.LatLng(55.793535,37.519508),
		new google.maps.LatLng(55.793539,37.519823),
		new google.maps.LatLng(55.793531,37.520108),
		new google.maps.LatLng(55.793508,37.520454),
		new google.maps.LatLng(55.793467,37.520815),
		new google.maps.LatLng(55.793421,37.521116),
		new google.maps.LatLng(55.793345,37.521483),
		new google.maps.LatLng(55.793210,37.521953),
		new google.maps.LatLng(55.793145,37.522159),
		new google.maps.LatLng(55.793038,37.522414),
		new google.maps.LatLng(55.792863,37.522811),
		new google.maps.LatLng(55.792771,37.523063),
		new google.maps.LatLng(55.792704,37.523267),
		new google.maps.LatLng(55.792666,37.523394),
		new google.maps.LatLng(55.792604,37.523648),
		new google.maps.LatLng(55.792535,37.523977),
		new google.maps.LatLng(55.792424,37.524494),
		new google.maps.LatLng(55.792364,37.524806),
		new google.maps.LatLng(55.792338,37.524976),
		new google.maps.LatLng(55.792309,37.525191),
		new google.maps.LatLng(55.792250,37.525736),
		new google.maps.LatLng(55.792175,37.526365),
		new google.maps.LatLng(55.791968,37.528092),
		new google.maps.LatLng(55.791923,37.528496),
		new google.maps.LatLng(55.791881,37.528890),
		new google.maps.LatLng(55.791838,37.529334),
		new google.maps.LatLng(55.791796,37.529799),
		new google.maps.LatLng(55.790500,37.529799)];
	var pathGreen = [
		new google.maps.LatLng(55.789521,37.559042),
		new google.maps.LatLng(55.788980,37.558500),
		new google.maps.LatLng(55.789221,37.557842),
		new google.maps.LatLng(55.789470,37.557293),
		new google.maps.LatLng(55.789593,37.557019),
		new google.maps.LatLng(55.790257,37.555535),
		new google.maps.LatLng(55.790564,37.554846),
		new google.maps.LatLng(55.791504,37.552663),
		new google.maps.LatLng(55.791859,37.551865),
		new google.maps.LatLng(55.791870,37.551781),
		new google.maps.LatLng(55.791919,37.551554),
		new google.maps.LatLng(55.791918,37.551447),
		new google.maps.LatLng(55.791899,37.551314),
		new google.maps.LatLng(55.791864,37.551245),
		new google.maps.LatLng(55.791527,37.550762),
		new google.maps.LatLng(55.790927,37.549930),
		new google.maps.LatLng(55.789102,37.547381),
		new google.maps.LatLng(55.788158,37.546071),
		new google.maps.LatLng(55.787309,37.544822),
		new google.maps.LatLng(55.787122,37.544574),
		new google.maps.LatLng(55.787222,37.544343),
		new google.maps.LatLng(55.787858,37.542837),
		new google.maps.LatLng(55.788383,37.541617),
		new google.maps.LatLng(55.788753,37.540772),
		new google.maps.LatLng(55.788852,37.540554),
		new google.maps.LatLng(55.788972,37.540276),
		new google.maps.LatLng(55.789208,37.539751),
		new google.maps.LatLng(55.789583,37.538909),
		new google.maps.LatLng(55.790303,37.537251),
		new google.maps.LatLng(55.790527,37.536670),
		new google.maps.LatLng(55.790644,37.536324),
		new google.maps.LatLng(55.790748,37.535984),
		new google.maps.LatLng(55.790868,37.535577),
		new google.maps.LatLng(55.790906,37.535375),
		new google.maps.LatLng(55.790952,37.535169),
		new google.maps.LatLng(55.791087,37.534604),
		new google.maps.LatLng(55.791176,37.534090),
		new google.maps.LatLng(55.791265,37.533407),
		new google.maps.LatLng(55.791327,37.532740),
		new google.maps.LatLng(55.791553,37.530528),
		new google.maps.LatLng(55.790053,37.530528)];
	var pathGray = [new google.maps.LatLng(55.792988,37.588276),
		new google.maps.LatLng(55.793037,37.588322),
		new google.maps.LatLng(55.793227,37.588453),
		new google.maps.LatLng(55.793307,37.588460),
		new google.maps.LatLng(55.793342,37.588442),
		new google.maps.LatLng(55.793382,37.588401),
		new google.maps.LatLng(55.793414,37.588322),
		new google.maps.LatLng(55.793417,37.588154),
		new google.maps.LatLng(55.793406,37.587964),
		new google.maps.LatLng(55.793396,37.587728),
		new google.maps.LatLng(55.793384,37.587504),
		new google.maps.LatLng(55.793381,37.587407),
		new google.maps.LatLng(55.793378,37.587321),
		new google.maps.LatLng(55.793388,37.587245),
		new google.maps.LatLng(55.793412,37.587163),
		new google.maps.LatLng(55.793447,37.587094),
		new google.maps.LatLng(55.793520,37.586983),
		new google.maps.LatLng(55.793539,37.586936),
		new google.maps.LatLng(55.793545,37.586894),
		new google.maps.LatLng(55.793547,37.586839),
		new google.maps.LatLng(55.793538,37.586765),
		new google.maps.LatLng(55.793519,37.586695),
		new google.maps.LatLng(55.793504,37.586666),
		new google.maps.LatLng(55.793496,37.586650),
		new google.maps.LatLng(55.793471,37.586599),
		new google.maps.LatLng(55.793253,37.586157),
		new google.maps.LatLng(55.792900,37.585444),
		new google.maps.LatLng(55.792825,37.585286),
		new google.maps.LatLng(55.792691,37.584993),
		new google.maps.LatLng(55.792625,37.584828),
		new google.maps.LatLng(55.792444,37.584360),
		new google.maps.LatLng(55.792425,37.584271),
		new google.maps.LatLng(55.792413,37.584157),
		new google.maps.LatLng(55.792273,37.582767),
		new google.maps.LatLng(55.792242,37.582246),
		new google.maps.LatLng(55.792091,37.579690),
		new google.maps.LatLng(55.792058,37.579056),
		new google.maps.LatLng(55.792020,37.578277),
		new google.maps.LatLng(55.791997,37.577807),
		new google.maps.LatLng(55.791992,37.577667),
		new google.maps.LatLng(55.791974,37.576993),
		new google.maps.LatLng(55.791948,37.575992),
		new google.maps.LatLng(55.791938,37.575604),
		new google.maps.LatLng(55.791903,37.575215),
		new google.maps.LatLng(55.791855,37.574891),
		new google.maps.LatLng(55.791809,37.574667),
		new google.maps.LatLng(55.791743,37.574477),
		new google.maps.LatLng(55.791661,37.574274),
		new google.maps.LatLng(55.791560,37.574055),
		new google.maps.LatLng(55.791446,37.573842),
		new google.maps.LatLng(55.790314,37.572240),
		new google.maps.LatLng(55.789777,37.571494),
		new google.maps.LatLng(55.789485,37.571077),
		new google.maps.LatLng(55.788739,37.570049),
		new google.maps.LatLng(55.788533,37.569765),
		new google.maps.LatLng(55.787949,37.568716),
		new google.maps.LatLng(55.787882,37.568541),
		new google.maps.LatLng(55.787675,37.567845),
		new google.maps.LatLng(55.787629,37.567706),
		new google.maps.LatLng(55.787585,37.567604),
		new google.maps.LatLng(55.787524,37.567492),
		new google.maps.LatLng(55.787438,37.567363),
		new google.maps.LatLng(55.786729,37.566405),
		new google.maps.LatLng(55.786368,37.565919),
		new google.maps.LatLng(55.786268,37.565743),
		new google.maps.LatLng(55.786213,37.565608),
		new google.maps.LatLng(55.786199,37.565491),
		new google.maps.LatLng(55.786217,37.565307),
		new google.maps.LatLng(55.786262,37.565116),
		new google.maps.LatLng(55.787012,37.563307),
		new google.maps.LatLng(55.787919,37.561287),
		new google.maps.LatLng(55.788032,37.561042),
		new google.maps.LatLng(55.788894,37.559127),
		new google.maps.LatLng(55.789720,37.557293),
		new google.maps.LatLng(55.789843,37.557019),
		new google.maps.LatLng(55.790507,37.555535),
		new google.maps.LatLng(55.790814,37.554846),
		new google.maps.LatLng(55.791754,37.552663),
		new google.maps.LatLng(55.792109,37.551865),
		new google.maps.LatLng(55.792120,37.551781),
		new google.maps.LatLng(55.792169,37.551554),
		new google.maps.LatLng(55.792168,37.551447),
		new google.maps.LatLng(55.792149,37.551314),
		new google.maps.LatLng(55.792114,37.551245),
		new google.maps.LatLng(55.791777,37.550762),
		new google.maps.LatLng(55.791197,37.549930),
		new google.maps.LatLng(55.789352,37.547381),
		new google.maps.LatLng(55.788408,37.546071),
		new google.maps.LatLng(55.787559,37.544822),
		new google.maps.LatLng(55.787372,37.544574),
		new google.maps.LatLng(55.787472,37.544343),
		new google.maps.LatLng(55.788108,37.542837),
		new google.maps.LatLng(55.788633,37.541617),
		new google.maps.LatLng(55.789003,37.540772),
		new google.maps.LatLng(55.789102,37.540554),
		new google.maps.LatLng(55.789222,37.540276),
		new google.maps.LatLng(55.789458,37.539751),
		new google.maps.LatLng(55.789833,37.538909),
		new google.maps.LatLng(55.790553,37.537251),
		new google.maps.LatLng(55.790777,37.536670),
		new google.maps.LatLng(55.790894,37.536324),
		new google.maps.LatLng(55.790998,37.535984),
		new google.maps.LatLng(55.791030,37.535867),
		new google.maps.LatLng(55.791108,37.535577),
		new google.maps.LatLng(55.791156,37.535375),
		new google.maps.LatLng(55.791202,37.535169),
		new google.maps.LatLng(55.791317,37.534604),
		new google.maps.LatLng(55.791406,37.534090),
		new google.maps.LatLng(55.791495,37.533407),
		new google.maps.LatLng(55.791756,37.530180),
		new google.maps.LatLng(55.790796,37.530180)];
	var pathBlue = [
		new google.maps.LatLng(55.790053,37.530828),
		new google.maps.LatLng(55.791303,37.530828),
		new google.maps.LatLng(55.791077,37.532740),
		new google.maps.LatLng(55.791015,37.533407),
		new google.maps.LatLng(55.790956,37.534090),
		new google.maps.LatLng(55.790837,37.534604),
		new google.maps.LatLng(55.790702,37.535169),
		new google.maps.LatLng(55.790656,37.535375),
		new google.maps.LatLng(55.790618,37.535577),
		new google.maps.LatLng(55.790498,37.535984),
		new google.maps.LatLng(55.790394,37.536324),
		new google.maps.LatLng(55.790277,37.536670),
		new google.maps.LatLng(55.790053,37.537251),
		new google.maps.LatLng(55.789333,37.538909),
		new google.maps.LatLng(55.788958,37.539751),
		new google.maps.LatLng(55.788722,37.540276),
		new google.maps.LatLng(55.788602,37.540554),
		new google.maps.LatLng(55.788503,37.540772),
		new google.maps.LatLng(55.788133,37.541617),
		new google.maps.LatLng(55.787608,37.542837),
		new google.maps.LatLng(55.787006,37.544410),
		new google.maps.LatLng(55.785410,37.541800),
		new google.maps.LatLng(55.785310,37.541554),
		new google.maps.LatLng(55.785209,37.541348),
		new google.maps.LatLng(55.785141,37.541191),
		new google.maps.LatLng(55.785076,37.541009),
		new google.maps.LatLng(55.785008,37.540797),
		new google.maps.LatLng(55.784922,37.540453),
		new google.maps.LatLng(55.784837,37.540050),
		new google.maps.LatLng(55.784693,37.539427),
		new google.maps.LatLng(55.784392,37.538077),
		new google.maps.LatLng(55.784183,37.537078),
		new google.maps.LatLng(55.784080,37.536615),
		new google.maps.LatLng(55.784008,37.536324),
		new google.maps.LatLng(55.783966,37.536150),
		new google.maps.LatLng(55.783917,37.535980),
		new google.maps.LatLng(55.783803,37.535675),
		new google.maps.LatLng(55.783675,37.535407),
		new google.maps.LatLng(55.783412,37.534978),
		new google.maps.LatLng(55.783233,37.534694),
		new google.maps.LatLng(55.782808,37.534020),
		new google.maps.LatLng(55.782716,37.533868),
		new google.maps.LatLng(55.782674,37.533803),
		new google.maps.LatLng(55.782605,37.533676),
		new google.maps.LatLng(55.782521,37.533504),
		new google.maps.LatLng(55.782450,37.533338),
		new google.maps.LatLng(55.782379,37.533125),
		new google.maps.LatLng(55.782308,37.532879),
		new google.maps.LatLng(55.782262,37.532675),
		new google.maps.LatLng(55.782224,37.532459),
		new google.maps.LatLng(55.782197,37.532260),
		new google.maps.LatLng(55.782174,37.532033),
		new google.maps.LatLng(55.782150,37.531838),//
		new google.maps.LatLng(55.782122,37.531695),
		new google.maps.LatLng(55.782082,37.531551),
		new google.maps.LatLng(55.782057,37.531405),
		new google.maps.LatLng(55.782052,37.531278),
		new google.maps.LatLng(55.782057,37.531095),
		new google.maps.LatLng(55.782066,37.530926),
		new google.maps.LatLng(55.782100,37.530633),
		new google.maps.LatLng(55.782121,37.530478),
		new google.maps.LatLng(55.782173,37.530211),
		new google.maps.LatLng(55.782209,37.530017),
		new google.maps.LatLng(55.782300,37.529625),
		new google.maps.LatLng(55.782473,37.528782),
		new google.maps.LatLng(55.782630,37.527992),
		new google.maps.LatLng(55.782760,37.527274),
		new google.maps.LatLng(55.782920,37.526412),
		new google.maps.LatLng(55.783034,37.525859),
		new google.maps.LatLng(55.783148,37.525405),
		new google.maps.LatLng(55.783271,37.524978),
		new google.maps.LatLng(55.783379,37.524546),
		new google.maps.LatLng(55.783465,37.524287),
		new google.maps.LatLng(55.783672,37.523697),
		new google.maps.LatLng(55.783831,37.523237),
		new google.maps.LatLng(55.784433,37.521506),
		new google.maps.LatLng(55.784549,37.521205),
		new google.maps.LatLng(55.784590,37.521103),
		new google.maps.LatLng(55.784639,37.520999),
		new google.maps.LatLng(55.784663,37.520946),
		new google.maps.LatLng(55.784732,37.520798),
		new google.maps.LatLng(55.784873,37.520558),
		new google.maps.LatLng(55.785036,37.520376),
		new google.maps.LatLng(55.785093,37.520315),
		new google.maps.LatLng(55.785257,37.520183),
		new google.maps.LatLng(55.785402,37.520088),
		new google.maps.LatLng(55.785629,37.519951),
		new google.maps.LatLng(55.785723,37.519898),
		new google.maps.LatLng(55.785750,37.519885),
		new google.maps.LatLng(55.785985,37.519757),
		new google.maps.LatLng(55.786242,37.519608),
		new google.maps.LatLng(55.786313,37.519568),
		new google.maps.LatLng(55.786765,37.519317),
		new google.maps.LatLng(55.786912,37.519236),
		new google.maps.LatLng(55.787080,37.519152),
		new google.maps.LatLng(55.787444,37.518962),
		new google.maps.LatLng(55.787867,37.518738),
		new google.maps.LatLng(55.788109,37.518609),
		new google.maps.LatLng(55.788334,37.518486),
		new google.maps.LatLng(55.788567,37.518360),
		new google.maps.LatLng(55.788884,37.518188),
		new google.maps.LatLng(55.789063,37.518099),
		new google.maps.LatLng(55.789207,37.518040),
		new google.maps.LatLng(55.789221,37.518036),
		new google.maps.LatLng(55.789344,37.518001),
		new google.maps.LatLng(55.789477,37.517978),
		new google.maps.LatLng(55.789591,37.517969),
		new google.maps.LatLng(55.789732,37.517965),
		new google.maps.LatLng(55.789855,37.517979),
		new google.maps.LatLng(55.789979,37.518009),
		new google.maps.LatLng(55.790055,37.518036),
		new google.maps.LatLng(55.790212,37.518101),
		new google.maps.LatLng(55.790274,37.518137),
		new google.maps.LatLng(55.790355,37.518183),
		new google.maps.LatLng(55.790429,37.518236),
		new google.maps.LatLng(55.790518,37.518298),
		new google.maps.LatLng(55.790646,37.518406),
		new google.maps.LatLng(55.790778,37.518549),
		new google.maps.LatLng(55.790920,37.518714),
		new google.maps.LatLng(55.791054,37.518911),
		new google.maps.LatLng(55.791159,37.519105),
		new google.maps.LatLng(55.791278,37.519344),
		new google.maps.LatLng(55.791398,37.519636),
		new google.maps.LatLng(55.791491,37.519943),
		new google.maps.LatLng(55.791560,37.520223),
		new google.maps.LatLng(55.791637,37.520580),
		new google.maps.LatLng(55.791697,37.520936),
		new google.maps.LatLng(55.791751,37.521302),
		new google.maps.LatLng(55.791803,37.521628),
		new google.maps.LatLng(55.791980,37.522678),
		new google.maps.LatLng(55.791994,37.522766),
		new google.maps.LatLng(55.792014,37.522875),
		new google.maps.LatLng(55.792046,37.523024),
		new google.maps.LatLng(55.792090,37.523121),
		new google.maps.LatLng(55.792130,37.523202),
		new google.maps.LatLng(55.792130,37.523202),
		new google.maps.LatLng(55.792177,37.523278),
		new google.maps.LatLng(55.792239,37.523359),
		new google.maps.LatLng(55.792364,37.523648),
		new google.maps.LatLng(55.792295,37.523977),
		new google.maps.LatLng(55.792184,37.524494),
		new google.maps.LatLng(55.792124,37.524806),
		new google.maps.LatLng(55.792098,37.524976),
		new google.maps.LatLng(55.791683,37.528496),
		new google.maps.LatLng(55.791641,37.528890),
		new google.maps.LatLng(55.791598,37.529334),
		new google.maps.LatLng(55.791556,37.529399),
		new google.maps.LatLng(55.790500,37.529399)];
	var aviaOutline = [new google.maps.LatLng(55.791533, 37.527692),
		new google.maps.LatLng(55.790839, 37.527434),
		new google.maps.LatLng(55.790728, 37.528146),
		new google.maps.LatLng(55.790581, 37.528087),
		new google.maps.LatLng(55.790603, 37.527638),
		new google.maps.LatLng(55.790250, 37.526908),
		new google.maps.LatLng(55.790144, 37.527068),
		new google.maps.LatLng(55.790150, 37.527097),
		new google.maps.LatLng(55.790027, 37.527372),
		new google.maps.LatLng(55.789996, 37.527282),
		new google.maps.LatLng(55.789898, 37.527434),
		new google.maps.LatLng(55.789926, 37.527508),
		new google.maps.LatLng(55.789656, 37.527930),
		new google.maps.LatLng(55.789685, 37.528296),
		new google.maps.LatLng(55.789812, 37.528520),
		new google.maps.LatLng(55.789773, 37.528597),
		new google.maps.LatLng(55.789823, 37.528701),
		new google.maps.LatLng(55.789860, 37.528668),
		new google.maps.LatLng(55.789919, 37.528802),
		new google.maps.LatLng(55.789881, 37.528858),
		new google.maps.LatLng(55.789733, 37.528884),
		new google.maps.LatLng(55.789745, 37.529113),
		new google.maps.LatLng(55.789817, 37.529104),
		new google.maps.LatLng(55.789798, 37.529183),
		new google.maps.LatLng(55.789988, 37.529242),
		new google.maps.LatLng(55.789975, 37.529424),
		new google.maps.LatLng(55.789770, 37.529454),
		new google.maps.LatLng(55.789776, 37.529651),
		new google.maps.LatLng(55.789893, 37.529635),
		new google.maps.LatLng(55.789875, 37.529829),
		new google.maps.LatLng(55.789916, 37.529853),
		new google.maps.LatLng(55.789910, 37.529959),
		new google.maps.LatLng(55.789862, 37.529946),
		new google.maps.LatLng(55.789840, 37.530164),
		new google.maps.LatLng(55.789876, 37.530181),
		new google.maps.LatLng(55.789729, 37.531628),
		new google.maps.LatLng(55.789662, 37.531625),
		new google.maps.LatLng(55.789629, 37.531829),
		new google.maps.LatLng(55.789686, 37.531860),
		new google.maps.LatLng(55.789680, 37.531935),
		new google.maps.LatLng(55.789610, 37.531948),
		new google.maps.LatLng(55.789591, 37.532123),
		new google.maps.LatLng(55.789644, 37.532167),
		new google.maps.LatLng(55.789599, 37.532526),
		new google.maps.LatLng(55.789448, 37.532526),
		new google.maps.LatLng(55.789405, 37.532916),
		new google.maps.LatLng(55.789178, 37.533124),
		new google.maps.LatLng(55.789207, 37.533211),
		new google.maps.LatLng(55.788974, 37.533382),
		new google.maps.LatLng(55.788857, 37.533645),
		new google.maps.LatLng(55.788890, 37.533724),
		new google.maps.LatLng(55.788841, 37.533798),
		new google.maps.LatLng(55.788868, 37.533992),
		new google.maps.LatLng(55.788941, 37.533973),
		new google.maps.LatLng(55.789186, 37.534862),
		new google.maps.LatLng(55.789131, 37.534944),
		new google.maps.LatLng(55.789159, 37.535086),
		new google.maps.LatLng(55.789236, 37.535104),
		new google.maps.LatLng(55.789239, 37.535308),
		new google.maps.LatLng(55.789518, 37.535047),
		new google.maps.LatLng(55.789532, 37.535179),
		new google.maps.LatLng(55.789965, 37.534777),
		new google.maps.LatLng(55.789901, 37.535160),
		new google.maps.LatLng(55.790410, 37.535347),
		new google.maps.LatLng(55.790722, 37.534359),
		new google.maps.LatLng(55.791076, 37.531459)];


	$('.map-buttons a').click(function(){
		$('#map_about').addClass('opened');
		if(!$(this).hasClass('current')){
			$('.map-buttons a.current').removeClass('current');
			var mapToHidden = $('.gm.current');
			mapToHidden.removeClass('current');
			$(this).addClass('current');
			var mapId = $(this).attr('data-map');
			$('#'+mapId).removeClass('mapOut').addClass('current');
			setTimeout(function(){
				mapToHidden.addClass('mapOut');
				if(mapId=='gm3'){
					$('#route-gm').removeClass('mapOut').addClass('opened');
				}else{
					$('#route-gm').removeClass('opened');
					setTimeout(function(){
						$('#route-gm').addClass('mapOut');
					}, 300);
				}
				if(mapId!='gm3'){
					$('.map-legend').removeClass('mapOut').addClass('active');
				}else{
					$('.map-legend').removeClass('active');
					setTimeout(function(){
						$('.map-legend').addClass('mapOut');
					}, 300);
				}
			}, 300);
		}
	});

	if ( window.location.hash == '#route' ) {
		$('#map_about').addClass('opened');
		$('.map-buttons a.current').removeClass('current'); 
		var mapToHidden = $('.gm.current');
		mapToHidden.removeClass('current');
		$('#map-button1').addClass('current');
		var mapId = $('.map-buttons a').attr('data-map');
		$('#'+mapId).removeClass('mapOut').addClass('current');
		setTimeout(function(){
			mapToHidden.addClass('mapOut');
			if (mapId=='gm3'){
				$('#route-gm').addClass('opened');
			} else {
				$('#route-gm').removeClass('opened');
			}
		}, 300);
	}

	$('.route-form-open').click(function(){
		$('#route-gm').addClass('openedW');
		setTimeout(function(){
			$('#route-gm').addClass('openedH');
		}, 300);
	});

	$('.route-form-close').click(function(){
		$('#route-gm').removeClass('openedH');
		setTimeout(function(){
			$('#route-gm').removeClass('openedW');
		}, 300);
	});

	$('.map-info a').click(function(){
		var clickedInfo = $(this).parent();
		clickedInfo.removeClass('current');
		$('.map-info-background').removeClass('active');
		setTimeout(function(){
			clickedInfo.addClass('mapOut');
			$('.map-info-background').addClass('mapOut');
		}, 300);
	});

	$('.map-close').click(function(){
		$('#map_about').removeClass('opened');
		$('.gm').removeClass('current');
		$('.map-buttons a.current, .gm.current').removeClass('current');
		$('#route-gm').removeClass('opened');
		setTimeout(function(){
			$('#route-gm').addClass('mapOut');
		}, 300);
		$('.map-legend').removeClass('active');
		setTimeout(function(){
			$('.map-legend').addClass('mapOut');
		}, 300);
	});

	$('.radio-a').click(function(){
		$('.radio-a.current').removeClass('current');
		$(this).addClass('current');
	});

	$('#search-route').click(function(){
		calcRoute();
	});
	$('.gm').css({width: mapWidth});
	if ($('#map_about').length) {
		initializeAboutMaps();
	}

	function initializeAboutMaps(){
		contactsMap = new google.maps.Map(document.getElementById('gm1'), mapOptions);
		contactsMap2 = new google.maps.Map(document.getElementById('gm2'), mapOptions);
		contactsMap3 = new google.maps.Map(document.getElementById('gm3'), mapOptions);


		generateInfoWindows();

		var routeViolet = new google.maps.Polyline({
			path: pathViolet,
			strokeColor: markers[1][3],
			strokeOpacity: 1.0,
			strokeWeight: 3
		});
		var routeGreen = new google.maps.Polyline({
			path: pathGreen,
			strokeColor: markers[2][3],
			strokeOpacity: 1.0,
			strokeWeight: 3
		});
		var routeGray = new google.maps.Polyline({
			path: pathGray,
			strokeColor: markers[3][3],
			strokeOpacity: 1.0,
			strokeWeight: 3
		});

		var lineSymbol = {
			path: 'M 0,-1 0,1',
			strokeOpacity: 1,
			scale: 4
		};

		var routeBlue = new google.maps.Polyline({
			path: pathBlue,
			strokeColor: markers[0][3],
			strokeOpacity:0,
			strokeWeight: 3,
			icons: [{
				icon: lineSymbol,
				offset: '0',
				repeat: '20px'
			}],
		});

		routeViolet.setMap(contactsMap2);
		routeGreen.setMap(contactsMap2);
		routeGray.setMap(contactsMap2);
		routeBlue.setMap(contactsMap2);

		var aviaBuilding = new google.maps.Polygon({
			paths: aviaOutline,
			strokeWeight: 0,
			fillColor: '#75D9D1',
			fillOpacity: 1
		});
		var aviaBuilding2 = new google.maps.Polygon({
			paths: aviaOutline,
			strokeWeight: 0,
			fillColor: '#75D9D1',
			fillOpacity: 1
		});
		var aviaBuilding3 = new google.maps.Polygon({
			paths: aviaOutline,
			strokeWeight: 0,
			fillColor: '#75D9D1',
			fillOpacity: 1
		});
		aviaBuilding.setMap(contactsMap);
		aviaBuilding2.setMap(contactsMap2);
		aviaBuilding3.setMap(contactsMap3);

		// set direction render options
		var rendererOptions = { draggable: true, suppressMarkers: true };
		directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
		directionsDisplay.setMap(contactsMap3);
		directionsDisplay.setPanel(document.getElementById("route-data-list"));

		setBounds();

		google.maps.event.addDomListener(window, 'resize',function(){
			var center3 = contactsMap3.getCenter();
			mapWidth = $('.event-thumbs').width();
			$('.gm').css({width: mapWidth});
			google.maps.event.trigger(contactsMap, 'resize');
			google.maps.event.trigger(contactsMap2, 'resize');
			google.maps.event.trigger(contactsMap3, 'resize');
			contactsMap3.setCenter(center3);
			setBounds();
		});
	}

	function calcRoute() {
		// get the travelmode, startpoint and via point from the form
		var travelMode = $('.radio-a.current').attr('data-mode');
		var start = $("#start").val();

		var end = '55.791076, 37.531459'; // endpoint is a geolocation
		var waypoints = []; // init an empty waypoints array

		var request = {
			origin: start,
			destination: end,
			waypoints: waypoints,
			unitSystem: google.maps.UnitSystem.IMPERIAL,
			travelMode: google.maps.DirectionsTravelMode[travelMode]
		};
		var markerStart = new google.maps.MarkerImage(
			markers[4][2],
			new google.maps.Size(35,55),
			new google.maps.Point(0,0),
			new google.maps.Point(17,55)
		);

		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				$('#route-data-list').empty(); // clear the directions panel before adding new directions
				directionsDisplay.setDirections(response);
				var leg = response.routes[ 0 ].legs[ 0 ];
				makeMarker(leg.start_location, markerStart);
			} else {
				// alert an error message when the route could nog be calculated.
				if (status == 'ZERO_RESULTS') {
					alert('No route could be found between the origin and destination.');
				} else if (status == 'UNKNOWN_ERROR') {
					alert('A directions request could not be processed due to a server error. The request may succeed if you try again.');
				} else if (status == 'REQUEST_DENIED') {
					alert('This webpage is not allowed to use the directions service.');
				} else if (status == 'OVER_QUERY_LIMIT') {
					alert('The webpage has gone over the requests limit in too short a period of time.');
				} else if (status == 'NOT_FOUND') {
					alert('At least one of the origin, destination, or waypoints could not be geocoded.');
				} else if (status == 'INVALID_REQUEST') {
					alert('The DirectionsRequest provided was invalid.');
				} else {
					alert("There was an unknown error in your request. Requeststatus: nn"+status);
				}
			}
		});
	}
	function makeMarker(position, icon) {
		new google.maps.Marker({
			position: position,
			map: contactsMap3,
			icon: icon
		});
	}
	function generateInfoWindows(){
		var infoWindow = new google.maps.InfoWindow(), marker, i;
		var infoWindow2 = new google.maps.InfoWindow(), marker, i;
		// Loop through our array of markers & place each one on the map  
		for( i = 0; i < 4; i++ ) {
			var position = new google.maps.LatLng(markers[i][0], markers[i][1]);

			if(i<1){
				var image = new google.maps.MarkerImage(
					markers[i][2],
					new google.maps.Size(35,55),
					new google.maps.Point(0,0),
					new google.maps.Point(17,55)
				);
			}else{
				var image = new google.maps.MarkerImage(
					markers[i][2],
					new google.maps.Size(35,85),
					new google.maps.Point(0,0),
					new google.maps.Point(17,85)
				);
			}

			marker = new MarkerWithLabel({
				position: position,
				draggable: false,
				raiseOnDrag: false,
				icon: image,
				map: contactsMap,
				labelContent: markers[i][5],
				labelAnchor: new google.maps.Point(-25, 45),
				labelClass: "labels"
			});
			mapMarkersPos[i] = marker.getPosition();
			marker2 = new MarkerWithLabel({
				position: position,
				draggable: false,
				raiseOnDrag: false,
				icon: image,
				map: contactsMap2,
				labelContent: markers[i][5],
				labelAnchor: new google.maps.Point(-25, 45),
				labelClass: "labels"
			});
			if(i<1){

				marker3 = new MarkerWithLabel({
					position: position,
					draggable: false,
					raiseOnDrag: false,
					icon: image,
					map: contactsMap3,
					labelContent: markers[i][5],
					labelAnchor: new google.maps.Point(-25, 45),
					labelClass: "labels"
				});
			}

			if(i>0){
				pageWidth = $(window).width();
				if(pageWidth<1000){
					google.maps.event.addListener(marker, 'click', (function(marker, i) {
						return function() {
							$('.map-info-background').removeClass('mapOut').addClass('active');
							$('.map-info').eq(i-1).removeClass('mapOut').addClass('current');
						}
					})(marker, i));
					google.maps.event.addListener(infoWindow, 'domready', function(){
						var iwOuter = $('.gm-style-iw');
						iwOuter.css({'display' : 'none'});
						iwOuter.parent().parent().hide();
					});
				}else{
					google.maps.event.addListener(marker, 'click', (function(marker, i) {
						return function() {
							infoWindow.setContent(markers[i][4]);
							infoWindow.open(contactsMap, marker);
						}
					})(marker, i));
					google.maps.event.addListener(infoWindow, 'domready', function(){
						var iwOuter = $('.gm-style-iw');
						iwOuter.css({'display' : 'block'});
						var iwBackground = iwOuter.prev();
						iwBackground.children(':nth-child(1)').css({'display' : 'none'});
						iwBackground.children(':nth-child(2)').css({'display' : 'none'});
						iwBackground.children(':nth-child(3)').css({'display' : 'none'});
						iwBackground.children(':nth-child(4)').css({'display' : 'none'});
						iwOuter.parent().parent().show();
						iwOuter.parent().parent().css({left: 140, top: 130});
						var iwCloseBtn = iwOuter.next();
						iwCloseBtn.css({top: 27, right: 56});
					});
				}
				if(i<4){
					pageWidth = $(window).width();
					if(pageWidth<1000){
						google.maps.event.addListener(marker2, 'click', (function(marker2, i) {
							return function() {
								$('.map-info-background').removeClass('mapOut').addClass('active');
								$('.map-info').eq(i-1).removeClass('mapOut').addClass('current');
							}
						})(marker2, i));
						google.maps.event.addListener(infoWindow2, 'domready', function(){
							var iwOuter = $('.gm-style-iw');
							iwOuter.css({'display' : 'none'});
							iwOuter.parent().parent().hide();
						});
					}else{
						google.maps.event.addListener(marker2, 'click', (function(marker2, i) {
							return function() {
								infoWindow2.setContent(markers[i][4]);
								infoWindow2.open(contactsMap2, marker2);
							}
						})(marker2, i));
						google.maps.event.addListener(infoWindow2, 'domready', function(){
							var iwOuter = $('.gm-style-iw');
							iwOuter.css({'display' : 'block'});
							var iwBackground = iwOuter.prev();
							iwBackground.children(':nth-child(1)').css({'display' : 'none'});
							iwBackground.children(':nth-child(2)').css({'display' : 'none'});
							iwBackground.children(':nth-child(3)').css({'display' : 'none'});
							iwBackground.children(':nth-child(4)').css({'display' : 'none'});
							iwOuter.parent().parent().show();
							iwOuter.parent().parent().css({left: 140, top: 130});
							var iwCloseBtn = iwOuter.next();
							iwCloseBtn.css({top: 27, right: 56});
						});
					}

				}
			}
		}
		setBounds();
	}

	function setBounds() {
		var bounds = new google.maps.LatLngBounds();
		for (var i=0; i < 4; i++) {
			bounds.extend(mapMarkersPos[i]);
		}
		contactsMap.fitBounds(bounds);
		contactsMap2.fitBounds(bounds);
		//contactsMap3.fitBounds(bounds);
	}

});
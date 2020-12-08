var Map = {
    // !!Важно все масивы слоев этажей начинаются с инекса 1 что бы удобнее было вызывать 0й индекс пустой везде.
    iconUrl: 'http://api.avia.kknopka.ru/',
    Style: {
        "color": "#525765",
        "strokeColor": "#525765",
        "stroke-Width": 2,
        "weight": 2,
        "fillColor": "#484c5b",
        "fillOpacity": 1
    },
    kinoStyle: {
        "color": "#3A3E4E",
        "strokeColor": "#3A3E4E",
        "stroke-Width": 2,
        "weight": 2,
        "fillColor": "#3A3E4E",
        "fillOpacity": 1
    },
    kinoStyle2: {
        "color": "#A7F0DD",
        "strokeColor": "#A7F0DD",
        "stroke-Width": 2,
        "weight": 2,
        "fillColor": "#414554",
        "fillOpacity": 1
    },
    kinoStyle3: {
        "color": "#A7F0DD",
        "strokeColor": "#A7F0DD",
        "stroke-Width": 2,
        "weight": 2,
        "fillColor": "#A7F0DD",
        "fillOpacity": 1
    },
    staticStyle1: {
        "color": "#3A3E4E",
        "strokeColor": "#3A3E4E",
        "stroke-Width": 0,
        "weight": 0,
        "fillColor": "#3A3E4E",
        "fillOpacity": 1
    },
    staticStyle2: {
        "color": "#414554",
        "strokeColor": "#414554",
        "stroke-Width": 0,
        "weight": 0,
        "fillColor": "#414554",
        "fillOpacity": 1
    },
    hoverStyle: {
        "color": "#A7F0DD",
        "strokeColor": "#A7F0DD",
        "stroke-Width": 2,
        "weight": 2,
        "fillColor": "#A7F0DD",
        "fillOpacity": 1
    },
    LGroup: [],
    LLevels: [],
    LStatic: [],
    LMarkers: [],
    LPromo: [],
    Level: [],
    geojsonFeatureL: [],
    mapMinZoom: 10,
    mapMaxZoom: 13,
    mapCurZoom: 10,
    mapCurLevel: 1,
    mapCenter: [2.220972689603263, 1.0725402832031248],

    //Можно не грузить слои автоматически не передав в loadlayers ничего
    init: function (loadlayers) {
        Map.southWest = L.latLng(1.4212104387885494, -0.5657958984375);
        Map.northEast = L.latLng(3.023955250363652, 2.581787109375);
        Map.mapBounds = L.latLngBounds(Map.southWest, Map.northEast);
        for (var i = 1; i < 5; i++) {
            Map.LGroup[i] = new L.LayerGroup();
            Map.LLevels[i] = new L.LayerGroup();
            Map.LMarkers[i] = new L.LayerGroup();
            Map.LPromo[i] = new L.LayerGroup();
            Map.LStatic[i] = new L.LayerGroup();
            Map.LStatic[i].addTo(Map.LGroup[i]);
            Map.LMarkers[i].addTo(Map.LGroup[i]);
            Map.LPromo[i].addTo(Map.LGroup[i]);
        }
        Map.LKino = new L.LayerGroup();
        Map.baseLayers = {
            4: Map.LGroup[4],
            2: Map.LGroup[2],
            3: Map.LGroup[3],
            1: Map.LGroup[1]
        };
        Map.map = L.map('map', {
            maxZoom: Map.mapMaxZoom,
            minZoom: Map.mapMinZoom,
            layers: [Map.LGroup[1]],
            tap: false,
            zoomControl: false,
            inertia: false,
            bounceAtZoomLimits: false
        }).setView(Map.mapCenter, Map.mapMinZoom);


        Map.map.fitBounds(Map.map.getBounds());
        Map.map.setMaxBounds(Map.map.getBounds());
        L.control.layers(Map.baseLayers).addTo(Map.map);
        L.control.zoom({ position: 'topright' }).addTo(Map.map);
        if (!(loadlayers === undefined)) {
            Map.loadLayers();
        }
    },

    loadLayers: function () {
        Map.loadStatic(1);
        Map.startListeners();
        return true;
    },


    loadLayer: function (i) {
        $.getJSON("/aviapark/build/map/" + i + "-level.json", function (data) {
            Map.geojsonFeatureL[i] = data;
            Map.Level[i] = L.geoJson(Map.geojsonFeatureL[i], {
                onEachFeature: function (feature, layer) {
                    // гадость лагучая обнуляем стили
                    layer.setStyle(Map.Style);
                    (function (layer, properties) {
                        if (properties.magId != '4003') {
                            layer.on("mouseover", function (e) {
                                layer.setStyle(Map.hoverStyle);
                            });
                            layer.on("mouseout", function (e) {
                                layer.setStyle(Map.Style);
                            });
                        }


                    })(layer, feature.properties);
                }
            }).addTo(Map.LLevels[i]);
            Map.LLevels[i].addTo(Map.LGroup[i]);
            itemsL = {};
            $.getJSON("http://api.avia.kknopka.ru/items/map/" + i, function (data) {
                $.each(data, function (key, val) {
                    itemsL[key] = val;
                });
                Map.Level[i].eachLayer(function (layer) {
                    try {
                        tmagId = layer.feature.properties.magId;
                        tcenter = [itemsL[tmagId]['x'], itemsL[tmagId]['y']];
                        popuphtml = "<div class='leaflet-popup-text modal-link' data-toggle='modal' data-target='#link-modal-shop'><div class='leaflet-popup-text-title'>" + itemsL[tmagId]['title'] + "</div><div class='leaflet-popup-text-category'>" + itemsL[tmagId]['category_title'] + "</div></div><div class='leaflet-popup-logo'><img src='" + Map.iconUrl + itemsL[tmagId]['logo'] + "'></img></div>";
                        layer.bindPopup(popuphtml);
                        //TODO ID магазина
                        obj = {};
                        if (itemsL[tmagId]['actions']) {
                            obj = L.marker(tcenter, {icon: Icon}).bindLabel(itemsL[tmagId]['title'], {noHide: true, offset: [-40, 10] });
                            PromoIcon = L.Icon.extend({options: {iconSize: [55, 55], iconAnchor: [27, 55] } });
                            PIcon = new PromoIcon({iconUrl: Map.iconUrl + itemsL[tmagId]['actions'][0]});
                            promo = L.marker(tcenter, {icon: PIcon});//.bindLabel("<img class='leaflet-action-icon' src='" + Map.iconUrl + itemsL[tmagId]['actions'][0] + "'></img>", {noHide: true, offset: [-40, 10] });
                            promo.addTo(Map.LPromo[i]);
                            obj.addTo(Map.LMarkers[i]);
                            promo.zoomLevel = 0;
                            promo.isPromo = true;
                        } else {
                            MarkerIcon = L.Icon.extend({options: {iconSize: [20, 20] } });
                            Icon = new MarkerIcon({iconUrl: Map.iconUrl + itemsL[tmagId]['icon']});
                            obj = L.marker(tcenter, {icon: Icon}).bindLabel(itemsL[tmagId]['title'], {noHide: true, offset: [-40, 10] });
                            obj.addTo(Map.LMarkers[i]);
                        }
                        obj.zoomLevel = itemsL[tmagId]['zoom'] || 99;
                    } catch (e) {
                    }
                });
                if (i == 1) {
                    Map.LMarkers[i].eachLayer(function (layer) {
                        if (layer.zoomLevel < 11) {
                            layer.showLabel();
                        } else {
                            layer._icon.style.display = 'none';
                        }
                    });
                }
            });
        }).done(function () {
            //console.log("load Layer L:" + i);
            return Map.loadStatic(i + 1);
        })
    },


    // Отложено
    loadStatic: function (i) {
        if (i > 4) {
            return Map.loadKino();
        }
        $.getJSON("/aviapark/build/map/" + i + "-level-static.json", function (data) {
            Map.geojsonFeatureL[i] = data;
//            console.log( Map.geojsonFeatureL[i].features.slice(1));
//            console.log( Map.geojsonFeatureL[i].features.slice(1,-1));
            l0 = {"type": "FeatureCollection", "features": [Map.geojsonFeatureL[i].features[0]]};
//            console.log(Map.geojsonFeatureL[i]);
            Map.LStatic[i] = L.geoJson(l0, {
                onEachFeature: function (feature, layer) {
                    layer.setStyle(Map.staticStyle1);
                }
            }).addTo(Map.LStatic[i]);
            Map.geojsonFeatureL[i].features = Map.geojsonFeatureL[i].features.slice(1, Map.geojsonFeatureL[i].features.length);

            Map.LStatic[i] = L.geoJson(Map.geojsonFeatureL[i], {
                onEachFeature: function (feature, layer) {
                    if (layer.feature.properties['icon']) {
                        Icon = L.icon({
                            iconUrl: Map.iconUrl + '/site/assets/icons/poi-' + layer.feature.properties['icon'] + '.svg',
                            iconSize: [32, 32],
                            iconAnchor: [16, 16]
                        });
                        layer.setIcon(Icon);
                    } else {
                        layer.setStyle(Map.staticStyle2);
                    }
//                    (function (layer, properties) {
//                        layer.on("mouseover", function (e) {
//                            layer.setStyle(Map.hoverStyle);
//                        });
//                        layer.on("mouseout", function (e) {
//                            layer.setStyle(Map.Style);
//                        });
//
//                    })(layer, feature.properties);
                }
            }).addTo(Map.LStatic[i]);

//            Map.LStatic[i].bringToFront();

        }).done(function () {
            //console.log("load Static L:" + i);
            Map.loadLayer(i);
        })

    },


    loadKino: function () {
        $.getJSON("/aviapark/build/map/kino.json", function (data) {
            Map.LKino = L.geoJson(data, {
                onEachFeature: function (feature, layer) {
                    properties = feature.properties;
                    tcenter = [properties['x'], properties['y']];
                    layer.setStyle(Map.kinoStyle);
                    popuphtml = "<div class='modal-link' data-toggle='modal' data-target='#link-modal-cinema'>" + properties['desc'] + "</div>";
                    layer.bindPopup(popuphtml);
                    MarkerIcon = L.Icon.extend({options: {iconSize: [20, 20] } });
                    Icon = new MarkerIcon({iconUrl: Map.iconUrl + 'site/assets/icons/karo-' + properties['icon'] + '.svg'});
                    obj = L.marker(tcenter, {icon: Icon});
                    //console.log(obj);
                    //console.log(layer);
                    obj.addTo(Map.LMarkers[4]);
                    obj.zoomLevel = 11;
                    (function (layer) {
                        layer.on("mouseover", function (e) {
                            if (!layer._popup._isOpen) {
                                //console.log(layer);
                                layer.setStyle(Map.kinoStyle2);
                            }
                        });
                        layer.on("mouseout", function (e) {
                            if (!layer._popup._isOpen) {
                                //console.log(layer);
                                layer.setStyle(Map.kinoStyle);
                            }
                        });
                        layer.on("popupopen", function (e) {
                            layer.setStyle(Map.kinoStyle3);
                            //console.log('Wtf?')
                        });
                        layer.on("popupclose", function (e) {
                            layer.setStyle(Map.kinoStyle);
                        });

                    })(layer);
                }
            }).addTo(Map.LLevels[4]);

        }).done(function () {
            //console.log("Load kino");
            return true;
        })
    },

    startListeners: function () {
        Map.map.on('zoomend', function (e) {
            newZoom = e.target._zoom;
            if (newZoom > Map.mapCurZoom) {
                //console.log('zoomed');
            }
            else {
                //console.log('unzoomed');
            }
            Map.LMarkers[Map.mapCurLevel].eachLayer(function (layer) {
                if (layer.zoomLevel > newZoom) {
                    layer.hideLabel();
                    layer._icon.style.display = 'none';
                } else {
                    layer.showLabel();
                    layer._icon.style.display = '';
                }
            });
            Map.mapCurZoom = newZoom;
        });
        Map.map.on('baselayerchange', function (e) {
            Map.LMarkers[e.name].eachLayer(function (layer) {
                if (layer.zoomLevel > Map.mapCurZoom) {
                    layer.hideLabel();
                    layer._icon.style.display = 'none';
                } else {
                    layer.showLabel();
                    layer._icon.style.display = '';
                }
            });
            Map.mapCurLevel = e.name
        });

// при необходимости вернуть
//        Map.map.on('click', function (e) {
//            console.log(e.latlng.lat + ' ' + e.latlng.lng + ' ' + Map.map.getZoom());
//        });

//        Map.end();
    },


    hidePromo: function () {
        Map.LMarkers[Map.mapCurLevel].eachLayer(function (layer) {
            if (layer.isPromo) {
                layer._icon.style.display = 'none';
            }
        });
        return true;
    },

    showPromo: function () {
        Map.LMarkers[Map.mapCurLevel].eachLayer(function (layer) {
            if (layer.isPromo) {
                layer._icon.style.display = '';
            }
        });
        return true;
    },

    //Вызывать с передачей масива в котором есть x,y icon
    //    {"1": {
    //        "x": "",
    //        "y": "",
    //        "icon": "\/site\/assets\/icons\/cat-.svg"
    //    }}
    loadPromo: function (data) {
        $.each(data, function (item) {
            tcenter = [item['x'], item['y']];
            PromoIcon = L.Icon.extend({options: {iconSize: [55, 55], iconAnchor: [27, 55] } });
            PIcon = new PromoIcon({iconUrl: Map.iconUrl + item['icon']});
            promo = L.marker(tcenter, {icon: PIcon});
            promo.addTo(Map.LPromo[Map.mapCurLevel]);
            promo.zoomLevel = 0;
            promo.isPromo = true;
        });
        Map.LPromo[Map.mapCurLevel].addTo(Map.LGroup[Map.mapCurLevel]);
        return true;
    },


    clearPromo: function () {
        Map.LPromo[Map.mapCurLevel].clearLayers();
        //console.log(Map.LPromo[Map.mapCurLevel]);
        return true;
    },


    setFocus: function (magID, x, y) {

        Map.LLevels[Map.mapCurLevel].eachLayer(function (layer) {
            layer.eachLayer(function (layer) {
                if (layer.feature.properties['magId'] == magID) {
                    //console.log(layer.feature.properties['magId']);
                    //console.log(layer.feature.geometry.coordinates[0]);
                    Map.map.setView([x, y], 12, {animate: true});
                }
            });
        });
    },

    clearFocus: function () {
        Map.map.setView(Map.mapCenter, Map.mapMinZoom, {animate: true});
    },


    end: function () {
        Map.LLevels[Map.mapCurLevel].eachLayer(function (layer) {
            //console.log(layer);

        });
    }
};
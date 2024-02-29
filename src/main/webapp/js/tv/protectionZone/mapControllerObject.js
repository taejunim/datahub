var isMapControllerObjectVisible = true;

var mapController;
var mapControllerObject = {
    features2d: [],
    features3d: [],
    types: ['marker', 'polygon', 'multi'],
    protectionZone: [
        {
            layerName : 'cctvLayer'
          , url : '/gisTw/selectCctvInformation.json'
          , type : 'marker'
          , markerImage : '/images/tw/map/marker/cctvMarker.png'
          , description : 'CCTY 위치'
        },
        {
            layerName : 'childSafetyAreaLayer'
            , url : '/gisTw/selectChildSafetyInformation.json'
            , type : 'multi'
            , markerImage : '/images/tw/map/marker/disabledMarker.png'
            , polygonStyle : [255, 227, 92, 0.3]
            , description : '어린이 보호구역 위치'
        },
        {
            layerName : 'childPickupZoneLayer'
            , url : '/gisTw/selectChildPickupZoneInformation.json'
            , type : 'polygon'
            , polygonStyle : [89, 255, 255, 0.3]
            , description : '어린이 승/하차 구역 위치'
        },
        {
            layerName : 'childWaySchoolLayer'
            , url : '/gisTw/selectChildWaySchoolInformation.json'
            , type : 'polygon'
            , polygonStyle : [255, 108, 28, 0.3]
            , description : '어린이 통학로 위치'
        },
        {
            layerName : 'crossWalkLayer'
            , url : '/gisTw/selectCrossWalkInformation.json'
            , type : 'polygon'
            , polygonStyle : [255, 0, 0, 0.3]
            , description : '보호구역내 횡단보도 위치'
        },
        {
            layerName : 'crossWayLayer'
            , url : '/gisTw/selectCrossWayInformation.json'
            , type : 'polygon'
            , polygonStyle : [110, 167, 73, 0.3]
            , description : '보호구역내 교차로 위치'
        },
        {
            layerName : 'oneWayRoadLayer'
            , url : '/gisTw/selectOneWayRoadInformation.json'
            , type : 'polygon'
            , polygonStyle : [0, 103, 212, 0.3]
            , description : '보호구역내 일방통행도로 위치'
        },
        {
            layerName : 'speedBumpLayer'
            , url : '/gisTw/selectSpeedBumpInformation.json'
            , type : 'polygon'
            , polygonStyle : [243, 134, 255, 0.3]
            , description : '보호구역내 과속방지턱 위치'
        },
        {
            layerName : 'fenceLayer'
            , url : '/gisTw/selectFenceInformation.json'
            , type : 'multi'
            , markerImage : '/images/tw/map/marker/fenceMarker.png'
            , polygonStyle : [118, 255, 90, 1]
            , description : '보호구역내 펜스 위치'
        }
    ],
    trafficInformation : [
        {
            layerName : 'roadSafetyInfoLayer'
            , url : '/gisTw/selectRoadSafetyInformation.json'
            , type : 'marker'
            , markerImage : '/images/tw/map/marker/redDotMarker.png'
            , description : '도로위험상황정보'
        },
        {
            layerName : 'roadControlInfoLayer'
            , url : '/gisTw/selectRoadControlInformation.json'
            , type : 'marker'
            , markerImage : '/images/tw/map/marker/yellowDotMarker.png'
            , description : '도로 통제정보'
        },
        {
            layerName : 'roadWorkZoneInfoLayer'
            , url : '/gisTw/selectRoadWorkZoneInformation.json'
            , type : 'marker'
            , markerImage : '/images/tw/map/marker/partridgeDotMarker.png'
            , description : '도로 작업구간 정보'
        },
    ],
    createLayer: (object, source, visible) => {
        // 마커 레이어 생성
        var layer = new ol.layer.Vector({
            source: source,
            name  : object.layerName,
            visible: visible
        });
        mapController.Map2D.addLayer(layer);
        mapController.Map2D.getLayerByName(object.layerName).values_.zIndex=9000
    },
    setMapMode: (mapMode) => {
        mapController.setMode(mapMode);
        if(mapMode === '2d-map') {
            for (var i = 0; i < mapControllerObject.features2d.length; i++) {
                mapController.Map2D.removeLayer(mapController.Map2D.getLayerByName(mapControllerObject.features2d[i].layerName));
                let tmpSource = new ol.source.Vector({
                    features :  mapControllerObject.features2d[i].feature,
                });
                let tmpLayer = new ol.layer.Vector({
                    source :tmpSource,
                    name: mapControllerObject.features2d[i].layerName
                });
                mapController.Map2D.addLayer(tmpLayer);
                mapController.Map2D.getLayerByName(mapControllerObject.features2d[i].layerName).values_.zIndex = 9000
            }
            $('#2dButton').addClass('select');
            $('#3dButton').removeClass('select');

        } else {
            for (var i = 0; i < mapControllerObject.features3d.length; i++) {
                mapControllerObject.features3d[i].feature.show();
            }
            $('#2dButton').removeClass('select');
            $('#3dButton').addClass('select');
        }

        isMapControllerObjectVisible = true;

        $('.progress-body').css('display','none');
    },
    moveCenter: (xy) => {
        if(mapController.mapMode === 'ws3d-map') {
            var movePo = new vw.CoordZ(parseFloat(xy[0]), parseFloat(xy[1]), 100);
            var mPosi = new vw.CameraPosition(movePo, new vw.Direction(0, -40, 0));
            mapController.Map3D.moveTo(mPosi);
        }
        else {
            var coordTransAddr = new ol.geom.Point([parseFloat(xy[0]), parseFloat(xy[1])]).transform('EPSG:4326', 'EPSG:3857').getCoordinates();
            mapController.Map2D.getView().setCenter(coordTransAddr);
            mapController.Map2D.getView().setZoom(parseInt(16));
        }
    },
    //마커 데이터 조회 및 rendering
    getMarkerData: (obj) => {
        var group3d = new vw.geom.ShapeGroups(obj.layerName);
        $.ajax({
            url: obj.url,
            type: "POST",
            dataType: "json",
            success: function (res) {
                var result          = res.result;
                var vector_feature = [];
                for(var i = 0; i < result.length; i ++) {
                    if (result[i].location !== undefined && result[i].location !== '') {
                        var location = result[i].location.replace(",", " ").split(" ");
                        if (location.length > 0) {
                            var point1Coord = new vw.Coord(location[0], location[1]);
                            //3D 지도용
                            var pt = new vw.geom.Point( point1Coord );
                            pt.setImage(obj.markerImage);
                            pt.setName(result[i].detail);
                            pt.setFont( "고딕" );
                            pt.setFontSize( 10 );
                            pt.create();
                            group3d.add(pt);

                            //2D 지도용
                            var marker = new ol.Feature({
                                geometry: new ol.geom.Point([parseFloat(location[0]), parseFloat(location[1])]).transform('EPSG:4326', 'EPSG:3857')    //마커 좌표 설정
                            });
                            var markerStyle = new ol.style.Style({
                                image: new ol.style.Icon({
                                    anchor: [10, 10],
                                    anchorXUnits: 'pixels',
                                    anchorYUnits: 'pixels',
                                    opacity: 1,                                              // 마커 투명도 1=100%
                                    scale: 0.8,                                              // 크기 1=100%
                                    src:  obj.markerImage,                                   // 마커 이미지
                                    size:  [20, 20]                                          // 마커 사이즈
                                }),
                                text: result[i].detail !== undefined && result[i].detail !=='undefined' ?  new ol.style.Text({
                                    text: result[i].detail,   //텍스트를 넘겨주면 넘겨준 텍스트 표시
                                    scale: 0.8,                                               //마커 텍스트 크기
                                    offsetY: 10,
                                    fill: new ol.style.Fill({                                 //마커 텍스트 색
                                        color: "black"
                                    }),
                                    stroke: new ol.style.Stroke({                             //마커 텍스트 테두리
                                        color: "#fff",
                                        width: 1
                                    })
                                }) : null
                            });
                            marker.setStyle(markerStyle);
                            vector_feature.push(marker);
                        }
                    }
                }
                let vector_source = new ol.source.Vector({
                    features :  vector_feature
                });
                mapControllerObject.createLayer(obj, vector_source, true);
                mapControllerObject.features2d.push({layerName: obj.layerName, feature: vector_feature});
                mapControllerObject.features3d.push({layerName: obj.layerName, feature: group3d});
            }, error: function(error) {
                if(error.status !== 500) alert('마커 데이터 조회에 실패하였습니다.\n해당 문제가 지속될 경우 관리자에게 문의하여 주십시오.');
                console.log(error.code);
            }
        });
    },
    //교통 약자 폴리곤 데이터 조회 및 rendering
    getTwPolygonData : (obj) => {
        var group3d = new vw.geom.ShapeGroups(obj.layerName);
        $.ajax({
            url: obj.url,
            type: "POST",
            dataType: "json",
            success: function (res) {
                var result          = res.result;
                var vector_feature = [];
                for(var i = 0; i < result.length; i ++) {
                    var innerPolygonList = [];
                    if (result[i].area !== undefined && result[i].area !== '') {
                        var area = result[i].area;
                        area = area.replaceAll('[[[', '').replaceAll(']]]', '');

                        var areaList = area.split('],[');
                        var outerPolygon3d = [];
                        var outerPolygon2d = [];
                        var innerPolygon2d = [];

                        for (var j = 0; j < areaList.length; j++) {
                            var arr = areaList[j];
                            if (arr.indexOf('[') > -1) {
                                if (j === 0) {
                                    arr = arr.replace('[', '').split(',').map(arg => parseFloat(arg));
                                    arr = ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326');
                                    outerPolygon3d.push(new vw.Coord(arr[0], arr[1]));
                                    outerPolygon2d.push([arr[0], arr[1]]);
                                } else {
                                    innerPolygon2d = [];
                                    arr = arr.replace('[', '').split(',').map(arg => parseFloat(arg));
                                    arr = ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326');
                                    innerPolygon2d.push([arr[0], arr[1]]);
                                }
                            } else if (arr.indexOf(']') > -1) {
                                if (innerPolygon2d.length === 0) {
                                    arr = arr.replace(']', '').split(',').map(arg => parseFloat(arg));
                                    arr = ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326');
                                    outerPolygon3d.push(new vw.Coord(arr[0], arr[1]));
                                    outerPolygon2d.push([arr[0], arr[1]]);
                                    outerPolygon3d.push(outerPolygon3d[0]);
                                    outerPolygon2d.push(outerPolygon2d[0]);
                                } else {
                                    arr = arr.replace(']', '').split(',').map(arg => parseFloat(arg));
                                    arr = ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326');
                                    innerPolygon2d.push([arr[0], arr[1]]);
                                    innerPolygonList.push(innerPolygon2d);
                                }
                            } else {
                                if (innerPolygon2d.length === 0) {
                                    arr = arr.split(',').map(arg => parseFloat(arg));
                                    arr = ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326');
                                    outerPolygon3d.push(new vw.Coord(arr[0], arr[1]));
                                    outerPolygon2d.push([arr[0], arr[1]]);
                                } else {
                                    arr = arr.split(',').map(arg => parseFloat(arg));
                                    arr = ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326');
                                    innerPolygon2d.push([arr[0], arr[1]]);
                                }
                            }
                        }

                        var coordCol =  new vw.Collection(outerPolygon3d);
                        var polygon = new vw.geom.Polygon(coordCol);
                        polygon.setFillColor(new vw.Color(obj.polygonStyle[0], obj.polygonStyle[1], obj.polygonStyle[2], 100));
                        polygon.create();
                        group3d.add(polygon);

                        var multiPolygon;
                        if(innerPolygonList.length > 0 ) multiPolygon = new ol.geom.MultiPolygon([[outerPolygon2d].concat(innerPolygonList)]).transform('EPSG:4326', 'EPSG:3857');
                        else multiPolygon = new ol.geom.MultiPolygon([[outerPolygon2d]]).transform('EPSG:4326', 'EPSG:3857')

                        var feature = new ol.Feature({
                            geometry : multiPolygon
                        });
                        let style = new ol.style.Style({
                            stroke : new ol.style.Stroke({
                                color : [ 80, 80, 80, .7 ],
                                width : 1
                            }),
                            fill : new ol.style.Fill({
                                color : [ obj.polygonStyle[0], obj.polygonStyle[1], obj.polygonStyle[2], .4 ]
                            })
                        }); // 스타일 정의

                        feature.setStyle(style);
                        vector_feature.push(feature)
                    }
                }
                let vector_source = new ol.source.Vector({
                    features :  vector_feature
                });
                mapControllerObject.createLayer(obj, vector_source, true);
                mapControllerObject.features2d.push({layerName: obj.layerName, feature: vector_feature});
                mapControllerObject.features3d.push({layerName: obj.layerName, feature: group3d});
            }, error: function(error) {
                if(error.status !== 500) alert('마커 데이터 조회에 실패하였습니다.\n해당 문제가 지속될 경우 관리자에게 문의하여 주십시오.');
                console.log(error.code);
            }
        });
    },
    //교통 약자 폴리곤 + 마커 데이터 조회 및 rendering
    getTwMultiData : (obj) => {
        var group3d = new vw.geom.ShapeGroups(obj.layerName);
        $.ajax({
            url: obj.url,
            type: "POST",
            dataType: "json",
            success: function (res) {
                var result          = res.result;
                var polygon_feature = [];
                for(var i = 0; i < result.length; i ++) {
                    var innerPolygonList = [];
                    if (result[i].area !== undefined && result[i].area !== '') {
                        var area = result[i].area;
                        area = area.replaceAll('[[[', '').replaceAll(']]]', '');

                        var areaList = area.split('],[');
                        var outerPolygon3d = [];
                        var outerPolygon2d = [];
                        var innerPolygon2d = [];

                        for (var j = 0; j < areaList.length; j++) {
                            var arr = areaList[j];
                            if (arr.indexOf('[') > -1) {
                                if (j === 0) {
                                    arr = arr.replace('[', '').split(',').map(arg => parseFloat(arg));
                                    arr = ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326');
                                    outerPolygon3d.push(new vw.Coord(arr[0], arr[1]));
                                    outerPolygon2d.push([arr[0], arr[1]]);
                                } else {
                                    innerPolygon2d = [];
                                    arr = arr.replace('[', '').split(',').map(arg => parseFloat(arg));
                                    arr = ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326');
                                    innerPolygon2d.push([arr[0], arr[1]]);
                                }
                            } else if (arr.indexOf(']') > -1) {
                                if (innerPolygon2d.length === 0) {
                                    arr = arr.replace(']', '').split(',').map(arg => parseFloat(arg));
                                    arr = ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326');
                                    outerPolygon3d.push(new vw.Coord(arr[0], arr[1]));
                                    outerPolygon2d.push([arr[0], arr[1]]);
                                    outerPolygon3d.push(outerPolygon3d[0]);
                                    outerPolygon2d.push(outerPolygon2d[0]);
                                } else {
                                    arr = arr.replace(']', '').split(',').map(arg => parseFloat(arg));
                                    arr = ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326');
                                    innerPolygon2d.push([arr[0], arr[1]]);
                                    innerPolygonList.push(innerPolygon2d);
                                }
                            } else {
                                if (innerPolygon2d.length === 0) {
                                    arr = arr.split(',').map(arg => parseFloat(arg));
                                    arr = ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326');
                                    outerPolygon3d.push(new vw.Coord(arr[0], arr[1]));
                                    outerPolygon2d.push([arr[0], arr[1]]);
                                } else {
                                    arr = arr.split(',').map(arg => parseFloat(arg));
                                    arr = ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326');
                                    innerPolygon2d.push([arr[0], arr[1]]);
                                }
                            }
                        }

                        var coordCol =  new vw.Collection(outerPolygon3d);
                        var polygon = new vw.geom.Polygon(coordCol);
                        polygon.setFillColor(new vw.Color(obj.polygonStyle[0], obj.polygonStyle[1], obj.polygonStyle[2], 100));
                        polygon.create();
                        group3d.add(polygon);

                        var multiPolygon;
                        if(innerPolygonList.length > 0 ) multiPolygon = new ol.geom.MultiPolygon([[outerPolygon2d].concat(innerPolygonList)]).transform('EPSG:4326', 'EPSG:3857');
                        else multiPolygon = new ol.geom.MultiPolygon([[outerPolygon2d]]).transform('EPSG:4326', 'EPSG:3857')

                        var feature = new ol.Feature({
                            geometry : multiPolygon
                        });
                        let style = new ol.style.Style({
                            stroke : new ol.style.Stroke({
                                color : [ 80, 80, 80, .7 ],
                                width : 1
                            }),
                            fill : new ol.style.Fill({
                                color : [ obj.polygonStyle[0], obj.polygonStyle[1], obj.polygonStyle[2], .4 ]
                            })
                        }); // 스타일 정의

                        feature.setStyle(style);
                        polygon_feature.push(feature)
                    }
                    if (result[i].location !== undefined && result[i].location !== '') {
                        var location = result[i].location.replace(",", " ").split(" ");
                        if (location.length > 0) {
                            var point1Coord = new vw.Coord(location[0], location[1]);
                            //3D 지도용
                            var pt = new vw.geom.Point( point1Coord );
                            pt.setImage(obj.markerImage);
                            pt.setName(result[i].name);
                            pt.setFont( "고딕" );
                            pt.setFontSize( 10 );
                            pt.create();
                            group3d.add(pt);

                            //2D 지도용
                            var marker = new ol.Feature({
                                geometry: new ol.geom.Point([parseFloat(location[0]), parseFloat(location[1])]).transform('EPSG:4326', 'EPSG:3857'),    //마커 좌표 설정
                                //safetyZoneType: result[i].safetyzonetype ? result[i].safetyzonetype : null ,
                                //address: result[i].address ? result[i].address : null
                            });
                            var markerStyle = new ol.style.Style({
                                image: new ol.style.Icon({
                                    anchor: [10, 10],
                                    anchorXUnits: 'pixels',
                                    anchorYUnits: 'pixels',
                                    opacity: 1,                                              // 마커 투명도 1=100%
                                    scale: 0.8,                                              // 크기 1=100%
                                    src:  obj.markerImage,                                   // 마커 이미지
                                    size:  [20, 20]                                          // 마커 사이즈
                                }),
                                text: result[i].name !== undefined && result[i].name !=='undefined' ?  new ol.style.Text({
                                    text: result[i].name,   //텍스트를 넘겨주면 넘겨준 텍스트 표시
                                    scale: 0.8,                                               //마커 텍스트 크기
                                    offsetY: 10,
                                    fill: new ol.style.Fill({                                 //마커 텍스트 색
                                        color: "black"
                                    }),
                                    stroke: new ol.style.Stroke({                             //마커 텍스트 테두리
                                        color: "#fff",
                                        width: 1
                                    })
                                }) : null
                            });
                            marker.setStyle(markerStyle);
                            polygon_feature.push(marker);
                        }
                    }
                }
                let vector_source = new ol.source.Vector({
                    features :  polygon_feature
                });
                mapControllerObject.createLayer(obj, vector_source, true);
                mapControllerObject.features2d.push({layerName: obj.layerName, feature: polygon_feature});
                mapControllerObject.features3d.push({layerName: obj.layerName, feature: group3d});
            }, error: function(error) {
                if(error.status !== 500) alert('마커 데이터 조회에 실패하였습니다.\n해당 문제가 지속될 경우 관리자에게 문의하여 주십시오.');
                console.log(error.code);
            }
        });
    },
    hideMapControllerObject : (mapMode) => {
        if (mapMode === '2d-map') {
            if (isMapControllerObjectVisible) {
                for (var i = 0; i < mapControllerObject.features2d.length; i++) {
                    mapController.Map2D.removeLayer(mapController.Map2D.getLayerByName(mapControllerObject.features2d[i].layerName));
                }

                isMapControllerObjectVisible = false;
            } else {
                for (var i = 0; i < mapControllerObject.features2d.length; i++) {
                    mapController.Map2D.removeLayer(mapController.Map2D.getLayerByName(mapControllerObject.features2d[i].layerName));
                    let tmpSource = new ol.source.Vector({
                        features :  mapControllerObject.features2d[i].feature,
                    });
                    let tmpLayer = new ol.layer.Vector({
                        source :tmpSource,
                        name: mapControllerObject.features2d[i].layerName
                    });
                    mapController.Map2D.addLayer(tmpLayer);
                    mapController.Map2D.getLayerByName(mapControllerObject.features2d[i].layerName).values_.zIndex = 9000
                }
                isMapControllerObjectVisible = true;
            }
        } else if (mapMode === 'ws3d-map') {
            if (isMapControllerObjectVisible) {
                for (var i = 0; i < mapControllerObject.features3d.length; i++) {
                    mapControllerObject.features3d[i].feature.hide();
                }
                isMapControllerObjectVisible = false;
            } else {
                for (var i = 0; i < mapControllerObject.features3d.length; i++) {
                    mapControllerObject.features3d[i].feature.show();
                }
                isMapControllerObjectVisible = true;
            }
        }

        $('.progress-body').css('display','none');
    }
}


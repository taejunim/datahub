$('head').append('<script src="/js/namu/NamuUtil.js"></script>');
$('head').append('<script src="/js/namu/NamuLayer.js"></script>');

var map; //맵 변수 선언 : 지도 객체
var view;
// var mapLayerBase; //맵 레이어 선언 : 지도 그림(타일) 설정
var aKey = "D5152B22-77A2-311E-B514-EFD1422CD4ED";
// var layers = {};

var twLayers = [];

function overlayDTO(id, container, type, info) {
    this.id = id;
    this.container = container;
    this.type = type;
    this.info = info;
};

$(() => {
    view = new ol.View({ //뷰 생성
        projection: 'EPSG:3857', //좌표계 설정 (EPSG:3857은 구글에서 사용하는 좌표계)
        center: new ol.geom.Point([126.4989967, 33.4879725])  //처음 중앙에 보여질 경도, 위도
            .transform('EPSG:4326', 'EPSG:3857') //GPS 좌표계 -> 구글 좌표계
            .getCoordinates(), //포인트의 좌표를 리턴함
        zoom: 15.3, //초기지도 zoom의 정도값
        minZoom: 11,
        maxZoom: 19
    });

    map = new ol.Map({ //맵 생성
        target: 'vMap', //html 요소 id 값
        // layers : [mapLayerBase], //레이어
        view: view //뷰
    });

    NamuLayer.setMap(map);
    // 기본 layer
    NamuLayer.createVworldMapLayer('Base', 'base', true, 'png');
    NamuLayer.createVworldMapLayer('Satellite', 'satellite', false, 'jpeg');
    NamuLayer.createVworldMapLayer('Hybrid', 'hybrid', false, 'png');

    var acclyrEnName = "ACCIDENT";
    // NamuLayer.createLayerCheckbox("PM 사고 정보", acclyrEnName);
    NamuLayer.createLayerImageCheckboxCustom('#pmLayerForm-box',"PM 사고 정보", acclyrEnName);
    NamuLayer.createAccLayer(acclyrEnName);

    var usagelyrEnName = "USAGE";
    // NamuLayer.createLayerCheckbox("PM 이용 정보", usagelyrEnName);
    NamuLayer.createLayerImageCheckboxCustom('#pmLayerForm-box', "PM 이용 정보", usagelyrEnName);
    NamuLayer.createUsageLayer(usagelyrEnName);

    // 추가 layer
/*
    NamuLayer.createGisMapLayer('법정동읍면동리', 'BML_BADM_AS');

    NamuLayer.createLayerCheckbox("POI", "POI");
    NamuLayer.createLayerCheckbox("Marker", "MARKER");
    NamuLayer.createLayerCheckbox("View Marker", "VIEWMAKER");
*/
    //어린이 보호구역
    getTwMultiData2('/gisTw/selectChildSafetyAreaInformation.json', 'childSafetyAreaLayer', 'polygonSample1', '/images/tw/map/marker/disabledMarker.png', '어린이 보호구역');
    //CCTV
    getTwMarkerData('/gisTw/selectCctvInformation.json', 'cctvLayer', '/images/tw/map/marker/cctvMarker.png', false);
    //어린이 승하차 구역
    getTwPolygonData('/gisTw/selectChildPickupZoneInformation.json', 'childPickupZoneLayer', 'polygonSample2');
    //어린이 통학로
    getTwPolygonData('/gisTw/selectChildWaySchoolInformation.json', 'childWaySchoolLayer', 'polygonSample3');
    //보호구역내 횡단보도 위치
    getTwPolygonData('/gisTw/selectCrossWalkInformation.json', 'crossWalkLayer', 'polygonSample4');
    //보호구역내 교차로 위치
    getTwPolygonData('/gisTw/selectCrossWayInformation.json', 'crossWayLayer', 'polygonSample5');
    //보호구역내 일방통행도로 위치
    getTwPolygonData('/gisTw/selectOneWayRoadInformation.json', 'oneWayRoadLayer', 'polygonSample6');
    //보호구역내 과속방지턱 위치
    getTwPolygonData('/gisTw/selectSpeedBumpInformation.json', 'speedBumpLayer', 'polygonSample7');
    //보호구역내 펜스 위치
    getTwMultiData('/gisTw/selectFenceInformation.json', 'fenceLayer', 'polygonSample8', '/images/tw/map/marker/fenceMarker.png');
    //노인 보호구역
    getTwMultiData2('/gisTw/selectEldSafetyAreaInformation.json', 'eldSafetyAreaLayer', 'polygonSample9', '/images/tw/map/marker/eldMarker.png', '노인 보호구역');
    //장애인 보호구역
    getTwMultiData2('/gisTw/selectPwdbsSafetyAreaInformation.json', 'pwdbsSafetyAreaLayer', 'polygonSample10', '/images/tw/map/marker/wheelChairMarker.jpg', '장애인 보호구역');

    //도로위험상황정보
    getTwMarkerData('/gisTw/selectRoadSafetyInformation.json', 'roadSafetyInfoLayer', '/images/tw/map/marker/redDotMarker.png', false);
    //도로 통제정보
    getTwMarkerData('/gisTw/selectRoadControlInformation.json', 'roadControlInfoLayer', '/images/tw/map/marker/yellowDotMarker.png', false);
    //도로 작업구간 정보
    getTwMarkerData('/gisTw/selectRoadWorkZoneInformation.json', 'roadWorkZoneInfoLayer', '/images/tw/map/marker/controlMarker.png', true);

    //교통약자 보호구역
    NamuLayer.createLayerImageCheckbox('#twLayerForm-box', "어린이 보호구역" ,"childSafetyAreaLayer");
    NamuLayer.createLayerImageCheckbox('#twLayerForm-box', "보호구역내 CCTV" ,"cctvLayer");
    NamuLayer.createLayerImageCheckbox('#twLayerForm-box', "어린이 승/하차구역" ,"childPickupZoneLayer");
    NamuLayer.createLayerImageCheckbox('#twLayerForm-box', "어린이 통학로" ,"childWaySchoolLayer");
    NamuLayer.createLayerImageCheckbox('#twLayerForm-box', "보호구역내 횡단보도" ,"crossWalkLayer");
    NamuLayer.createLayerImageCheckbox('#twLayerForm-box', "보호구역내 교차로" ,"crossWayLayer");
    NamuLayer.createLayerImageCheckbox('#twLayerForm-box', "보호구역내 일방통행도로" ,"oneWayRoadLayer");
    NamuLayer.createLayerImageCheckbox('#twLayerForm-box', "보호구역내 과속방지턱" ,"speedBumpLayer");
    NamuLayer.createLayerImageCheckbox('#twLayerForm-box', "펜스" ,"fenceLayer");
    NamuLayer.createLayerImageCheckbox('#twLayerForm-box', "노인 보호구역" ,"eldSafetyAreaLayer");
    NamuLayer.createLayerImageCheckbox('#twLayerForm-box', "장애인 보호구역" ,"pwdbsSafetyAreaLayer");

    //도로 교통정보
    NamuLayer.createLayerImageCheckbox('#roadInformationLayerForm-box', "도로위험상황정보" ,"roadSafetyInfoLayer");
    NamuLayer.createLayerImageCheckbox('#roadInformationLayerForm-box', "도로 통제정보" ,"roadControlInfoLayer");
    NamuLayer.createLayerImageCheckbox('#roadInformationLayerForm-box', "도로 작업구간 정보" ,"roadWorkZoneInfoLayer");

    NamuLayer.createLayerImageCheckboxCustom('#mapForm-box', "위성영상" ,"SatelliteMap");
    NamuLayer.createLayerImageCheckboxCustom('#mapForm-box', "하이브리드" ,"HybridMap");

    NamuLayer.createLayerImageCheckboxCustom('#pmLayerForm-box', "시간대별 이용 현황", "TIMEBASEDUSAGE");

    NamuLayer.createLayerImageCheckboxCustom('#pmLayerForm-box', "모드락허브" ,"MODLOCKHUB", 'modlockhubMark');
    NamuLayer.createLayerImageCheckboxCustom('#pmLayerForm-box', "소방용수" ,"FIREWATER", 'firewaterMark');
    NamuLayer.createLayerImageCheckboxCustom('#pmLayerForm-box', "버스정류장" ,"STATION", 'stationMark');
    NamuLayer.createLayerImageCheckboxCustom('#pmLayerForm-box', "스마트허브" ,"SMARTHUB", 'smarthubMark');

    NamuLayer.createLayerImageCheckboxCustom('#proneLayerForm-box', "보행자사고 사고다발지역" ,"WALKERACC", 'walkerAccMark');
    NamuLayer.createLayerImageCheckboxCustom('#proneLayerForm-box', "이륜차 사고다발지역" ,"TWOWHEELERACC", 'twowheelerAccMark');
    NamuLayer.createLayerImageCheckboxCustom('#proneLayerForm-box', "세부링크 도로위험지수" ,"ROADIDXACC", 'roadIdxAccMark');
    NamuLayer.createLayerImageCheckboxCustom('#proneLayerForm-box', "링크기반 사고위협지역" ,"LINKACC", 'linkAccMark');
    NamuLayer.createLayerImageCheckboxCustom('#proneLayerForm-box', "사망교통사고 위치정보" ,"DEATHACC", 'deathAccMark');
    NamuLayer.createLayerImageCheckboxCustom('#proneLayerForm-box', "자전거사고 다발지역" ,"BICYCLEACC", 'bicycleAccMark');
    NamuLayer.createLayerImageCheckboxCustom('#proneLayerForm-box', "보행노인사고 다발지역" ,"ELDERACC", 'elderAccMark');
    NamuLayer.createLayerImageCheckboxCustom('#proneLayerForm-box', "보행어린이사고 다발지역" ,"CHILDRENACC", 'childrenAccMark');
    NamuLayer.createLayerImageCheckboxCustom('#proneLayerForm-box', "스쿨존내어린이 사고다발지역" ,"SCHOOLZONEACC", 'schoolzoneAccMark');
    NamuLayer.createLayerImageCheckboxCustom('#proneLayerForm-box', "보행자무단횡단 사고다발지역" ,"JAYWALKACC", 'jaywalkAccMark');

    // map.on('singleclick', NamuLayer.mapClickHandler);

    $(".ol-zoom").hide();

    proj4.defs("EPSG:5186", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs");
    ol.proj.proj4.register(proj4);

    //레이어 탭 활성화
    $('#pills-profile-tab').trigger('click');

    $('#pills-home-tab').on('click', function () {
        searchSafetyArea();
    });
    $('#pills-profile-tab').on('click', function () {
        NamuLayer.map.removeLayer(NamuLayer.getLayer("searchLayer"));
        NamuLayer.map.removeOverlay(map.getOverlayById('searchLayerOverlay'));
    });


    var sheet = document.createElement('style'),
        $rangeInput = $('.gis-range input');

    $rangeInput.rangeslider({
        polyfill : false,
        onInit: function () {
            $(".rangeslider__handle").addClass("rangeslider__handle_pause");
        }
    });

    document.head.appendChild(sheet);

    $rangeInput.on('input', function () {
        sheet.textContent = NamuLayer.getTrackStyle(this);
    });

    $('.range-labels li').on('click', function () {
       var index = $(this).index();
       $rangeInput.val(index + 1).change();
    });

    $(".rangeslider__handle").on("click", function () {
        if ($(this).hasClass("rangeslider__handle_pause")) {
            NamuLayer.clearRangeTimer();
            $(this).removeClass("rangeslider__handle_pause");
            $(this).addClass("rangeslider__handle_play");
        } else if ($(this).hasClass("rangeslider__handle_play")) {
            NamuLayer.clearRangeTimer();
            NamuLayer.rangePlayer($rangeInput);
            $(this).removeClass("rangeslider__handle_play");
            $(this).addClass("rangeslider__handle_pause");
        }
    })

    $('#mapSearchButton').click(function(){
        searchSafetyArea();
        NamuLayer.refreshMap([126.4989967, 33.4879725], 15.3);
    });

    $('#layer-navi').click(function(){
        if($('.layer_modal_wrap').hasClass('layer-navi-inactive')) {
           $('.layer_modal_wrap').removeClass('layer-navi-inactive');
           $('.gis-range-wrapper').removeClass('layer-navi-inactive');
           $('#legend').removeClass('layer-navi-inactive');
           $(".dtllnkg-legend-container").removeClass('layer-navi-inactive');
        } else {
           $('.layer_modal_wrap').addClass('layer-navi-inactive');
           $('.gis-range-wrapper').addClass('layer-navi-inactive');
           $('#legend').addClass('layer-navi-inactive');
           $(".dtllnkg-legend-container").addClass('layer-navi-inactive');
        }
    });

    map.on("click", function (evt) {
        // var coordinate = evt.coordinate //좌표정보
        var pixel = evt.pixel
        var pmAccClusterFeatures = [];

        var tempPixel = '';

        //선택한 픽셀정보로  feature 체크
        map.forEachFeatureAtPixel(pixel, function (feature, layer) {

            var innerFeatures = feature.get("features");
            if (innerFeatures && innerFeatures.length > 0) {
                if (!map.getOverlayById(innerFeatures[0].get("id").replace(/[-:]+/g, ""))) {
                    var listArray = innerFeatures.map(function(feature) {
                        return {
                            title: "PM 사고 정보",
                            ...feature.get("data")
                        }
                    });

                    var clickOverlayElement = createOverlayElement(new overlayDTO(innerFeatures[0].get("id").replace(/[-:]+/g, ""), "accTableContainer", "tableAccPOI", {listArray: listArray}));

                    if (clickOverlayElement !== null) {
                        var tableOverlayInfo = new ol.Overlay({
                            id: innerFeatures[0].get("id").replace(/[-:]+/g, ""),
                            element: clickOverlayElement,
                            offset: [10, 15],
                            position: ol.proj.transform([innerFeatures[0].get("acdnt_x") * 1, innerFeatures[0].get("acdnt_y") * 1], 'EPSG:4326', "EPSG:900913"),
                            className: 'tableOverlayIdx'
                        });

                        if (innerFeatures[0].get("id") != null) {
                            map.removeOverlay(map.getOverlayById(innerFeatures[0].get("id").replace(/[-:]+/g, "")));
                        }

                        var tableOverlayTooltips = document.querySelectorAll(".tableOverlayIdx");

                        tableOverlayTooltips.forEach(tooltip => {
                           var color = $(tooltip).css('z-index');

                           if (color === "auto") {
                               $(tooltip).css('z-index', 99);
                           } else {
                               $(tooltip).css('z-index', color - 1);
                           }
                        });

                        map.addOverlay(tableOverlayInfo);

                        // tooltip draggable
                        /*$(tableOverlayInfo.getElement()).css("position", "absolute");
                        $(tableOverlayInfo.getElement().parentNode).css("position", "relative");

                        $(tableOverlayInfo.getElement().parentNode).draggable();*/
                    }
                } else {
                    map.removeOverlay(map.getOverlayById(innerFeatures[0].get("id").replace(/[-:]+/g, "")));
                }
            }

            /*if (cluster.get("type") === "polygon2") {

                var polygonOverlayElement = createOverlayElement(new overlayDTO(cluster.get("id"), "polygonContainer", "polygon", {title: "용천수 관련 시설 조회", num: 6, loc: "제주도", x: "155202", product: "Aether.Inc", volt: 220}));

                if (polygonOverlayElement !== null) {
                    var polygonOverlayInfo = new ol.Overlay({
                        id: cluster.get("id"),
                        element: polygonOverlayElement,
                        offset: [0, -70],
                        position: ol.proj.transform([cluster.get("point").x * 1, cluster.get("point").y * 1], 'EPSG:4326', "EPSG:900913")
                    });

                    map.addOverlay(polygonOverlayInfo);
                }
            }*/

            if(((layer.values_.title === 'childSafetyAreaLayer' || layer.values_.title === 'eldSafetyAreaLayer' || layer.values_.title === 'pwdbsSafetyAreaLayer') && feature.values_.safetyZoneType !== undefined) || layer.values_.title === 'searchLayer' || layer.values_.title === 'roadWorkZoneInfoLayer') {
                if (tempPixel !== pixel) {

                    if(tempPixel === '') tempPixel = pixel;
                    var id = layer.values_.title + 'Overlay';
                    var contatiner = '';

                    //tooltip jsp id
                    if (layer.values_.title === 'childSafetyAreaLayer' || layer.values_.title === 'eldSafetyAreaLayer' || layer.values_.title === 'pwdbsSafetyAreaLayer' || layer.values_.title === 'searchLayer') {
                        contatiner = 'twContainer';
                    } else {
                        contatiner = 'roadJobContainer';
                    }

                    var twOverlayElement = createTwOverlayElement(new overlayDTO(id, contatiner, "", feature.values_));
                    if (twOverlayElement !== null) {
                        var twOverlayInfo = new ol.Overlay({
                            id: id,
                            element: twOverlayElement,
                            offset: [-250, -110],
                            position: feature.values_.geometry.flatCoordinates
                        });

                        // 어린이보호구역/노인보호구역/장애인보호구역/검색 결과 tooltip은 하나만 표출되도록 처리
                        if (map.getOverlayById('childSafetyAreaLayerOverlay') !== null) {
                            map.removeOverlay(map.getOverlayById('childSafetyAreaLayerOverlay'));
                        }
                        if (map.getOverlayById('eldSafetyAreaLayerOverlay') !== null) {
                            map.removeOverlay(map.getOverlayById('eldSafetyAreaLayerOverlay'));
                        }
                        if (map.getOverlayById('pwdbsSafetyAreaLayerOverlay') !== null) {
                            map.removeOverlay(map.getOverlayById('pwdbsSafetyAreaLayerOverlay'));
                        }
                        if (map.getOverlayById('searchLayerOverlay') !== null) {
                            map.removeOverlay(map.getOverlayById('searchLayerOverlay'));
                        }

                        map.addOverlay(twOverlayInfo);
                    }
                }
            }
        });

    });

    map.on("pointermove", function (evt) {
        var pixel = map.getEventPixel(evt.originalEvent);
        var features = map.getFeaturesAtPixel(pixel);

        NamuLayer.removeTooltipAll("accPOI");
        NamuLayer.removeTooltipAll("polygon");

        features.forEach(function (feature) {
            var innerFeatures = feature.get("features");

            if (innerFeatures && innerFeatures.length > 0) {  // 사고 features 처리
                if (!map.getOverlayById(innerFeatures[0].get("id").replace(/[-:]+/g, ""))) {
                    var listArray = innerFeatures.map(function(feature) {
                        return feature.get("data");
                    });

                    var poiOverlayElement = createMouseOverOverlayElement(new overlayDTO(innerFeatures[0].get("id"), "tableListContainer", "accPOI", {listArray: listArray}));

                    if (poiOverlayElement !== null) {
                        var poiOverlayInfo = new ol.Overlay({
                            id: innerFeatures[0].get("id"),
                            element: poiOverlayElement,
                            offset: [10, 15],
                            position: ol.proj.transform([innerFeatures[0].get("acdnt_x") * 1, innerFeatures[0].get("acdnt_y") * 1], 'EPSG:4326', "EPSG:900913"),
                            className: "poiOverlayIdx"
                        });

                        map.addOverlay(poiOverlayInfo);
                    }
                }
            }

            if (feature.get("type") === "polygon") {
                var acdntNocs = 0;
                var caltCnt = 0;

                if (feature.get("acdntNocs")) {
                    acdntNocs = feature.get("acdntNocs");
                }

                if (feature.get("caltCnt")) {
                    caltCnt = feature.get("caltCnt");
                }

                var listArray = [`사고: ${acdntNocs}건 / 사상자: ${caltCnt}건`];

                var polygonOverlayElement = createMouseOverOverlayElement(new overlayDTO(feature.get("id"), "listContainer", "polygon", {listArray: listArray}));

                if (polygonOverlayElement !== null) {
                    var polygonOverlayInfo = new ol.Overlay({
                        id: feature.get("id"),
                        element: polygonOverlayElement,
                        offset: [0, -70],
                        position: ol.proj.transform([feature.get("point").x * 1, feature.get("point").y * 1], 'EPSG:4326', "EPSG:900913"),
                        className: "poiOverlayIdx"
                    });

                    map.addOverlay(polygonOverlayInfo);
                }

            }
        })
    });

    $(document).on("click", ".zoneInfo-zoneList-list-item", function() {
        var xy             = $($(this).children('.location')[0]).val().split(',');
        var text           = $($(this).children('.zoneInfo-zoneList-list-item-text')[0]).children('.title').text();
        var address        = $($(this).children('.zoneInfo-zoneList-list-item-text')[0]).children('.address').text();
        var safetyZoneType = $($(this).children('.safetyZoneType')[0]).val();

        var image = '/images/cms/common/disabled.png';

        if(safetyZoneType.includes('노인')) image = '/images/cms/common/eld.png';
        else if(safetyZoneType.includes('장애인')) image = '/images/cms/common/wheelChair.png';
        NamuLayer.createMarkerLayer([{x: parseFloat(xy[0]), y: parseFloat(xy[1]), text: text, address: (address + ', ' + text), safetyZoneType: safetyZoneType}], 'searchLayer', true, image, false, [60,60]);
        NamuLayer.setCenter(xy);
    });

});

// overlayElement를 생성해주는 함수
function createOverlayElement(overlayDTO) {

    if (typeof overlayDTO === 'object') {
        var overlayElement = document.createElement("div"); // 오버레이 팝업설정
        var tooltip = $('#tooltipFrame').html();
        var body = $('#' + overlayDTO.container).html();

        overlayElement.setAttribute("class", "overlayElement");
        /*overlayElement.setAttribute("style", "background-color: #3399CC; border: 2px solid white; color:white");*/
        overlayElement.setAttribute("style", "background-color: #ffffff; color:#2e3c50; border-radius: 7px; padding: 5px 10px 10px 10px;");
        overlayElement.setAttribute("data-uid", overlayDTO.id);
        overlayElement.setAttribute("data-type", overlayDTO.type);

        // tooltip html element 생성
        var tooltipElement = $(tooltip);

        // 이벤트 추가
        $(tooltipElement).find(".x-mark").click(function() {
            NamuLayer.deleteOverlay(overlayDTO.id.replace(/[-:]+/g, ""));
        })

        $(tooltipElement).find(".tooltip-content").append(body)

        $(overlayElement).append(tooltipElement)

        // 데이터 입력
        if (overlayDTO.info) {
            if (overlayDTO.container === "accTableContainer") {

                if (overlayDTO.info.listArray) {
                    $(overlayElement).find(".title").text(overlayDTO.info.listArray[0].title);
                }

                overlayDTO.info.listArray.forEach(function(element, index) {
                    var tr = $("<tr></tr>");
                    tr.append(`<td>${index + 1}</td>`);
                    if (element.acdnt_type !== null && element.acdnt_type !== "") {
                        tr.append(`<td>${element.acdnt_type}</td>`);
                    } else {
                        tr.append(`<td>-</td>`)
                    }
                    if (element.oper_co !== null && element.oper_co !== "") {
                        tr.append(`<td>${element.oper_co}</td>`);
                    } else {
                        tr.append(`<td>-</td>`)
                    }
                    if (element.pm_type !== null && element.pm_type !== "") {
                        tr.append(`<td>${element.pm_type}</td>`);
                    } else {
                        tr.append(`<td>-</td>`)
                    }
                    if (element.acdnt_ocrn_dt !== null && element.acdnt_ocrn_dt !== "") {
                        var date = new Date(element.acdnt_ocrn_dt);

                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        var day = date.getDate();

                        tr.append(`<td>${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}</td>`);
                    } else {
                        tr.append(`<td>-</td>`);
                    }
                    if (element.acdnt_ocrn_plc !== null && element.acdnt_ocrn_plc !== "") {
                        tr.append(`<td>${element.acdnt_ocrn_plc}</td>`);
                    } else {
                        tr.append(`<td>-</td>`)
                    }
                    if (element.acdnt_cn !== null && element.acdnt_cn !== "") {
                        tr.append(`<td>${element.acdnt_cn.length > 20 ? element.acdnt_cn.substring(0, 20) : element.acdnt_cn}...</td>`);
                    } else {
                        tr.append(`<td>-</td>`)
                    }

                    $(overlayElement).find(".accTableBody").append(tr);
                });
            } else if (overlayDTO.container === "listContainer") {
                overlayDTO.info.locArray.forEach(function(loc) {
                    $(overlayElement).find(".poiFrame").append("<div style='padding: 2px 3px; font-weight: bold; border-bottom: solid 1px #f7f8f9;'>" + loc + "</div>");
                });
                // $(overlayElement).find(".title").text(overlayDTO.info.title);
            }
        }

        return overlayElement;
    }

    return null;
}

// mouseOverOverlayElement를 생성해주는 함수
function createMouseOverOverlayElement(overlayDTO) {

    if (typeof overlayDTO === 'object') {
        var overlayElement = document.createElement("div"); // 오버레이 팝업설정
        var tooltip = $('#mouseOverTooltipFrame').html();
        var body = $('#' + overlayDTO.container).html();

        overlayElement.setAttribute("class", "overlayElement");
        /*overlayElement.setAttribute("style", "background-color: #3399CC; border: 2px solid white; color:white");*/
        if (overlayDTO.container === "tableListContainer") {
            overlayElement.setAttribute("style", "background-color: #ffffff; color:#2e3c50; border-radius: 7px;");
        } else {
            overlayElement.setAttribute("style", "background-color: #ffffff; color:#2e3c50; border-radius: 7px; padding: 1rem 2rem");
        }
        overlayElement.setAttribute("data-uid", overlayDTO.id);
        overlayElement.setAttribute("data-type", overlayDTO.type);

        // tooltip html element 생성
        var tooltipElement = $(tooltip);

        $(tooltipElement).find(".mouseOverTooltip-content").append(body)

        $(overlayElement).append(tooltipElement)

        // 데이터 입력
        if (overlayDTO.info) {
            if (overlayDTO.container === "tableListContainer") {
                overlayDTO.info.listArray.forEach(function(element, index) {
                    var acdntOcrnDt = element.acdnt_ocrn_dt

                    var tr = $("<tr></tr>");
                    tr.append(`<td>${index + 1}</td>`);
                    if (acdntOcrnDt !== null && acdntOcrnDt !== "") {
                        var date = new Date(acdntOcrnDt);

                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        var day = date.getDate();

                        tr.append(`<td>${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}</td>`);
                    } else {
                        tr.append(`<td>-</td>`);
                    }
                    if (element.pm_type !== null && element.pm_type !== "") {
                        tr.append(`<td>${element.pm_type}</td>`);
                    } else {
                        tr.append(`<td>-</td>`);
                    }
                    if (element.acdnt_type !== null && element.acdnt_type !== "") {
                        tr.append(`<td>${element.acdnt_type}</td>`);
                    } else {
                        tr.append(`<td>-</td>`);
                    }

                    $(overlayElement).find(".talbeListElement").append(tr);
                });
                // $(overlayElement).find(".title").text(overlayDTO.info.title);
            } else if (overlayDTO.container === "listContainer") {
                overlayDTO.info.listArray.forEach(function(element) {
                    $(overlayElement).find(".poiFrame").append("<div style='padding: 1px 1px; font-weight: bold;'>" + element + "</div>");
                });
            }
        }

        return overlayElement;
    }

    return null;
}

// 교통약자 보호구역 overlayElement를 생성해주는 함수
function createTwOverlayElement(overlayDTO) {

    if (typeof overlayDTO === 'object') {

        var overlayElement = document.createElement("div"); // 오버레이 팝업설정
        var tooltip = $('#tooltipFrame').html();
        var body = $('#' + overlayDTO.container).html();

        overlayElement.setAttribute("class", "overlayElement");
        overlayElement.setAttribute("style", "background-color: #ffffff; color:#2e3c50; border-radius: 7px; padding: 1rem 2rem");
        overlayElement.setAttribute("data-uid", overlayDTO.id);

        // tooltip html element 생성
        var tooltipElement = $(tooltip);

        // 이벤트 추가
        $(tooltipElement).find(".x-mark").click(function() {
            NamuLayer.deleteOverlay(overlayDTO.id);
        })

        $(tooltipElement).find(".tooltip-content").append(body)

        $(overlayElement).append(tooltipElement);
        //보호구역 tooltip
        if(overlayDTO.container === 'twContainer') {
            $(overlayElement).find(".title").text('보호구역/' + overlayDTO.info.safetyZoneType);
            $(overlayElement).find(".address").text(overlayDTO.info.address);
        } else {    //도로작업정보 tooltop
            $(overlayElement).find(".title").text('도로작업정보');
            $(overlayElement).find(".detail").text(overlayDTO.info.text);
        }

        return overlayElement;
    }

    return null;
}

//교통 약자 마커 데이터 조회 및 rendering
function getTwMarkerData(url, lyrEnName, imgSrc, makeTooltip){
    //CCTV
    $.ajax({
        url: url,
        type: "POST",
        data: {},
        dataType: "json",
        success: function (res) {
            var result = res.result;
            var locationList = [];
            for(var i = 0; i < result.length; i ++) {
                if (result[i].location !== undefined && result[i].location !== '') {
                    var location = result[i].location.replace(",", " ").split(" ");
                    if (location.length > 0) {
                        locationList.push({x: location[0], y: location[1], text: result[i].detail + ''});
                    }
                }
            }
            NamuLayer.createMarkerLayer(locationList, lyrEnName, false, imgSrc, makeTooltip);
        }, error: function(error) {
            if(error.status !== 500) alert('마커 데이터 조회에 실패하였습니다.\n해당 문제가 지속될 경우 관리자에게 문의하여 주십시오.');
            console.log(error.code);
        }
    });
}
//교통 약자 폴리곤 데이터 조회 및 rendering
function getTwPolygonData(url, lyrEnName, imgClass) {
    $.ajax({
        url: url,
        type: "POST",
        data: {},
        dataType: "json",
        success: function (res) {
            var result        = res.result;

            var areaObject;
            var polygonList = [];

            for(var i = 0; i < result.length; i ++) {
                if (result[i].area !== undefined && result[i].area !== '') {
                    var area = result[i].area;
                    area = area.replaceAll('[[[', '').replaceAll(']]]', '');

                    var areaList = area.split('],[');
                    var innerPolygonList = [];
                    var outerPolygon = [];
                    var innerPolygon = [];
                    for (var j = 0; j < areaList.length; j++) {
                        var arr = areaList[j];
                        if (arr.indexOf('[') > -1) {
                            if (j === 0) {
                                arr = arr.replace('[', '').split(',').map(arg => parseFloat(arg));
                                outerPolygon.push(ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326'));
                            } else {
                                innerPolygon = [];
                                arr = arr.replace('[', '').split(',').map(arg => parseFloat(arg));
                                innerPolygon.push(ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326'));
                            }
                        } else if (arr.indexOf(']') > -1) {
                            if (innerPolygon.length === 0) {
                                arr = arr.replace(']', '').split(',').map(arg => parseFloat(arg));
                                outerPolygon.push(ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326'));
                                outerPolygon.push(outerPolygon[0]);
                            } else {
                                arr = arr.replace(']', '').split(',').map(arg => parseFloat(arg));
                                innerPolygon.push(ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326'));
                                innerPolygonList.push(innerPolygon);
                            }
                        } else {
                            if (innerPolygon.length === 0) {
                                arr = arr.split(',').map(arg => parseFloat(arg));
                                outerPolygon.push(ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326'));
                            } else {
                                arr = arr.split(',').map(arg => parseFloat(arg));
                                innerPolygon.push(ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326'));
                            }
                        }
                    }
                    polygonList.push([outerPolygon].concat(innerPolygonList));
                }
            }
            areaObject = {polygonList: polygonList};
            NamuLayer.createPolygonLayer(areaObject, lyrEnName, false,  imgClass);
        }, error: function(error) {
            if(error.status !== 500) alert('보호구역 폴리곤 데이터 조회에 실패하였습니다.\n해당 문제가 지속될 경우 관리자에게 문의하여 주십시오.');
            console.log('url : ' + url);
            console.log(error);
        }
    });
}
//교통 약자 폴리곤 + 마커 데이터 조회 및 rendering
function getTwMultiData(url, lyrEnName, imgClass, imgSrc, safetyZoneType) {
    $.ajax({
        url: url,
        type: "POST",
        data: {},
        dataType: "json",
        success: function (res) {
            var result        = res.result;
            var areaObject;
            var polygonList = [];
            var markerList       = [];
            for(var i = 0; i < result.length; i ++) {
                if (result[i].area !== undefined && result[i].area !== '') {
                    var area = result[i].area;
                    area = area.replaceAll('[[[', '').replaceAll(']]]', '');

                    var areaList = area.split('],[');

                    var innerPolygonList = [];
                    var outerPolygon = [];
                    var innerPolygon = [];
                    for (var j = 0; j < areaList.length; j++) {
                        var arr = areaList[j];
                        if (arr.indexOf('[') > -1) {
                            if (j === 0) {
                                arr = arr.replace('[', '').split(',').map(arg => parseFloat(arg));
                                outerPolygon.push(ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326'));
                            } else {
                                innerPolygon = [];
                                arr = arr.replace('[', '').split(',').map(arg => parseFloat(arg));
                                innerPolygon.push(ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326'));
                            }
                        } else if (arr.indexOf(']') > -1) {
                            if (innerPolygon.length === 0) {
                                arr = arr.replace(']', '').split(',').map(arg => parseFloat(arg));
                                outerPolygon.push(ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326'));
                                outerPolygon.push(outerPolygon[0]);
                            } else {
                                arr = arr.replace(']', '').split(',').map(arg => parseFloat(arg));
                                innerPolygon.push(ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326'));
                                innerPolygonList.push(innerPolygon);
                            }
                        } else {
                            if (innerPolygon.length === 0) {
                                arr = arr.split(',').map(arg => parseFloat(arg));
                                outerPolygon.push(ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326'));
                            } else {
                                arr = arr.split(',').map(arg => parseFloat(arg));
                                innerPolygon.push(ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326'));
                            }
                        }
                    }
                    polygonList.push([outerPolygon].concat(innerPolygonList));
                }
                if(result[i].location !== undefined && result[i].location !== '') {
                    var location = result[i].location.replace(",", " ").split(" ");
                    if (location.length > 0) {
                        markerList.push({x: location[0], y: location[1], address: (result[i].roadNmAddr + ', ' + result[i].name), safetyZoneType: safetyZoneType });
                    }
                }
            }
            areaObject = {polygonList: polygonList, markerList: markerList};
            NamuLayer.createMultiLayer(areaObject, lyrEnName, false,  imgClass, imgSrc);
        }, error: function(error) {
            if(error.status !== 500) alert('보호구역 폴리곤 데이터 조회에 실패하였습니다.\n해당 문제가 지속될 경우 관리자에게 문의하여 주십시오.');
            console.log('url : ' + url);
            console.log(error);
        }
    });
}

//교통 약자 폴리곤 + 마커 데이터 조회 및 rendering - 노인보호구역/장애인보호구역용
function getTwMultiData2(url, lyrEnName, imgClass, imgSrc, safetyZoneType) {
    $.ajax({
        url: url,
        type: "POST",
        data: {},
        dataType: "json",
        success: function (res) {
            var resultArea         = res.resultArea;
            var resultPoint        = res.resultPoint;

            var areaObject;
            var polygonList = [];
            var markerList       = [];

            for(var i = 0; i < resultArea.length; i ++) {
                if (resultArea[i].area !== undefined && resultArea[i].area !== '') {
                    var area = resultArea[i].area;
                    area = area.replaceAll('[[[', '').replaceAll(']]]', '');

                    var areaList = area.split('],[');

                    var innerPolygonList = [];
                    var outerPolygon = [];
                    var innerPolygon = [];
                    for (var j = 0; j < areaList.length; j++) {
                        var arr = areaList[j];
                        if (arr.indexOf('[') > -1) {
                            if (j === 0) {
                                arr = arr.replace('[', '').split(',').map(arg => parseFloat(arg));
                                outerPolygon.push(ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326'));
                            } else {
                                innerPolygon = [];
                                arr = arr.replace('[', '').split(',').map(arg => parseFloat(arg));
                                innerPolygon.push(ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326'));
                            }
                        } else if (arr.indexOf(']') > -1) {
                            if (innerPolygon.length === 0) {
                                arr = arr.replace(']', '').split(',').map(arg => parseFloat(arg));
                                outerPolygon.push(ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326'));
                                outerPolygon.push(outerPolygon[0]);
                            } else {
                                arr = arr.replace(']', '').split(',').map(arg => parseFloat(arg));
                                innerPolygon.push(ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326'));
                                innerPolygonList.push(innerPolygon);
                            }
                        } else {
                            if (innerPolygon.length === 0) {
                                arr = arr.split(',').map(arg => parseFloat(arg));
                                outerPolygon.push(ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326'));
                            } else {
                                arr = arr.split(',').map(arg => parseFloat(arg));
                                innerPolygon.push(ol.proj.transform(arr, 'EPSG:5186', 'EPSG:4326'));
                            }
                        }
                    }
                    polygonList.push([outerPolygon].concat(innerPolygonList));
                }
            }

            for(var j = 0; j < resultPoint.length; j ++) {
                if(resultPoint[j].location !== undefined && resultPoint[j].location !== '') {
                    var location = resultPoint[j].location.replace(",", " ").split(" ");
                    if (location.length > 0) {
                        markerList.push({x: location[0], y: location[1], address: (resultPoint[j].roadNmAddr + ', ' + resultPoint[j].name), safetyZoneType: safetyZoneType });
                    }
                }
            }
            areaObject = {polygonList: polygonList, markerList: markerList};
            NamuLayer.createMultiLayer(areaObject, lyrEnName, false,  imgClass, imgSrc);
        }, error: function(error) {
            if(error.status !== 500) alert('보호구역 폴리곤 데이터 조회에 실패하였습니다.\n해당 문제가 지속될 경우 관리자에게 문의하여 주십시오.');
            console.log('url : ' + url);
            console.log(error);
        }
    });
}
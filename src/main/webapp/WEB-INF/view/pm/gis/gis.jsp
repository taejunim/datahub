<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>
<%@ include file="/WEB-INF/view/include/tooltip/accTableContent.jsp"%>
<%@ include file="/WEB-INF/view/include/tooltip/listContent.jsp"%>
<%@ include file="/WEB-INF/view/include/tooltip/tableListContent.jsp"%>
<%@ include file="/WEB-INF/view/include/tooltip/twContent.jsp"%>
<%@ include file="/WEB-INF/view/include/tooltip/roadJobContent.jsp"%>
<%@ include file="/WEB-INF/view/include/tooltip.jsp"%>
<%@ include file="/WEB-INF/view/include/mouseOverTooltip.jsp"%>
<link rel="stylesheet" href="<c:url value='/js/rangeslider/rangeslider.css' />">
<!-- openlayers -->
<link rel="stylesheet" href="<c:url value='/js/gis/ol.css' />">
<link rel="stylesheet" href="<c:url value='/css/tw/twApply.css' />">
<link rel="stylesheet" href="<c:url value='/css/gis.css' />">
<script src="<c:url value='/js/gis/ol.js'/>"></script>
<script src="<c:url value='/js/gis/proj4.js'/>"></script>
<script src="<c:url value='/js/tw/turf.min.js'/>"></script>
<script src="<c:url value='/js/rangeslider/rangeslider.min.js'/>"></script>
<script src="<c:url value='/js/pm/gis.js'/>"></script>
<script src="/js/tv/protectionZone/searchSafetyArea.js"></script>
<!-- 레이어 슬라이드-->
<div class="layer_modal_wrap">
    <div class="layer_modal_con">
        <strong class="modalTit">생활안전지도</strong>
        <div class="layer-content">
            <ul class="layer_btn_change" id="pills-tab" role="tablist">
                <li class="nav-item custom-nav active nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="true">레이어
                </li>
                <li class="nav-item custom-nav nav-link" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="false">보호구역조회
                </li>
            </ul>
            <div id="pills-home" class="fade tab-pane layer_Zone pr20" aria-labelledby="pills-home-tab">
                <div class="formItem">
                    <label for="safetyAreaType" class="form-tit mr20 floatLt" style="line-height: 35px; margin-bottom: 0px">보호구역 종류</label>
                    <select name="safetyAreaType" id="safetyAreaType" class="select-sm floatRt">
                        <option value="">전체</option>
                        <option value="0">어린이보호구역</option>
                        <option value="1">노인보호구역</option>
                        <option value="2">장애인보호구역</option>
                    </select>
                </div>
                <div class="formItem">
                    <label for="safetyAreaName" class="form-tit mr20 floatLt" style="line-height: 35px; margin-bottom: 0px">보호구역명</label>
                    <input type="text" id="safetyAreaName" maxlength="50" class="inputTxt-sm searchWord floatRt" maxlength="50" style="padding: 0px 14px;">
                </div>
                <button class="cmnBtn search" style="min-width: 100%; margin-top: 10px;" id="mapSearchButton">검색</button>
                <div class="zoneInfo">
                    <div class="zoneInfo-zoneList">
                        <div class="zoneInfo-zoneList-total"><p>전체 건수</p>
                            <p class="totalZoneCount">0</p>
                            <p>건</p>
                        </div>
                        <img class="zoneInfo-zoneList-list-divisionLine" src="/images/cms/common/division_line.png" alt="division_line">
                        <div class="zoneInfo-zoneList-list">
                            <div id="zoneList">
                            </div>
                            <div class="noSafetyAreaData">조회결과가 존재하지 않습니다.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="pills-profile" class="fade tab-pane" aria-labelledby="pills-profile-tab">
                <%--<div class="row">
                    <label style="background: #f0f0f0;padding: 12px;" data-toggle="collapse"  data-target="#mapForm-box" aria-expanded="true" aria-controls="mapForm-box">
                        <input type="checkbox" class="form-chk" class="layerChk" checked>
                        <p class="form-name">배경지도</p>
                    </label>
                    <div id="mapForm-box" aria-expanded="true" class="collapse in layerForm"></div>
                </div>--%>
                <div class="row">
                    <label style="background: #f0f0f0;padding: 12px;" data-toggle="collapse"  data-target="#pmLayerForm-box" aria-expanded="true" aria-controls="pmLayerForm-box">
                        <input type="checkbox" class="form-chk"  id="chkPmLayerForm-box" checked/>
                        <p class="form-name">PM 서비스</p>
                    </label>
                    <div id="pmLayerForm-box" aria-expanded="true" class="collapse in layerForm"></div>
                </div>
                <div class="row">
                    <label style="background: #f0f0f0;padding: 12px;" data-toggle="collapse"  data-target="#proneLayerForm-box" aria-expanded="true" aria-controls="proneLayerForm-box">
                        <input type="checkbox" class="form-chk"  id="chkProneLayerForm-box" checked/>
                        <p class="form-name">사고 다발 지역</p>
                    </label>
                    <div id="proneLayerForm-box" aria-expanded="true" class="collapse in layerForm"></div>
                </div>
                <div class="row">
                    <label style="background: #f0f0f0;padding: 12px;" data-toggle="collapse"  data-target="#twLayerForm-box" aria-expanded="true" aria-controls="twLayerForm-box">
                        <input type="checkbox" class="form-chk" checked>
                        <p class="form-name">교통약자 보호구역</p>
                    </label>
                    <div id="twLayerForm-box" aria-expanded="true" class="collapse in layerForm"></div>
                </div>
                <div class="row">
                    <label style="background: #f0f0f0;padding: 12px;" data-toggle="collapse"  data-target="#roadInformationLayerForm-box" aria-expanded="true" aria-controls="roadInformationLayerForm-box">
                        <input type="checkbox" class="form-chk" id="chkRoadInformationLayerForm-box" checked>
                        <p class="form-name">도로 교통정보</p>
                    </label>
                    <div id="roadInformationLayerForm-box" aria-expanded="true" class="collapse in layerForm"></div>
                </div>
            </div>
        </div>
    </div>
    <div id="layer-navi"><div></div></div>
</div>
<div id="vMap" class="mapArea map" style="height: 100%; width: 100%;">
    <div id="mapModeButton">
        <div id='2dButton' onclick="NamuLayer.controlLayerHandler('2d-map')"><img src="/images/dash/layer_tit.png"/> 2D</div>
        <div id='satelliteButton' onclick="NamuLayer.controlLayerHandler('SatelliteMap')"><img src="/images/dash/layer_tit.png"/> 위성영상</div>
        <div id='hybridButton' onclick="NamuLayer.controlLayerHandler('HybridMap')"><img src="/images/dash/layer_tit.png"/> 하이브리드</div>
    </div>
</div>
<div id="vw-notice">
    ! 본 서비스는 전일까지의 데이터를 활용하며 참고용으로만 사용하시기 바랍니다.
</div>
<div class="popup-wrapper"></div>
<div id="legend">
    <div class="square-box">
        <div class="square-box-box">
            <div class="blue-square"></div>
        </div>
        <span>대여</span>
    </div>
    <div class="square-box">
        <div class="square-box-box">
            <div class="green-square"></div>
        </div>
        <span>반납</span>
    </div>
    <div class="square-box">
        <div class="square-box-box">
            <div class="red-square"></div>
        </div>
        <span>불법주차</span>
    </div>
</div>
<div class="dtllnkg-legend-container">
    <div id="dtllnkg-legend"></div>
</div>
<div class="gis-range-wrapper">
    <div style="display: flex; align-items: center;height: 100%;padding-top: 10px;">
        <div>
            <div class="gis-range">
                <input type="range" min="1" max="24" steps="1" value="1">
            </div>
            <ul class="range-labels">
                <li class="active selected">0시</li>
                <li>1시</li>
                <li>2시</li>
                <li>3시</li>
                <li>4시</li>
                <li>5시</li>
                <li>6시</li>
                <li>7시</li>
                <li>8시</li>
                <li>9시</li>
                <li>10시</li>
                <li>11시</li>
                <li>12시</li>
                <li>13시</li>
                <li>14시</li>
                <li>15시</li>
                <li>16시</li>
                <li>17시</li>
                <li>18시</li>
                <li>19시</li>
                <li>20시</li>
                <li>21시</li>
                <li>22시</li>
                <li>23시</li>
            </ul>
        </div>
    </div>
</div>
<div class="polygon1"></div>
<div>
    <div class="polygonSample1"></div><div class="polygonSample2"></div><div class="polygonSample3"></div><div class="polygonSample4"></div><div class="polygonSample5">
    </div><div class="polygonSample6"></div><div class="polygonSample7"></div><div class="polygonSample8"></div><div class="polygonSample9"></div><div class="polygonSample10"></div>
</div>
<div class="progress-body">
    <div class="progress-content"></div>
</div>

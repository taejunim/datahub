<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>
<script src="/js/tv/protectionZone/html2canvas.min.js"></script>
<script src="/js/tv/protectionZone/speedDecisionMaking.js?ver=0.1"></script>
<script src="/js/tv/protectionZone/searchSafetyArea.js"></script>
<script src="<c:url value='/js/gis/proj4.js'/>"></script>
<script src="/js/tv/protectionZone/mapControllerObject.js"></script>
<article class="contentsBody">
    <div class="contentsBody-inner">
        <div class="contentsHd clear-fix">
            <tg:menuInfoTag />
        </div>
        <div class="search-box searchCondition clear-fix">
            <div class="formItem">
                <select name="" id="safetyAreaType" class="select-sm mr5">
                    <option value="0">어린이보호구역</option>
                </select>
            </div>
            <button class="cmnBtn search" id="mapSearchButton">조회</button>
        </div>
    </div>
    <div>
        <div class="" style="display: flex;width: 100%;justify-content: space-between; align-items: center;">
            <div style="width: 49%; height: 400px;">
                <div class="popup-box clear-fix">
                    <div class="floatLt">
                        <p class="listTit">보호구역 상세정보</p>
                    </div>
                    <table class="detailTable fciltyDtl-tb facility-table">
                        <tbody>
                        <tr>
                            <th style="width: 25%">위치</th>
                            <td><span id="zoneDetail-location">-</span></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="popup-box clear-fix" style="height: 0px;">
                    <div class="floatRt">
                        <div style="width: 25px; height: 25px; line-height: 25px; text-align: center; cursor: pointer; background: black; border-radius: 3px; color:white;" id="compareModalButton">
                            <i class="fa fa-exchange" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
                <div class="popup-box clear-fix captureDiv">
                    <div class="floatLt">
                        <p class="listTit">보호구역내 시설물 정보</p>
                    </div>
                    <table class="detailTable fciltyDtl-tb facility-table">
                        <tbody>
                        <tr>
                            <th>CCTV</th>
                            <td><span id="cctvCount">-</span>&nbsp;개</td>
                            <th>펜스</th>
                            <td><span id="fenceCount">-</span>&nbsp;개</td>
                        </tr>
                        <tr>
                            <th>횡단보도</th>
                            <td><span id="crossWalkCount">-</span>&nbsp;개</td>
                            <th>교차로</th>
                            <td><span id="crossRoadCount">-</span>&nbsp;개</td>
                        </tr>
                        <tr>
                            <th>승/하차구역</th>
                            <td><span id="childPickupZoneCount">-</span>&nbsp;개</td>
                            <th>통학로</th>
                            <td><span id="childWaySchoolCount">-</span>&nbsp;개</td>
                        </tr>
                        <tr>
                            <th>일반통행도로</th>
                            <td><span id="oneWayRoadCount">-</span>&nbsp;개</td>
                            <th>과속방지턱</th>
                            <td><span id="speedBumpCount">-</span>&nbsp;개</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="vMap" class="mapArea-full map">
                <div id="dimensionControlButton">
                    <div id='3dButton' onclick="setMapMode('ws3d-map')"><img src="/images/dash/layer_tit.png"/> 3D</div>
                    <div id='2dButton' onclick=setMapMode('2d-map')><img src="/images/dash/layer_tit.png"/>2D</div>
                </div>
            </div>
        </div>
    </div>
    <p class="subTxt2">통행량 통계 조회</p>
    <div class="search-box searchCondition clear-fix">
        <div class="formItem">
            <label for="search-target" class="form-tit">기간구분</label>
            <select name="" id="search-target" class="select-sm mr10" style="min-width: 70px!important;">
                <option value="day" value2="0">일별</option>
                <option value="month" value2="1">월별</option>
                <option value="year" value2="2">연별</option>
            </select>
            <label for="dayOptionStartDate" class="form-tit">기간</label>
            <div style="display: contents;" class="mr10 detailInfo-searchCondition-Option" id="detailInfo-searchCondition-dayOption">
                <div class="calendar-wr mr10">
                    <div class="calendar-item">
                        <input type="text" class="date-picker selectDay" id="dayOptionStartDate">
                        <span class="calendar-btn"><img src="/images/cmn/ico_calendar.png" alt="달력"></span>
                    </div>
                </div>
                ~
                <div class="calendar-wr ml10">
                    <div class="calendar-item">
                        <input type="text" class="date-picker selectDay" id="dayOptionEndDate">
                        <span class="calendar-btn"><img src="/images/cmn/ico_calendar.png" alt="달력"></span>
                    </div>
                </div>
            </div>
            <div style="display: none;" class="mr10 detailInfo-searchCondition-Option" id="detailInfo-searchCondition-monthOption">
                <div class="calendar-wr mr10">
                    <div class="calendar-item">
                        <select class="detailInfo-searchCondition-date-input detailInfo-form-date selectYear" id="monthOptionStartYear"></select>-
                        <select class="detailInfo-searchCondition-date-input detailInfo-form-date selectMonth endDateSelect" id="monthOptionStartMonth"></select>
                    </div>
                </div>
                ~
                <div class="calendar-wr ml10">
                    <div class="calendar-item">
                        <select class="detailInfo-searchCondition-date-input detailInfo-form-date selectMonth endDateSelect" id="monthOptionEndMonth"></select>
                    </div>
                </div>
            </div>
            <div style="display: none;" class="mr10 detailInfo-searchCondition-Option" id="detailInfo-searchCondition-yearOption">
                <div class="calendar-wr mr10">
                    <div class="calendar-item">
                        <select id="yearOptionStartYear" class="selectYear endDateSelect"></select>
                    </div>
                </div>
                ~
                <div class="calendar-wr ml10">
                    <div class="calendar-item">
                        <select id="yearOptionEndYear" class="selectYear endDateSelect"></select>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-group onlySearch">
            <button id="resetButton" class="cmnBtn cancel">초기화</button>
            <button id="searchButton" class="cmnBtn search">조회</button>
            <button id="speedDecisionMakingReport" class="printingBtn">레포트 출력</button>
        </div>
    </div>
    <div class="chartDiv">
        <div class="captureDiv">
            <p class="listTit">차량 통행량</p>
            <div class="chartArea-full" style="display: flex; position: relative;">
                <div id="BarChart_CarType" class="trafficChart vehicleChart" style="width: 50%; height: 100%; "></div>
                <div id="PieChart_CarType" class="trafficChart vehicleChart" style="width: 50%; height: 100%; "></div>
                <div class="noDataMessage" id="vehicleChartNoDataMessage">조회된 데이터가 없습니다.</div>
            </div>
        </div>
        <div class="captureDiv">
            <p class="listTit">보행자 통행량</p>
            <div class="chartArea-full" style="display: flex; flex-direction: column; position:relative;">
                <div style="height: 50%; display: flex;">
                    <div id="BarChart_TimeZoneCode" class="trafficChart pedestrianChart" style="height:100%; width: 50%;"></div>
                    <div id="BarChart_Gender" class="trafficChart pedestrianChart" style="height:100%; width: 50%;"></div>
                </div>
                <div style="height: 50%; display: flex;">
                    <div id="PieChart_TimeZoneCode" class="trafficChart pedestrianChart" style="height:100%; width: 50%;"></div>
                    <div id="PieChart_Gender" class="trafficChart pedestrianChart" style="height:100%; width: 50%;"></div>
                </div>
                <div class="noDataMessage" id="pedestrianChartNoDataMessage">조회된 데이터가 없습니다.</div>
            </div>
        </div>
        <div class="captureDiv">
            <p class="listTit">날씨별 통행량</p>
            <div class="chartArea-full" style="display: flex; flex-direction: column; position:relative;">
                <div style="width: 100%; display: flex;">
                    <p class="listTit weatherChart">기간중 날씨 통계 (1시간 단위 데이터 수집)</p>
                </div>
                <div class="weatherChart" style="width: 550px; height: 45px; display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px; border: 1px solid #f0f0f0;background: #f0f0f0;box-shadow: 0px 5px 0px 0px #fff;border-radius: 5px; position: relative;">
                    <div style="height: 40px; position: absolute; top: 50%; margin-top: -13px;">
                        <img src="/images/tv/weather_sun.png">
                        <span>&nbsp;:&nbsp;&nbsp;</span>
                        <span id="sunnyCount">-</span>
                        <span>&nbsp;회</span>

                        <img style="margin-left: 40px" src="/images/tv/weather_cloud.png">
                        <span>&nbsp;:&nbsp;&nbsp;</span>
                        <span id="cloudyCount">-</span>
                        <span>&nbsp;회</span>

                        <img style="margin-left: 40px;" src="/images/tv/weather_rain.png">
                        <span>&nbsp;:&nbsp;&nbsp;</span>
                        <span id="rainyCount">-</span>
                        <span>&nbsp;회</span>

                        <img style="margin-left: 40px;" src="/images/tv/weather_snow.png">
                        <span>&nbsp;:&nbsp;&nbsp;</span>
                        <span id="snowyCount">-</span>
                        <span>&nbsp;회</span>
                    </div>
                </div>
                <div style="width: 100%; display: flex; margin-top: 10px">
                    <p class="listTit weatherChart" style="width:50%;">차량 통행량</p>  <p class="listTit weatherChart" style="width:50%;">보행자 통행량</p>
                </div>
                <div style="height: 45%; display: flex;">
                    <div id="BarChart_CarWeather" class="trafficChart weatherChart" style="height:100%; width: 50%;"></div>
                    <div id="BarChart_PopulationWeather" class="trafficChart weatherChart" style="height:100%; width: 50%;"></div>
                </div>
                <div style="height: 45%; display: flex;">
                    <div id="PieChart_CarWeather" class="trafficChart weatherChart" style="height:100%; width: 50%;"></div>
                    <div id="PieChart_PopulationWeather" class="trafficChart weatherChart" style="height:100%; width: 50%;"></div>
                </div>
                <div class="noDataMessage" id="weatherChartNoDataMessage">조회된 데이터가 없습니다.</div>
            </div>
        </div>
    </div>

    <form id="reportForm" style="display: none;"></form>
</article>
<%@ include file="/WEB-INF/view/tv/protectionZone/protectionZoneListModal.jsp"%>
<%@ include file="/WEB-INF/view/tv/protectionZone/protectionZoneCompareModal.jsp"%>
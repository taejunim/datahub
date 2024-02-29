<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/view/include/tags.jspf" %>

<link rel="stylesheet" href="<c:url value='/css/pm.css?ver=${versions_build}' />">
<script src="/js/pm/accident/graph.js?ver=${versions_build}"></script>

<article class="contentsBody">
    <div class="contentsBody-inner">
        <div class="contentsHd clear-fix">
            <tg:menuInfoTag/>
        </div>
        <div class="search-box clear-fix">
            <div class="formItem">
                <label for="startSearchDt" class="form-tit">기간</label>
                <div class="calendar-wr mr5">
                    <div class="calendar-item">
                        <input type="text" class="date-picker2 datepicker" id="startSearchDt" name="startSearchDt">
                        <span class="calendar-btn"><img src="/images/cmn/ico_calendar.png" alt="달력"></span>
                    </div>
                    <span>~</span>
                    <div class="calendar-item">
                        <input type="text" class="date-picker2 datepicker" id="endSearchDt" name="endSearchDt">
                        <span class="calendar-btn"><img src="/images/cmn/ico_calendar.png" alt="달력"></span>
                    </div>
                </div>
                <div class="btn-group onlySearch">
                    <button class="cmnBtn search" id="searchBtn">조회</button>
                </div>
            </div>
        </div>
        <div class="contents_wrap">
            <div style="display: flex;justify-content: space-between;">
                <div class="inforAll" style="width: 100%;">
                    <div class="statsAll loc-wordcloud-acc-vs vs" style="display: none;">
                        <div class="formhd">
                            <label class="formhd-tit zoom-icon" data-groupCd="05,07" data-groupList="spotBarStat,spotBarStat" style="cursor: pointer;">지역별</label>
                        </div>
                        <div class="clear-fix">
                            <div class="floatRt">
                                <span class="form-name">정렬기준</span>
                                <select name="spot-order" id="spot-order" class="select-xs">
                                    <option value="desc">내림차순</option>
                                    <option value="asc">오름차순</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="inforArea loc-wordcloud-acc-vs vs" style="display: none;">
                        <div class="loc-lchart-div">
                            <div id="loc-bchart-acc" style="height: 100%;"></div>
                        </div>
                        <div class="right-chart-div">
                            <div id="loc-wordcloud-acc" style="height: 100%;"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: none;" class="time-lchart-acc-vs vs">
                <div class="inforAll">
                    <div class="statsAll">
                        <div class="formhd">
                            <label class="formhd-tit zoom-icon" data-groupCd="01" data-groupList="dowStat" style="cursor: pointer;">요일별</label>
                        </div>
                    </div>
                    <div class="inforArea">
                        <div id="dow-bchart-acc" class="graph-calc-height"></div>
                    </div>
                </div>
                <div class="inforAll">
                    <div class="statsAll">
                        <div class="formhd">
                            <label class="formhd-tit zoom-icon" data-groupCd="04" data-groupList="timeStat" style="cursor: pointer;">연도별</label>
                        </div>
                    </div>
                    <div class="inforArea">
                        <div id="time-lchart-acc" class="graph-calc-height"></div>
                    </div>
                </div>
            </div>
            <div class="contents_wrap3" style="display: flex;justify-content: space-between;">
                <div class="inforAll">
                    <div class="statsAll">
                        <div class="formhd">
                            <label class="formhd-tit zoom-icon" data-groupCd="09" data-groupList="typeStat" style="cursor: pointer;">유형별</label>
                        </div>
                    </div>
                    <div class="inforArea" style="padding: 10px 20px 10px 20px !important; height: 360px !important;">
                        <div class="chartpie" id="accType-chart"></div>
                    </div>
                </div>
                <div class="inforAll">
                    <div class="statsAll">
                        <div class="formhd">
                            <label class="formhd-tit zoom-icon" data-groupCd="09" data-groupList="operatorStat" style="cursor: pointer;">운영사별</label>
                        </div>
                    </div>
                    <div class="inforArea" style="padding: 10px 20px 10px 20px !important; height: 360px !important;">
                        <div class="chartpie" id="operator-chart"></div>
                    </div>
                </div>
                <div class="inforAll">
                    <div class="statsAll">
                        <div class="formhd">
                            <label class="formhd-tit zoom-icon" data-groupCd="09" data-groupList="kindStat" style="cursor: pointer;">PM 종류별</label>
                        </div>
                    </div>
                    <div class="inforArea" style="padding: 10px 20px 10px 20px !important; height: 360px !important;">
                        <div class="chartpie" id="pmKind-chart"></div>
                    </div>
                </div>
                <div class="inforAll">
                    <div class="statsAll">
                        <div class="formhd">
                            <label class="formhd-tit zoom-icon" data-groupCd="09" data-groupList="ageStat" style="cursor: pointer;">연령별</label>
                        </div>
                    </div>
                    <div class="inforArea" style="padding: 10px 20px 10px 20px !important; height: 360px !important;">
                        <div class="chartpie" id="age-chart"></div>
                    </div>
                </div>
                <div class="inforAll">
                    <div class="statsAll">
                        <div class="formhd">
                            <label class="formhd-tit zoom-icon" data-groupCd="09" data-groupList="genderStat" style="cursor: pointer;">성별</label>
                        </div>
                    </div>
                    <div class="inforArea" style="padding: 10px 20px 10px 20px !important; height: 360px !important;">
                        <div class="chartpie" id="gender-chart"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</article>

<div class="custom-modal loc-modal custom-modal-none" tabindex="-1" aria-hidden="true">
    <div class="layerPop8 permission" tabindex="-1" aria-hidden="true" style="left: 50% !important; right: 0% !important; transform: translate(-50%, -50%) !important; top: 50% !important;">
        <div class="layerPop-header clear-fix">
            <strong>그래프 보기</strong>
            <button class="layerPop-close custom-modal-close">닫기</button>
        </div>
        <div class="layerPop-con">
            <div class="clear-fix" style="height: 100%;">
                <div class="chartArea-full" style="height: 100% !important; padding: 0 !important;">
                    <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <div id="first-chart"></div>
                        <div id="second-chart"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-wrap txtCt">
            <button class="cmnBtn cancel mr5 custom-modal-close">닫기</button>
        </div>
    </div>
</div>


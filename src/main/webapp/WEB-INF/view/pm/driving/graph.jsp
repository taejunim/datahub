<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/view/include/tags.jspf" %>

<link rel="stylesheet" href="<c:url value='/css/pm.css?ver=${versions_build}' />">
<script src="/js/pm/driving/graph.js?ver=${versions_build}"></script>

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
                <div class="formChoice-box ml10">
                    <label>
                        <input type="radio" class="form-rdo" name="search-target" checked="" value="rent">
                        <span class="form-name">대여</span>
                    </label>
                    <label>
                        <input type="radio" class="form-rdo" name="search-target" value="return">
                        <span class="form-name">반납</span>
                    </label>
                </div>
                <div class="btn-group onlySearch">
                    <button class="cmnBtn search" id="searchBtn">조회</button>
                </div>
            </div>
        </div>
        <div class="contents_wrap">
            <div style="display: flex;justify-content: space-between;">
                <div class="inforAll" style="width: 100%;">
                    <div class="statsAll loc-wordcloud-usage-vs vs" style="display: none;">
                        <div class="formhd">
                            <label class="formhd-tit zoom-icon" data-groupCd="05,07" data-groupList="spotBarStat,spotBarStat" style="cursor: pointer;">지역별</label>
                        </div>
                        <div class="clear-fix">
                            <div class="floatRt">
                                <span class="form-name">정렬기준</span>
                                <select class="select-xs" id="spot-order" name="spot-order">
                                    <option value="desc">내림차순</option>
                                    <option value="asc">오름차순</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="inforArea loc-wordcloud-usage-vs vs" style="display: none;">
                        <div class="loc-lchart-div">
                            <div id="loc-bchart-usage" style="height: 100%;"></div>
                        </div>
                        <div class="right-chart-div">
                            <div id="loc-wordcloud-usage" style="height: 100%;"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex;justify-content: space-between;">
                <div class="inforAll" style="width: 100%;">
                    <div class="statsAll time-lchart-usage-vs  vs" style="display: none;">
                        <div class="formhd">
                            <label class="formhd-tit zoom-icon" data-groupCd="02" data-groupList="timeStat" style="cursor: pointer;">시간대별</label>
                        </div>
                    </div>
                    <div class="inforArea time-lchart-usage-vs vs" style="display: none;">
                        <div id="time-lchart-usage" class="graph-calc-height"></div>
                    </div>
                </div>
            </div>
            <div style="display: none;" class="operator-bchart-usage-vs vs">
                <div class="inforAll">
                    <div class="statsAll">
                        <div class="formhd">
                            <label class="formhd-tit zoom-icon" data-groupCd="01" data-groupList="kindStat" style="cursor: pointer;">PM 종류별</label>
                        </div>
                        <div class="clear-fix">
                            <div class="floatRt">
                                <span class="form-name">정렬기준</span>
                                <select name="kind-order" id="kind-order" class="select-xs">
                                    <option value="desc">내림차순</option>
                                    <option value="asc">오름차순</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="inforArea">
                        <div id="kind-bchart-usage" class="graph-calc-height"></div>
                    </div>
                </div>
                <div class="inforAll">
                    <div class="statsAll">
                        <div class="formhd">
                            <label class="formhd-tit zoom-icon" data-groupCd="06" data-groupList="operatorStat" style="cursor: pointer;">운영사별</label>
                        </div>
                        <div class="clear-fix">
                            <div class="floatRt">
                                <span class="form-name">정렬기준</span>
                                <select name="operator-order" id="operator-order" class="select-xs">
                                    <option value="desc">내림차순</option>
                                    <option value="asc">오름차순</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="inforArea">
                        <div id="operator-bchart-usage" class="graph-calc-height"></div>
                    </div>
                </div>
            </div>
            <div style="display: flex;justify-content: space-between;">
                <div class="inforAll">
                    <div class="statsAll">
                        <div class="formhd">
                            <label class="formhd-tit zoom-icon" data-groupCd="08" data-groupList="dowTimeStat" style="cursor: pointer;">요일-시간대별</label>
                        </div>
                    </div>
                    <div class="inforArea">
                        <div id="comb-bheatmap-usage" class="graph-calc-height"></div>
                    </div>
                </div>
                <div class="inforAll">
                    <div class="statsAll">
                        <div class="formhd">
                            <label class="formhd-tit zoom-icon" data-groupCd="01" data-groupList="dowStat" style="cursor: pointer;">요일별</label>
                        </div>
                    </div>
                    <div class="inforArea">
                        <div id="dow-bchart-usage" class="graph-calc-height"></div>
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

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>

<!-- Datatable JS -->
<script src="https://cdn.datatables.net/buttons/2.2.3/js/dataTables.buttons.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
<script src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.html5.min.js"></script>

<script src="/js/pm/driving/list.js?ver=${versions_build}"></script>

<script src="<c:url value='/js/gis/ol.js'/>"></script>
<script src="<c:url value='/js/gis/proj4.js'/>"></script>
<script src="<c:url value='/js/tw/turf.min.js'/>"></script>
<script src="<c:url value='/js/moment/moment.js'/>"></script>

<link rel="stylesheet" href="<c:url value='/js/gis/ol.css' />">
<link rel="stylesheet" href="<c:url value='/css/pm.css?ver=${versions_build}' />">

<article class="contentsBody">
    <div class="contentsBody-inner">
        <div class="contentsHd clear-fix">
            <tg:menuInfoTag />
        </div>
        <div class="search-box searchCondition clear-fix">
            <div class="formItem">
                <label for="pm-usage-operator" class="form-tit">운영사</label>
                <select id="pm-usage-operator" class="select-sm mr10">
                    <option value="">전체</option>
                    <option value="none">미분류</option>
                    <c:forEach var="operator" items="${operators}">
                        <option value="${operator}">${operator}</option>
                    </c:forEach>
                </select>
            </div>
            <div class="formItem">
                <label for="startSearchDt" class="form-tit">기간</label>
                <div class="calendar-wr mr5">
                    <div class="calendar-item">
                        <input type="text" class="date-picker2 datepicker" id="startSearchDt" name="startSearchDt">
                        <span class="calendar-btn"><img src="/images/cmn/ico_calendar.png" alt="달력"></span>
                    </div>
                    <span>~</span>
                    <div class="calendar-item mr10">
                        <input type="text" class="date-picker2 datepicker" id="endSearchDt" name="endSearchDt">
                        <span class="calendar-btn"><img src="/images/cmn/ico_calendar.png" alt="달력"></span>
                    </div>
                </div>
            </div>
            <div class="formItem">
                <label for="pm-usage-retf" class="form-tit">대여/반납</label>
                <select id="pm-usage-retf" class="select-sm mr10">
                    <option value="rent">대여</option>
                    <option value="return" selected>반납</option>
                </select>
            </div>
            <div class="formItem">
               <div class="toggleBar mr5">
                   <label for="toggle" class="form-tit">불법주차만</label>
                   <input type="checkbox" id="toggle" name="ill-pk" hidden="">
                   <label for="toggle" class="toggleSwitch">
                       <span class="toggleButton"></span>
                   </label>
               </div>
            </div>
            <div class="btn-group onlySearch">
                <button id="resetBtn" class="cmnBtn cancel reset-bar">초기화</button>
                <button id="searchBtn" class="cmnBtn search">조회</button>
                <button id="excelBtn" class="cmnBtn excelBtn">엑셀다운로드</button>
            </div>
        </div>
        <div class="clear-fix">
            <div class="floatLt">
                <p class="listTotal">총<span id="pm-usage-total">0</span>건</p>
            </div>
            <div class="floatRt">
                <select id="pm-usage-dropdown" class="select-xs">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
                <span class="form-name">개씩 보기</span>
            </div>
        </div>
        <div class="tableWrap">
            <table class="listTable" id="datatable"></table>
        </div>
    </div>
</article>

<div class="custom-modal loc-modal custom-modal-none" tabindex="-1" aria-hidden="true">
    <div class="layerPop8 permission" tabindex="-1" aria-hidden="true" style="left: 50% !important; right: 0% !important; transform: translate(-50%, -50%) !important; top: 50% !important;">
        <div class="layerPop-header clear-fix">
            <strong>위치 보기</strong>
            <button class="layerPop-close custom-modal-close">닫기</button>
        </div>
        <div class="layerPop-con">
            <div class="clear-fix" style="height: 100%;">
                <div class="chartArea-full" style="height: 100% !important; padding: 0 !important;">
                    <div id="vMap" class="map" style="width: 100%; height: 100%;"></div>
                </div>
            </div>
        </div>
        <div class="btn-wrap txtCt">
            <button class="cmnBtn cancel mr5 custom-modal-close">닫기</button>
        </div>
    </div>
</div>

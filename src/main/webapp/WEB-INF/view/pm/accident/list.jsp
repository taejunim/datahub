<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>

<!-- Datatable JS -->
<script src="https://cdn.datatables.net/buttons/2.2.3/js/dataTables.buttons.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
<script src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.html5.min.js"></script>

<script src="/js/pm/accident/list.js?ver=${versions_build}"></script>

<script src="<c:url value='/js/gis/ol.js'/>"></script>
<script src="<c:url value='/js/gis/proj4.js'/>"></script>
<script src="<c:url value='/js/tw/turf.min.js'/>"></script>

<link rel="stylesheet" href="<c:url value='/js/gis/ol.css' />">
<link rel="stylesheet" href="<c:url value='/css/pm.css?ver=${versions_build}' />">

<article class="contentsBody">
    <div class="contentsBody-inner">
        <div class="contentsHd clear-fix">
            <tg:menuInfoTag />
        </div>
        <div class="search-box searchCondition clear-fix">
            <div class="formItem">
                <label for="pm-acc-type" class="form-tit">사고구분</label>
                <select id="pm-acc-type" name="pm-acc-type" class="select-sm mr10">
                    <option value="">전체</option>
                    <c:forEach var="accType" items="${accTypes}">
                        <option value="${accType}">${accType}</option>
                    </c:forEach>
                </select>
            </div>
            <div class="formItem">
                <label for="pm-acc-loc" class="form-tit">지역</label>
                <select id="pm-acc-loc" name="pm-acc-loc" class="select-sm mr10">
                    <option value="all">전체</option>
                    <c:forEach var="item" items="${spot}">
                        <option value="${item}">${(item == null)?"미분류":item}</option>
                    </c:forEach>
                </select>
            </div>
            <div class="formItem">
                <label for="pm-acc-kind" class="form-tit">PM 종류</label>
                <select id="pm-acc-kind" name="pm-acc-kind" class="select-sm mr10">
                    <option value="all">전체</option>
                    <c:forEach var="pmKind" items="${pmKinds}">
                        <option value="${pmKind}">${(pmKind == null)?"미분류":pmKind}</option>
                    </c:forEach>
                </select>
            </div>
            <div class="formItem">
                <label for="pm-acc-gender" class="form-tit">성별</label>
                <select id="pm-acc-gender" name="pm-acc-gender" class="select-sm mr10">
                    <option value="">전체</option>
                    <c:forEach var="gender" items="${sex}">
                        <option value="${gender}">${(gender == "-")?"미분류":gender}</option>
                    </c:forEach>
                </select>
            </div>
            <div class="formItem">
                <label for="pm-acc-age" class="form-tit">나이</label>
                <select id="pm-acc-age" name="pm-acc-age" class="select-sm mr10">
                    <option value="">전체</option>
                    <option value="1">미분류</option>
                    <option value="0">10대 미만</option>
                    <option value="10">10대</option>
                    <option value="20">20대</option>
                    <option value="30">30대</option>
                    <option value="40">40대</option>
                    <option value="50">50대 이상</option>
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
                <label for="pm-acc-company" class="form-tit">운영사</label>
                <select id="pm-acc-company" name="pm-acc-company" class="select-sm mr5">
                    <option value="">전체</option>
                    <option value="none">미분류</option>
                    <c:forEach var="operator" items="${operators}">
                        <option value="${operator}">${operator}</option>
                    </c:forEach>
                </select>
            </div>
            <div class="btn-group onlySearch">
                <button class="cmnBtn cancel reset-bar" id="resetBtn">초기화</button>
                <button class="cmnBtn search" id="searchBtn">조회</button>
                <button class="cmnBtn excelBtn" id="excelBtn">엑셀다운로드</button>
            </div>
        </div>
        <div class="clear-fix">
            <div class="floatLt">
                <p class="listTotal">총<span id="pm-acc-total">0</span>건</p>
            </div>
            <div class="floatRt">
                <select id="pm-acc-dropdown" class="select-xs">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
                <span class="form-name">개씩 보기</span>
            </div>
        </div>
        <div class="tableWrap">
            <table class="listTable" id="accTable"></table>
        </div>
    </div>
</article>

    <%--<section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box box-primary">
                    <div class="box-body">
                        <table id="accTable" class="table table-bordered table-striped table-hover" style="width:100%; table-layout:fixed;"></table>
                    </div>
                </div>
            </div>
        </div>
    </section>--%>

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

    <%--<div class="custom-modal loc-modal custom-modal-none" tabindex="-1" aria-hidden="true">
        <div class="custom-modal-dialog custom-modal-lg">
            <div class="custom-modal-content">
                <div class="custom-modal-header">
                    <h5 class="custom-modal-title" id="exampleModalLongTitle">위치 보기</h5>
                    <button type="button" class="custom-close custom-modal-close" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="custom-modal-body">
                    <div id="vMap" class="map" style="width: 100%; height: 80vh;"></div>
                </div>
                <div class="custom-modal-footer">
                    <button type="button" class="btn btn-primary custom-modal-close">닫기</button>
                </div>
            </div>
        </div>
    </div>--%>

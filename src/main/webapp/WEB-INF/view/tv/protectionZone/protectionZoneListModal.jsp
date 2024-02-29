<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="modal func-modal modal-none" id="list-modal" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="layerPop listPop">
        <div class="layerPop-header clear-fix">
            <strong>보호구역 목록</strong>
            <button class="layerPop-close">닫기</button>
        </div>
        <div class="layerPop-con" style="height: 600px; padding-top: 10px;">
            <div class="search-box searchCondition clear-fix">
                <div class="formItem">
                    <label for="labelForSelect1" class="form-tit">보호구역명</label>
                    <input type="text" id="safetyAreaName" maxlength="50" class="inputTxt-md mr10 searchWord reset-on-close" maxlength="50">
                </div>
                <button id="modalResetButton" class="cmnBtn modalRefresh">초기화</button>
                <button class="cmnBtn search" onclick="searchSafetyArea()">조회</button>
            </div>
            <div class="zoneInfo-zoneList-total">
                <p style="margin-left: auto;">전체 건수</p>
                <p class="totalZoneCount">0</p>
                <p>건</p>
            </div>
            <div class="clear-fix">
                <div id="zoneList"></div>
                <div class="noSafetyAreaData">조회결과가 존재하지 않습니다.</div>
            </div>
        </div>
    </div>
</div>
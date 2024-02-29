<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<style>
    [data-tooltip-text]:hover {
        position: relative;
    }

    [data-tooltip-text][flow^="down"]:hover:after {
        background-color: #000000;
        background-color: rgba(0, 0, 0, 0.8);

        -webkit-box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
        -moz-box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
        box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);

        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;

        color: #FFFFFF;
        font-size: 12px;
        content: attr(data-tooltip-text);
        
        top: 100%;
        left: 0%;
        margin-left: -150px;
        padding: 7px 12px;
        position: absolute;
        width: 260px;
        height: auto;
        max-height: 240px;
        word-wrap: break-word;
        z-index: 9999;
        overflow-y: auto;
    }

    [data-tooltip-text][flow^="up"]:hover:after {
        background-color: #000000;
        background-color: rgba(0, 0, 0, 0.8);

        -webkit-box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
        -moz-box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
        box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);

        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;

        color: #FFFFFF;
        font-size: 12px;
        content: attr(data-tooltip-text);

        bottom: 100%;
        left: 0%;
        margin-left: -150px;
        padding: 7px 12px;
        position: absolute;
        width: 260px;
        height: auto;
        max-height: 240px;
        word-wrap: break-word;
        z-index: 9999;
        overflow-y: auto;
    }

    .underLine {
        border-bottom: 1px solid;
    }
</style>
<div class="modal func-modal modal-none" id="compare-modal" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="layerPop listPop comparePop">
        <div class="layerPop-header clear-fix">
            <strong>전체 보호구역내 시설물 비교 정보</strong>
            <button class="layerPop-close">닫기</button>
        </div>
        <div class="layerPop-con" style="height: 550px;">
            <div class="zoneInfo-zoneList-total">
                <p style="margin-left: auto;">전체 보호구역 개수 : </p>
                <p class="protectionZoneTotalCount">-</p>
                <p>개</p>
            </div>
            <div class="clear-fix captureDiv">
                <table class="detailTable fciltyDtl-tb">
                    <thead>
                    <th></th><th>총 개수</th><th>최대</th><th>최소</th><th>평균</th><th>설치/미설치</th>
                    </thead>
                    <tbody>
                    <tr id="cctvCompareTr">
                    </tr>
                    <tr id="crossWalkCompareTr">
                    </tr>
                    <tr id="childPickupZoneCompareTr">
                        <th>승/하차구역</th>
                        <td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;곳/-&nbsp;&nbsp;곳</span></td>
                    </tr>
                    <tr id="oneWayRoadCompareTr">
                        <th>일방통행도로</th>
                        <td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;곳/-&nbsp;&nbsp;곳</span></td>
                    </tr>
                    <tr id="fenceCompareTr">
                        <th>펜스</th>
                        <td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;곳/-&nbsp;&nbsp;곳</span></td>
                    </tr>
                    <tr id="crossRoadCompareTr">
                        <th>교차로</th>
                        <td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;곳/-&nbsp;&nbsp;곳</span></td>
                    </tr>
                    <tr id="childWaySchoolCompareTr">
                        <th>통학로</th>
                        <td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;곳/-&nbsp;&nbsp;곳</span></td>
                    </tr>
                    <tr id="speedBumpCompareTr">
                        <th>과속방지턱</th>
                        <td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;곳/-&nbsp;&nbsp;곳</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
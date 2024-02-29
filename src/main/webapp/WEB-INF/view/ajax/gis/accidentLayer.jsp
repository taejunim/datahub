<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>

<div id="pmAcc" class="row_detail" style="display:none;">
    <div class="box" style="border: none;">
        <form>
            <p>사고구분</p>
            <select id="accType" name="accType" class="select-full">
                <option value="">전체</option>
                <c:forEach var="accType" items="${accTypes}">
                    <option value="<c:out value='${accType}'/>"><c:out value='${accType}'/></option>
                </c:forEach>
            </select>
            <p>지역</p>
            <select id="accLoc" name="accLoc" class="select-full">
                <option value="all">전체</option>
                <c:forEach var="item" items="${spot}">
                    <option value="<c:out value='${item}'/>"><c:out value='${item}'/></option>
                </c:forEach>
            </select>
            <p>pm 종류</p>
            <select id="pmKind" name="pmKind" class="select-full">
                <option value="all">전체</option>
                <c:forEach var="pmKind" items="${pmKinds}">
                    <option value="<c:out value='${pmKind}'/>"><c:out value='${(pmKind == null)?"미분류":pmKind}'/></option>
                </c:forEach>
            </select>
            <p>성별</p>
            <select id="gender" name="gender" class="select-full">
                <option value="">전체</option>
                <c:forEach var="gender" items="${sex}">
                    <option value="<c:out value='${gender}'/>"><c:out value='${(gender == "-")?"미분류":gender}'/></option>
                </c:forEach>
            </select>
            <p>나이</p>
            <select id="age" name="age" class="select-full">
                <option value="">전체</option>
                <option value="1">미분류</option>
                <option value="0">10대 미만</option>
                <option value="10">10대</option>
                <option value="20">20대</option>
                <option value="30">30대</option>
                <option value="40">40대</option>
                <option value="50">50대 이상</option>
            </select>
            <p>운영사</p>
            <select name="company" id="company" class="select-full">
                <option value="">전체</option>
                <option value="none">미분류</option>
                <c:forEach var="operator" items="${operators}">
                    <option value="<c:out value='${operator}'/>"><c:out value='${operator}'/></option>
                </c:forEach>
            </select>
            <div style="width: 100%; display: flex; justify-content: space-between; position: relative; margin-top: 8px;">
                <input type="text" style="width: 50%;" class="form-control searchList datepicker" name="startSearchDt" id="startSearchDt2" placeholder="시작일을 선택해주세요.">
                <input type="text" style="width: 50%;" class="form-control searchList datepicker" name="endSearchDt" id="endSearchDt2" placeholder="종료일을 선택해주세요.">
            </div>
            <button type="button" class="cmnBtn search" style="min-width: 100%; margin-top: 10px;">조회</button>
        </form>
    </div>
</div>

<%--<div id="pmAcc" style="border: 1px solid; padding: 10px 0px; display: none;">
    <form style="display: flex; flex-direction: column; align-items: center; font-size: 14px;">
        <div style="width: 80%; display: flex; justify-content: space-between; margin-bottom: 8px;">
            <div style="display: flex; align-items: center;">
                <label for="accType" style="font-weight: normal;">사고구분</label>
            </div>
            <div style="width: 40%;">
                <select id="accType" name="accType" style="width: 100%;">
                    <option value="">전체</option>
                    <c:forEach var="accType" items="${accTypes}">
                        <option value="<c:out value='${accType}'/>"><c:out value='${accType}'/></option>
                    </c:forEach>
                </select>
            </div>
        </div>

        <div style="width: 80%; display: flex; justify-content: space-between; margin-bottom: 8px;">
            <div style="display: flex; align-items: center;">
                <label for="accLoc" style="font-weight: normal;">지역</label>
            </div>
            <div style="width: 40%;">
                <select id="accLoc" name="accLoc" style="width: 100%;">
                    <option value="all">전체</option>
                    <c:forEach var="item" items="${spot}">
                        <option value="<c:out value='${item}'/>"><c:out value='${item}'/></option>
                    </c:forEach>
                </select>
            </div>
        </div>

        <div style="width: 80%; display: flex; justify-content: space-between; margin-bottom: 8px;">
            <div style="display: flex; align-items: center;">
                <label for="pmKind" style="font-weight: normal;">PM 종류</label>
            </div>
            <div style="width: 40%;">
                <select id="pmKind" name="pmKind" style="width: 100%;">
                    <option value="all">전체</option>
                    <c:forEach var="pmKind" items="${pmKinds}">
                        <option value="<c:out value='${pmKind}'/>"><c:out value='${(pmKind == null)?"미분류":pmKind}'/></option>
                    </c:forEach>
                </select>
            </div>
        </div>

        <div style="width: 80%; display: flex; justify-content: space-between; margin-bottom: 8px;">
            <div style="display: flex; align-items: center;">
                <label for="gender" style="font-weight: normal;">성별</label>
            </div>
            <div style="width: 40%;">
                <select id="gender" name="gender" style="width: 100%;">
                    <option value="">전체</option>
                    <c:forEach var="gender" items="${sex}">
                        <option value="<c:out value='${gender}'/>"><c:out value='${(gender == "-")?"미분류":gender}'/></option>
                    </c:forEach>
                </select>
            </div>
        </div>

        <div style="width: 80%; display: flex; justify-content: space-between; margin-bottom: 8px;">
            <div style="display: flex; align-items: center;">
                <label for="age" style="font-weight: normal;">나이</label>
            </div>
            <div style="width: 40%;">
                <select id="age" name="age" style="width: 100%;">
                    <option value="">전체</option>
                    <option value="0">10대 미만</option>
                    <option value="10">10대</option>
                    <option value="20">20대</option>
                    <option value="30">30대</option>
                    <option value="40">40대</option>
                    <option value="50">50대 이상</option>
                    <option value="1">미분류</option>
                </select>
            </div>
        </div>

        <div style="width: 80%; display: flex; justify-content: space-between; margin-bottom: 8px;">
            <div style="display: flex; align-items: center;">
                <label for="company" style="font-weight: normal;">운영사</label>
            </div>
            <div style="width: 40%;">
                <select id="company" name="company" style="width: 100%;">
                    <option value="">전체</option>
                    <c:forEach var="operator" items="${operators}">
                        <option value="<c:out value='${operator}'/>"><c:out value='${operator}'/></option>
                    </c:forEach>
                </select>
            </div>
        </div>

        <div style="width: 80%; display: flex; justify-content: space-between; margin-bottom: 8px; position: relative;">
            <input type="text" style="width: 50%;" class="form-control searchList datepicker" name="startSearchDt" id="startSearchDt2" placeholder="시작일을 선택해주세요.">
            <input type="text" style="width: 50%;" class="form-control searchList datepicker" name="endSearchDt" id="endSearchDt2" placeholder="종료일을 선택해주세요.">
        </div>

        <button type="button" style="width: 80%; color: white; background-color: #595959; border:none; padding: 8px;">조회</button>
    </form>
</div>--%>

<script type="text/javascript">
    jQuery(document).ready(function () {

        $(".datepicker").datepicker({
            format: "yy-mm-dd"
            ,autoclose: true
            ,language: "ko"
            ,todayBtn: "linked"
            ,clearBtn: true
        });

        // 디폴트로 쓸 날짜 가져오기
        var currentDate = new Date();
        var previousMonthDate = new Date(currentDate);
        // previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
        previousMonthDate.setFullYear(previousMonthDate.getFullYear() - 1);

        $("#startSearchDt2").datepicker("setDate", previousMonthDate);
        $("#endSearchDt2").datepicker("setDate", currentDate);

        $('#pmAcc button').bind('click', function(event) {
            NamuLayer.removeLayer("cluster", "search_cluster");
            NamuLayer.removeTooltipAll("accPOI");

            var dataObj = {};
            var formatString = 'YYYY-MM-DD HH:mm:ss';
            var genderEng = $("#gender").val();

            dataObj.accType = $("#accType").val();
            dataObj.location = $("#accLoc").val();
            dataObj.pmKind = $("#pmKind").val();
            dataObj.age = $("#age").val();
            dataObj.gender = $("#gender").val();
            dataObj.company = $("#company").val();
            dataObj.startSearchDt = $("#startSearchDt2").datepicker("getDate") ? moment($("#startSearchDt2").datepicker("getDate")).startOf('day').format(formatString) : "";
            dataObj.endSearchDt = $("#endSearchDt2").datepicker("getDate") ? moment($("#endSearchDt2").datepicker("getDate")).startOf('day').format(formatString) : "";

            if (dataObj.startSearchDt == "" || dataObj.endSearchDt == "") {
                alert("사고정보 시작일/종료일을 확인하세요");
                $("input[name='startSearchDt']").focus();
                return;
            }

            if (moment(dataObj.startSearchDt).isAfter(dataObj.endSearchDt)) {
                alert("시작일이 종료일을 넘었습니다.");
                $("input[name='startSearchDt']").focus();
                return;
            }

            // if (genderEng) {
            //     if (genderEng === 'man') {
            //         dataObj.gender = '남자';
            //     } else if (genderEng === 'woman') {
            //         dataObj.gender = '여자';
            //     }
            // } else {
            //     dataObj.gender = "";
            // }

            $.ajax({
                headers: {
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                },
                type: "POST",
                url: "/pm/accident/getOverallAccidentList.json",
                data: $.param(dataObj),
                dataType: "json",
                success: function (result) {
                    (async () => {
                        await NamuLayer.showGisPopup(result.list.length);

                        if (result.list.length > 0) {
                            NamuLayer.pmAccPoiSearch(result.list);
                        }
                    })();
                }, error: function (error) {
                    alert('사고 정보 조회에 실패했습니다.\n해당 문제가 지속될 경우 관리자에게 문의하여 주십시요.');
                    console.log(error.code);
                }
            });
        });
    });

</script>

var datatable;
var duplicateCost;

$(document).ready(function () {
    // 매입요금 정보 테이블
    datatable = $("#datatable").DataTable({
        "searching": false
        , "paging": true
        , "bPaginate": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/cost/list.json"
            , "method": "POST"
            , "data": function(d) {
                if($('#operIdLike').val() != "") {d.operIdLike = $('#operIdLike').val();}
                if($('#trmnlIdLike').val() != "") {d.trmnlIdLike = $('#trmnlIdLike').val();}
                if($('#bcncIdLike').val() != "") {d.bcncIdLike = $('#bcncIdLike').val();}
                if($('#startSearchDt').val() != "") {d.startSearchDt = $('#startSearchDt').val();}
                if($('#endSearchDt').val() != "") {d.endSearchDt = $('#endSearchDt').val();}
                d.insttCd = $('#insttCd').val();
            }
            , "error" : function(xhr, status, err) {
                dataTablesError(xhr);
            }
        }, "processing": true
        , "serverSide": true
        , "order": [[4, 'desc']]
        , "columns": [
            { "name" : "OPER_NM", "title" : "운영기관", "data" : "operNm", "className" : "dt-head-center", "orderable" : false },
            { "name" : "ESS_NM", "title" : "ESS명", "data" : "essNm", "className" : "dt-head-center", "orderable" : false },
            { "name" : "ESS_TRMNL_NO", "title" : "단말기번호", "data" : "essTrmnlNo", "className" : "dt-head-center", "orderable" : false },
            { "name" : "BCNC_NM", "title" : "거래처명", "data" : "bcncNm", "className" : "dt-head-center", "orderable" : false },
            { "name" : "TRMNL_DALY_ID", "title" : "일자", "render" :
                    function (data, type, row) {
                        return userService.strToYmd(row["trmnlDalyId"], '.');
                    }, "className" : "dt-head-center" },
            { "name" : "DALY_PWR", "title" : "일 전력량", "data" : "dalyPwr", "className" : "dt-head-center" },
            { "name" : "ACM_PWR_TOT", "title" : "누계 전력량", "data" : "acmPwrTot", "className" : "dt-head-center" },
            { "name" : "DELNG_CHRGE", "title" : "거래요금", "render" :
                function (data, type, row) {
                    return userService.strToPrice(row["delngChrge"]);
                }, "className" : "dt-head-center" },
            { "render" :
                function (data, type, row) {
                    var html = "";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='수정' onclick='showUpdateModal(\"" + row["trmnlDalyId"] + "\", \"" + row["essTrmnlId"] + "\")'><i class='material-icons'>create</i></button>&nbsp;";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='삭제' onclick='del(\"" + row["trmnlDalyId"] + "\", \"" + row["essTrmnlId"] + "\")'><i class='material-icons'>delete</i></button>";
                    return html;
                }, "title" : "기능", "className" : "dt-head-center", "orderable" : false
            }
        ]
        , "scrollX": "100%"
        , "columnDefs": [
            { "targets": [0], width: "100px" }
            , { "targets": [1], width: "100px" }
            , { "targets": [2], width: "100px" }
            , { "targets": [3], width: "100px" }
            , { "targets": [4], width: "100px" }
            , { "targets": [5], width: "100px" }
            , { "targets": [6], width: "100px" }
            , { "targets": [7], width: "100px" }
            , { "targets": [8], width: "100px" }
        ]
        , "fnRowCallback" : function(nRow, aData, iDisplayIndex) {
            $( window ).trigger('resize');
        }
    });

    // 검색조건 : 검색버튼 클릭 이벤트
    $("#searchBtn").on("click", function() {
        datatable.ajax.reload();
    });

    $(".searchList").change(function() {
        datatable.ajax.reload();
    });

    $(".searchWord").keyup(function(e) {
        if(e.keyCode == 13)
            datatable.ajax.reload();
    });

    // 검색조건 : 리셋버튼 클릭 이벤트
    $("#resetBtn").on("click", function() {
        $("#operIdLike").val("");
        $("#trmnlIdLike").val("");
        $("#bcncIdLike").val("");
        $('.selectpicker').selectpicker("refresh")
        $("#startSearchDt").val("");
        $("#endSearchDt").val("");
        datatable.ajax.reload();
    });

    $("#showInsertModal").on("click", function() {
        $("#essTrmnlNo").hide();
        $("#essTrmnlId").selectpicker("show");
        $("#dalyIdStr").hide();
        $("#trmnlDalyId").show();

        $("#essTrmnlNo").val("");
        $("#essTrmnlId").val("");
        $("#essTrmnlId option:eq(0)").hide();
        $("#essTrmnlId").selectpicker("refresh");
        $("#dalyPwr").val("");
        $("#acmPwrTot").val("");
        $("#dalyIdStr").val("");
        $("#trmnlDalyId").val("");
        $("#delngChrge").val("");

        $("#func-modal-title").html("등록");
        $('.func-modal').modal("show");
    });

    $("#essTrmnlId").on("change", function() {
        duplicate();
    });

    $("#trmnlDalyId").on("change", function() {
        duplicate();
    });

    $("#saveBtn").on("click", function() {
        var form = document.funcForm;
        if(form.essTrmnlId.value == "") {
            alert("ESS 단말기를 선택해주세요.");
            $("#essTrmnlId").selectpicker("toggle");
        } else if(form.dalyPwr.value == "") {
            alert("하루 전력량을 입력해주세요.");
            form.dalyPwr.focus();
        } else if(form.acmPwrTot.value == "") {
            alert("측정한 누계전력량을 입력해주세요.");
            form.acmPwrTot.focus();
        } else if(form.trmnlDalyId.value == "") {
            alert("검측한 일자를 선택해주세요.");
            form.trmnlDalyId.focus();
        } else if(!duplicateCost) {
            alert("선택한 ESS 단말기에 해당 일자가 존재합니다. 변경바랍니다.");
            form.trmnlDalyId.focus();
        } else if(form.delngChrge.value == "") {
            alert("해당 일자의 거래요금을 입력해주세요.");
            form.delngChrge.focus();
        } else {
            if(form.essTrmnlNo.value == "") {
                if(confirm("등록하시겠습니까?")) {
                    $.ajax({
                        url: "/system/cost/insert.json",
                        type: "POST",
                        data: {
                            "essTrmnlId": form.essTrmnlId.value,
                            "dalyPwr": form.dalyPwr.value,
                            "acmPwrTot": form.acmPwrTot.value,
                            "trmnlDalyId": form.trmnlDalyId.value,
                            "delngChrge": form.delngChrge.value
                        },
                        dataType: "json",
                        success: function (res) {
                            if ("success" == res.result) {
                                alert("등록되었습니다.");
                                $('.func-modal').modal("hide");
                                datatable.ajax.reload();
                            } else {
                                alert(res.message);
                            }
                        }
                    });
                }
            } else {
                if(confirm("수정하시겠습니까?")) {
                    $.ajax({
                        url: "/system/cost/update.json",
                        type: "POST",
                        data: {
                            "essTrmnlId": form.essTrmnlId.value,
                            "dalyPwr": form.dalyPwr.value,
                            "acmPwrTot": form.acmPwrTot.value,
                            "trmnlDalyId": form.trmnlDalyId.value,
                            "delngChrge": form.delngChrge.value
                        },
                        dataType: "json",
                        success: function (res) {
                            if ("success" == res.result) {
                                alert("수정되었습니다.");
                                $('.func-modal').modal("hide");
                                datatable.ajax.reload();
                            } else {
                                alert(res.message);
                            }
                        }
                    });
                }
            }
        }
    });

})

function showUpdateModal(trmnlDalyId, essTrmnlId) {
    duplicateCost = true;
    $.ajax({
        url: "/system/cost/select.json",
        type: "POST",
        data: {
            trmnlDalyId : trmnlDalyId,
            essTrmnlId : essTrmnlId
        },
        success: function (res) {
            if(res.result == "success") {
                var data = res.data;
                $("#essTrmnlNo").show();
                $("#essTrmnlId").selectpicker("hide");
                $("#dalyIdStr").show();
                $("#trmnlDalyId").hide();

                $("#essTrmnlNo").val(data.essTrmnlNo);
                $("#essTrmnlId").val(essTrmnlId);
                $("#dalyPwr").val(data.dalyPwr);
                $("#acmPwrTot").val(data.acmPwrTot);
                $("#dalyIdStr").val(userService.strToYmd(data.trmnlDalyId, '-'));
                $("#trmnlDalyId").val(data.trmnlDalyId);
                $("#delngChrge").val(data.delngChrge);

                $("#func-modal-title").html("수정")
                $('.func-modal').modal("show");
            } else {
                alert(res.message);
            }
        }
    });
}

function del(trmnlDalyId, essTrmnlId) {
    if(confirm("삭제하시겠습니까?")) {
        $.ajax({
            url: "/system/cost/delete.json",
            type: "POST",
            data: {
                trmnlDalyId : trmnlDalyId,
                essTrmnlId : essTrmnlId
            },
            dataType: 'json',
            success: function (res) {
                if(res.result == "success") {
                    alert("삭제되었습니다.");
                    datatable.ajax.reload();
                } else {
                    alert(res.message);
                }
            }
        });
    }
}

function duplicate() {
    $.ajax({
        url: "/system/deal/duplicateDeal.json",
        type: "POST",
        data: {
            trmnlDalyId: $("#trmnlDalyId").val(),
            essTrmnlId: $("#essTrmnlId").val()
        },
        dataType: 'json',
        success: function (res) {
            if (res.result == "success") {
                if (res.data != 0) {
                    duplicateCost = false;
                } else {
                    duplicateCost = true;
                }
            } else {
                alert(res.message);
            }
        }
    })
}

// 검측일자 : datepicker 설정(오늘까지 선택가능하도록)
$(function() {
    $('#trmnlDalyId').datepicker({
        format: "yyyy-mm-dd",   // 데이터 포맷 형식(yyyy : 년, mm : 월, dd : 일 )
        endDate: '0d',       // 달력에서 선택 할 수 있는 가장 나중 날짜. 이후으로는 선택 불가능 ( d : 일 m : 달 y : 년 w : 주)
        autoclose : true,	    // 사용자가 날짜를 클릭하면 자동 캘린더가 닫히는 옵션
        todayHighlight : true,	// 오늘 날짜에 하이라이팅 기능 기본값 :false
        language : "ko"	        // 달력의 언어 선택, 그에 맞는 js로 교체해줘야한다.
    });
});
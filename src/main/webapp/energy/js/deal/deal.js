var datatable;
var histDatatable;
var duplicateDeal;

$(document).ready(function () {
    // 매입량 정보 테이블
    datatable = $("#datatable").DataTable({
        "searching": false
        , "paging": true
        , "bPaginate": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/deal/list.json"
            , "method": "POST"
            , "data": function(d) {
                if($('#essIdLike').val() != "") {d.essIdLike = $('#essIdLike').val();}
                if($('#trmnlIdLike').val() != "") {d.trmnlIdLike = $('#trmnlIdLike').val();}
                if($('#bcncNmLike').val() != "") {d.bcncNmLike = $('#bcncNmLike').val();}
                if($('#startSearchDt').val() != "") {d.startSearchDt = $('#startSearchDt').val();}
                if($('#endSearchDt').val() != "") {d.endSearchDt = $('#endSearchDt').val();}
                d.insttCd = $('#insttCd').val();
            }
            , "error" : function(xhr, status, err) {
                dataTablesError(xhr);
            }
        }, "processing": true
        , "serverSide": true
        , "order": [[0, 'desc']]
        , "columns": [
            { "name" : "TRMNL_DALY_ID", "title" : "일자", "render" :
                function (data, type, row) {
                    return userService.strToYmd(row["trmnlDalyId"], '.');
                }, "className" : "dt-head-center" },
            { "name" : "ESS_NM", "title" : "ESS 정보", "render" :
                function (data, type, row) {
                    var essInfo = row["essNm"]+"("+row["operNm"]+")";
                    return essInfo;
                }, "className" : "dt-head-center", "orderable" : false },
            { "name" : "ESS_TRMNL_NO", "title" : "단말기번호", "data" : "essTrmnlNo", "className" : "dt-head-center", "orderable" : false },
            { "name" : "BCNC_NM", "title" : "거래처명", "data" : "bcncNm", "className" : "dt-head-center", "orderable" : false },
            { "name" : "DALY_PWR", "title" : "일 전력량", "data" : "dalyPwr", "className" : "dt-head-center" },
            { "name" : "ACM_PWR_TOT", "title" : "누계 전력량", "data" : "acmPwrTot", "className" : "dt-head-center" },
            { "render" :
                function (data, type, row) {
                    var html = "";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='수정' onclick='showUpdateModal(\"" + row["trmnlDalyId"] + "\", \"" + row["essTrmnlId"] + "\")'><i class='material-icons'>create</i></button>&nbsp;";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='변경이력' onclick='showHistModal(\"" + row["trmnlDalyId"] + "\", \"" + row["essTrmnlId"] + "\", \"" + row["essNm"] + "\", \"" + row["operNm"] + "\", \"" + row["essTrmnlNo"] + "\", \"" + row["bcncNm"] + "\")'><i class='material-icons'>list</i></button>&nbsp;";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='삭제' onclick='del(\"" + row["trmnlDalyId"] + "\", \"" + row["essTrmnlId"] + "\")'><i class='material-icons'>delete</i></button>";
                    return html;
                }, "title" : "기능", "className" : "dt-head-center", "orderable" : false
            }
        ]
        , "scrollX": "100%"
        , "columnDefs": [
            { "targets": [0], width: "100px" }
            , { "targets": [1], width: "150px" }
            , { "targets": [2], width: "100px" }
            , { "targets": [3], width: "100px" }
            , { "targets": [4], width: "100px" }
            , { "targets": [5], width: "100px" }
            , { "targets": [6], width: "100px" }
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
        $("#essIdLike").val("");
        $("#essIdLike").selectpicker("refresh");
        $("#trmnlIdLike").val("");
        $("#trmnlIdLike").selectpicker("refresh");
        $("#bcncNmLike").val("");
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
        } else if(!duplicateDeal) {
            alert("선택한 ESS 단말기에 해당 일자가 존재합니다. 변경바랍니다.");
            form.trmnlDalyId.focus();
        } else {
            if(form.essTrmnlNo.value == "") {
                if(confirm("등록하시겠습니까?")) {
                    $.ajax({
                        url: "/system/deal/insert.json",
                        type: "POST",
                        data: {
                            "essTrmnlId": form.essTrmnlId.value,
                            "dalyPwr": form.dalyPwr.value,
                            "acmPwrTot": form.acmPwrTot.value,
                            "trmnlDalyId": form.trmnlDalyId.value
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
                        url: "/system/deal/update.json",
                        type: "POST",
                        data: {
                            "essTrmnlId": form.essTrmnlId.value,
                            "dalyPwr": form.dalyPwr.value,
                            "acmPwrTot": form.acmPwrTot.value,
                            "trmnlDalyId": form.trmnlDalyId.value
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
    duplicateDeal = true;
    $.ajax({
        url: "/system/deal/select.json",
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

                $("#func-modal-title").html("수정")
                $('.func-modal').modal("show");
            } else {
                alert(res.message);
            }
        }
    });
}

function showHistModal(trmnlDalyId, essTrmnlId, essNm, operNm, essTrmnlNo, bcncNm) {
    $('#trmnlDalyIdInfo').val(userService.strToYmd(trmnlDalyId, '.'));
    $('#essInfo').val(essNm+"("+operNm+")");
    $('#essTrmnlNoInfo').val(essTrmnlNo);
    $('#bcncNmInfo').val(bcncNm);
    // 변경이력 정보 테이블
    histDatatable = $("#histDatatable").DataTable({
        "searching": false
        , "destroy": true
        , "paging": true
        , "bPaginate": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/deal/hist.json"
            , "method": "POST"
            , "data": function(d) {
                d.histTbNm = "EC_ESS_TRMNL_DALY";
                d.trmnlDalyId = trmnlDalyId;
                d.essTrmnlId = essTrmnlId;
            }
            , "error" : function(xhr, status, err) {
                dataTablesError(xhr);
            }
        }, "processing": true
        , "serverSide": true
        , "ordering": false
        , "columns": [
            { "name" : "DALY_PWR", "title" : "일 전력량", "data" : "dalyPwr", "className" : "dt-head-center" },
            { "name" : "ACM_PWR_TOT", "title" : "누계 전력량", "data" : "acmPwrTot", "className" : "dt-head-center" },
            { "name" : "REG_NM", "title" : "수정인", "data" : "regNm", "className" : "dt-head-center"},
            { "name" : "REG_DT", "title" : "수정일시", "render" :
                function (data, type, row) {
                    return userService.toStdDate(row["regDt"]);
                }, "className" : "dt-head-center" }
        ]
        , "scrollX": "100%"
        , "columnDefs": [
            { "targets": [0], width: "100px" }
            , { "targets": [1], width: "100px" }
            , { "targets": [2], width: "100px" }
            , { "targets": [3], width: "180px" }
        ]
        , "fnRowCallback" : function(nRow, aData, iDisplayIndex) {
            $( window ).trigger('resize');
        }
        , "fnDrawCallback" : function() {
            $('.hist-modal').modal("show");
        }
    });
}

function del(trmnlDalyId, essTrmnlId) {
    if(confirm("삭제하시겠습니까?")) {
        $.ajax({
            url: "/system/deal/delete.json",
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
                    duplicateDeal = false;
                } else {
                    duplicateDeal = true;
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
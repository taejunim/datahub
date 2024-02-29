var datatable;
var trmnlDatatable;
var setleDatatable;

$(document).ready(function () {
    // 단말기별 결제일 정보 테이블
    datatable = $("#datatable").DataTable({
        "searching": false
        , "paging": true
        , "bPaginate": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/clcSetle/bcncList.json"
            , "method": "POST"
            , "data": function(d) {
                if($('#bcncIdLike').val() != "") {d.bcncIdLike = $('#bcncIdLike').val();}
                if($('#operIdLike').val() != "") {d.operIdLike = $('#operIdLike').val();}
            }
            , "error" : function(xhr, status, err) {
                dataTablesError(xhr);
            }
        }, "processing": true
        , "serverSide": true
        , "ordering": false
        , "columns": [
            { "name" : "BCNC_NM", "title" : "거래처", "data" : "bcncNm", "className" : "dt-head-center" },
            { "name" : "OPER_NM", "title" : "운영기관", "data" : "operNm", "className" : "dt-head-center" },
            { "name" : "SETLE_DAY", "title" : "결제일", "render" :
                function (data, type, row) {
                    if(row["setleDay"] != null) { return row["setleDay"] + "일"; } else { return "-"; }
                }, "className" : "dt-head-center", "orderable" : false },
            { "name" : "CLC_BGN_MT", "title" : "거래기간", "render" :
                function (data, type, row) {
                    if(row["clcBgnMt"] != null) {
                        var startDt = userService.monthToStr(row["clcBgnMt"]) + userService.dayToStr(row["clcBgnDay"]) + "일";
                        var endDt = userService.monthToStr(row["clcEndMt"]) + userService.dayToStr(row["clcEndDay"]) + "일";
                        return startDt + " ~ " + endDt;
                    } else {
                        return "결제일을 설정해주세요.";
                    }
                }, "className" : "dt-head-center", "orderable" : false},
            { "render" :
                function (data, type, row) {
                    var html = "";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='결제일설정' onclick='showUpdateModal(\"" + row["operId"] + "\", \"" + row["bcncId"] + "\", \"" + row["clcSetleId"] + "\")'><i class='material-icons'>list</i></button>";
                    return html;
                }, "title" : "기능", "className" : "dt-head-center", "orderable" : false
            }
        ]
        , "scrollX": "100%"
        , "columnDefs": [
            { "targets": [0], width: "100px" }
            , { "targets": [1], width: "100px" }
            , { "targets": [2], width: "100px" }
            , { "targets": [3], width: "200px" }
            , { "targets": [4], width: "100px" }
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
        $("#bcncIdLike").val("");
        $("#bcncIdLike").selectpicker("refresh");
        $("#operIdLike").val("");
        $("#operIdLike").selectpicker("refresh");
        datatable.ajax.reload();
    });

})

function showUpdateModal(operId, bcncId, clcSetleId) {
    trmnlDatatable = $("#trmnlDatatable").DataTable({
        "searching": false
        , "paging": true
        , "destroy" : true
        , "bPaginate": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/eqp/essTrmnl.json"
            , "method": "POST"
            , "data": function(d) {
                d.bcncIdLike = bcncId;
                d.operIdLike = operId;
            }
            , "error" : function(xhr, status, err) {
                dataTablesError(xhr);
            }
        }, "processing": true
        , "serverSide": true
        , "ordering": false
        , "columns": [
            { "name" : "ESS_TRMNL_NO", "title" : "ESS단말기번호", "data" : "essTrmnlNo", "className" : "dt-head-center" },
            { "name" : "BCNC_NM", "title" : "거래처명", "data" : "bcncNm", "className" : "dt-head-center" },
            { "name" : "ESS_NM", "title" : "ESS명", "data" : "essNm", "className" : "dt-head-center" },
            { "name" : "OPER_NM", "title" : "운영기관", "data" : "operNm", "className" : "dt-head-center" },
            { "name" : "USE_PRPS", "title" : "사용목적", "data" : "usePrps", "className" : "dt-head-center" },
        ]
        , "scrollX": "100%"
        , "columnDefs": [
            { "targets": [0], width: "110px" }
            , { "targets": [1], width: "100px" }
            , { "targets": [2], width: "100px" }
            , { "targets": [3], width: "100px" }
            , { "targets": [4], width: "100px" }
        ]
        , "fnRowCallback" : function(nRow, aData, iDisplayIndex) {
            $( window ).trigger('resize');
        }
    });
    // 운영기관 정산 결제일 목록
    setleDatatable = $("#setleDatatable").DataTable({
        "searching": false
        , "paging": true
        , "destroy" : true
        , "bPaginate": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/clcSetle/list.json"
            , "method": "POST"
            , "data": function(d) {
                d.operIdLike = operId
            }
            , "error" : function(xhr, status, err) {
                dataTablesError(xhr);
            }
        }, "processing": true
        , "serverSide": true
        , "ordering": false
        , "columns": [
            { "name" : "OPER_NM", "title" : "운영기관", "data" : "operNm", "className" : "dt-head-center" },
            { "name" : "SETLE_DAY", "title" : "결제일", "render" :
                function (data, type, row) {
                    return row["setleDay"] + "일";
                }, "className" : "dt-head-center" },
            { "name" : "CLC_BGN_MT", "title" : "거래기간", "render" :
                function (data, type, row) {
                    var startDt = userService.monthToStr(row["clcBgnMt"]) + userService.dayToStr(row["clcBgnDay"]) + "일";
                    var endDt = userService.monthToStr(row["clcEndMt"]) + userService.dayToStr(row["clcEndDay"]) + "일";
                    return startDt + " ~ " + endDt;
                }, "className" : "dt-head-center" },
            { "render" :
                function (data, type, row) {
                    var html = "";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='변경' onclick='setleSelect(\"" + row["operId"] + "\", \"" + row["clcSetleId"] + "\", \"" + row["setleDay"] + "\", " + bcncId+ ")'";
                    if(clcSetleId == row["clcSetleId"]){
                        html += " disabled='disabled'";
                    }
                    html += "><i class='material-icons'>check</i></button>&nbsp;";
                    return html;
                }, "title" : "설정", "className" : "dt-head-center", "orderable" : false
            }
        ]
        , "scrollX": "100%"
        , "columnDefs": [
            { "targets": [0], width: "100px" }
            , { "targets": [1], width: "80px" }
            , { "targets": [2], width: "200px" }
            , { "targets": [3], width: "50px" }
        ]
        , "fnRowCallback" : function(nRow, aData, iDisplayIndex) {
            $( window ).trigger('resize');
        }
    });
    $("#func-modal-title").html("결제일 설정")
    $('.func-modal').modal("show");
}

function setleSelect(operId, clcSetleId, setleDay, bcncId) {
    if(confirm("결제일을 " + setleDt + "일로 설정하시겠습니까?")) {
        $.ajax({
            url: "/system/clcSetle/bcncInsert.json",
            type: "POST",
            data: {
                operId : operId,
                clcSetleId : clcSetleId,
                bcncId : bcncId
            },
            success: function (res) {
                if(res.result == "success") {
                    alert("설정되었습니다. 설정된 결제일은 다음달부터 적용됩니다.");
                    $('.func-modal').modal("hide");
                    datatable.ajax.reload();
                } else {
                    alert(res.message);
                }
            }
        });
    }
}

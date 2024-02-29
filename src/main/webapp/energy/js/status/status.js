var datatable;
var detailDatatable;

$(document).ready(function () {
    // 일일 거래량 정보 테이블
    datatable = $("#datatable").DataTable({
        "searching": false
        , "paging": true
        , "bPaginate": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/status/deal.json"
            , "method": "POST"
            , "data": function(d) {
                if($('#insttCdLike').val() != "") {d.insttCdLike = $('#insttCdLike').val();}
                if($('#startSearchDt').val() != "") {d.startSearchDt = $('#startSearchDt').val();}
                if($('#endSearchDt').val() != "") {d.endSearchDt = $('#endSearchDt').val();}
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
            { "name" : "INSTT_CD", "title" : "거래구분", "render" :
                function (data, type, row) {
                    if(row["insttCd"] == "BCNC_SUPPLY") {
                        return "매입";
                    } else if(row["insttCd"] == "BCNC_DEMAND") {
                        return "판매";
                    }
                }, "className" : "dt-head-center", "orderable": false },
            { "name" : "DEAL_COUNT", "title" : "건수", "data" : "dealCount", "className" : "dt-head-center", "orderable": false },
            { "name" : "DEAL_AMT", "title" : "일일 거래량", "data" : "dealAmt", "className" : "dt-head-center", "orderable": false },
            { "render" :
                function (data, type, row) {
                    var html = "";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='상세보기' onclick='showDetailModal(\"" + row["insttCd"] + "\", \"" + row["trmnlDalyId"] + "\", \"" + row["dealCount"] + "\", \"" + row["dealAmt"] + "\")'><i class='material-icons'>list</i></button>";
                    return html;
                }, "title" : "기능", "className" : "dt-head-center", "orderable" : false
            }
        ]
        , "scrollX": "100%"
        , "columnDefs": [
            { "targets": [0], width: "120px" }
            , { "targets": [1], width: "100px" }
            , { "targets": [2], width: "100px" }
            , { "targets": [3], width: "120px" }
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
        $("#insttCdLike").val("");
        $("#insttCdLike").selectpicker("refresh");
        $("#startSearchDt").val("");
        $("#endSearchDt").val("");
        datatable.ajax.reload();
    });

})

function showDetailModal(insttCd, trmnlDalyId, dealCount, dealAmt) {
    if(insttCd == "BCNC_SUPPLY") {
        $('#insttCdInfo').val("매입");
    } else if(insttCd == "BCNC_DEMAND") {
        $('#insttCdInfo').val("판매");
    }
    $('#trmnlDalyIdInfo').val(userService.strToYmd(trmnlDalyId, '.'));
    $('#dealCountInfo').val(dealCount);
    $('#dealAmtInfo').val(dealAmt);
    // 상세 정보 테이블
    detailDatatable = $("#detailDatatable").DataTable({
        "searching": false
        , "destroy": true
        , "paging": true
        , "bPaginate": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/deal/list.json"
            , "method": "POST"
            , "data": function(d) {
                d.insttCd = insttCd;
                d.trmnlDalyId = trmnlDalyId;
            }
            , "error" : function(xhr, status, err) {
                dataTablesError(xhr);
            }
        }, "processing": true
        , "serverSide": true
        , "ordering": false
        , "columns": [
            { "name" : "TRMNL_DALY_ID", "title" : "일자", "render" :
                function (data, type, row) {
                    return userService.strToYmd(row["trmnlDalyId"], '.');
                }, "className" : "dt-head-center" },
            { "name" : "ESS_NM", "title" : "ESS 정보", "render" :
                function (data, type, row) {
                    var essInfo = row["essNm"]+"("+row["operNm"]+")";
                    return essInfo;
                }, "className" : "dt-head-center" },
            { "name" : "ESS_TRMNL_NO", "title" : "단말기번호", "data" : "essTrmnlNo", "className" : "dt-head-center" },
            { "name" : "BCNC_NM", "title" : "거래처명", "data" : "bcncNm", "className" : "dt-head-center" },
            { "name" : "DALY_PWR", "title" : "일 전력량", "render" :
                function (data, type, row) {
                    return row["dalyPwr"] + " kWh";
                }, "className" : "dt-head-center" }
        ]
        , "scrollX": "100%"
        , "columnDefs": [
            { "targets": [0], width: "100px" }
            , { "targets": [1], width: "120px" }
            , { "targets": [2], width: "120px" }
            , { "targets": [3], width: "100px" }
            , { "targets": [4], width: "100px" }
        ]
        , "fnRowCallback" : function(nRow, aData, iDisplayIndex) {
            $( window ).trigger('resize');
        }
        ,  "fnDrawCallback" : function() {
            $('.detail-modal').modal("show");
        }
    });
}

var datatable;
var detailDatatable;

$(document).ready(function () {
    // 청구 정보 테이블
    datatable = $("#datatable").DataTable({
        "searching": false
        , "paging": true
        , "bPaginate": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/bill/list.json"
            , "method": "POST"
            , "data": function (d) {
                if ($('#bcncIdLike').val() != "") { d.bcncIdLike = $('#bcncIdLike').val(); }
                if ($('#operIdLike').val() != "") { d.operIdLike = $('#operIdLike').val(); }
            }
            ,"error" : function(xhr, status, err) {
                dataTablesError(xhr);
            }
        }, "processing": true
        , "serverSide": true
        , "order": [[2, 'desc']]
        , "columns": [
            { "name": "BCNC_NM", "title": "거래처", "data": "bcncNm", "className": "dt-head-center", "orderable" : false },
            { "name": "OPER_NM", "title": "운영기관", "data": "operNm", "className": "dt-head-center", "orderable" : false },
            { "name": "SETLE_DT", "title": "결제일", "render":
                function (data, type, row) { return userService.strToYmd(row["setleDt"], '.'); }
                , "className": "dt-head-center"
            },
            { "name": "CLC_BGN_DT", "title": "정산시작일", "render":
                function (data, type, row) { return userService.strToYmd(row["clcBgnDt"], '.'); }
                , "className": "dt-head-center"
            },
            { "name": "CLC_END_DT", "title": "정산종료일", "render":
                    function (data, type, row) { return userService.strToYmd(row["clcEndDt"], '.'); }
                , "className": "dt-head-center"
            },
            { "name": "USE_PWR_TOT", "title": "총사용전력량", "data": "usePwrTot", "className": "dt-head-center"},
            { "name": "CLCPRC_TOT", "title": "총청구금액", "render":
                function (data, type, row) { return userService.strToPrice(row["clcprcTot"]); }
                , "className": "dt-head-center"},
            { "render":
                function (data, type, row) {
                    var html = "";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='청구내역' onclick='showDetailModal(\"" + row["mtclcId"] + "\")'><i class='material-icons'>list</i></button>";
                    return html;
                }, "title": "기능", "className": "dt-head-center"
            }
        ]
        , "scrollX": "100%"
        , "columnDefs": [
            {"targets": [0], width: "100px"}
            , {"targets": [1], width: "100px"}
            , {"targets": [2], width: "100px"}
            , {"targets": [3], width: "100px"}
            , {"targets": [4], width: "100px"}
            , {"targets": [5], width: "100px"}
            , {"targets": [6], width: "100px"}
            , {"targets": [7], width: "100px"}
        ]
        , "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            $(window).trigger('resize');
        }
    });

    // 검색조건 : 검색버튼 클릭 이벤트
    $("#searchBtn").on("click", function () {
        datatable.ajax.reload();
    });

    $(".searchList").change(function () {
        datatable.ajax.reload();
    });

    $(".searchWord").keyup(function (e) {
        if (e.keyCode == 13)
            datatable.ajax.reload();
    });

    // 검색조건 : 리셋버튼 클릭 이벤트
    $("#resetBtn").on("click", function () {
        $("#bcncIdLike").val("");
        $("#bcncIdLike").selectpicker("refresh");
        $("#operIdLike").val("");
        $("#operIdLike").selectpicker("refresh");
        datatable.ajax.reload();
    });

})

function showDetailModal(mtclcId) {
    $.ajax({
        url: "/system/bill/select.json",
        type: "POST",
        data: {
            mtclcId : mtclcId
        },
        success: function (res) {
            if(res.result == "success") {
                var data = res.data;
                $("#bcncNmDtl").html(data.bcncNm);
                $("#operNmDtl").html(data.operNm);
                $("#setleDtDtl").html(userService.strToYmd(data.setleDt, '.'));
                let clcBgnDt = userService.strToYmd(data.clcBgnDt,'.');
                let clcEndDt = userService.strToYmd(data.clcEndDt, '.');
                $("#clcDtDtl").html(clcBgnDt + " ~ " + clcEndDt);
                $("#usePwrTotDtl").html(data.usePwrTot + " kWh");
                $("#clcprcTotDtl").html(userService.strToPrice(data.clcprcTot) + "원");

                // 상세정보 테이블
                detailDatatable = $("#detailDatatable").DataTable({
                    "searching": false
                    , "destroy": true
                    , "paging": true
                    , "bPaginate": true
                    , "responsive": true
                    , "language": lang_kor
                    , "ajax": {
                        "url": "/system/cost/list.json"
                        , "method": "POST"
                        , "data": function(d) {
                            d.operIdLike = data.operId;
                            d.bcncIdLike = data.bcncId;
                            d.startSearchDt = data.clcBgnDt;
                            d.endSearchDt = data.clcEndDt;
                        }
                        ,"error" : function(xhr, status, err) {
                            dataTablesError(xhr);
                        }
                    }, "processing": true
                    , "serverSide": true
                    , "order": [[2, 'asc']]
                    , "columns": [
                        { "name" : "ESS_NM", "title" : "ESS명", "data" : "essNm", "className" : "dt-head-center" },
                        { "name" : "ESS_TRMNL_NO", "title" : "단말기번호", "data" : "essTrmnlNo", "className" : "dt-head-center" },
                        { "name" : "TRMNL_DALY_ID", "title" : "일자", "render" :
                            function (data, type, row) {
                                return userService.strToYmd(row["trmnlDalyId"], '.');
                            }, "className" : "dt-head-center" },
                        { "name" : "DALY_PWR", "title" : "일 전력량", "data" : "dalyPwr", "className" : "dt-head-center" },
                        { "name" : "DELNG_CHRGE", "title" : "거래요금", "render" :
                            function (data, type, row) {
                                return userService.strToPrice(row["delngChrge"]);
                            }, "className" : "dt-head-center" },
                    ]
                    , "scrollX": "100%"
                    , "columnDefs": [
                        { "targets": [0], width: "100px" }
                        , { "targets": [1], width: "100px" }
                        , { "targets": [2], width: "100px" }
                        , { "targets": [3], width: "100px" }
                        , { "targets": [4], width: "100px" }
                    ]
                    , "fnRowCallback" : function(nRow, aData, iDisplayIndex) {
                        $( window ).trigger('resize');
                    }
                })
                $('.detail-modal').modal("show");
            } else {
                alert(res.message);
            }
        }
    });
}

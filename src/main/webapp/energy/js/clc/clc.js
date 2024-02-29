var datatable;
var detailDatatable;
var setleDatatable;

$(document).ready(function () {
    // 정산 정보 테이블
    datatable = $("#datatable").DataTable({
        "searching": false
        , "paging": true
        , "bPaginate": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/clc/list.json"
            , "method": "POST"
            , "data": function (d) {
                if ($('#bcncIdLike').val() != "") { d.bcncIdLike = $('#bcncIdLike').val(); }
                if ($('#operIdLike').val() != "") { d.operIdLike = $('#operIdLike').val(); }
                d.insttCdLike = $("#insttCdLike").val();
            }
            , "error" : function(xhr, status, err) {
                dataTablesError(xhr);
            }
        }, "processing": true
        , "serverSide": true
        , "order": [[2, 'desc']]
        , "columns": [
            {"name": "MTCLC_ID", "title": "발행번호", "data": "mtclcId", "className": "dt-head-center", "orderable": false },
            {"name": "SETLE_DT", "title": "월정산", "render":
                function (data, type, row) {
                    return row["setleDt"].substring(0, 4) + "년 " + row["setleDt"].substring(3, 2) + "월분";
                }, "className": "dt-head-center", "orderable": false },
            {"name": "SETLE_DT", "title": "결제일", "render":
                function (data, type, row) { return userService.strToYmd(row["setleDt"], '.');
                }, "className": "dt-head-center"},
            {"name": "BCNC_NM", "title": "거래처", "data": "bcncNm", "className": "dt-head-center", "orderable": false },
            {"name": "OPER_NM", "title": "운영기관", "data": "operNm", "className": "dt-head-center", "orderable": false },
            {"name": "USE_PWR_TOT", "title": "총사용전력량", "render": 
                function (data, type, row) { return row["usePwrTot"] + " kWh";
                }, "className": "dt-head-center", "orderable": false },
            {"name": "CLCPRC_TOT", "title": "총정산금액", "render":
                function (data, type, row) { return userService.strToPrice(row["clcprcTot"]) + "원";
                }, "className": "dt-head-center", "orderable": false },
            {"name": "PRO_RSLT_NM", "title": "처리결과", "data": "proRsltNm", "className": "dt-head-center", "orderable": false },
            {"render":
                function (data, type, row) {
                    var html = "";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='정산내역' onclick='showDetailModal(\"" + row["mtclcId"] + "\")'><i class='material-icons'>pageview</i></button>&nbsp;";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='결제정보' onclick='showSetleModal(\"" + row["mtclcId"] + "\")'><i class='material-icons'>create</i></button>&nbsp;";
                    /*html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='이력조회' onclick='showHistModal(\"" + row["mtclcId"] + "\")'><i class='material-icons'>list</i></button>";*/
                    return html;
                }, "title": "기능", "className": "dt-head-center", "orderable": false
            }
        ]
        , "scrollX": "100%"
        , "columnDefs": [
            {"targets": [0], width: "200px"}
            , {"targets": [1], width: "100px"}
            , {"targets": [2], width: "100px"}
            , {"targets": [3], width: "100px"}
            , {"targets": [4], width: "100px"}
            , {"targets": [5], width: "100px"}
            , {"targets": [6], width: "100px"}
            , {"targets": [7], width: "100px"}
            , {"targets": [8], width: "150px"}
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

    $("#saveBtn").on("click", function () {
        var form = document.setleForm;
        if(form.setleDt.value == "") {
            alert("결제일을 선택해주세요.");
            form.setleDt.focus();
        } else if(form.setleNm.value == "") {
            alert("결제자 이름을 입력해주세요.");
            form.setleNm.focus();
        } else if(form.setleAmt.value == "") {
            alert("결제금액을 입력해주세요.");
            form.setleAmt.focus();
        } else {
            if(confirm("입력한 결제내용을 저장하시겠습니까?")){
                $.ajax({
                    url: "/system/clc/setleInsert.json",
                    type: "POST",
                    data: $("#setleForm").serialize(),
                    dataType: "json",
                    success: function (res) {
                        if ("success" == res.result) {
                            alert("저장되었습니다.");
                            $('.setle-modal').modal("hide");
                            datatable.ajax.reload();
                        } else {
                            alert(res.message);
                        }
                    }
                })
            }
        }
    })

})

function showDetailModal(mtclcId) {
    $.ajax({
        url: "/system/clc/select.json",
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
                        , "error" : function(xhr, status, err) {
                            dataTablesError(xhr);
                        }
                    }, "processing": true
                    , "serverSide": true
                    , "order": [[2, 'asc']]
                    , "columns": [
                        { "name" : "ESS_NM", "title" : "ESS명", "data" : "essNm", "className" : "dt-head-center" },
                        { "name" : "ESS_TRMNL_NO", "title" : "단말기번호", "data" : "essTrmnlNo", "className" : "dt-head-center" },
                        { "name" : "TRMNL_DALY_ID", "title" : "일자", "render" :
                            function (data, type, row) { return userService.strToYmd(row["trmnlDalyId"], '.');
                            }, "className" : "dt-head-center" },
                        { "name" : "DALY_PWR", "title" : "일 전력량", "render" :
                            function (data, type, row) { return row["dalyPwr"] + " kWh";
                            }, "className" : "dt-head-center" },
                        { "name" : "DELNG_CHRGE", "title" : "거래요금", "render" :
                            function (data, type, row) { return userService.strToPrice(row["delngChrge"]) + "원";
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
                setleDatatableLoad(mtclcId);

                $('.detail-modal').modal("show");
            } else {
                alert(res.message);
            }
        }
    });
}

function showSetleModal(mtclcId) {
    $("#mtclcId").val(mtclcId);
    $("#setleDt").val("");
    $("#setleNm").val("");
    $("#setleAmt").val("");
    $("#setleMthd").val("");

    $('.setle-modal').modal("show");
}

function showHistModal(mtclcId) {
    alert("개발 예정입니다.");
}

function setleDatatableLoad(mtclcId) {
    // 결제정보 테이블
    setleDatatable = $("#setleDatatable").DataTable({
        "searching": false
        , "destroy": true
        , "paging": true
        , "bPaginate": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/clc/setleSelect.json"
            , "method": "POST"
            , "data": function(d) {
                d.mtclcId = mtclcId;
            }
            , "error" : function(xhr, status, err) {
                dataTablesError(xhr);
            }
        }, "processing": true
        , "serverSide": true
        , "order": [[0, 'asc']]
        , "columns": [
            { "name" : "SETLE_DT", "title" : "결제일자", "render" :
                function (data, type, row) {
                    return userService.strToYmd(row["setleDt"], '.');
                }, "className" : "dt-head-center" },
            { "name" : "SETLE_NM", "title" : "결제자명", "data" : "setleNm", "className" : "dt-head-center" },
            { "name" : "SETLE_AMT", "title" : "결제금액", "render" :
                function (data, type, row) {
                    return userService.strToPrice(row["setleAmt"]) + "원";
                }, "className" : "dt-head-center" },
            { "name" : "SETLE_MTHD", "title" : "결제방식", "data" : "setleMthd", "className" : "dt-head-center" },
        ]
        , "scrollX": "100%"
        , "columnDefs": [
            { "targets": [0], width: "100px" }
            , { "targets": [1], width: "100px" }
            , { "targets": [2], width: "100px" }
            , { "targets": [3], width: "100px" }
        ]
        , "fnRowCallback" : function(nRow, aData, iDisplayIndex) {
            $( window ).trigger('resize');
        }
    })
}
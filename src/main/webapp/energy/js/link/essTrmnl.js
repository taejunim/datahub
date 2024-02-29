var datatable;
var duplicateTrmnlRltmId;

$(document).ready(function () {
    // ESS 단말기 연계 정보 테이블
    datatable = $("#datatable").DataTable({
        "searching": false
        , "paging": true
        , "bPaginate": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/link/essTrmnl.json"
            , "method": "POST"
            , "data": function(d) {
                if($('#essIdLike').val() != "") {d.essIdLike = $('#essIdLike').val();}
                if($('#trmnlNoLike').val() != "") {d.trmnlNoLike = $('#trmnlNoLike').val();}
                if($('#bcncNmLike').val() != "") {d.bcncNmLike = $('#bcncNmLike').val();}
                if($('#startSearchDt').val() != "") {d.startSearchDt = $('#startSearchDt').val();}
                if($('#endSearchDt').val() != "") {d.endSearchDt = $('#endSearchDt').val();}
            }
            , "error" : function(xhr, status, err) {
                dataTablesError(xhr);
            }
        }, "processing": true
        , "serverSide": true
        , "order": [[4, 'desc']]
        , "columns": [
            { "name" : "ESS_ID", "title" : "ESS", "render" :
                function (data, type, row) {
                    return  row["essNm"]+"("+row["operNm"]+")";
                }, "className" : "dt-head-center", "orderable" : false },
            { "name" : "ESS_TRMNL_NO", "title" : "ESS단말기번호", "data" : "essTrmnlNo", "className" : "dt-head-center", "orderable" : false },
            { "name" : "BCNC_NM", "title" : "거래처명", "data" : "bcncNm", "className" : "dt-head-center", "orderable" : false },
            { "name" : "ACM_PWR_TOT", "title" : "누계 전력량", "data" : "acmPwrTot", "className" : "dt-head-center" },
            { "name" : "ESS_TRMNL_RLTM_ID", "title" : "측정일시", "render" :
                function (data, type, row) {
                    return userService.toStdDate(row["essTrmnlRltmId"]);
                }, "className" : "dt-head-center"
            },
            { "render" :
                function (data, type, row) {
                    var html = "";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='수정' onclick='showUpdateModal(\"" + userService.toStdDate(row["essTrmnlRltmId"]) + "\", \"" + row["essTrmnlId"] + "\")'><i class='material-icons'>create</i></button>&nbsp;";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='삭제' onclick='del(\"" + userService.toStdDate(row["essTrmnlRltmId"]) + "\", \"" + row["essTrmnlId"] + "\")'><i class='material-icons'>delete</i></button>";
                    return html;
                }, "title" : "기능", "className" : "dt-head-center", "orderable" : false
            }
        ]
        , "scrollX": "100%"
        , "columnDefs": [
            { "targets": [0], width: "150px" }
            , { "targets": [1], width: "110px" }
            , { "targets": [2], width: "100px" }
            , { "targets": [3], width: "100px" }
            , { "targets": [4], width: "180px" }
            , { "targets": [5], width: "100px" }
        ]
        , "fnRowCallback" : function(nRow, aData, iDisplayIndex) {
            $( window ).trigger('resize');
        }
    });

    // 검색조건 : 검색버튼 클릭 이벤트
    $("#searchBtn").on("click", function() {
        if($("#startSearchDt").val() != "" && $("#endSearchDt").val() != ""){
            if($("#startSearchDt").val() > $("#endSearchDt").val()) {
                alert("종료일을 시작일 이후로 설정해주세요.");
                $("#endSearchDt").focus();
            } else {
                datatable.ajax.reload();
            }
        } else {
            datatable.ajax.reload();
        }
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
        $("#trmnlNoLike").val("");
        $("#bcncNmLike").val("");
        $("#startSearchDt").val("");
        $("#endSearchDt").val("");
        datatable.ajax.reload();
    });

    $("#showInsertModal").on("click", function() {
        $("#essTrmnlRltmId").attr("max", userService.stdToDatetime(new Date()));
        $("#essTrmnlNo").hide();
        $("#essTrmnlId").selectpicker("show");

        $("#essTrmnlRltmIdStr").val("");
        $("#essTrmnlId").val("");
        $("#essTrmnlId option:eq(0)").hide();
        $("#essTrmnlId").selectpicker("refresh");
        $("#acmPwrTot").val("");
        $("#essTrmnlRltmId").val("");

        $("#func-modal-title").html("등록");
        $('.func-modal').modal("show");
    });

    $("#essTrmnlId").on("change", function() {
        duplicate();
    });

    $("#essTrmnlRltmId").on("change", function() {
        duplicate();
    });

    $("#saveBtn").on("click", function() {
        if($("#essTrmnlId").val() == "") {
            alert("ESS 단말기를 선택해주세요.");
            $("#essTrmnlId").selectpicker("toggle");
        } else if($("#acmPwrTot").val() == "") {
            alert("측정한 전력량을 입력해주세요.");
            $("#acmPwrTot").focus();
        } else if($("#essTrmnlRltmId").val() == "") {
            alert("측정일시를 입력해주세요.");
            $("#essTrmnlRltmId").focus();
        } else if($("#essTrmnlRltmId").val() > userService.stdToDatetime(new Date())) {
            alert("현재 일시보다 이전으로 설정해주세요.");
            $("#essTrmnlRltmId").focus();
        } else if(!duplicateTrmnlRltmId) {
            alert("해당 시간에 측정된 값이 존재합니다.");
            $("#essTrmnlRltmId").focus();
        } else {
            if($("#essTrmnlRltmIdStr").val() == "") {
                if(confirm("등록하시겠습니까?")) {
                    $.ajax({
                        url: "/system/link/trmnlInsert.json",
                        type: "POST",
                        data: {
                            essTrmnlRltmIdAf: $("#essTrmnlRltmId").val(),
                            essTrmnlId: $("#essTrmnlId").val(),
                            acmPwrTot: $("#acmPwrTot").val()
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
                        url: "/system/link/trmnlUpdate.json",
                        type: "POST",
                        data: {
                            essTrmnlRltmIdBf: $("#essTrmnlRltmIdStr").val(),
                            essTrmnlRltmIdAf: $("#essTrmnlRltmId").val(),
                            essTrmnlId: $("#essTrmnlId").val(),
                            acmPwrTot: $("#acmPwrTot").val()
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

function showUpdateModal(essTrmnlRltmId, essTrmnlId) {
    $("#essTrmnlRltmId").attr("max", userService.stdToDatetime(new Date()));
    $.ajax({
        url: "/system/link/trmnlSelect.json",
        type: "POST",
        data: {
            essTrmnlRltmIdBf : essTrmnlRltmId,
            essTrmnlId : essTrmnlId
        },
        success: function (res) {
            if(res.result == "success") {
                var data = res.data;
                $("#essTrmnlNo").show();
                $("#essTrmnlId").selectpicker("hide");

                $("#essTrmnlRltmIdStr").val(essTrmnlRltmId);
                $("#essTrmnlNo").val(data.essTrmnlNo);
                $("#essTrmnlId").val(data.essTrmnlId);
                $("#acmPwrTot").val(data.acmPwrTot);
                $("#essTrmnlRltmId").val(userService.stdToDatetime(essTrmnlRltmId));
                duplicate();

                $("#func-modal-title").html("수정")
                $('.func-modal').modal("show");
            } else {
                alert(res.message);
            }
        }
    });
}

function del(essTrmnlRltmId, essTrmnlId) {
    if(confirm("삭제하시겠습니까?")) {
        $.ajax({
            url: "/system/link/trmnlDelete.json",
            type: "POST",
            data: {
                essTrmnlRltmIdBf : essTrmnlRltmId,
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
        url: "/system/link/duplicateTrmnlRltmId.json",
        type: "POST",
        data: {
            essTrmnlId: $("#essTrmnlId").val(),
            essTrmnlRltmIdAf: $("#essTrmnlRltmId").val(),
            essTrmnlRltmIdBf: $("#essTrmnlRltmIdStr").val()
        },
        dataType: 'json',
        success: function (res) {
            if (res.result == "success") {
                if (res.data != 0) {
                    duplicateTrmnlRltmId = false;
                } else {
                    duplicateTrmnlRltmId = true;
                }
            } else {
                alert(res.message);
            }
        }
    })
}
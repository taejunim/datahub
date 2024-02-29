var datatable;
var duplicateRltmId;

$(document).ready(function () {
    // ESS 연계 정보 테이블
    datatable = $("#datatable").DataTable({
        "searching": false
        , "paging": true
        , "bPaginate": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/link/ess.json"
            , "method": "POST"
            , "data": function(d) {
                if($('#essIdLike').val() != "") {d.essIdLike = $('#essIdLike').val();}
                if($('#startSearchDt').val() != "") {d.startSearchDt = $('#startSearchDt').val();}
                if($('#endSearchDt').val() != "") {d.endSearchDt = $('#endSearchDt').val();}
            }
            , "error" : function(xhr, status, err) {
                dataTablesError(xhr);
            }
        }, "processing": true
        , "serverSide": true
        , "order": [[3, 'desc']]
        , "columns": [
            { "name" : "OPER_NM", "title" : "운영기관", "data" : "operNm", "className" : "dt-head-center", "orderable" : false },
            { "name" : "ESS_NM", "title" : "ESS명", "data" : "essNm", "className" : "dt-head-center", "orderable" : false },
            { "name" : "ACM_PWR", "title" : "전력 잔여량", "data" : "acmPwr", "className" : "dt-head-center" },
            { "name" : "ESS_RLTM_ID", "title" : "측정일시", "render" :
                function (data, type, row) {
                    return userService.toStdDate(row["essRltmId"]);
                }, "className" : "dt-head-center"
            },
            { "render" :
                function (data, type, row) {
                    var html = "";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='수정' onclick='showUpdateModal(\"" + userService.toStdDate(row["essRltmId"]) + "\", \"" + row["essId"] + "\")'><i class='material-icons'>create</i></button>&nbsp;";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='삭제' onclick='del(\"" + userService.toStdDate(row["essRltmId"]) + "\", \"" + row["essId"] + "\")'><i class='material-icons'>delete</i></button>";
                    return html;
                }, "title" : "기능", "className" : "dt-head-center", "orderable" : false
            }
        ]
        , "scrollX": "100%"
        , "columnDefs": [
            { "targets": [0], width: "100px" }
            , { "targets": [1], width: "100px" }
            , { "targets": [2], width: "100px" }
            , { "targets": [3], width: "180px" }
            , { "targets": [4], width: "100px" }
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
        $("#startSearchDt").val("");
        $("#endSearchDt").val("");
        datatable.ajax.reload();
    });

    $("#showInsertModal").on("click", function() {
        $("#essRltmId").attr("max", userService.stdToDatetime(new Date()));
        $("#essNm").hide();
        $("#essId").selectpicker("show");

        $("#essRltmIdStr").val("");
        $("#essId").val("");
        $("#essId option:eq(0)").hide();
        $("#essId").selectpicker("refresh");
        $("#acmPwr").val("");
        $("#essRltmId").val("");

        $("#func-modal-title").html("등록");
        $('.func-modal').modal("show");
    });

    $("#essId").on("change", function() {
        duplicate();
    });

    $("#essRltmId").on("change", function() {
        duplicate();
    });

    $("#saveBtn").on("click", function() {
        if($("#essId").val() == "") {
            alert("ESS를 선택해주세요.");
            $("#essId").selectpicker("toggle");
        } else if($("#acmPwr").val() == "") {
            alert("전력 잔여량을 입력해주세요.");
            $("#acmPwr").focus();
        } else if($("#essRltmId").val() == "") {
            alert("측정일시를 입력해주세요.");
            $("#essRltmId").focus();
        } else if($("#essRltmId").val() > userService.stdToDatetime(new Date())) {
            alert("현재 일시보다 이전으로 설정해주세요.");
            $("#essRltmId").focus();
        } else if(!duplicateRltmId) {
            alert("해당 시간에 측정된 값이 존재합니다.");
            $("#essRltmId").focus();
        } else {
            if($("#essRltmIdStr").val() == "") {
                if(confirm("등록하시겠습니까?")) {
                    $.ajax({
                        url: "/system/link/essInsert.json",
                        type: "POST",
                        data: {
                            essRltmIdAf : $("#essRltmId").val(),
                            essId : $("#essId").val(),
                            acmPwr : $("#acmPwr").val()
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
                        url: "/system/link/essUpdate.json",
                        type: "POST",
                        data: {
                            essRltmIdBf : $("#essRltmIdStr").val(),
                            essRltmIdAf : $("#essRltmId").val(),
                            essId : $("#essId").val(),
                            acmPwr : $("#acmPwr").val()
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

function showUpdateModal(essRltmId, essId) {
    $("#essRltmId").attr("max", userService.stdToDatetime(new Date()));
    $.ajax({
        url: "/system/link/essSelect.json",
        type: "POST",
        data: {
            essRltmIdBf : essRltmId,
            essId : essId
        },
        success: function (res) {
            if(res.result == "success") {
                var data = res.data;
                $("#essNm").show();
                $("#essId").selectpicker("hide");

                $("#essRltmIdStr").val(essRltmId);
                $("#essNm").val(data.essNm);
                $("#essId").val(data.essId);
                $("#acmPwr").val(data.acmPwr);
                $("#essRltmId").val(userService.stdToDatetime(essRltmId));
                duplicate();

                $("#func-modal-title").html("수정")
                $('.func-modal').modal("show");
            } else {
                alert(res.message);
            }
        }
    });
}

function del(essRltmId, essId) {
    if(confirm("삭제하시겠습니까?")) {
        $.ajax({
            url: "/system/link/essDelete.json",
            type: "POST",
            data: {
                essRltmIdBf : essRltmId,
                essId : essId
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
        url: "/system/link/duplicateRltmId.json",
        type: "POST",
        data: {
            essId: $("#essId").val(),
            essRltmIdAf: $("#essRltmId").val(),
            essRltmIdBf: $("#essRltmIdStr").val()
        },
        dataType: 'json',
        success: function (res) {
            if (res.result == "success") {
                if (res.data != 0) {
                    duplicateRltmId = false;
                } else {
                    duplicateRltmId = true;
                }
            } else {
                alert(res.message);
            }
        }
    })
}
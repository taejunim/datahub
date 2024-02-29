var datatable;
var duplicateEssNm;

$(document).ready(function () {
    // ESS 장비 정보 테이블
    datatable = $("#datatable").DataTable({
        "searching": false
        , "paging": true
        , "bPaginate": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/eqp/ess.json"
            , "method": "POST"
            , "data": function(d) {
                if($('#operIdLike').val() != "") {d.operIdLike = $('#operIdLike').val();}
                if($('#essNmLike').val() != "") {d.essNmLike = $('#essNmLike').val();}
            }
            , "error" : function(xhr, status, err) {
                dataTablesError(xhr);
            }
        }, "processing": true
        , "serverSide": true
        , "order": [[0, 'desc']]
        , "columns": [
            { "name" : "ESS_ID", "title" : "ESS ID", "data" : "essId", "className" : "dt-head-center" },
            { "name" : "OPER_NM", "title" : "운영기관", "data" : "operNm", "className" : "dt-head-center", "orderable" : false },
            { "name" : "ESS_NM", "title" : "ESS명", "data" : "essNm", "className" : "dt-head-center", "orderable" : false },
            { "name" : "REG_NM", "title" : "등록인", "data" : "regNm", "className" : "dt-head-center", "orderable" : false },
            { "name" : "REG_DT", "title" : "등록일시", "render" :
                function (data, type, row) {
                    return userService.toStdDate(row["regDt"]);
                }, "className" : "dt-head-center", "orderable" : false
            },
            { "render" :
                function (data, type, row) {
                    var html = "";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='수정' onclick='showUpdateModal(\"" + row["essId"] + "\")'><i class='material-icons'>create</i></button>&nbsp;";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='삭제' onclick='del(\"" + row["essId"] + "\")'><i class='material-icons'>delete</i></button>";
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
            , { "targets": [4], width: "180px" }
            , { "targets": [5], width: "100px" }
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
        $("#operIdLike").selectpicker("refresh");
        $("#essNmLike").val("");
        datatable.ajax.reload();
    });

    $("#showInsertModal").on("click", function() {
        $("#essId").val("");
        $("#operId").val("");
        $("#operId option:eq(0)").hide();
        $("#operId").selectpicker("refresh");
        $("#essNm").val("");

        $("#func-modal-title").html("등록");
        $('.func-modal').modal("show");
    });

    $("#essNm").on("input", function() {
        duplicate();
    });

    $("#saveBtn").on("click", function() {
        if($("#operId").val() == "") {
            alert("ESS 운영기관을 선택해주세요.");
            $("#operId").selectpicker("toggle");
        } else if($("#essNm").val() == "") {
            alert("ESS 이름을 입력해주세요.");
            $("#essNm").focus();
        } else if(!duplicateEssNm) {
            alert("입력한 ESS명이 존재합니다. 변경바랍니다.");
            $("#essNm").focus();
        } else {
            if($("#essId").val() == "") {
                if(confirm("등록하시겠습니까?")) {
                    $.ajax({
                        url: "/system/eqp/essInsert.json",
                        type: "POST",
                        data: {
                            "operId" : $("#operId").val(),
                            "essNm" : $("#essNm").val()
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
                        url: "/system/eqp/essUpdate.json",
                        type: "POST",
                        data: {
                            "essId" : $("#essId").val(),
                            "operId" : $("#operId").val(),
                            "essNm" : $("#essNm").val()
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

function showUpdateModal(essId) {
    $.ajax({
        url: "/system/eqp/essSelect.json",
        type: "POST",
        data: { "essId" : essId },
        success: function (res) {
            if(res.result == "success") {
                var data = res.data;
                $("#essId").val(essId);
                $("#operId").val(data.operId);
                $("#operId").selectpicker("refresh");
                $("#essNm").val(data.essNm);
                duplicate();

                $("#func-modal-title").html("수정")
                $('.func-modal').modal("show");
            } else {
                alert(res.message);
            }
        }
    });
}

function del(essId) {
    if(confirm("삭제하시겠습니까?")) {
        $.ajax({
            url: "/system/eqp/essDelete.json",
            type: "POST",
            data: { "essId" : essId },
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
        url: "/system/eqp/duplicateEssNm.json",
        type: "POST",
        data: {
            essId: $("#essId").val(),
            essNm: $("#essNm").val()
        },
        dataType: 'json',
        success: function (res) {
            if (res.result == "success") {
                if (res.data != 0) {
                    duplicateEssNm = false;
                } else {
                    duplicateEssNm = true;
                }
            } else {
                alert(res.message);
            }
        }
    })
}
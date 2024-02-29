var datatable;
var duplicateTrmnlNo;

$(document).ready(function () {
    // ESS 단말기 장비 정보 테이블
    datatable = $("#datatable").DataTable({
        "searching": false
        , "paging": true
        , "bPaginate": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/eqp/essTrmnl.json"
            , "method": "POST"
            , "data": function(d) {
                if($('#essIdLike').val() != "") {d.essIdLike = $('#essIdLike').val();}
                if($('#trmnlNoLike').val() != "") {d.trmnlNoLike = $('#trmnlNoLike').val();}
                if($('#bcncIdLike').val() != "") {d.bcncIdLike = $('#bcncIdLike').val();}
                if($('#operIdLike').val() != "") {d.operIdLike = $('#operIdLike').val();}
            }
            , "error" : function(xhr, status, err) {
                dataTablesError(xhr);
            }
        }, "processing": true
        , "serverSide": true
        , "order": [[0, 'desc']]
        , "columns": [
            { "name" : "ESS_TRMNL_ID", "title" : "ESS단말기ID", "data" : "essTrmnlId", "className" : "dt-head-center" },
            { "name" : "ESS_TRMNL_NO", "title" : "ESS단말기번호", "data" : "essTrmnlNo", "className" : "dt-head-center", "orderable" : false },
            { "name" : "ESS_ID", "title" : "ESS정보", "render" :
                function (data, type, row) {
                    return  row["essNm"]+"("+row["operNm"]+")";
                }, "className" : "dt-head-center", "orderable" : false },
            { "name" : "BCNC_NM", "title" : "거래처명", "data" : "bcncNm", "className" : "dt-head-center", "orderable" : false },
            { "name" : "REG_NM", "title" : "등록인", "data" : "regNm", "className" : "dt-head-center", "orderable" : false },
            { "name" : "REG_DT", "title" : "등록일시", "render" :
                function (data, type, row) {
                    return userService.toStdDate(row["regDt"]);
                }, "className" : "dt-head-center", "orderable" : false
            },
            { "render" :
                function (data, type, row) {
                    var html = "";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='수정' onclick='showUpdateModal(\"" + row["essTrmnlId"] + "\")'><i class='material-icons'>create</i></button>&nbsp;";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='삭제' onclick='del(\"" + row["essTrmnlId"] + "\")'><i class='material-icons'>delete</i></button>";
                    return html;
                }, "title" : "기능", "className" : "dt-head-center", "orderable" : false
            }
        ]
        , "scrollX": "100%"
        , "columnDefs": [
            { "targets": [0], width: "110px" }
            , { "targets": [1], width: "150px" }
            , { "targets": [2], width: "150px" }
            , { "targets": [3], width: "100px" }
            , { "targets": [4], width: "100px" }
            , { "targets": [5], width: "180px" }
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
        $("#trmnlNoLike").val("");
        if(!$("#bcncIdLike").is("[readonly]")) {
            $("#bcncIdLike").val("");
            $("#bcncIdLike").selectpicker("refresh");
        }
        datatable.ajax.reload();
    });

    $("#showInsertModal").on("click", function() {
        $("#essTrmnlId").val("");
        $("#essId").val("");
        $("#essId option:eq(0)").hide();
        $("#essId").selectpicker("refresh");
        $("#essTrmnlNo").val("");
        $("#bcncId").val("");
        $("#bcncId option:eq(0)").hide();
        $("#bcncId").selectpicker("refresh");
        $("#usePrps").val("");

        $("#func-modal-title").html("등록");
        $('.func-modal').modal("show");
    });

    $("#essTrmnlNo").on("input", function() {
        duplicate();
    });

    $("#saveBtn").on("click", function() {
        var form = document.funcForm;
        if(form.essId.value == "") {
            alert("ESS를 선택해주세요.");
            $("#essId").selectpicker("toggle");
        } else if(form.essTrmnlNo.value == "") {
            alert("ESS 단말기 번호를 입력해주세요.");
            form.essTrmnlNo.focus();
        } else if(!duplicateTrmnlNo) {
            alert("입력한 단말기번호가 존재합니다. 변경바랍니다.");
            form.essTrmnlNo.focus();
        } else if(form.bcncId.value == "") {
            alert("거래처를 선택해주세요.");
            $("#bcncId").selectpicker("toggle");
        } else {
            if(form.essTrmnlId.value == "") {
                if(confirm("등록하시겠습니까?")) {
                    $.ajax({
                        url: "/system/eqp/trmnlInsert.json",
                        type: "POST",
                        data: {
                            "essId": form.essId.value,
                            "essTrmnlNo": form.essTrmnlNo.value,
                            "bcncId": form.bcncId.value,
                            "usePrps": form.usePrps.value
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
                        url: "/system/eqp/trmnlUpdate.json",
                        type: "POST",
                        data: {
                            "essTrmnlId": form.essTrmnlId.value,
                            "essId": form.essId.value,
                            "essTrmnlNo": form.essTrmnlNo.value,
                            "bcncId": form.bcncId.value,
                            "usePrps": form.usePrps.value
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

function showUpdateModal(essTrmnlId) {
    $.ajax({
        url: "/system/eqp/trmnlSelect.json",
        type: "POST",
        data: { essTrmnlId : essTrmnlId },
        success: function (res) {
            if(res.result == "success") {
                var data = res.data;
                $("#essTrmnlId").val(essTrmnlId);
                $("#essId").val(data.essId);
                $("#essId").selectpicker("refresh");
                $("#essTrmnlNo").val(data.essTrmnlNo);
                $("#bcncId").val(data.bcncId);
                $("#bcncId").selectpicker("refresh");
                $("#usePrps").val(data.usePrps);
                duplicate();

                $("#func-modal-title").html("수정")
                $('.func-modal').modal("show");
            } else {
                alert(res.message);
            }
        }
    });
}

function del(essTrmnlId) {
    if(confirm("삭제하시겠습니까?")) {
        $.ajax({
            url: "/system/eqp/trmnlDelete.json",
            type: "POST",
            data: { essTrmnlId : essTrmnlId },
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
        url: "/system/eqp/duplicateTrmnlNo.json",
        type: "POST",
        data: {
            essTrmnlId: $("#essTrmnlId").val(),
            essTrmnlNo: $("#essTrmnlNo").val()
        },
        dataType: 'json',
        success: function (res) {
            if (res.result == "success") {
                if (res.data != 0) {
                    duplicateTrmnlNo = false;
                } else {
                    duplicateTrmnlNo = true;
                }
            } else {
                alert(res.message);
            }
        }
    })
}
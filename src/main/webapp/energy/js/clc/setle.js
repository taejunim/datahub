var datatable;

$(document).ready(function () {
    $("#setleDayLike option:eq(0)").hide();
    // 운영기관 정보 테이블
    datatable = $("#datatable").DataTable({
        "searching": false
        , "paging": true
        , "bPaginate": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/clcSetle/list.json"
            , "method": "POST"
            , "data": function(d) {
                if($('#operIdLike').val() != "") {d.operIdLike = $('#operIdLike').val();}
                if($('#setleDayLike').val() != "") {d.setleDayLike = $('#setleDayLike').val();}
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
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='수정' onclick='showUpdateModal(\"" + row["clcSetleId"] + "\")'><i class='material-icons'>create</i></button>&nbsp;";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='삭제' onclick='del(\"" + row["clcSetleId"] + "\")'><i class='material-icons'>delete</i></button>";
                    return html;
                }, "title" : "기능", "className" : "dt-head-center"
            }
        ]
        , "scrollX": "100%"
        , "columnDefs": [
            { "targets": [0], width: "100px" }
            , { "targets": [1], width: "100px" }
            , { "targets": [2], width: "200px" }
            , { "targets": [3], width: "100px" }
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
        $("#setleDayLike").val("");
        $("#setleDayLike").selectpicker("refresh");
        datatable.ajax.reload();
    });

    $("#showInsertModal").on("click", function() {
        $("#operNm").hide();
        $("#operId").selectpicker("show");

        $("#operId").val("");
        $("#operId option:eq(0)").hide();
        $("#operId").selectpicker("refresh");
        $("#setleDay").val("");
        $("#setleDay option:eq(0)").hide();
        $("#setleDay").selectpicker("refresh");
        $("#clcBgnMt").val("");
        $("#clcBgnMt option:eq(0)").hide();
        $("#clcBgnMt").selectpicker("refresh");
        $("#clcBgnDay").val("");
        $("#clcBgnDay option:eq(0)").hide();
        $("#clcBgnDay").selectpicker("refresh");

        $("#func-modal-title").html("등록");
        $('.func-modal').modal("show");
    });

    $("#saveBtn").on("click", function() {
        if($("#operId").val() == "") {
            alert("운영기관을 선택해주세요.");
            $("#operId").selectpicker("toggle");
        } else if($("#setleDay").val() == "") {
            alert("결제일을 선택해주세요.");
            $("#setleDay").selectpicker("toggle");
        } else if($("#clcBgnMt").val() == "") {
            alert("정산 시작달을 선택해주세요.");
            $("#clcBgnMt").selectpicker("toggle");
        } else if($("#clcBgnDay").val() == "") {
            alert("정산 시작일을 선택해주세요.");
            $("#clcBgnDay").selectpicker("toggle");
        } else if($("#clcBgnMt").val() == -1 && $("#setleDay").val()*1 < $("#clcBgnDay").val()*1) {
            alert("결제일은 정산되는 거래기간 이후로 설정되어야 합니다.\n\n" +
                "< 해결방법 >\n" +
                "1. 결제일을 정산시작일과 동일하게 설정하거나 이후로 설정\n" +
                "2. 정산시작일을 결제일과 동일하게 설정하거나 이전으로 설정\n" +
                "3. 정산시작달을 전전월로 변경");
        } else {
            if($("#operNm").val() == "") {
                if(confirm("등록하시겠습니까?")) {
                    $.ajax({
                        url: "/system/clcSetle/insert.json",
                        type: "POST",
                        data: $("#funcForm").serialize(),
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
                        url: "/system/clcSetle/update.json",
                        type: "POST",
                        data: $("#funcForm").serialize(),
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

function showUpdateModal(clcSetleId) {
    $.ajax({
        url: "/system/clcSetle/select.json",
        type: "POST",
        data: { clcSetleId : clcSetleId },
        success: function (res) {
            if(res.result == "success") {
                var data = res.data;
                $("#operNm").show();
                $("#operId").selectpicker("hide");

                $("#clcSetleId").val(data.clcSetleId);
                $("#operNm").val(data.operNm);
                $("#operId").val(data.operId);
                $("#setleDay").val(data.setleDay);
                $("#setleDay option:eq(0)").hide();
                $("#setleDay").selectpicker("refresh");
                $("#clcBgnMt").val(data.clcBgnMt);
                $("#clcBgnMt option:eq(0)").hide();
                $("#clcBgnMt").selectpicker("refresh");
                $("#clcBgnDay").val(data.clcBgnDay);
                $("#clcBgnDay option:eq(0)").hide();
                $("#clcBgnDay").selectpicker("refresh");

                $("#func-modal-title").html("수정")
                $('.func-modal').modal("show");
            } else {
                alert(res.message);
            }
        }
    });
}

function del(clcSetleId) {
    if(confirm("삭제하시겠습니까?")) {
        $.ajax({
            url: "/system/clcSetle/delete.json",
            type: "POST",
            data: { clcSetleId : clcSetleId },
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

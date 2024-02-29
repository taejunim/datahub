var datatable;
var unitPriceDatatable;
var detailDatatable;
var duplicateBgnTm;

$(document).ready(function () {
    // 단가 정보 테이블
    datatable = $("#datatable").DataTable({
        "searching": false
        , "paging": true
        , "bPaginate": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/price/list.json"
            , "method": "POST"
            , "data": function(d) {
                if($('#operIdLike').val() != "") {d.operIdLike = $('#operIdLike').val();}
                if($('#startSearchDt').val() != "") {d.startSearchDt = $('#startSearchDt').val();}
                d.chrgCd = $('#chrgCd').val();
            }
            , "error" : function(xhr, status, err) {
                dataTablesError(xhr);
            }
        }, "processing": true
        , "serverSide": true
        , "order": [[2, 'desc']]
        , "columns": [
            { "name" : "OPER_NM", "title" : "운영기관", "data" : "operNm", "className" : "dt-head-center", "orderable" : false },
            { "name" : "DLPC_PROD_NM", "title" : "상품명", "data" : "dlpcProdNm", "className" : "dt-head-center", "orderable" : false },
            { "name" : "DLPC_ENF_DT", "title" : "시행일자", "render" :
                function (data, type, row) {
                    return userService.strToYmd(row["dlpcEnfDt"],'-');
                }, "className" : "dt-head-center" },
            { "name" : "REG_DT", "title" : "등록일자", "render" :
                function (data, type, row) {
                    return userService.toStdDate(row["regDt"]);
                }, "className" : "dt-head-center", "orderable" : false },
            { "render" :
                function (data, type, row) {
                    var html = "";
                    let today = userService.toToday();
                    if(row["dlpcEnfDt"] > today) {
                        html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='수정' onclick='showUpdateModal(\"" + row["dlpcId"] + "\")'><i class='material-icons'>create</i></button>&nbsp;";
                        html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='삭제' onclick='del(\"" + row["dlpcId"] + "\")'><i class='material-icons'>delete</i></button>";
                    } else {
                        html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='상세보기' onclick='showDetailModal(\"" + row["dlpcId"] + "\")'><i class='material-icons'>list</i></button>";
                    }
                    return html;
                }, "title" : "기능", "className" : "dt-head-center", "orderable" : false
            }
        ]
        , "scrollX": "100%"
        , "columnDefs": [
            { "targets": [0], width: "100px" }
            , { "targets": [1], width: "150px" }
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
        $("#startSearchDt").val("");
        datatable.ajax.reload();
    });

    // 등록버튼 클릭 이벤트
    $("#showInsertModal").on("click", function() {
        $("#dtlInfo").show();
        $("#updateInfo").hide();
        $("#dlpcEnfDt").attr("readonly", false);
        $("#cancelBtn").show();
        $("#closeBtn").hide();

        $("#state").val("insert");
        $("#dlpcId").val("");
        $("#operId").val("");
        $("#operId option:eq(0)").hide();
        $("#operId").selectpicker("refresh");
        $("#dlpcProdNm").val("");
        $("#dlpcEnfDt").val("");

        // 시간 단가 정보 테이블
        unitPriceDatatableLoad(null);

        $("#func-modal-title").html("▶ 단가 정보 등록");
        $('.func-modal').modal("show");
    });

    // 단가관리 모달창 : 저장버튼 클릭 이벤트
    $("#saveBtn").on("click", function() {
        if($("#operId").val() == "") {
            alert("ESS 운영기관을 선택해주세요.");
            $("#operId").selectpicker("toggle");
        } else if($("#dlpcProdNm").val() == "") {
            alert("상품명을 입력해주세요.");
            $("#dlpcProdNm").focus();
        } else if($("#dlpcEnfDt").val() == "") {
            alert("시행일을 선택해주세요.");
            $("#dlpcEnfDt").focus();
        } else {
            if($("#state").val() == "insert") {
                if(confirm("등록하시겠습니까?")) {
                    $.ajax({
                        url: "/system/price/insert.json",
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
            } else if($("#state").val() == "update") {
                if(confirm("수정하시겠습니까?")) {
                    $.ajax({
                        url: "/system/price/update.json",
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

    // 단가관리 모달창 : 취소버튼 클릭 이벤트
    $("#cancelBtn").on("click", function() {
        if($('#operId').val() == "" && $('#dlpcProdNm').val() == "" && $('#dlpcEnfDt').val() == "") {
            $('.func-modal').modal("hide");
        } else {
            if (confirm("입력된 정보가 다 사라집니다. 취소하시겠습니까?")) {
                if($('#dlpcId').val() != "") {
                    $.ajax({
                        url: "/system/price/delete.json",
                        type: "POST",
                        data: $("#funcForm").serialize(),
                        dataType: "json",
                        success: function (res) {
                            if ("success" == res.result) {
                                datatable.ajax.reload();
                            } else {
                                alert(res.message);
                            }
                        }
                    });
                }
                alert("취소되었습니다.");
                $('.func-modal').modal("hide");
            }
        }
    });

    // 시간단가 등록, 수정시 : 시작시간 변경시 중복확인
    $("#bgnTm").on("change", function() {
        duplicate();
    });

})

// 상세보기버튼 클릭 이벤트
function showDetailModal(dlpcId) {
    detailDatatable = $("#detailDatatable").DataTable({
        "searching": false
        , "paging": true
        , "bPaginate": true
        , "destroy": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/unitPrice/list.json"
            , "method": "POST"
            , "data": function(d) {
                d.dlpcId = dlpcId
            }
            , "error" : function(xhr, status, err) {
                dataTablesError(xhr);
            }
        }, "processing": true
        , "serverSide": true
        , "order": [[0, 'asc']]
        , "columns": [
            { "name" : "BGN_TM", "title" : "시간", "render" :
                    function (data, type, row) {
                        return userService.strToTime(row["bgnTm"]);
                    }, "className" : "dt-head-center" },
            { "name" : "DELNG_UNTPC", "title" : "거래단가", "data" : "delngUntpc", "className" : "dt-head-center" }
        ]
        , "scrollX": "100%"
        , "scrollY": "100%"
        , "scrollXInner": "200px"
        , "columnDefs": [
            { "targets": [0], width: "100px" }
            , { "targets": [1], width: "100px" }
        ]
        , "fnRowCallback" : function(nRow, aData, iDisplayIndex) {
            $( window ).trigger('resize');
        }
        , "fnDrawCallback" : function() {
            $('.detail-modal').modal("show");
        }
    });
}

// 수정버튼 클릭 이벤트
function showUpdateModal(dlpcId) {
    $.ajax({
        url: "/system/price/select.json",
        type: "POST",
        data: { dlpcId : dlpcId },
        success: function (res) {
            if(res.result == "success") {
                var data = res.data;
                $("#dtlInfo").hide();
                $("#updateInfo").show();
                $("#dlpcEnfDt").attr("readonly", true);
                $("#cancelBtn").hide();
                $("#closeBtn").show();

                $("#state").val("update");
                $("#dlpcId").val(data.dlpcId);
                $("#operId").val(data.operId);
                $("#operId option:eq(0)").hide();
                $("#operId").selectpicker("refresh");
                $("#dlpcProdNm").val(data.dlpcProdNm);
                $("#dlpcEnfDt").val(userService.strToYmd(data.dlpcEnfDt,'-'));

                // 시간 단가 정보 테이블
                unitPriceDatatableLoad(dlpcId);

                $("#func-modal-title").html("▶ 단가 정보 수정")
                $('.func-modal').modal("show");
            } else {
                alert(res.message);
            }
        }
    });
}

// 삭제버튼 클릭 이벤트
function del(dlpcId) {
    if(confirm("삭제시 등록된 시간단가도 삭제됩니다. 삭제하시겠습니까?")) {
        $.ajax({
            url: "/system/price/delete.json",
            type: "POST",
            data: { dlpcId : dlpcId },
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

function unitPriceDatatableLoad(dlpcId) {
    // 시간단가 정보 테이블
    unitPriceDatatable = $("#unitPriceDatatable").DataTable({
        "searching": false
        , "paging": true
        , "bPaginate": true
        , "destroy": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/unitPrice/list.json"
            , "method": "POST"
            , "data": function(d) {
                d.dlpcId = dlpcId
            }
            , "error" : function(xhr, status, err) {
                dataTablesError(xhr);
            }
        }, "processing": true
        , "serverSide": true
        , "order": [[0, 'asc']]
        , "columns": [
            { "name" : "BGN_TM", "title" : "시간", "render" :
                function (data, type, row) {
                    return userService.strToTime(row["bgnTm"]);
                }, "className" : "dt-head-center" },
            { "name" : "DELNG_UNTPC", "title" : "거래단가", "data" : "delngUntpc", "className" : "dt-head-center" },
            { "render" :
                function (data, type, row) {
                    var html = "";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='수정' onclick='showUnitUpdateModal(\"" + row["delngUntpcId"] + "\")'><i class='material-icons'>create</i></button>&nbsp;";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='삭제' onclick='delUnit(\"" + row["delngUntpcId"] + "\")'><i class='material-icons'>delete</i></button>";
                    return html;
                }, "title" : "기능", "className" : "dt-head-center", "orderable" : false
            }
        ]
        , "scrollX": "100%"
        , "scrollY": "100%"
        , "scrollXInner": "300px"
        , "columnDefs": [
            { "targets": [0], width: "100px" }
            , { "targets": [1], width: "100px" }
            , { "targets": [2], width: "100px" }
        ]
        , "fnRowCallback" : function(nRow, aData, iDisplayIndex) {
            $( window ).trigger('resize');
        }
    });
}

// 단가추가 버튼 클릭 이벤트
function showUnitInsertModal() {
    if($("#operId").val() == "") {
        alert("단가정보부터 전부 입력해주세요.");
        $('.unitFunc-modal').modal("hide");
        $("#operId").selectpicker("toggle");
    } else if($("#dlpcProdNm").val() == "") {
        alert("단가정보부터 전부 입력해주세요.");
        $('.unitFunc-modal').modal("hide");
        $("#dlpcProdNm").focus();
    } else if($("#dlpcEnfDt").val() == "") {
        alert("단가정보부터 전부 입력해주세요.");
        $('.unitFunc-modal').modal("hide");
        $("#dlpcEnfDt").focus();
    } else {
        $("#delngUntpcId").val("");
        $("#bgnTm").val("");
        $("#delngUntpc").val("");

        $("#unitFunc-modal-title").html("시간 단가 등록");
        $('.unitFunc-modal').modal("show");
    }
}

// 시간단가 등록, 수정시 저장버튼 클릭 이벤트
function insert() {
    if($("#bgnTm").val() == "") {
        alert("시작시간을 선택해주세요.");
        $("#bgnTm").focus();
    } else if($("#delngUntpc").val() == "") {
        alert("거래단가를 입력해주세요.");
        $("#delngUntpc").focus();
    } else if(!duplicateBgnTm) {
        alert("해당 시간에 등록된 단가가 존재합니다.");
        $("#bgnTm").focus();
    } else {
        if($("#delngUntpcId").val() == "") {
            if(confirm("등록하시겠습니까?")) {
                $.ajax({
                    url: "/system/unitPrice/insert.json",
                    type: "POST",
                    data: $("#funcForm, #unitFuncForm").serialize(),
                    dataType: "json",
                    success: function (res) {
                        if ("success" == res.result) {
                            alert("등록되었습니다.");
                            $('.unitFunc-modal').modal("hide");
                            $("#dlpcId").val(res.dlpcId);
                            unitPriceDatatableLoad(res.dlpcId);
                        } else {
                            alert(res.message);
                        }
                    }
                });
            }
        } else {
            if(confirm("수정 시 이전 정보로 돌아갈 수 없습니다. 수정하시겠습니까?")) {
                $.ajax({
                    url: "/system/unitPrice/update.json",
                    type: "POST",
                    data: $("#funcForm, #unitFuncForm").serialize(),
                    dataType: "json",
                    success: function (res) {
                        if ("success" == res.result) {
                            alert("수정되었습니다.");
                            $('.unitFunc-modal').modal("hide");
                            unitPriceDatatable.ajax.reload();
                        } else {
                            alert(res.message);
                        }
                    }
                });
            }
        }
    }
}

// 시간단가 수정버튼 클릭 이벤트
function showUnitUpdateModal(delngUntpcId) {
    $.ajax({
        url: "/system/unitPrice/select.json",
        type: "POST",
        data: { delngUntpcId : delngUntpcId },
        success: function (res) {
            if(res.result == "success") {
                var data = res.data;
                $("#delngUntpcId").val(data.delngUntpcId);
                $("#dlpcId").val(data.dlpcId);
                $("#bgnTm").val(userService.strToTime(data.bgnTm));
                $("#delngUntpc").val(data.delngUntpc);
                duplicate();

                $("#unitFunc-modal-title").html("시간 단가 수정")
                $('.unitFunc-modal').modal("show");
            } else {
                alert(res.message);
            }
        }
    });
}

// 시간단가 삭제버튼 클릭 이벤트
function delUnit(delngUntpcId) {
    if(confirm("삭제시 해당 정보를 되돌릴 수 없습니다. 삭제하시겠습니까?")) {
        $.ajax({
            url: "/system/unitPrice/delete.json",
            type: "POST",
            data: { delngUntpcId : delngUntpcId },
            dataType: 'json',
            success: function (res) {
                if(res.result == "success") {
                    alert("삭제되었습니다.");
                    unitPriceDatatable.ajax.reload();
                } else {
                    alert(res.message);
                }
            }
        });
    }
}

// 시작시간 입력시 중복확인 이벤트
function duplicate() {
    $.ajax({
        url: "/system/unitPrice/duplicateBgnTm.json",
        type: "POST",
        data: {
            delngUntpcId: $("#delngUntpcId").val(),
            chrgCd: $("#chrgCd").val(),
            dlpcId: $("#dlpcId").val(),
            bgnTm: $("#bgnTm").val()
        },
        dataType: 'json',
        success: function (res) {
            if (res.result == "success") {
                if (res.data != 0) {
                    duplicateBgnTm = false;
                } else {
                    duplicateBgnTm = true;
                }
            } else {
                alert(res.message);
            }
        }
    })
}

// 시행일 : datepicker 설정(다음날부터 선택가능하도록)
$(function() {
    $('#dlpcEnfDt').datepicker({
        format: "yyyy-mm-dd",   // 데이터 포맷 형식(yyyy : 년, mm : 월, dd : 일 )
        startDate: '+1d',       // 달력에서 선택 할 수 있는 가장 빠른 날짜. 이전으로는 선택 불가능 ( d : 일 m : 달 y : 년 w : 주)
        autoclose : true,	    // 사용자가 날짜를 클릭하면 자동 캘린더가 닫히는 옵션
        todayHighlight : true,	// 오늘 날짜에 하이라이팅 기능 기본값 :false
        language : "ko"	        // 달력의 언어 선택, 그에 맞는 js로 교체해줘야한다.
    });
});
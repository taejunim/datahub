/*
var datatable;

$(document).ready(function () {
    // 일반사용자 목록 테이블
    datatable = $("#datatable").DataTable({
        "searching": false
        , "paging": true
        , "bPaginate": true
        , "responsive": true
        , "language": lang_kor
        , "ajax": {
            "url": "/system/user/roleList.json"
            , "method": "POST"
            , "data": function(d) {
                if($('#userLoginIdLike').val() != "") {d.userLoginIdLike = $('#userLoginIdLike').val();}
                if($('#userNmLike').val() != "") {d.userNmLike = $('#userNmLike').val();}
                d.roleAuth = 'ROLE_USER';
                d.userSt = '1';
                d.inuserYn = 'N';
            }
            , "error" : function(xhr, status, err) {
					dataTablesError(xhr);
				}
        }, "processing": true
        , "serverSide": true
        , "order": [[0, 'desc']]
        , "columns": [
            { "name" : "USER_ID", "data" : "userId", "visible" : false },
            { "name" : "USER_LOGIN_ID", "title" : "사용자 ID", "data" : "userLoginId", "className" : "dt-head-center" },
            { "name" : "USER_NM", "title" : "사용자명", "data" : "userNm", "className" : "dt-head-center" },
            { "name" : "BIRTH", "title" : "생년월일", "render" :
                function (data, type, row) {
                    return userService.strToYmd(row["birth"], '.');
                }, "className" : "dt-head-center dt-body-left"},
            { "name" : "GENDER", "title" : "성별", "render" :
                function (data, type, row) {
                    if(row["gender"] == "m"){
                        return "남자";
                    } else {
                        return "여자";
                    }
                }, "className" : "dt-head-center dt-body-left"},
            { "name" : "USER_ST", "title" : "사용상태", "render" :
                function (data, type, row) {
                    html = "";
                    if(row["userSt"] == 1) {
                        html += "사용중";
                    } else if(row["userSt"] == 8) {
                        html += "사용정지";
                    } else {
                        html += "탈퇴";
                    }
                    return html;
                }, "className" : "dt-head-center"},
            { "name" : "REG_DT", "title" : "등록일", "render" :
                function (data, type, row) {
                    return userService.toStdDate(row["regDt"]);
                }, "className" : "dt-head-center dt-body-center"},
            { "render" :
                function (data, type, row) {
                    var html = "";
                    html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='권한부여' onclick='showRoleModal(\"" + row["userId"] + "\")'><i class='material-icons'>account_box</i></button>";                    return html;
                }, "title" : "기능", "className" : "dt-head-center", "orderable" : false
            }
        ]
        , "scrollX": "100%"
        , "columnDefs": [
            { "targets": [1], width: "100px" }
            , { "targets": [2], width: "100px" }
            , { "targets": [3], width: "100px" }
            , { "targets": [4], width: "100px" }
            , { "targets": [5], width: "100px" }
            , { "targets": [6], width: "180px" }
            , { "targets": [7], width: "100px" }
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
        $("#userLoginIdLike").val("");
        $("#userNmLike").val("");
        datatable.ajax.reload();
    });

});

function showRoleModal(userId) {
    $.ajax({
        url : "/system/user/detailUser.json",
        type : "POST",
        data : { "userId" : userId },
        dataType : "json",
        success : function(res){
            if(res.result == "success"){
                var form = document.roleForm;
                var data = res.data;

                form.userId.value = data.userId;
                form.userSt.value = data.userSt;
                form.userLoginId.value = data.userLoginId;
                form.userNm.value = data.userNm;
                form.roleAuth.value = "";
                $("#roleForm #roleAuth").selectpicker("refresh");

                $('.role-modal').modal("show");
            }else {
                alert(res.message);
            }
        }
    })
}

function save() {
    if(confirm("해당 기업 권한을 부여하겠습니까?")) {
        $.ajax({
            url: "/system/user/roleInsert.json",
            type: "POST",
            data: $("#roleForm").serialize(),
            dataType: 'json',
            success: function(res) {
                if(res.result == "success"){
                    if(confirm("등록되었습니다. 직원관리 메뉴로 이동하시겠습니까?")) {
                        location.href = "/system/insttUser/list.mng";
                    } else {
                        $('.role-modal').modal("hide");
                        datatable.ajax.reload();
                    }
                } else {
                    alert(res.message);
                }
            }
        })
    }
}
*/
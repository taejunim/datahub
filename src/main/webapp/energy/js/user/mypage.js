$(document).ready(function () {

    $(".pwd-modal-close").click(function (e) {
        $(".pwd-modal").removeClass("custom-modal-show");
        $(".pwd-modal").addClass("custom-modal-none");
    })

    $(".leave-modal-close").click(function (e) {
        $(".leave-modal").removeClass("custom-modal-show");
        $(".leave-modal").addClass("custom-modal-none");
    })

    $("#saveBtn").on("click", function () {
        var userParams = {
            name: $("#userNm").val(),
        };

        // 입력값이 형식에 맞는지 확인
        var userAble = userService.userCheckAll(userParams);

        if(userAble) {
            if(confirm("정보를 수정하시겠습니까?")) {
                $.ajax({
                    url: "/system/mypage/update.json",
                    type: "POST",
                    data: {
                        userId: $("#userId").val(),
                        userRoleId: $("#userRoleId").val(),
                        userLoginId: $("#userLoginId").val(),
                        userNm: $("#userNm").val(),
                    },
                    dataType: "json",
                    success: function (res) {
                        if (res.result === "success") {
                            alert("수정되었습니다.");
                            location.reload();
                        } else {
                            alert(res.message);
                            location.reload();
                        }
                    }
                })
            }
        }
    });

    $("#userOutBtn").on("click", function () {
        $('.leave-modal').removeClass("custom-modal-none");
        $('.leave-modal').addClass("custom-modal-show");
        $("#userPwd").val("");
        $("#userOutRsn").val("");
    });

    $("#userPwd").change( function () {
        var userParams = {
            userId: $("#userId").val(),
            userPwd: $("#userPwd").val()
        }
        userService.userPwdCheckClear();
        userService.userPasswordEqualCheck(userParams);
    });
    
    $("#userOut").on("click", function () {
        if($("#userPwd").val() == "") {
            alert("비밀번호를 입력해주세요.");
            $("#userPwd").focus();
        } else if(!userService.userPasswordEqual()) {
            $("#userPwd").focus();
        } else {
            if(confirm ("정말 탈퇴하시겠습니까?")) {
                $.ajax({
                    url : "/system/mypage/userOut.json",
                    type : "POST" ,
                    data : {
                        userId : $("#userId").val(),
                        userOutRsn : $("#userOutRsn").val()
                    },
                    dataType : "json" ,
                    success : function(res) {
                        if ("success" == res.result) {
                            alert("탈퇴되었습니다.");
                            location.href = "/logout.mng";
                        } else {
                            alert(res.message);
                        }
                    }
                })
            }
        }
    });

    $("#passwordChangeBtn").on("click", function () {
        $('.pwd-modal').removeClass("custom-modal-none");
        $('.pwd-modal').addClass("custom-modal-show");
        $("#nowUserPwd").val("");
        $("#chgUserPwd").val("");
        $("#userPwdConfirm").val("");
    });

    $("#nowUserPwd").change( function () {
        var userParams = {
            userId: $("#userId").val(),
            userPwd: $("#nowUserPwd").val()
        }
        userService.userPwdCheckClear();
        userService.userPasswordEqualCheck(userParams);
    });

    // 비밀번호 값이 동일한지 비교
    $("#chgUserPwd").keyup(function () {
        userService.comparePasswordEquality($("#chgUserPwd").val(), $("#userPwdConfirm").val());
    })
    $("#userPwdConfirm").keyup(function () {
        userService.comparePasswordEquality($("#chgUserPwd").val(), $("#userPwdConfirm").val());
    })

    $("#passwordChange").on("click", function () {
        if($("#nowUserPwd").val() == "") {
            alert("현재 비밀번호를 입력해주세요.");
            $("#nowUserPwd").focus();
        } else if(!userService.userPasswordEqual()) {
            $("#nowUserPwd").focus();
        } else if($("#chgUserPwd").val() == "") {
            alert("변경할 비밀번호를 입력해주세요.");
            $("#chgUserPwd").focus();
        } else if(!userService.checkPassword($("#chgUserPwd").val())) {
            $("#chgUserPwd").focus();
        } else if($("#userPwdConfirm").val() == "") {
            alert("변경 비밀번호 확인란에 변경 비밀번호와 동일한 값을 입력해주세요.");
            $("#userPwdConfirm").focus();
        } else if(!userService.passwordEqualCheck()) {
            $("#userPwdConfirm").focus();
        } else {
            $.ajax({
                url : "/system/mypage/pwdUpdate.json",
                type : "POST",
                data : {
                    userId : $("#userId").val(),
                    userLoginId : $("#userLoginId").val(),
                    userPwd : $("#chgUserPwd").val()
                },
                dataType : "json",
                success : function(res) {
                    if (res.result == "success") {
                        alert("비밀번호가 변경되었습니다.");

                        $(".pwd-modal").removeClass("custom-modal-show");
                        $(".pwd-modal").addClass("custom-modal-none");
                    } else {
                        alert(res.message);
                    }
                }

            })
        }
    });

})
var userService = (function () {
    var isIdDuplicated = false;
    var isEqualPassword = false;
    var isEqualUserPwd = false;
    var isInsttNmDuplicated = false;

    return {
        // 아이디중복체크 : 상태 초기화
        idDuplicateClear : function () {
            isIdDuplicated = false;
        },
        // 아이디중복체크 : 아이디가 중복인 경우 상태 false, 아이디 중복이 없는 경우 true로 상태 변경
        idDuplicateCheckRequest : function(userLoginId) {
            $.ajax({
                url: "/login/duplicate.json",
                type : "POST",
                data : {userLoginId: userLoginId},
                dataType: 'json',
                success: function(res) {
                    if (res.result === "nonExist") {
                        isIdDuplicated = true;
                        alert(res.message);
                    } else {
                        isIdDuplicated = false;
                        alert(res.message);
                        $("#userLoginId").focus();
                    }
                }
            })
        },
        // 아이디중복체크 : 중복인 경우 에러메시지 표출
        idDuplicateCheck : function () {
            if(!isIdDuplicated) {
                alert("아이디 중복 체크를 진행해주세요.");
            }
            return isIdDuplicated;
        },
        // 비밀번호체크 : 비밀번호와 비밀번호 확인값이 동일하면 true, 동일하지 않으면 false
        comparePasswordEquality : function (password, passwordConfirm) {
            return isEqualPassword = password === passwordConfirm;
        },
        // 비밀번호체크 : 비밀번호와 비밀번호 확인값이 동일하지 않으면 에러메시지 표출
        passwordEqualCheck : function () {
            if(!isEqualPassword) {
                alert("비밀번호가 일치하지 않습니다.");
            }
            return isEqualPassword;
        },
        userPwdCheckClear : function () {
            isEqualUserPwd = false;
        },
        // 비밀번호체크 : 입력한 비밀번호가 사용자 비밀번호와 동일하면 true, 동일하지 않으면 false
        userPasswordEqualCheck : function (p) {
            $.ajax({
                url: "/system/mypage/pwdCheck.json",
                type : "POST",
                data : p,
                dataType: 'json',
                success: function(res) {
                    if(res.result == "success") {
                        isEqualUserPwd = true;
                    } else {
                        isEqualUserPwd = false;
                    }
                }
            })
        },
        userPasswordEqual : function () {
            if(!isEqualUserPwd) {
                alert("비밀번호가 틀렸습니다. 비밀번호를 확인해주세요.");
            }
            return isEqualUserPwd;
        },
        // 기업명중복체크 : 상태 초기화
        insttNmDuplicateClear : function () {
            isInsttNmDuplicated = false;
        },
        // 기업명중복체크 : 이름이 중복인 경우 상태 false, 중복이 아닌 경우 true로 상태 변경
        insttNmDuplicateCheckRequest : function(insttId, insttCd, insttNm) {
            $.ajax({
                url: "/system/instt/duplicateInsttNm.json",
                type : "POST",
                data : {
                    insttId: insttId,
                    insttCd: insttCd,
                    insttNm: insttNm
                },
                dataType: 'json',
                success: function(res) {
                    if (res.result == "success") {
                        if (res.data != 0) {
                            isInsttNmDuplicated = false;
                        } else {
                            isInsttNmDuplicated = true;
                        }
                    } else {
                        alert(res.message);
                    }
                }
            })
        },
        // 기업명중복체크 : 중복인 경우 에러메시지 표출
        insttNmDuplicateCheck : function () {
            if(!isInsttNmDuplicated) {
                alert("입력한 기업명이 존재합니다. 변경바랍니다.");
                $("#insttNm").focus();
            }
            return isInsttNmDuplicated;
        },
        // 입력형식체크
        checkNull : function (data, dataNick, dataType) {
            if(data == "") {
                if(dataType == "text")
                    alert(dataNick + " 입력해주세요.");
                else if(dataType == "select")
                    alert(dataNick + " 선택해주세요.");
                return false;
            } else {
                return true;
            }
        },
        checkLoginId : function (id) {
            if(id == "") {
                return true;
            } else {
                var v = commonValidation.loginIdValidation(id);
                if (!v.isValid) {
                    alert(v.invalidMessage);
                }
                return v.isValid;
            }
        },
        checkPassword : function (password) {
            if(password == "") {
                return true;
            } else {
                var v = commonValidation.passwordValidation(password);
                if (!v.isValid) {
                    alert(v.invalidMessage);
                }
                return v.isValid;
            }
        },
        checkName : function (name, nameNick) {
            if(name == "") {
                return true;
            } else {
                var v = commonValidation.nameValidation(name, nameNick);
                if (!v.isValid) {
                    alert(v.invalidMessage);
                }
                return v.isValid;
            }
        },
        checkPostCd : function (postCd) {
            if(postCd == "") {
                return true;
            } else {
                var v = commonValidation.postCdValidation(postCd);
                if (!v.isValid) {
                    alert(v.invalidMessage);
                }
                return v.isValid;
            }
        },
        checkBusinessNo : function (businessNo) {
            if(businessNo == "") {
                return true;
            } else {
                var v = commonValidation.businessNoValidation(businessNo);
                if (!v.isValid) {
                    alert(v.invalidMessage);
                }
                return v.isValid;
            }
        },
        // 오늘 날짜 출력
        toToday : function () {
            var today = new Date();
            var year = today.getFullYear();
            var month = ('0' + (today.getMonth() + 1)).slice(-2);
            var day = ('0' + today.getDate()).slice(-2);
            return year + month + day;
        },
        // 기본 날짜형식으로 format
        toStdDate : function (str) {
            return (str == null || str == "") ? "" : new Date(str).format('yyyy-MM-dd HH:mm:ss');
        },
        // 일시를 일자형태로 변경
        timeToDate : function (str) {
            return (str == null || str == "") ? "" : new Date(str).format('yyyy.MM.dd');
        },
        // 문자열 시분 형식으로 변환
        strToTime : function (str) {
            return this.nullToBlank(str).replace(/(^[0-9]{2})([0-9]{2})$/, "$1:$2");
        },
        // 기본 날짜시간형식 input datetime-local 형식으로 변환
        stdToDatetime : function (str) {
            return (str == null || str == "")? "" : new Date(str).format('yyyy-MM-dd') +"T" + new Date(str).format('HH:mm');
        },
        // 8자리 문자열 년월일 형식으로 변환
        strToYmd : function (str, sep) {
            var y = str.substr(0, 4);
            var m = str.substr(4, 2);
            var d = str.substr(6, 2);
            return (str == null || str == "") ? "" : new Date(y, m - 1, d).format('yyyy' + sep + 'MM' + sep + 'dd');
        },
        // tinyInt 월 str 출력
        monthToStr : function (num) {
            var str = "";
            if(num == -2) {
                str = "전전월 ";
            } else if(num == -1) {
                str = "전월 ";
            } else if(num == 0) {
                str = "당월 "
            }
            return str;
        },
        // tinyInt 일 str 출력
        dayToStr : function (num) {
            var str = "";
            if(num == 99) {
                str = "말";
            } else{
                str = num.toString();
            }
            return str;
        },
        // 금액 형식으로 변환
        strToPrice : function (str) {
            return this.nullToBlank(str).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        // 전화번호 형식으로 변환
        strToMobile : function (str) {
            return this.nullToBlank(str).replace(/(^02|[0-9]{3})([0-9]{3,4})([0-9]{4})$/, "$1-$2-$3");
        },
        // 사업자번호 형식으로 변환
        strToBizr : function (str) {
            return this.nullToBlank(str).replace(/(^[0-9]{3})([0-9]{2})([0-9]{5})$/, "$1-$2-$3");
        },
        nullToBlank : function (str) {
            return (str == null) ? "" : str;
        },
        // 회원가입시 체크사항
        joinCheckAll : function (p) {
            return this.checkNull(p.id, "아이디를", "text") &&
                this.checkLoginId(p.id) &&
                this.idDuplicateCheck() &&
                this.checkNull(p.password, "비밀번호를", "text") &&
                this.checkPassword(p.password) &&
                this.passwordEqualCheck() &&
                this.checkNull(p.name, "사용자 이름을", "text") &&
                this.checkName(p.name, "사용자 이름은")
        },
        // 회원정보 수정시 체크사항
        userCheckAll : function (p) {
            return this.checkNull(p.name, "사용자 이름을", "text") &&
                this.checkName(p.name, "사용자 이름은")
        },
        // 기업 등록, 수정시 체크사항
        /*insttCheckAll : function (p) {
            return this.checkNull(p.name, "기업명을", "text") &&
                this.checkName(p.name, "기업명은") &&
                this.insttNmDuplicateCheck() &&
                this.checkNull(p.bizrNo, "사업자번호를", "text") &&
                this.checkBusinessNo(p.bizrNo) &&
                this.checkNull(p.rprsntvNm, "대표자명을", "text") &&
                this.checkName(p.rprsntvNm, "대표자명은") &&
                this.checkNull(p.bankCd, "은행을", "select") &&
                this.checkNull(p.accountNo, "계좌번호를", "text") &&
                this.checkNull(p.mobile, "연락처를", "text") &&
                this.checkMobile(p.mobile) &&
                this.checkMobile(p.faxNo, "팩스번호는 -를 제외한 9,10자리의") &&
                this.checkPostCd(p.postCd);
        }*/
    }
}());
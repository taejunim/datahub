<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>

<div class="subWrap">
    <section class="contents full login clear-fix">
        <article class="contentsBody">
            <div class="contentsBody-inner">
                <div class="loginWrap">
                    <span class="formTit" id="viewText">시스템 로그인</span>
                    <form class="pt-3" action="/login/login.mng" method="post" id="loginForm">
                        <input type="hidden" value="${path}" name="path">
                        <input type="hidden" id="userLoginId" name="userLoginId">
                        <input type="hidden" id="userPwd" name="userPwd">
                        <div class="loginForm">
                            <div class="loginFormItem id">
                                <label for="textUserLoginId">
                                    <span>아이디</span>
                                </label>
                                <input type="text" id="textUserLoginId" title="아이디를 입력해 주세요." placeholder="아이디를 입력해 주세요.">
                            </div>
                            <div class="loginFormItem pw">
                                <label for="textUserPwd">
                                    <span>비밀번호</span>
                                </label>
                                <input type="password" id="textUserPwd" title="비밀번호를 입력해 주세요." placeholder="비밀번호를 입력해 주세요.">
                            </div>
                            <button class="loginBtn" id="loginButton">로그인</button>
                        </div>
                        <div class="loginOption clear-fix">
                            <a href="/login/join.mng" class="join">아직, 회원이 아니신가요?</a>
                            <div class="findBtn">
                                <a href="/login/join.mng">회원가입</a>
                                <a href="/login/find.mng">가입확인</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </article>
    </section>
</div>

<script>

    $(document).ready(function() {
        $("#textUserLoginId").focus();

        var error = '<c:out value="${param.error}" />';
        if(error == '-1') {
            alert("아이디 또는 비밀번호를 다시 확인하세요. 등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력하셨습니다.");
        } else if(error == '-2') {
            alert("패스워드 5회 이상 실패(관리자에게 문의하세요.)");
        } else {
            var userInputId = getCookie("userInputId");
            if(userInputId == ""){
                $("#saveID").attr("checked", false);
            }else{
                $("#textUserLoginId").val(userInputId);
                $("#saveID").attr("checked", true);
            }
        }
    });

    $("#loginButton").click(function(){
        if($("#textUserLoginId").val() == ""){
            event.preventDefault()
            alert("아이디를 입력해주세요.");
            $("#textUserLoginId").focus();
        }else if($("#textUserPwd").val() == ""){
            event.preventDefault()
            alert("비밀번호를 입력해주세요.");
            $("#textUserPwd").focus();
        }else {
            if ($("#saveID").is(":checked")) {
                var userInputId = $("#textUserLoginId").val();
                setCookie("userInputId", userInputId, 7); // 7일 동안 쿠키 보관
            } else {
                deleteCookie("userInputId");
            }
            event.preventDefault();
            var encryptionKey = 'jinwoosi1234567*';
            var iv = 'jinwoosi1234567*';

            var textUserLoginId = $("#textUserLoginId").val();
            var textUserPwd = $("#textUserPwd").val();

            var encryptedUserLoginId = CryptoJS.AES.encrypt(textUserLoginId, CryptoJS.enc.Utf8.parse(encryptionKey), {
                iv: CryptoJS.enc.Utf8.parse(iv),
                padding: CryptoJS.pad.Pkcs7,
                mode: CryptoJS.mode.CBC
            });

            var encryptedUserPwd = CryptoJS.AES.encrypt(textUserPwd, CryptoJS.enc.Utf8.parse(encryptionKey), {
                iv: CryptoJS.enc.Utf8.parse(iv),
                padding: CryptoJS.pad.Pkcs7,
                mode: CryptoJS.mode.CBC
            });

            $("#userLoginId").val(encryptedUserLoginId.toString());
            $("#userPwd").val(encryptedUserPwd.toString());

            $("#loginForm").submit();
        }
    });

    $("input").keypress(function(event) {
        if(event.which == 13) {
            if($("#textUserLoginId").val() == ""){
                event.preventDefault()
                alert("아이디를 입력해주세요.");
            }else if($("#textUserPwd").val() == ""){
                event.preventDefault()
                alert("비밀번호를 입력해주세요.");
            }else{
                if($("#saveID").is(":checked")){
                    var userInputId = $("#textUserLoginId").val();
                    setCookie("userInputId", userInputId, 7); // 7일 동안 쿠키 보관
                }else{
                    deleteCookie("userInputId");
                }
                event.preventDefault();
                var encryptionKey = 'jinwoosi1234567*';
                var iv = 'jinwoosi1234567*';

                var textUserLoginId = $("#textUserLoginId").val();
                var textUserPwd = $("#textUserPwd").val();

                var encryptedUserLoginId = CryptoJS.AES.encrypt(textUserLoginId, CryptoJS.enc.Utf8.parse(encryptionKey), {
                    iv: CryptoJS.enc.Utf8.parse(iv),
                    padding: CryptoJS.pad.Pkcs7,
                    mode: CryptoJS.mode.CBC
                });

                var encryptedUserPwd = CryptoJS.AES.encrypt(textUserPwd, CryptoJS.enc.Utf8.parse(encryptionKey), {
                    iv: CryptoJS.enc.Utf8.parse(iv),
                    padding: CryptoJS.pad.Pkcs7,
                    mode: CryptoJS.mode.CBC
                });

                $("#userLoginId").val(encryptedUserLoginId.toString());
                $("#userPwd").val(encryptedUserPwd.toString());

                $("#loginForm").submit();
            }
        }
    });

    //쿠키 등록 함수
    function setCookie(cookieName, value, exdays){
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
        document.cookie = cookieName + "=" + cookieValue;
    }

    //쿠키 삭제 함수
    function deleteCookie(name){
        today   = new Date();
        today.setDate(today.getDate() - 1);
        document.cookie = name + "=; path=/; expires=" + today.toGMTString() + ";";
    }

    //쿠키 호출 함수
    function getCookie(cookieName) {
        cookieName = cookieName + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cookieName);
        var cookieValue = '';
        if(start != -1){
            start += cookieName.length;
            var end = cookieData.indexOf(';', start);
            if(end == -1)end = cookieData.length;
            cookieValue = cookieData.substring(start, end);
        }
        return unescape(cookieValue);
    }

</script>	
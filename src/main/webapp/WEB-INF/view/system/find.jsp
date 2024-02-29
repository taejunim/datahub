<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>

<div class="subWrap">
    <section class="contents full login clear-fix">
        <article class="contentsBody">
            <div class="contentsBody-inner">
                <div class="loginWrap">
                    <form id="fmFind" name="fmFind" class="pt-3">
                        <span class="formTit" id="viewText">가입확인</span>
                        <div class="loginForm">
                            <div class="loginFormItem id">
                                <label for="userLoginId">
                                    <span>사용자아이디</span>
                                </label>
                                <input type="text" id="userLoginId" name="userLoginId" title="사용자아이디를 입력해 주세요." placeholder="사용자아이디를 입력해 주세요.">
                            </div>
                            <div class="loginFormItem id">
                                <label for="userNm">
                                    <span>사용자이름</span>
                                </label>
                                <input type="text" id="userNm" name="userNm" title="사용자이름을 입력해 주세요." placeholder="사용자이름을 입력해 주세요.">
                            </div>
                            <button type="button" class="loginBtn" id="findBtn">확인</button>
                        </div>
                        <div class="loginOption clear-fix">
                            <a href="/login/join.mng" class="join">아직, 회원이 아니신가요?</a>
                            <div class="findBtn">
                                <a href="/login/loginForm.mng">로그인</a>
                                <a href="/login/join.mng">회원가입</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </article>
    </section>
</div>

<script src="<c:url value='/js/util/formUtil.js'/>"></script>
<script>

    $(document).ready(function() {
        $("#userLoginId").focus();
    });

    $("#findBtn").click(function(){
        var form = document.fmFind;

        if(!formUtil.chkText(form.userLoginId, "사용자아이디", 2, 20)) return;
        else if(!formUtil.chkText(form.userNm, "사용자이름", 2, 20)) return;

        $.ajax({
            url: "/login/user/find.json",
            type: "POST",
            data: $("#fmFind").serialize(),
            dataType: "json",
            success: function (res) {
                if(res.result === "success") {
                    if(res.data == null || strUtil.isEmpty(res.data.userLoginId)) {
                        alert("회원정보가 없습니다.");
                    } else {
                        if(confirm("회원님의 아이디 '"+res.data.userLoginId+"'이 존재합니다.\n로그인하시겠습니까?")) {
                            location.href = "/login/loginForm.mng";
                        }
                    }
                } else {
                    alert(res.message);
                }
            }
        })
    });

</script>
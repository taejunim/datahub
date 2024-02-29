<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf" %>
<!--<style>
    .header .util > ul > li > a { background: none; }
</style>-->
<header class="header">
    <h1 class="logo">
        <a href="/">
            <img src="/images/cmn/logo.png" alt="제주스마트시티 데이터허브 서비스">
        </a>
    </h1>
    <div class="util" id="login1">
        <ul id="ulLink"></ul>
    </div>
</header>

<script>
    $(document).ready(function () {

        var viewText = $("#viewText").html();
        var innerHtml = "";

        $("#ulLink").html("");

        if (viewText == "시스템 로그인") {

            innerHtml = "<li><a href='/login/join.mng' style='background: none;'>회원가입</a></li>"
                + " <li><a href='/login/find.mng' style='background: none;'>가입확인</a></li>";

        } else if (viewText == "회원가입") {

            innerHtml = "<li><a href='/login/loginForm.mng' style='background: none;'>로그인</a></li>"
                + " <li><a href='/login/find.mng' style='background: none;'>가입확인</a></li>";

        } else if (viewText == "가입확인") {

            innerHtml = "<li><a href='/login/join.mng' style='background: none;'>회원가입</a></li>"
                + " <li><a href='/login/loginForm.mng' style='background: none;'>로그인</a></li>";
        }
        $("#ulLink").html(innerHtml);
    });
</script>
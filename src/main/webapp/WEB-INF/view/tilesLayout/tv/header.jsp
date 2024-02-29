<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf" %>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<header class="header">
    <h1 class="logo">
        <a href="/pm/gis/gis.mng?currentMenuId=1040"><img src="/images/cmn/logo.png" alt="제주스마트시티 데이터허브 서비스"></a>
    </h1>
    <div class="util">
        <ul class="nav navbar-nav">
            <li class="dropdown user user-menu"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"> <span class="hidden-xs"><c:out value='${user.userNm}'/>&nbsp;님 </span> </a>
                <ul class="dropdown-menu">
                    <li class="user-footer">
                        <div style="padding-bottom: 10px;"> <a href="/system/mypage/list.mng" class="btn btn-default btn-flat" style="width: 100%;">마이페이지</a> </div>
                        <div> <a href="/logout.mng" class="btn btn-default btn-flat" style="width: 100%;">로그아웃</a> </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <button class="sub-open-btn">모바일 메뉴 열기</button>
    <div class="m-menu-bg"></div>
    <!-- 모바일 메뉴 시작 -->
    <div class="m-menu-con">
        <div class="m-header-top">
            <p>제주스마트시티<strong>데이터허브 서비스</strong></p>
            <button type="button" class="sub-open-close"><span class="skip">메뉴닫기</span></button>
            <div class="m-sub-btn">
                <a href="/system/mypage/list.mng" class="m-menu-sub-btn">마이페이지</a>
                <a href="/logout.mng" class="m-menu-sub-btn">로그아웃</a>
            </div>
        </div>
        <tg:mobileSideMenuTag/>
    </div>
</header>
<form id="excelDownForm" style="display: none;">
    <input type="hidden" id="excelFileName" name="excelFileName">
    <input type="hidden" id="excelFileDownName" name="excelFileDownName">
</form>
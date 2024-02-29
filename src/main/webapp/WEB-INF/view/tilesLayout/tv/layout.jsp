<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/view/include/tags.jspf" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>의사결정 지원 시스템(${versions_build})</title>
    <script type="text/javascript" src="https://map.vworld.kr/js/webglMapInit.js.do?version=2.0&apiKey=D5152B22-77A2-311E-B514-EFD1422CD4ED"></script>

    <link rel="stylesheet" href="/css/cms.css">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/js/jquery-ui-1.12.1.custom/jquery-ui.min.css" type="text/css">
    <link rel="stylesheet" href="/css/common.css" type="text/css">
    <link rel="stylesheet" href="/css/component.css" type="text/css">
    <link rel="stylesheet" href="/css/layout.css" type="text/css">
    <link rel="stylesheet" href="/css/sub.css" type="text/css">
    <link rel="stylesheet" href="/css/responsive.css" type="text/css">
    <link rel="stylesheet" href="/css/tv.css" type="text/css">
    <link rel="stylesheet" type="text/css" href="/css/plugins/datepicker/jqueryDatepickerCustom.css"/>

    <link rel="stylesheet" href="/css/board.css">

    <script src="/js/jquery-1.12.4.min.js"></script>
    <script src="/js/jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>
    <script src="/js/cmn_script.js"></script>
    <script src="/js/tv/protectionZone/common.js"></script>

    <script src="<c:url value='/js/common/app.min.js' />"></script>
    <script src="<c:url value='/js/plugins/datatables/jquery.dataTables.min.js' />"></script>
    <script src="<c:url value='/js/plugins/datatables/korLanguegeSet.js' />"></script>
    <script src="<c:url value='/js/common/bootstrap.js' />"></script>
    <script src="<c:url value='/js/plugins/datatables/dataTables.bootstrap.min.js' />"></script>
    <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/percent.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/wc.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/locales/ko_KR.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/plugins/exporting.js"></script>
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="subWrap">
    <input type="hidden">
    <div class="wrapper">
        <tiles:insertAttribute name="header"/>
        <section class="contents clear-fix">
            <tiles:insertAttribute name="main-sidebar"/>
            <tiles:insertAttribute name="content"/>
            <tiles:insertAttribute name="footer"/>
            <div class="progress-body" style="display: block;">
                <div class="progress-content"></div>
            </div>
        </section>
    </div>
</div>
</body>
</html>
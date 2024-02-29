<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/view/include/tags.jspf" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    <title>의사결정 지원 시스템(${versions_build})</title>
    <link rel="stylesheet" href="/css/fullcalendar.min.css">

    <link rel="stylesheet" href="/js/jquery-ui-1.12.1.custom/jquery-ui.min.css" type="text/css">
    <link rel="stylesheet" href="/css/common.css" type="text/css">
    <link rel="stylesheet" href="/css/component.css" type="text/css">
    <link rel="stylesheet" href="/css/layout.css" type="text/css">
    <link rel="stylesheet" href="/css/modeling.css" type="text/css">
    <link rel="stylesheet" href="/css/sub.css" type="text/css">
    <link rel="stylesheet" href="/css/responsive.css" type="text/css">
    <script src="/js/jquery-1.12.4.min.js"></script>
    <script src="/js/jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>
    <script src="/js/cmn_script.js"></script>

   <%-- <link rel="stylesheet" href="/css/_all-skins.min.css">--%>
    <link rel="stylesheet" href="/css/cms.css">
    <link rel="stylesheet" href="/css/pm.css?ver=${versions_build}">
    <link rel="stylesheet" href="/css/board.css">
    <link rel="stylesheet" href="/css/selectStyle.css">

   <%-- <link rel="stylesheet" href="/css/bootstrap.css">--%>
    <link rel="stylesheet" href="/css/plugins/datatables/dataTables.bootstrap.css">
    <link rel="stylesheet" href="/css/plugins/bootstrapSelect/bootstrap-select.min.css">
    <link rel="stylesheet" href="/css/plugins/datepicker/bootstrap-datepicker3.css">
    <link rel="stylesheet" href="/css/plugins/datepicker/bootstrap-datetimepicker.css"> <!-- css 추가 -->
    <link rel="stylesheet" href="/css/plugins/jstree/style.min.css">
    <link rel="stylesheet" href="/css/plugins/lightbox/lightbox.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/fullcalendar/lib/cupertino/jquery-ui.min.css"/>
    <link rel="stylesheet" href="/fullcalendar/fullcalendar.css"/>
    <link rel="stylesheet" media="print" href="/fullcalendar/fullcalendar.print.css"/>
    <link rel="stylesheet" type="text/css" href="/css/plugins/morris/morris.css"/>
    <link rel="stylesheet" type="text/css" href="/css/plugins/d3/nv.d3.css"/>
    <link rel="stylesheet" type="text/css" href="/css/plugins/d3/c3.css"/>
    <link rel="stylesheet" type="text/css" href="/css/plugins/d3/c3.min.css"/>
    <link rel="stylesheet" type="text/css" href="/css/plugins/d3/nv.d3.min.css"/>
    <link rel="stylesheet" type="text/css" href="/css/plugins/datepicker/jqueryDatepickerCustom.css"/>
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">

    <!--[if IE 7]>
    <link rel="stylesheet" href="../css/font-awesome-ie7.min.css">
    <![endif]-->
    <!--[if IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <script src="<c:url value='/js/util/formUtil.js'/>"></script>
    <script src="<c:url value='/js/d3/d3.js'/>"></script>
    <script src="<c:url value='/js/d3/c3.js'/>"></script>
    <script src="<c:url value='/js/d3/c3.min.js'/>"></script>
    <script src="<c:url value='/js/d3/nv.d3.js'/>"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.7.1/nv.d3.min.js"></script>
    <script type="text/javascript" src="http://d3js.org/d3.v3.min.js"></script>
    <script src="<c:url value='/js/jquery/jQuery-2.1.4.min.js' />"></script>
    <script src="<c:url value='/ckeditor/ckeditor.js' />"></script>
    <script src="<c:url value='/fullcalendar/lib/moment.min.js'/>"></script>
    <script src="<c:url value='/fullcalendar/lib/jquery.min.js'/>"></script>
    <script src="<c:url value='/fullcalendar/fullcalendar.min.js'/>"></script>
    <script src="<c:url value='/fullcalendar/lang-all.js'/>"></script>
    <script src="<c:url value='/js/plugins/placeholder/jquery.placeholder.js'/>"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <script src="<c:url value='/js/plugins/morris/morris.min.js'/>"></script>
    <!-- <script src="/js/jquery/jQuery-2.1.4.min.js"></script> -->
    <script src="/js/jquery/jquery-ui.js"></script>
    <script src="/js/plugins/moment/moment-with-locales.js"></script>
    <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
    <script src="<c:url value='/js/common/bootstrap.js' />"></script>
    <script src="<c:url value='/js/plugins/datatables/jquery.dataTables.min.js' />"></script>
    <script src="<c:url value='/js/plugins/datatables/dataTables.bootstrap.min.js' />"></script>
    <script src="<c:url value='/js/plugins/bootstrapSelect/bootstrap-select.min.js' />"></script>
    <script src="<c:url value='/js/plugins/datepicker/bootstrap-datetimepicker.js' />"></script> <!-- js 추가 -->
    <script src="<c:url value='/js/plugins/jqueryForm/jquery.form.js' />"></script>
    <script src="<c:url value='/js/plugins/jstree/jstree.min.js' />"></script>
    <script src="<c:url value='/js/plugins/lightbox/lightbox.js' />"></script>
    <script src="<c:url value='/js/plugins/fileupload/jquery.fileupload.js' />"></script>
    <script src="<c:url value='/js/plugins/alphanum/jquery.alphanum.js' />"></script>
    <script src="<c:url value='/js/common/app.min.js' />"></script>
    <script src="<c:url value='/js/common/common.js' />"></script>
    <script src="<c:url value='/js/common/file.js' />"></script>
    <script src="<c:url value='/js/common/smsExcel.js' />"></script>

    <script src="<c:url value='/js/plugins/datatables/korLanguegeSet.js' />"></script>
    <%--
    <script src="<c:url value='/js/plugins/dotdotdot/jquery.dotdotdot.min.js'/>"></script>
    --%>
    <script src="<c:url value='/js/common/innerWidthCheck.js' />"></script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.js"></script>

    <script src="/js/amcharts5/index.js"></script>
    <script src="/js/amcharts5/xy.js"></script>
    <script src="/js/amcharts5/percent.js"></script>
    <script src="/js/amcharts5/wc.js"></script>
    <script src="/js/amcharts5/themes/Animated.js"></script>

    <script src="/js/amcharts5/locales/ko_KR.js"></script>
    <script src="/js/amcharts5/plugins/exporting.js"></script>

    <script src="/energy/js/user/userService.js"></script>

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
    </section>

</div>
</div>
<script>
    $(document).ready(function () {
        /*$(".datepicker").datepicker({
            format: "yyyy-mm-dd"
            , autoclose: true
            , language: "ko"
            , todayBtn: "linked"
            , clearBtn: true
        });*/

        /*$.datepicker.setDefaults({
            closeText: "닫기",
            currentText: "오늘",
            prevText: '이전 달',
            nextText: '다음 달',
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            dayNames: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            weekHeader: "주",
            yearSuffix: '년'
        });*/

        //모달창이동
        /*$('.modal-content').draggable({
            handle: ".modal-header"
        });*/
    });
</script>
</body>
</html>
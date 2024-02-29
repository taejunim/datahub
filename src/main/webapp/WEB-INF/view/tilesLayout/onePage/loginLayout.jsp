<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

<title>의사결정 지원 시스템</title>

<link rel="stylesheet" href="../js/jquery-ui-1.12.1.custom/jquery-ui.min.css" type="text/css">
<link rel="stylesheet" href="../css/common.css" type="text/css">
<link rel="stylesheet" href="../css/component.css" type="text/css">
<link rel="stylesheet" href="../css/layout.css" type="text/css">
<link rel="stylesheet" href="../css/sub.css" type="text/css">
<link rel="stylesheet" href="../css/system.css" type="text/css"> <!-- 회원가입 css-->
<link rel="stylesheet" href="../css/responsive.css" type="text/css">
<link rel="icon" href="data:;base64,iVBORw0KGgo=">

<script src="/js/jquery-1.12.4.min.js"></script>
<script src="/js/jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>
<script src="/js/cmn_script.js"></script>

<script src="/js/plugins/placeholder/jquery.placeholder.js"></script>
<script src="/js/crypto-js-4.0.0/crypto-js.js"></script>
</head>
<body class="hold-transition login-page">
<div class="wrapper">
	<tiles:insertAttribute name="header"/>
	<section class="contents clear-fix">
		<tiles:insertAttribute name="content"/>
		<tiles:insertAttribute name="footer"/>
	</section>
</div>

	<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
	<script src="/js/jquery/jquery-ui.js"></script>
	<script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
	<script src="<c:url value='/js/common/bootstrap.js' />"></script>
	<script src="<c:url value='/js/plugins/jstree/jstree.min.js' />"></script>
	<script src="<c:url value='/js/plugins/lightbox/lightbox.js' />"></script>
	<script src="<c:url value='/js/plugins/fileupload/jquery.fileupload.js' />"></script>
	<script src="<c:url value='/js/common/app.min.js' />"></script>
	<script src="<c:url value='/js/common/common.js' />"></script>
	<script src="<c:url value='/js/common/file.js' />"></script>
	<script src="/js/plugins/iCheck/icheck.min.js"></script>
	<script src="<c:url value='/js/plugins/datatables/jquery.dataTables.min.js' />"></script>
	<script src="<c:url value='/js/plugins/datatables/dataTables.bootstrap.min.js' />"></script>
	<script src="<c:url value='/js/plugins/bootstrapSelect/bootstrap-select.min.js' />"></script>
	<script src="<c:url value='/js/plugins/datepicker/bootstrap-datepicker.js' />"></script>
	<script src="<c:url value='/js/plugins/datepicker/bootstrap-datepicker.ko.min.js' />"></script>

	<script>
	/* $(document).ready(function() {
		$('input').iCheck({
			checkboxClass: 'icheckbox_square-blue',
			radioClass: 'iradio_square-blue',
			increaseArea: '20%' // optional
		});
	}); */
	</script>
</body>
</html>
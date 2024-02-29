<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>
<article class="contentsBody">
	<div class="contentsBody-inner">
		<div class="contentsHd clear-fix">
			<tg:menuInfoTag />
		</div>
		<div class="search-box searchCondition loginData clear-fix">
			<div class="formItem">
				<label for="userLoginIdLike" class="form-tit">사용자ID</label>
				<input type="text" id="userLoginIdLike" class="inputTxt-md mr5" maxlength="30">
			</div>
			<div class="formItem">
				<label for="userNmLike" class="form-tit">사용자명</label>
				<input type="text" id="userNmLike" class="inputTxt-md mr5" maxlength="30">
			</div>
			<div class="formItem">
				<label for="loginIpLike" class="form-tit">로그인 IP</label>
				<input type="text" id="loginIpLike" class="inputTxt-md mr5" maxlength="30">
			</div>
			<div class="btn-group onlySearch">
				<button class="cmnBtn search" id="searchBtn">조회</button>
				<button class="cmnBtn cancel" id="resetBtn">초기화</button>
			</div>
		</div>
		<div class="clear-fix">
			<div class="floatLt">
				<p class="listTotal">총<span id="loginLogList-total">0</span>개</p>
			</div>
			<div class="floatRt">
				<select name="" id="loginLogList-dropdown" class="select-xs">
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
				</select>
				<span class="form-name">개씩 보기</span>
			</div>
		</div>
		<div class="tableWrap">
			<table class="listTable" id="datatable"></table>
		</div>
	</div>
</article>

<%--<section class="content">
	<div class="row">
		&lt;%&ndash;<div class="col-xs-12">
			&lt;%&ndash;<div class="box box-success">
				<div class="box-header">
					<h3 class="box-title"><i class='material-icons' style='font-size:16px;'>play_arrow</i>&nbsp;&nbsp;검색조건</h3>
				</div>
				&lt;%&ndash;<div class="box-body">
					<form name="searchForm">
						<div class="row">
							&lt;%&ndash;<div class="col-sm-4 col-xs-12" style="margin-bottom: 10px;">
                            	<div class="input-group">
                               		<span class="input-group-addon">사용자 ID</span>
                               		<input type="text" id="userLoginIdLike" class="form-control searchWord" placeholder="사용자 ID 입력" maxlength="30">
                             	</div>
							</div>&ndash;%&gt;
							&lt;%&ndash;<div class="col-sm-4 col-xs-12" style="margin-bottom: 10px;">
                             	<div class="input-group">
                                	<span class="input-group-addon">사용자명</span>
                                	<input type="text" id="userNmLike" class="form-control searchWord" placeholder="사용자명 입력" maxlength="30">
                            	</div>
                            </div>&ndash;%&gt;
							&lt;%&ndash;<div class="col-sm-4 col-xs-12">
                            	<div class="input-group">
                                	<span class="input-group-addon">로그인 IP</span>
                                	<input type="text" id="loginIpLike" class="form-control searchWord" placeholder="로그인 IP 입력" maxlength="30">
                             	</div>
                            </div>&ndash;%&gt;
						</div>
					</form>
				</div>&ndash;%&gt;
				<div class="box-footer">
					<div class="btn-group pull-right">
						&lt;%&ndash;<button type="button" class="btn btn-outline-primary" id="searchBtn">검색</button>
						<button type="button" class="btn btn-outline-primary" id="resetBtn">리셋</button>&ndash;%&gt;
					</div>
				</div>
			</div>&ndash;%&gt;
		</div>&ndash;%&gt;
		&lt;%&ndash;<div class="col-xs-12">
			<div class="box box-primary">
				<div class="box-body">
					<table id="datatable" class="table table-bordered table-striped" style="width:100%; table-layout:fixed;"></table>
				</div>
			</div>
		</div>&ndash;%&gt;
	</div>
</section>--%>

<%--<div class="modal fade useLog-modal" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h2>사용이력</h2>
			</div>
			<div class="modal-body">
				<div class="row-mod">
					<div class="col-sm-6 col-xs-12" style="margin-bottom: 10px;">
                    	<div class="input-group">
                       		<span class="input-group-addon">사용자ID</span>
                       		<input type="text" id="userLoginId" name="userLoginId" class="form-control" readonly>
                     	</div>
					</div>
					<div class="col-sm-6 col-xs-12" style="margin-bottom: 10px;">
                    	<div class="input-group">
                       		<span class="input-group-addon">로그인</span>
                       		<input type="text" id="loginDt" class="form-control" readonly>
                     	</div>
					</div>
					<div class="col-sm-6 col-xs-12" style="margin-bottom: 10px;">
                    	<div class="input-group">
                       		<span class="input-group-addon">사용자명</span>
                       		<input type="text" id="userNm" class="form-control" readonly>
                     	</div>
					</div>
					<div class="col-sm-6 col-xs-12" style="margin-bottom: 10px;">
                    	<div class="input-group">
                       		<span class="input-group-addon">로그아웃</span>
                       		<input type="text" id="logoutDt" class="form-control" readonly>
                     	</div>
					</div>
				</div>
				<table id="useLogDatatable" class="table table-bordered table-striped" style="width:95%; table-layout:fixed;"></table>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-outline-primary" data-dismiss="modal">닫기</button>
			</div>
		</div>
	</div>
</div>
<div class="modal fade parameterDetail-modal" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h2>파라미터 상세보기</h2>
			</div>
			<div class="modal-body">
				<form id="userDetailForm" name="userDetailForm" class="form-horizontal form-label-left">
					<table class="table table-condensed">
						<colgroup>
							<col width="30%">
							<col width="70%">
						</colgroup>
						<tbody>
							<tr>
								<th class="text-center">파라미터</th>
								<td><textarea name="reqParam" id="reqParam" class="form-control col-md-7 col-xs-12" rows="5" readonly="readonly"></textarea></td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-outline-primary" data-dismiss="modal">닫기</button>
			</div>
		</div>
	</div>
</div>--%>
<script>

	var datatable;
	var loginLogId = '<%=session.getAttribute("loginLogId")%>';

	$(document).ready(function() {

		//모달창이동
		$('.modal-content').draggable({
			handle: ".modal-header"
		});

		//placeholder 브라우저호환
		$('input').placeholder();

		datatable = $("#datatable").DataTable({
			"searching" : false
			,"paging": true
			,"bPaginate": true
			,"responsive": true
			,"language": {
				lengthMenu: "_MENU_",
				info: ''
			}
			,"ajax" : {
				"url" : "<c:url value='/system/scur/loginLogList.json' />"
				,"method" : "post"
				,"data" : function(d) {
					if ($('#userLoginIdLike').val() != "") {d.userLoginIdLike = $('#userLoginIdLike').val();}
					if ($('#userNmLike').val() != "") {d.userNmLike = $('#userNmLike').val();	}
					if ($('#loginIpLike').val() != "") {d.loginIpLike = $('#loginIpLike').val();	}
				}
				,"dataSrc": function (data) {
					$("#loginLogList-total").text(data.recordsTotal);
					return data.data;
				}
				,"error" : function(xhr, status, err) {
					dataTablesError(xhr);
				}
			},"processing": true
			,"serverSide": true
			,"order" : [[3, 'desc']]
			,"columns": [
				{ "name" : "LOGIN_LOG_ID", "title" : "번호", "data" : "loginLogId", "className" : "dt-head-center dt-body-center", "orderable": false},
				{ "name" : "USER_LOGIN_ID", "title" : "사용자", "render" :
					function (data, type, row) {
						var loginInfo = row["user"]["userLoginId"]+"("+row["user"]["userNm"]+")";
						return loginInfo;
				}, "className" : "dt-head-center dt-body-left", "orderable": false},
				{ "name" : "LOGIN_IP", "title" : "로그인 IP", "data" : "loginIp", "className" : "dt-head-center dt-body-center", "orderable" : false },
				{ "name" : "LOGIN_DT", "title" : "로그인일시", "render" :
					function (data, type, row) {
						return new Date(row["loginDt"]).format("yyyy-MM-dd HH:mm:ss");
				}, "className" : "dt-head-center dt-body-center"},
				{ "name" : "LOGOUT_DT", "title" : "로그아웃일시", "render" :
					function (data, type, row) {
						if(row["logoutDt"] != null){
							return new Date(row["logoutDt"]).format("yyyy-MM-dd HH:mm:ss");
						}else{
							if(row["loginLogId"] ==  loginLogId ){
								return "로그인중";
							}else{
								return "세션아웃";
							}
						}
				}, "className" : "dt-head-center dt-body-center", "orderable" : false },
/*				{ "render" :
					function (data, type, row) {
						var html = "";
						html += "<button type='button' class='btn btn-xs btn-outline-primary' data-toggle='tooltip' title='사용이력' onclick='showUseLog(\""+row["loginLogId"]+"\",\""+row["user"]["userLoginId"]+"\",\""+row["user"]["userNm"]+"\",\"";
						html += ""+new Date(row["loginDt"]).format("yyyy-MM-dd HH:mm:ss")+"\",\"";
						if(row["logoutDt"] != null){
							html +=  new Date(row["logoutDt"]).format("yyyy-MM-dd HH:mm:ss");
						}else{
							if(row["loginLogId"] ==  loginLogId ){
								html += "로그인중";
							}else{
								html += "세션아웃";
							}
						}
						html += "\")'><i class='material-icons'>list_alt</i></button>&nbsp;";
						return html;
					},
					"title":"기능", "className": "dt-head-center dt-body-center", "orderable" : false,
				}*/
			]
			,"scrollX": "100%"
			,"columnDefs": [
				{"targets": [0], width:"100px"}
				,{"targets": [1], width:"120px"}
				,{"targets": [2], width:"150px"}
				,{"targets": [3], width:"180px"}
				,{"targets": [4], width:"180px"}
				// ,{"targets": [5], width:"50px"}
			]
			,"fnRowCallback": function(nRow, aData, iDisplayIndex) {
				$(nRow).on('click', function() {
					getSearchCondition(document.searchForm);
				});
			}
			,"lengthMenu": [[10, 20, 30], [10, 20, 30]]
			,"initComplete": function(settings, json) {
				this.api().page('last').draw('page');
				$("#datatable_length").css("display", "none");
			}
			,"drawCallback": function (settings) {
				$("#datatable_paginate").addClass("pagination");
				$("#datatable_paginate .active").addClass("on");
			}
		});

		$("#loginLogList-dropdown").on("change", function() {
			var val = parseInt(this.value);
			var dropdown = document.querySelector('.dataTables_length select');

			if (dropdown instanceof HTMLSelectElement) {
				var changeEvent = new Event("change");
				if (val === 10) {
					dropdown.selectedIndex = 0;
				} else if (val === 20) {
					dropdown.selectedIndex = 1;
				} else if (val === 30) {
					dropdown.selectedIndex = 2;
				}
				dropdown.dispatchEvent(changeEvent);
			}
		});

		setSearchCondition(document.searchForm);
	});

	$(".searchWord").keyup(function(e){
		if(e.keyCode == 13)
			datatable.ajax.reload();
	})

	function showParameter(webLogId){
		$.ajax({
			url : "<c:url value='/system/webLog/selectOne.json' />" ,
			type : "POST" ,
			data : {"webLogId": webLogId} ,
			dataType : "json" ,
			success : function(res) {
				if(res.result == "success"){
					if(res.data.reqParam == ""){
						var msg = "파라미터가 없습니다.";
						$("#reqParam").val(msg);
					}else{
						$("#reqParam").val(res.data.reqParam);
					}
					$('div.parameterDetail-modal').modal("show");
				}else {
					alert(res.message);
				}
			}
		})
	}

	function showUseLog(loginLogId, userLoginId, userNm, loginDt, logoutDt){
		$('#userLoginId').val(userLoginId);
		$('#userNm').val(userNm);
		$('#loginDt').val(loginDt);
		$('#logoutDt').val(logoutDt);
		dataUseLogtable = $("#useLogDatatable").DataTable({
			"searching" : false
			,"destroy" : true
			,"paging": true
			,"bPaginate": true
			,"responsive": true
			,"language": lang_kor
			,"ajax" : {
				"url" : "<c:url value='/system/webLog/list.json' />"
				,"method" : "post"
				,"data" : {"loginLog.loginLogId" : loginLogId }
				,"error" : function(xhr, status, err) {
					dataTablesError(xhr);
				}
			},"processing": true
			,"serverSide": true
			,"order" : [[0, 'desc']]
			,"columns": [
				{ "name" : "WEB_LOG_ID", "title" : "번호", "data" : "webLogId", "className" : "dt-head-center dt-body-center" },
				{ "name" : "PGM_NM", "title" : "프로그램", "render" :
					function (data, type, row) {
						if(row["pgmNm"] != null)
							return row["pgmNm"];
						else
							return row["reqUrl"];
				}, "className" : "dt-head-center dt-body-left" },
				{ "name" : "REQ_MTHD", "title" : "형식", "data" : "reqMthd", "className" : "dt-head-center dt-body-center" },
				{ "render" :
					function (data, type, row) {
						var html = "";
						html += "<button type='button' class='btn btn-xs btn-outline-primary' data-toggle='tooltip' title='파라미터' onclick='showParameter(\""+row["webLogId"]+"\")'><i class='material-icons'>message</i></button>&nbsp;";
						return html;
					},
					"title":"파라미터", "className": "dt-head-center dt-body-center", "orderable" : false,
				},
				{ "name" : "REG_DT", "title" : "사용일시", "render" :
					function (data, type, row) {
						return new Date(row["regDt"]).format("yyyy-MM-dd HH:mm:ss");
				}, "className" : "dt-head-center dt-body-center" },
			]
			,"scrollX": "100%"
			,"columnDefs": [
				{"targets": [0], width: "100px"}
				,{"targets": [1], width: "150px"}
				,{"targets": [2], width: "80px"}
				,{"targets": [3], width: "80px"}
				,{"targets": [4], width: "180px"}
			]
			,"fnDrawCallback": function() {
                $('div.useLog-modal').modal("show");
			}
		});
	}

	$("#searchBtn").click(function() {
		datatable.ajax.reload();
	});

	$("#resetBtn").click(function() {
		$('#userLoginIdLike').val("");
		$('#userNmLike').val("");
		$('#loginIpLike').val("");
		datatable.ajax.reload();
	});

</script>
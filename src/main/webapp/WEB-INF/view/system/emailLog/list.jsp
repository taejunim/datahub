<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>

<section class="content-header">
	<tg:menuInfoTag />
</section>

<section class="content">
	<div class="row">
		<div class="col-xs-12"> 
			<div class="box box-success">
				<div class="box-header">
					<h3 class="box-title"><i class='material-icons' style='font-size:16px;'>play_arrow</i>&nbsp;&nbsp;검색조건</h3>
					<div class="box-tools pull-right">
						<button class="btn btn-outline-primary" data-widget="collapse"><i class="fa fa-minus"></i></button>
						<button class="btn btn-outline-primary" data-widget="remove"><i class="fa fa-times"></i></button>
					</div>
				</div>
				
				<div class="box-body">
					<form name="searchForm">
						<div class="row">
                            <div class="col-xs-4">						
                            	<div class="input-group">
	                               	<span class="input-group-addon">발신자명</span>
	                               	<input type="text" id="sendUserNmLike" class="form-control searchWord" placeholder="발신자명 입력" maxlength="30">
	                            </div>
                            </div>
                            <div class="col-xs-4">						
                             	<div class="input-group">
                                	<span class="input-group-addon">수신자명</span>
                                	<input type="text" id="recvUserNmLike" class="form-control searchWord" placeholder="수신자명 입력" maxlength="30">
                             	</div>
                            </div>
							<div class="col-xs-4">						
                             	<div class="input-group">
                                	<span class="input-group-addon">수신자 Email</span>
                                	<input type="text" id="recvEmailLike" class="form-control searchWord" placeholder="수신자 Email입력" maxlength="30">
                             	</div>
                            </div>
						</div>
					</form>
				</div>  
				
				<div class="box-footer">
					<div class="btn-group pull-right">
						<button type="button" class="btn btn-outline-primary" id="searchBtn"><i class="fa fa-search"></i> 검색</button>
						<button type="button" class="btn btn-outline-primary" id="resetBtn"><i class="fa fa-undo"></i> 리셋</button>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-12">
			<div class="box box-primary">
				<!-- <div class="box-header">
					<h3 class="box-title">목록</h3>
				</div>
				 -->
				<div class="box-header">
					<div class="box-tools pull-right">
						<button type="button" onclick="sendEmail()" class="btn btn-outline-primary pull-right" style="margin-top: 20px">발송하기</button>
					</div>
				</div>
				<div class="box-body">
					<table id="datatable" class="table table-bordered table-striped" style="width:98%; table-layout:fixed;"></table>
				</div>
				<!-- 
				<div class="box-footer">
					<button type="button" class="btn btn-outline-primary pull-right" onclick="sendEmail()">발송하기</button>
				</div>
				 -->
			</div>
		</div>
	</div>
	
	<div class="modal fade emailDetail-modal" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h2>Email 상세보기</h2>
				</div>
				<div class="modal-body no-padding">
					<form id="emailDetailForm" name="emailDetailForm" class="form-horizontal form-label-left">
						<table class="table table-condensed">
							<colgroup>
								<col width="20%">
								<col width="80%">
							</colgroup>
							<tbody>
								<tr>
									<th class="text-center">Email ID</th>
									<td><div id="emailIdDetail"></div></td>
								</tr>
								<tr>
									<th class="text-center">발신자ID</th>
									<td><div id="sendUserIdDetail"></div></td>
								</tr>
								<tr>
									<th class="text-center">발신자명</th>
									<td><div id="sendUserNmDetail"></div></td>
								</tr>
								<tr>
									<th class="text-center">발신 Email</th>
									<td><div id="sendEmailDetail"></div></td>
								</tr>
								<tr>
									<th class="text-center">발신 Email 제목</th>
									<td><div id="sendTitleDetail"></div></td>
								</tr>
								<tr>
									<th class="text-center">발신 Email 내용</th>
									<td><div id="sendContDetail"></div></td>
								</tr>
								<tr>
									<th class="text-center">수신자명</th>
									<td><div id="recvUserNmDetail"></div></td>
								</tr>
								<tr>
									<th class="text-center">수신 Email</th>
									<td><div id="recvEmailDetail"></div></td>
								</tr>
								<tr>
									<th class="text-center">Email 상태</th>
									<td><div id="emailStatDetail"></div></td>
								</tr>
								<!-- 
								<tr>
									<th class="text-center">등록자ID</th>
									<td><div id="regIdDetail"></div></td>
								</tr>
								 -->
								<tr>
									<th class="text-center">등록(발신)일시</th>
									<td><div id="regDtDetail"></div></td>
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
	</div>
</section>

<script>
	var datatable;
	var loginHistId = '<%=session.getAttribute("loginHistId")%>';
	
	$(document).ready(function() {
		
		$('input').placeholder();
		
		datatable = $("#datatable").DataTable({
			"searching" : false
			,"paging": true
			,"bPaginate": true
			,"responsive": true
			,"language": lang_kor
			,"ajax" : {
				"url" : "<c:url value='/system/emailLog/list.json' />"
				,"method" : "post"
				,"data" : function(d) {
					if ($('#sendUserNmLike').val() != "") {d.sendUserNmLike = $('#sendUserNmLike').val();}
					if ($('#recvUserNmLike').val() != "") {d.recvUserNmLike = $('#recvUserNmLike').val();}
					if ($('#recvEmailLike').val() != "") {d.recvEmailLike = $('#recvEmailLike').val();}
				}
				,"error" : function(xhr, status, err) {
					dataTablesError(xhr);
				}
			},"processing": true
			,"serverSide": true
			,"order" : [[4, 'desc']]
			,"columns": [
				{ "name" : "SEND_USER_ID", "title" : "발신자", "render" :
					function (data, type, row) {
						return row["sendUserNm"] 
				}, "className" : "dt-head-center dt-body-left"},
				{ "name" : "SEND_EMAIL", "title" : "발신자 Email", "render" :
					function (data, type, row) {
						return row["sendEmail"]; 
				}, "className" : "dt-head-center dt-body-left"},
				{ "name" : "RECV_USER_NM", "title" : "수신자", "render" :
					function (data, type, row) {
						return row["recvUserNm"]; 
				}, "className" : "dt-head-center dt-body-left"},
				{ "name" : "RECV_EMAIL", "title" : "수신자 Email", "render" :
					function (data, type, row) {
						var loginInfo = row["recvEmail"];  
						return loginInfo; 
				}, "className" : "dt-head-center dt-body-left"},
				{ "name" : "REG_DT", "title" : "발신일시", "render" :
					function (data, type, row) {
						return new Date(row["regDt"]).format("yyyy-MM-dd HH:mm:ss");
				}, "className" : "dt-head-center dt-body-center"},
				{ "render" : 
					function (data, type, row) {
						var html = "";
						html += "<button type='button' class='btn btn-xs btn-info' data-toggle='tooltip' title='상세보기' onclick='goDetailEmailInfo(\""+row["emailId"]+"\")'><i class='fa fa-search'></i></button>&nbsp;";
						return html;  
					},
				    "title":"기능", "className": "dt-head-center dt-body-center", "orderable" : false
				}
			],"fnRowCallback": function(nRow, aData, iDisplayIndex) {
				$(nRow).on('click', function() {
					getSearchCondition(document.searchForm);
				});
			}	
		});
		setSearchCondition(document.searchForm);
	});

	$(".searchWord").keyup(function(e){
		if(e.keyCode == 13)
			datatable.ajax.reload();
	})

	$("#searchBtn").click(function() {
		datatable.ajax.reload();
	});
	
	$("#resetBtn").click(function() {
		$('#recvUserNmLike').val("");
		$('#sendUserNmLike').val("");
		$('#recvEmailLike').val("");
		datatable.ajax.reload();
	});
	
	function goDetailEmailInfo(emailId){
		$.ajax({
			url : "<c:url value='/system/emailLog/detailEmailInfo.json' />" ,
			type : "POST" ,
			data : {"emailId": emailId} ,
			dataType : "json" , 
			success : function(res) {
				if(res.result == "success"){
					$("#emailIdDetail").html(res.data.emailId);
					//$("#sendUserIdDetail").html(res.data.sendUserId);
					$("#sendUserIdDetail").html(res.data.userLoginId);
					$("#sendUserNmDetail").html(res.data.sendUserNm);
					$("#sendEmailDetail").html(res.data.sendEmail);
					$("#sendTitleDetail").html(res.data.sendTitle);
					$("#sendContDetail").html(res.data.sendCont);
					$("#recvUserNmDetail").html(res.data.recvUserNm);
					$("#recvEmailDetail").html(res.data.recvEmail);
					
					switch(res.data.emailStat){
						case "1" : $("#emailStatDetail").html(""); break;
						case "2" : $("#emailStatDetail").html(""); break;
						case "3" : $("#emailStatDetail").html(""); break;
						case "0" : $("#emailStatDetail").html("전송완료"); break;
						default : res.data.emailStat; break; 
					}
					
					//$("#regIdDetail").html(res.data.regId);
					$("#regDtDetail").html(new Date(res.data.regDt).format("yyyy-MM-dd HH:mm:ss"));
					$('div.emailDetail-modal').modal("show");
				}else {
					alert(res.message);
				}
			}
		})
	}
	
	function sendEmail(){
		location.href = "/system/emailLog/emailSend.mng";
	}
	
</script>
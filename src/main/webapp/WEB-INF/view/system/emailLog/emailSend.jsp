<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>

<section class="content-header">
	<tg:menuInfoTag />
</section>

<section class="content">
	<div class="row">
		<form id="insertForm" name="insertForm" method="post">
			<div class="col-xs-12">
				<div class="col-xs-6">
					<div class="box box-primary">
						<div class="box-header">
							<h3 class="box-title"><i class='material-icons' style='font-size:16px;'>play_arrow</i>&nbsp;&nbsp;Email&nbsp;발송</h3>
						</div>
						<div class="box-body">
							<table class="table table-bordered" style="width:100%; table-layout:fixed;">
								<colgroup>
									<col width="30%">
									<col width="70%">
								</colgroup>
								<tbody>
									<tr>
										<th>Email&nbsp;주소 <span class="required">*</span></th>
										<td><input type="text" id="recvEmail" class="form-control" placeholder="Email 주소 입력"></td>
									</tr>
									<tr>
										<th>Email&nbsp;제목 <span class="required">*</span></th>
										<td><input type="text" id="sendTitle" name="sendTitle" class="form-control" placeholder="Email 제목 입력"></td>
									</tr>
									<tr>
										<th>수신자명</th>
										<td><input type="text" id="recvUserNmp" class="form-control" placeholder="수신자명 입력"></td>
									</tr>
									<tr>
										<td colspan="2">
											<div class="row">
												<div class="col-xs-12">
													<div class="tab-content">
														<div id="email" class="tab-pane fade in active">
															<div class="box box-info">
																<div class="box-body">					
																	<div>
																		<small>* Email 내용입력</small>
																		<textarea id="sendCont" name="sendCont"></textarea>
																		<script>CKEDITOR.replace('sendCont');</script>																
																	</div>
																</div>
																<div class="box-footer">
																	<div class="btn-group pull-right">
																		<button type="button" class="btn btn-outline-primary" onclick="insert()">Email&nbsp;개별발송</button>
																		<button type="button" class="btn btn-default" onclick="preList()">목록</button>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				
				<div class="col-xs-6">
					<div class="box" id="receiveList">
						<div class="box-header">
							<h3 class="box-title"><i class='material-icons' style='font-size:16px;'>play_arrow</i>&nbsp;&nbsp;Email&nbsp;단체발송</h3>
							<div class="group" >
								<button type="button" class="btn btn-outline-primary" onclick="excelDownload()">서식파일&nbsp;다운로드</button>
								<label class="btn btn-outline-primary btn-file">
									수신목록&nbsp;추가 <input type="file" id="fileupload" name="fileNm" data-url="/system/emailLog/emailReceiveList.json" class="upload">
								</label>
								<button type="button" class="btn btn-outline-primary" onclick="emailTotSend()">Email&nbsp;단체발송</button>	
							</div>
						</div>
						
						<div class="box-body">
							<table class="table table-bordered" style="width:100%; table-layout:fixed;">
								<colgroup>
									<col width="20%">
							        <col width="60%">
							        <col width="10%">
								</colgroup>
								<thead>
									<tr>
										<th class="text-center">수신자명</th>
										<th class="text-center">Email</th>
										<th class="text-center">삭제</th>
									</tr>
								</thead>
								<tbody id="emailList"></tbody>
							</table>
						</div>
						<div class="box-footer">
							<div class="btn-group pull-right"></div>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</section>

<script>
	
	var _listCount = 0;
	var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	var excelCnt = 0;
	
	$(document).ready(function() {

		$('#fileupload').fileupload({
			add: function (e, data) {
				var fileType = data.files[0].name.split('.').pop(), allowdtypes = 'xls,XLS,xlsx,XLSX';
	            if (allowdtypes.indexOf(fileType) < 0) {
	                alert('엑셀파일만 등록 가능합니다. '+fileType);
	                return false;
	            }
	            
	            if(excelCnt == 0){
	            	data.submit();
	            }else if(excelCnt > 0 &&  confirm('기존 목록이 삭제됩니다! 진행하시겠습니까?')){
	            	excelCnt = 0;
	            	data.submit();
	            }else{
	        		return ;
	        	}
	        },
	        dataType: 'json',
	        done: function (e, res) {
	        	var data = res.result;
	        	if ("success" == data.result) {
	        		var list = data.receiveList;
	        		excelCnt ++;
	        		reveiwList(list);
				}else {
					alert(data.result);
					alert(data.message);
				}
	        }
	    });
	});

	function insert() {
		var contents = eval("CKEDITOR.instances.sendCont.getData()");
		$("#sendCont").val(contents);
		if(!regEmail.test($("#recvEmail").val())) {
			alert("이메일주소 확인해 주세요.");
			$("#recvEmail").focus();
		}else if($.trim($("#sendTitle").val()) == ''){
			alert("제목을 입력 해 주세요.");
			$("#sendTitle").focus();
		}else {
			if(confirm("발송 하시겠습니까?")) {
				$.ajax({
					url : "<c:url value='/system/emailLog/emailSend.json' />",
					type : "POST",
					data : {"sendCont" : $("#sendCont").val(),"recvEmail" : $("#recvEmail").val(),"sendTitle" : $("#sendTitle").val(), "recvUserNmp" : $("#recvUserNmp").val()},
					dataType : "json",
					success : function(res) {
						if ("success" == res.result) {
							alert("발송 되었습니다.");
							/*
							$('#recvEmail').val("");
							$('#sendCont').val("");
							$('#sendTitle').val("");
							*/
						}else {
							alert(res.message);
						}
					}
				});				
			}					
		}
	}
	
	function checkEmail(email){
		var chkFlg = regEmail.test(email);
		 if(chkFlg){
			 return true;
		 }else{
			 return false;
		 }
	}
	
	function reveiwList(data){
		var item = "";
		var errorCnt = 0;
		var errorText = "";
		for(var inx=0; inx < data.length; inx++){
			var recv = data[inx];
			if(recv.recvUserNm != null){
				
				if(!checkEmail(recv.recvEmail)){
					errorCnt ++;
					errorText = "<font color='red'>"+recv.recvEmail+"</font>";
				}else{
					errorText = "<font color='black'>"+recv.recvEmail+"</font>";
				}
				
				item += "<tr>";
				item += "<input type='hidden' name='recvUserNm' value=\"" +recv.recvUserNm+ "\" />";
				item += "<input type='hidden' name='recvEmail' value=\"" +recv.recvEmail+ "\" />";
				item += "<td class='text-center'>";
				item += recv.recvUserNm;
				item += "</td>";
				
				item += "<td class='text-center'>";
				item += errorText;	
				item += "</td>";
				
				item += "<td class='text-center'>";
				item += "<button type='button' class='btn btn-default btn-sm' onclick='delRow(this)'>삭제<i class='fa fa-minus'>";
				item += "</td>";
				
				item += "</tr>";
				}
				_listCount++;
			}
		$('#emailList').html(item);
		$('#receiveList').show();
		
		if(errorCnt > 0){
			alert("이메일형식 오류가 "+errorCnt+"건 있습니다! 확인해주세요!");
		}
	}
	
	//클릭한 부모 노드 삭제 X버튼
	function delRow(row) {
		
		var tr = $(row).parent().parent();
		tr.remove();
		_listCount--;
	};
	
	function emailTotSend(){
		
		if(excelCnt == "0"){
			alert("업로드된 수신목록이 없습니다.")
			return;
		}
		
		var contents = eval("CKEDITOR.instances.sendCont.getData()");
		$("#sendCont").val(contents);
		if($.trim($("#sendTitle").val()) == ''){
			alert("제목을 입력 해 주세요.");
			$("#sendTitle").focus();
			return;
		}else if($.trim($("#sendCont").val()) == ''){
			alert("내용을 입력 해 주세요.");
			$("#sendCont").focus();
			return;
		}
		
		if(confirm("발송 하시겠습니까?")) {
			var sendData = $("#insertForm").serialize();
			$.ajax({
				url : "<c:url value='/system/emailLog/emailTotSend.json' />",
				type : "POST",
				data : sendData,
				dataType : "POST",
				success : function(res) {
					if ("success" == res.result) {
						alert("발송 되었습니다.");
					}else {
						alert(res.message);
					}
				},
				complete : function (res){
					alert("발송 되었습니다.");
	            }
			});	
		}
	}
	
	var selectEditor;
	function setImage(hash) {
		var editor = eval("CKEDITOR.instances."+selectEditor.name);
		var cont = editor.getData();
		cont += "<img src='/public/media/image.json?hash="+hash+"' class='img-rounded img-responsive'>";
		editor.setData(cont);
	}
	
	function excelDownload(){
		location.href="/system/emailLog/excelDownload.json"
	}
	
	function preList(){
		location.href = "/system/emailLog/list.mng";
	}
	
</script>
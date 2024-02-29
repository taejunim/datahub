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
				<input type="text" class="inputTxt-md mr5" id="userLoginIdLike" maxlength="30">
			</div>
			<div class="formItem">
				<label for="userNmLike" class="form-tit">사용자명</label>
				<input type="text" class="inputTxt-md mr5" id="userNmLike" maxlength="30">
			</div>
			<div class="formItem">
				<label class="form-tit">사용상태</label>
				<tg:cdDtl type="select" cd="userSt" name="userStLike" styleClass="select-sm mr5" headerText="전체" id="userStLike" labelYn="N"/>
			</div>
			<div class="btn-group onlySearch">
				<button class="cmnBtn search" id="searchBtn">조회</button>
				<button class="cmnBtn cancel" id="resetBtn">초기화</button>
			</div>
		</div>
		<div class="clear-fix">
			<div class="floatLt">
				<p class="listTotal">총<span id="userList-total">0</span>개</p>
			</div>
			<div class="floatRt">
				<select id="userList-dropdown" class="select-xs">
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

<div class="custom-modal detail-modal custom-modal-none" tabindex="-1" aria-hidden="true">
	<div class="layerPop2 permission" tabindex="-1" aria-hidden="true" style="left: 50% !important; right: 0% !important; transform: translate(-50%, -50%) !important; top: 50% !important;">
		<div class="layerPop-header clear-fix">
			<strong>상세보기</strong>
			<button class="layerPop-close detail-modal-close">닫기</button>
		</div>
		<div class="layerPop-con">
			<div class="popTable-wrap">
				<form id="userDetailForm" name="userDetailForm">
					<table class="pop-table">
						<tbody>
						<tr>
							<th>사용자권한</th>
							<td colspan="3"><div id="roleNmDtl"></div></td>
						</tr>
						<tr>
							<th>사용자ID</th>
							<td><div id="userLoginIdDtl"></div></td>
							<th>사용자명</th>
							<td><div id="userNmDtl"></div></td>
						<tr>
							<th>등록일시</th>
							<td><div id="regDtDtl"></div></td>
							<th>사용자상태</th>
							<td><div id="userStDtl"></div></td>
						</tr>
						<tr id="userOutRsnInfo">
							<th>탈퇴사유</th>
							<td colspan="3"><div id="userOutRsnDtl"></div></td>
						</tr>
						</tbody>
					</table>
				</form>
			</div>
		</div>
		<div class="btn-wrap txtCt">
			<button class="cmnBtn cancel mr5 detail-modal-close">닫기</button>
		</div>
	</div>
</div>

<div class="custom-modal auth-modal custom-modal-none" tabindex="-1" aria-hidden="true">
	<div class="layerPop2 permission" tabindex="-1" aria-hidden="true" style="left: 50% !important; right: 0% !important; transform: translate(-50%, -50%) !important; top: 50% !important;">
		<div class="layerPop-header clear-fix">
			<strong>권한변경</strong>
			<button class="layerPop-close auth-modal-close">닫기</button>
		</div>
		<div class="layerPop-con">
			<div class="clear-fix">
				<form id="userRoleForm" name="userRoleForm">
					<input type="hidden" id="userId" name="userId" />
					<input type="hidden" id="userSt" name="userSt" />
					<table class="pop-table mb20">
						<tbody>
						<tr>
							<th>사용자ID *</th>
							<td colspan="2"><input type="text" id="userLoginId" name="userLoginId" class="inputTxt-full mr5" placeholder="사용자 ID" readonly></td>
						</tr>
						<tr>
							<th>사용자명 *</th>
							<td colspan="2"><input type="text" id="userNm" name="userNm" class="inputTxt-full mr5" placeholder="사용자" readonly></td>
						</tr>
						<tr>
							<th>사용자권한 *</th>
							<td colspan="2">
								<select name="roleAuth" id="roleAuth" class="select-full">
									<c:forEach var="role" items="${roleList}">
										<option value="${role.roleAuth}">${role.roleNm}</option>
									</c:forEach>
								</select>
							</td>
						</tr>
						</tbody>
					</table>
				</form>
			</div>
		</div>
		<div class="btn-wrap txtCt">
			<button class="cmnBtn register mr5" id="saveBtn">변경</button>
			<button class="cmnBtn cancel mr5 auth-modal-close">닫기</button>
		</div>
	</div>
</div>

<script>
	var datatable;
	var userRoleDatatable;

	$(document).ready(function() {
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
				"url" : "<c:url value='/system/user/list.json' />"
				,"method" : "post"
				,"data" : function(d) {
					if ($('#userLoginIdLike').val() != "") { d.userLoginIdLike = $('#userLoginIdLike').val(); }
					if ($('#userNmLike').val() != "") { d.userNmLike = $('#userNmLike').val(); }
					if ($('#userStLike').val() != "") { d.userSt = $('#userStLike').val(); }
				}
				,"dataSrc": function (data) {
					$("#userList-total").text(data.recordsTotal);
					return data.data;
				}
				,"error" : function(xhr, status, err) {
					dataTablesError(xhr);
				}
			},"processing": true
			,"serverSide": true
			,"order" : [[1, 'desc']]
			,"columns": [
				{ "name" : "USER_ID", "title" : "로그인 ID", "data" : "userId", "className" : "colNum", "visible" : false } ,
				{ "name" : "USER_LOGIN_ID", "title" : "사용자 ID", "data" : "userLoginId", "className" : "dt-head-center dt-body-left" } ,
				{ "name" : "ROLE_NM", "title" : "사용자권한", "data" : "roleNm", "className" : "dt-head-center dt-body-left", "orderable" : false } ,
				{ "name" : "USER_NM", "title" : "사용자명", "data" : "userNm", "className" : "dt-head-center dt-body-left", "orderable": false},
				{ "name" : "USER_ST", "title" : "사용상태", "orderable": false, "render" :
					function (data, type, row) {
						html = "";
						if(row["userSt"] == 1) {
							html += "사용중";
						} else if(row["userSt"] == 8) {
							html += "사용정지";
						} else {
							html += "탈퇴";
						}
						return html;
					}, "className" : "dt-head-center", "orderable" : false } ,
				{ "name" : "REG_DT", "title" : "등록일시", "render" :
					function (data, type, row) { return userService.toStdDate(row["regDt"]); }
					, "className" : "dt-head-center dt-body-center", "orderable" : false } ,
				/*{ "render":
					function (data, type, row) {
						var html = "";
						html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='상세보기' onclick='goDetailUser(\"" + row["userId"] + "\")'><i class='material-icons'>pageview</i></button>&nbsp;";
						if(row["userSt"] != 9) {
							html += "<button type='button' class='btn btn-sm btn-outline-primary' data-toggle='tooltip' title='권한변경' onclick='autUser(\"" + row["userId"] + "\")'><i class='material-icons'>assignment_ind</i></button>&nbsp;";
						}
						html += "<button type='button' class='btn btn-sm btn-outline-primary";
						if (row["failCnt"] < 5) {
							html += "disabled' data-toggle='tooltip' title='로그인 실패카운터 5 미만 입니다.' '><i class='material-icons'>lock_open</i>&nbsp;" + row["failCnt"] + "</button>&nbsp;";
						} else {
							html += "' data-toggle='tooltip' title='로그인 제한 풀기' onclick='initFailCntUpdate(\"" + row["userId"] + "\")'><i class='material-icons'>lock</i>&nbsp;" + row["failCnt"] + "</button>&nbsp;";
						}
						return html;
					}, "title": "기능", "className": "dt-head-center dt-body-center", "orderable": false,
				}*/
				{
					title: '기능',
					data: "",
					render: function (data, type, row, meta) {
						var html = "";
						html += "<button type='button' class='cellFormBtn cellFormBtn2' onclick='goDetailUser(\"" + row["userId"] + "\")'>상세</button>&nbsp;";
						if(row["userSt"] != 9) {
							html += "<button type='button' class='cellFormBtn cellFormBtn1' onclick='autUser(\"" + row["userId"] + "\")'>권한</button>&nbsp;";
						}
						html += "<button type='button' class='cellFormBtn cellFormBtn3";
						if (row["failCnt"] < 5) {
							html += "disabled' data-toggle='tooltip' title='로그인 실패카운터 5 미만 입니다.' '>이력</button>&nbsp;";
						} else {
							html += "' data-toggle='tooltip' title='로그인 제한 풀기' onclick='initFailCntUpdate(\"" + row["userId"] + "\")'>이력</button>&nbsp;";
						}
						return html;
					},
					orderable: false
				}
			]
			,"scrollX": "100%"
			,"columnDefs": [
				{"targets": [1], width: "120px"}
				,{"targets": [2], width: "120px"}
				,{"targets": [3], width: "100px"}
				,{"targets": [4], width: "100px"}
				,{"targets": [5], width: "180px"}
				,{"targets": [6], width: "150px"}
			]
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

		$("#userList-dropdown").on("change", function() {
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

		$(".detail-modal-close").click(function (e) {
			$(".detail-modal").removeClass("custom-modal-show");
			$(".detail-modal").addClass("custom-modal-none");
		})

		$(".auth-modal-close").click(function (e) {
			$(".auth-modal").removeClass("custom-modal-show");
			$(".auth-modal").addClass("custom-modal-none");
		})
	});

	$("#searchBtn").click(function() {
		datatable.ajax.reload();
	});

	$(".searchList").change(function() {
		datatable.ajax.reload();
	});

	$(".searchWord").keyup(function(e) {
		if(e.keyCode == 13)
			datatable.ajax.reload();
	});

	$("#resetBtn").click(function() {
		$('#userLoginIdLike').val("");
		$('#userNmLike').val("");
		$('#userStLike').val("");
		$('#userStLike').selectpicker("refresh");
		datatable.ajax.reload();
	});

	function goDetailUser(userId) {
		$.ajax({
			url: "<c:url value='/system/user/detailUser.json' />",
			type: "POST",
			data: { userId : userId },
			dataType: "json",
			success: function (res) {
				if (res.result == "success") {
					var data = res.data;
					$("#userLoginIdDtl").html(data.userLoginId);
					$("#roleNmDtl").html(data.roleNm);
					$("#userNmDtl").html(data.userNm);
					$("#regDtDtl").html(userService.toStdDate(data.regDt));

					switch (data.userSt) {
						case "1":
							$("#userStDtl").html("사용중");
							$("#userOutRsnInfo").hide();
							break;
						case "8":
							$("#userStDtl").html("사용정지");
							$("#userOutRsnInfo").hide();
							break;
						case "9":
							$("#userStDtl").html("탈퇴");
							$("#userOutRsnInfo").show();
							$("#userOutRsnDtl").html(data.userOutRsn);
							break;
						default:
							break;
					}
					$('.detail-modal').removeClass("custom-modal-none");
					$('.detail-modal').addClass("custom-modal-show");
				} else {
					alert(res.message);
				}
			}
		})
	}

	function autUser(userId) {
		$.ajax({
			url: "<c:url value='/system/user/detailUser.json' />",
			type: "POST",
			data: { userId : userId },
			dataType: "json",
			success: function (res) {
				if (res.result == "success") {
					var data = res.data;
					$("#userId").val(data.userId);
					$("#userSt").val(data.userSt);
					$("#userLoginId").val(data.userLoginId);
					$("#userNm").val(data.userNm);
					$("#roleAuth").val(data.roleAuth);

					$('.auth-modal').removeClass("custom-modal-none");
					$('.auth-modal').addClass("custom-modal-show");
				} else {
					alert(res.message);
				}
			}
		})
	}

	$("#saveBtn").on("click", function() {
		var roleAuth = $("#roleAuth").val();
		if(roleAuth == "") {
			alert("사용자에게 부여할 권한을 선택해주세요.");
			$("#roleAuth").selectpicker("toggle");
		} else {
			if(confirm("권한을 변경하시겠습니까?")) {
				$.ajax({
					url: "/system/userRole/update.json",
					type: "POST",
					data: {
						userId: $("#userId").val(),
						roleAuth: $("#roleAuth").val()
					},
					dataType: "json",
					success: function (res) {
						if (res.result == "success") {
							alert("권한이 변경되었습니다.");
							$(".auth-modal").removeClass("custom-modal-show");
							$(".auth-modal").addClass("custom-modal-none");
							datatable.ajax.reload();
						} else {
							alert(res.message);
						}

					},
					error: function (xhr, status, error) {
						console.error(xhr.responseText);
						console.error(error);
					}
				})
			}
		}
	})

	function initFailCntUpdate(id) {
		/*getSearchCondition(document.searchForm);*/
		if(confirm("해당 사용자 로그인 실패 카운터를 초기화 하시겠습니까?")) {
			$.ajax({
				url : "<c:url value='/system/user/initFailCnt.json' />" ,
				type : "POST" ,
				data : { userId : id },
				dataType : "json" ,
				success : function(res) {
					if(res.result == "success") {
						alert("로그인 실패 카운터가 초기화 되었습니다");
						datatable.ajax.reload();
					} else {
						alert(res.message);
					}
				}
			})
		}
	}

</script>
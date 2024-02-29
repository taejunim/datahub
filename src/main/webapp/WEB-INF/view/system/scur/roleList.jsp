<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>
<article class="contentsBody">
	<div class="contentsBody-inner">
		<div class="contentsHd clear-fix">
			<tg:menuInfoTag />
		</div>
		<div class="clear-fix">
			<div class="floatLt">
				<p class="listTotal">총<span id="roleList-total">0</span>개</p>
			</div>
			<div class="floatRt">
				<select id="roleList-dropdown" class="select-xs">
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
	<button class="cmnBtn register" style="float: right; margin:8px 3px;" onclick="showInsertModal()">등록</button>
</article>

<%--<section class="content">
	<div class="row">
		<div class="col-xs-12">
			<div class="box box-primary">
				<div class="box-header">
					<h3 class="box-title"><i class='material-icons' style='font-size:16px;'>play_arrow</i>&nbsp;&nbsp;권한</h3>
				</div>
				<div class="box-body">
					<table id="datatable" class="table table-bordered table-striped" style="width:100%; table-layout:fixed;"></table>
				</div>
				<div class="box-footer">
					<button type="button" class="btn btn-outline-primary pull-right" onclick="showInsertModal()">등록</button>
				</div>
			</div>
		</div>
	</div>
</section>--%>

<div class="custom-modal loc-modal roleManage-modal custom-modal-none" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="layerPop8 permission" style="left: 50% !important; right: 0% !important; transform: translate(-50%, -50%) !important; top: 50% !important;">
		<div class="layerPop-header clear-fix">
			<strong>권한 롤 관리</strong>
			<button class="layerPop-close custom-modal-close">닫기</button>
		</div>
		<div class="layerPop-con">
			<div class="clear-fix">
				<div class="floatLt">
					<p class="listTotal">총<span id="roleManageModal-total">0</span>개</p>
				</div>
				<div class="floatRt">
					<select id="roleManage-dropdown" class="select-xs">
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="30">30</option>
					</select>
					<span class="form-name">개씩 보기</span>
				</div>
			</div>
			<table id="roleManageDatatable" class="table table-bordered table-striped" style="width: 100%; table-layout: fixed;"></table>
		</div>
		<div class="btn-wrap txtCt">
			<button class="cmnBtn cancel mr5 custom-modal-close">닫기</button>
		</div>
	</div>
</div>

<div class="custom-modal loc-modal role-modal custom-modal-none" tabindex="-1" aria-hidden="true">
	<div class="layerPop8 permission" tabindex="-1" aria-hidden="true" style="left: 50% !important; right: 0% !important; transform: translate(-50%, -50%) !important; top: 50% !important;">
		<div class="layerPop-header clear-fix">
			<strong>롤 권한</strong>
			<button class="layerPop-close custom-modal-close">닫기</button>
		</div>
		<div class="layerPop-con">
			<div class="clear-fix">
				<form id="roleForm" name="roleForm" class="form-horizontal form-label-left">
					<input type="hidden" name="goUrl" id="goUrl" value="" />
					<table class="pop-table mb20">
						<tbody>
						<tr>
							<th>권한 *</th>
							<td colspan="2">
								<input type="text" name="roleAuth" id="roleAuth" onkeydown="fn_press_han(this);" data-role="권한" class="inputTxt-full mr5 characterOnly" maxlength="25" placeholder="권한 영문으로 입력 ex)ROLE_XXX">
							</td>
						</tr>
						<tr>
							<th>역할명 *</th>
							<td colspan="2">
								<input type="text" name="roleNm" id="roleNm" data-role="역할명" class="inputTxt-full mr5 characterOnly" maxlength="25" placeholder="역할명을 입력">
							</td>
						</tr>
						<tr>
							<th>설명 </th>
							<td colspan="2">
								<textarea name="roleDesc" id="roleDesc" data-role="설명" class="inputTxt-full mr5 characterOnly" style="height: 200px;" maxlength="2000" placeholder="권한설명을 입력"> </textarea>
							</td>
						</tr>
						</tbody>
					</table>
				</form>
			</div>
		</div>
		<div class="btn-wrap txtCt">
			<button type="button" class="cmnBtn register" onclick="roleInsert()">저장</button>
			<button type="button" class="cmnBtn cancel custom-modal-close" data-dismiss="modal">닫기</button>
		</div>
	</div>
</div>

<div class="custom-modal loc-modal menu-modal custom-modal-none" tabindex="-1" aria-hidden="true">
	<div class="layerPop8 permission" tabindex="-1" aria-hidden="true" style="left: 50% !important; right: 0% !important; transform: translate(-50%, -50%) !important; top: 50% !important;">
		<div class="layerPop-header clear-fix">
			<strong>시스템 메뉴 권한</strong>
			<button class="layerPop-close custom-modal-close">닫기</button>
		</div>
		<div class="layerPop-con">
			<div id="jstree"></div>
			<div style="margin-top: 30px;">
				<div class="pull-left btn-group">
					<button type="button" class="btn btn-outline-primary" onclick="checkMenu()"><i class="fa fa-check-circle-o"></i> 전체선택</button>
					<button type="button" class="btn btn-outline-primary" onclick="uncheckMenu()"><i class="fa fa-circle-thin"></i> 전체해제</button>
				</div>
				<div class="pull-right btn-group">
					<button type="button" class="btn btn-outline-primary" onclick="updateMenu()">저장</button>
					<button type="button" class="btn btn-outline-primary custom-modal-close">닫기</button>
				</div>
			</div>
		</div>
	</div>
</div>

<script>

	var datatable;
	var roleAuth;
	
	$(document).ready(function() {
		
		//모달창이동
/*		$('.modal-content').draggable({
			handle: ".modal-header"
		});*/
		
		datatable = $("#datatable").DataTable({
			"searching" : false,
			"paging" : true,
			"bPaginate" : true,
			"responsive" : true,
			"language": {
				lengthMenu: "_MENU_",
				info: ''
			},
			"ajax" : {
				"url" : "<c:url value='/system/role/list.json' />",
				"method" : "post",
				"data" : function(d) {
					/* if($("")) */
				}
				,"dataSrc": function (data) {
					$("#roleList-total").text(data.recordsTotal);
					return data.data;
				}
				,"error" : function(xhr, status, err) {
					dataTablesError(xhr);
				}
			},
			"processing" : true,
			"serverSide" : true,
			"order" : [[0, 'desc']],
			"columns" : [
				 { "name" : "ROLE_AUTH", "title" : "권한",  "data":"roleAuth", "className" : "dt-head-center dt-body-left" },
				 { "name" : "ROLE_NM", "title" : "역할명",  "data":"roleNm", "className" : "dt-head-center dt-body-left" },
				 { "name" : "ROLE_DESC", "title" : "설명",  "data":"roleDesc", "className" : "dt-head-center dt-body-left", "orderable": false },
				 { "render" :
					function (data, type, row) {
					var html = "";
					html +="<button type='button' class='btn btn-xs btn-outline-primary' data-toggle='tooltip' title='수정' onclick='showInsertModal(\""+row["roleAuth"]+"\",\""+row["roleNm"]+"\",\""+row["roleDesc"]+"\")'><i class='material-icons'>create</i></button>&nbsp;"
					html +="<button type='button' class='btn btn-xs btn-outline-primary' data-toggle='tooltip' title='권한부여' onclick='showRoleMngModal(\""+row["roleAuth"]+"\")'><i class='material-icons'>account_box</i></button>&nbsp;";
					html +="<button type='button' class='btn btn-xs btn-outline-primary' data-toggle='tooltip' title='시스템메뉴 권한' onclick='showMenuModal(\""+row["roleAuth"]+"\")'><i class='material-icons'>menu</i></button>&nbsp;";
					html +="<button type='button' class='btn btn-xs btn-outline-primary' data-toggle='tooltip' title='삭제' onclick='deletebtn(\""+row["roleAuth"]+"\",\""+row["roleNm"]+"\")'><i class='material-icons'>delete</i></button>&nbsp;";
					return html;
					},
					"title":"기능", "className": "dt-head-center dt-body-center", "orderable" : false
				 }
			]
			,"scrollX": "100%"
			,"columnDefs": [
				{"targets": [0], width: "150px"}
				,{"targets": [1], width: "120px"}
				,{"targets": [2], width: "200px"}
				,{"targets": [3], width: "180px"}
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

		$(".custom-modal-close").click(function (e) {
			$(".loc-modal").removeClass("custom-modal-show");
			$(".loc-modal").addClass("custom-modal-none");
		})

		$("#roleList-dropdown").on("change", function() {
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

		$("#roleManage-dropdown").on("change", function() {
			var val = parseInt(this.value);
			var dropdown = document.querySelector('#roleManageDatatable_length select');

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
		
		$.ajax({
			url : "<c:url value='/system/menu/jstreeList.json'/>",
			type : "POST",
			dataType : "json",
			success : function(res) {
				if ("success" == res.result) {
	                $('#jstree').jstree({ 
	        			"core" : {
	        				"data" : res.data
	        			}
	         			,"plugins" : [ "wholerow", "checkbox" ]
	        		});
				} else {
					alert(res.message);
				}
			}
		});
	});

	function roleInsert(){
		/*
		if(isEmptyString ($("#roleAuth").val())){
			alert("권한입력을 해 주세요.");
			return;
		}
	 	if(isEmptyString ($("#roleNm").val())){
			alert("역할명을 해 주세요.");
			return;
		}
	 	*/
	 	
		if($.trim($("#roleAuth").val()) == ""){
			alert("권한을 입력을 해 주세요.");
			return;
		}
	 	if($.trim($("#roleAuth").val()).substring(0,5) != "ROLE_"){
	 		alert("권한명은 'ROLE_'로 시작되어야 합니다.");
	 		return;
	 	}
	 	if($.trim($("#roleNm").val()) == ""){
			alert("역할명을 입력해 주세요.");
			return;
		}
	 	
		$.ajax({
			url : $('#goUrl').val(),
			type : "POST",
			data : $("#roleForm").serialize(),
			dataType : "json",
			success : function(res) {
				if ("success" == res.result) {
					alert("등록되었습니다.");
					$(".loc-modal").removeClass("custom-modal-show");
					$(".loc-modal").addClass("custom-modal-none");
					datatable.ajax.reload();
				} else if ("duplicate" == res.result) {
					alert(res.message);
				} else {
					alert(res.message);
				}
			}
		});
	};

	function showInsertModal(roleAuth, roleNm, roleDesc) {
		$("#roleAuth").val(roleAuth);
		$("#roleNm").val(roleNm);
		
		if(roleDesc == "null" || roleDesc == null || roleDesc == ""){
			$("#roleDesc").val("");
		}else{
			$("#roleDesc").val(roleDesc);	
		}

		if ($("#roleAuth").val() != "") {
			$('#goUrl').val('/system/role/update.json');
			$('#roleAuth').attr("readonly","readonly");
		} else {
			$('#goUrl').val('/system/role/insert.json');
			$('#roleAuth').removeAttr("readonly");
		}

		$('div.role-modal').removeClass("custom-modal-none");
		$('div.role-modal').addClass("custom-modal-show");
	}

	function deletebtn(roleAuth, roleNm) {
		$("#roleAuth").val(roleAuth);
		$("#roleNm").val(roleNm);
		if (confirm("삭제하시겠습니까?") == true) {
			$.ajax({
				url : "/system/role/delete.json",
				type : "POST",
				data : $("#roleForm").serialize(),
				dataType : "json",
				success : function(res) {
					if ("success" == res.result) {
						alert("삭제되었습니다.");
						datatable.ajax.reload();
					} else if ("duplicate" == res.result) {
						alert(res.message);
					} else {
						alert(res.message);
					}
				}
			});
		} else {
			alert("취소되었습니다.");
		}
	}
	
	function showRoleMngModal(roleMngAuth) {
		$("#roleMngAuth").val(roleMngAuth);
		dataRoleMngtable = $("#roleManageDatatable").DataTable({
			"destroy" : true,
			"searching" : false
			,"paging": true
			,"bPaginate": true
			,"responsive": true
			,"language": {
				lengthMenu: "_MENU_",
				info: ''
			}
			,"ajax" : {
				"url" : "<c:url value='/system/scurRscRole/list.json' />"
				,"method" : "post"
				,"data" : { roleAuth : $("#roleMngAuth").val ()}
				,"dataSrc": function (data) {
					$("#roleManageModal-total").text(data.recordsTotal);
					return data.data;
				}
				,"error" : function(xhr, status, err) {
					dataTablesError(xhr);
				}
			},"processing": true
			,"serverSide": true
			,"order" : [[0, 'desc']]
			,"columns": [
				{ "name" : "RSC_ID", "title" : "자원아이디", "data" : "rscId", "className" : "dt-head-center dt-body-left"},
				{ "name" : "RSC_NAME", "title" : "자원명", "data" : "rscName", "className" : "dt-head-center dt-body-left"},
				{ "name" : "RSC_TP", "title" : "유형", "data" : "rscTp", "className" : "dt-head-center dt-body-left"},
				{ "name" : "RSC_PATN", "title" : "패턴", "data" : "rscPatn", "className" : "dt-head-center dt-body-left"},
				{ "name" : "REG_DT", "title" : "등록일", "render" :
					function (data, type, row) {
						return new Date(row["regDt"]).format("yyyy-MM-dd");
				}, "className" : "dt-head-center dt-body-center"},
				{ "name" : "ROLE_AUTH", "title" : "자원패턴", "data" : "roleAuth", "className" : "dt-head-center dt-body-left", "visible" : false},
				{ "render" : 
					function (data, type, row) {
						var html = "";
						html += "<select name='roleAuth' class='form-control col-md-7 col-xs-12 req' onchange='rolsUseSelect(this.value, \""+row["rscId"]+"\")'>"
						html += "<option value='1'";
						if (row["roleAuth"] == $("#roleMngAuth").val ())
							html += "selected";
						html += ">등록</option><option value='0'";
						if (row["roleAuth"] != $("#roleMngAuth").val ())
							html += "selected";
						html += ">미등록</option></select>";
						return html;
					},
				   "className": "dt-head-center dt-body-center", "orderable" : false, //"title":"기능"
				}
			]
			,"scrollX": "100%"
			,"columnDefs": [
				{"targets": [0], width:"180px"}
				,{"targets": [1], width:"100px"}
				,{"targets": [2], width:"50px"}
				,{"targets": [3], width:"150px"}
				,{"targets": [4], width:"180px"}
				,{"targets": [6], width:"100px"}
			]
			,"lengthMenu": [[10, 20, 30], [10, 20, 30]]
			,"initComplete": function(settings, json) {
				this.api().page('last').draw('page');
				$("#roleManageDatatable_length").css("display", "none");
			}
			,"fnRowCallback": function(nRow, aData, iDisplayIndex) {
			}
			,"fnDrawCallback" : function() {
				$('div.roleManage-modal').removeClass("custom-modal-none");
				$('div.roleManage-modal').addClass("custom-modal-show");

				$("#roleManageDatatable_paginate").addClass("pagination");
				$("#roleManageDatatable_paginate .active").addClass("on");
			}
		});
	}
	
	function rolsUseSelect(selectValue, rscId){
		
		if(selectValue == '1'){
			$("#roleMngUrl").val("<c:url value='/system/scurRscRole/insert.json' />");
		}else{
			$("#roleMngUrl").val("<c:url value='/system/scurRscRole/delete.json' />");
		}
		
		$.ajax({
			url : $("#roleMngUrl").val(),
			type : "POST",
			data : { rscId : rscId, roleAuth : $("#roleMngAuth").val ()},
			dataType : "json",
			success : function(res) {
				if ("success" == res.result) {
					dataRoleMngtable.ajax.reload();
				} else if ("duplicate" == res.result) {
					alert(res.message);
				} else {
					alert(res.message);
				}
			}
		});
	}
	
	function showMenuModal(ra) {
		$.ajax({
			url : "<c:url value='/system/menuRole/list.json'/>",
			type : "POST",
			data : {"roleAuth" : ra},
			dataType : "json",
			success : function(res) {
				if ("success" == res.result) {
					roleAuth = ra;
					
					$('.jstree-leaf').each(function(){
						$('#jstree').jstree("uncheck_node", $(this));
						var id = $(this).attr('id');
						for(idx in res.data) {
							var menuRole = res.data[idx];
							if(menuRole.menuId == id) {
								$('#jstree').jstree("check_node", $(this));
								break;
							}
						}
					});
					$('.menu-modal').removeClass("custom-modal-none");
					$('.menu-modal').addClass("custom-modal-show");
				} else {
					alert(res.message);
				}
			}
		});
	}
	
	function updateMenu() {
		
		var checkedList = $('#jstree').jstree("get_bottom_checked",true);
		var idList = new Array();
		
		for(var i=0; i<checkedList.length; i++) {
			checked = checkedList[i];
			idList.push(checked.id);
			var parent = $('#jstree').jstree("get_parent",checked);
			if(idList.indexOf(parent) == -1) {
				idList.push(parent);
			}
		}
		
		if(confirm("수정하시겠습니까?")) {
			$.ajax({
				url : "<c:url value='/system/menuRole/update.json' />",
				type : "POST",
				data : {"roleAuth" : roleAuth, "checkIdList" : idList},
				dataType : "json",
				success : function(data) {
					if ("success" == data.result) {
						alert("수정되었습니다.");
						$('.menu-modal').removeClass("custom-modal-show");
						$('.menu-modal').addClass("custom-modal-none");
					}else {
						alert(data.message);
					}
				}
			});
		}
	}
	
	function checkMenu() {
		$('#jstree').jstree("check_all");
	}
	
	function uncheckMenu() {
		$('#jstree').jstree("uncheck_all");
	}
		
	 function fn_press_han(obj) {
        //좌우 방향키, 백스페이스, 딜리트, 탭키에 대한 예외
        if(event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39
        || event.keyCode == 46 ) return;
        //obj.value = obj.value.replace(/[\a-zㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
        obj.value = obj.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
    }
</script>
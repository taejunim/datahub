<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>
<style>
	.dataTable th, .dataTable td {padding-right: 0!important;}
	.dataTable thead th {height: 17.25px!important; line-height: 17.25px!important;}
	.bootstrap-select button {display: none;}
</style>
<article class="contentsBody">
	<div class="contentsBody-inner">
		<div class="contentsHd clear-fix">
			<tg:menuInfoTag />
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="overflow">
				<table id="datatable" class="dataTable fciltyDtl-tb detailTable">
					<thead>
					<tr>
						<th class="text-center" style="width: 200px;">메뉴명</th>
						<th class="text-center" style="width: 150px;">프로그램명</th>
						<th class="text-center" style="width: 250px;">프로그램 URL</th>
						<th class="text-center" style="width: 150px;">기능</th>
					</tr>
					</thead>
					<tbody></tbody>
				</table>
				</div>
				<button class="cmnBtn register" style="float: right; margin:8px 3px;" onclick="showInsertModal()">최상위 메뉴 추가</button>
				<button class="cmnBtn list" style="float: right; margin:8px 3px;" onclick="goChangeOrder()">메뉴 순서 변경</button>
			</div>
		</div>
	</div>
	<div class="modal fade func-modal  modal-none" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="layerPop3 permission" style="left:50%;">
			<div class="layerPop-header clear-fix">
				<strong></strong>
				<button class="layerPop-close">닫기</button>
			</div>
			<div class="layerPop-con">
				<div class="clear-fix">
					<form id="funcForm" name="funcForm" class="form-horizontal form-label-left" onSubmit="return false;">
						<input type="hidden" name="menuId" />
						<input type="hidden" name="upperMenuId" />
						<input type="hidden" name="icon" value="label_important"/>
						<table class="pop-table mb20">
							<tbody>
							<tr>
								<th>메뉴명 *</th>
								<td colspan="2">
									<input type="text" name="menuNm" class="inputTxt-full mr5 characterOnly" placeholder="메뉴명 입력" maxlength="50">
								</td>
							</tr>
							<tr>
								<th>프로그램 *</th>
								<td colspan="2">
									<select name="pgmId" class="select-full" id="pgmId" data-live-search="true" style="min-width: 100%;">
										<c:forEach var="pgm" items="${pgmList}">
											<option value="${pgm.pgmId}" data-subtext="${pgm.pgmUrl}">${pgm.pgmNm}</option>
										</c:forEach>
									</select>
								</td>
							</tr>
							<tr>
								<th>메뉴설명</th>
								<td colspan="2">
									<input type="text" class="inputTxt-full mr5" name="menuDesc" placeholder="메뉴설명 입력" maxlength="500"/>
								</td>
							</tr>
							<tr>
								<th>아이콘</th>
								<td colspan="2">
									<button class="cellFormBtn cellFormBtn1" style="float: left;min-width: 80px;" onclick="showIconWindow()">
										변경
									</button>
									<div style="height: 30px; line-height: 30px; width: 30px; float: left; margin-left: 5px; padding-top: 3px;">
										<i id="iconI" class="material-icons"></i>
									</div>
								</td>
							</tr>
							</tbody>
						</table>
					</form>
				</div>
			</div>
			<div class="btn-wrap txtCt">
				<button class="cmnBtn register mr5" onclick="func()">확인</button>
				<button class="cmnBtn cancel mr5">닫기</button>
			</div>
		</div>
	</div>
</article>
<script>

	var siteStartUrl;
	
	$(document).ready(function() {
		select();

		// 입력을 제한 할 특수문자의 정규식
		var replaceId  = /[<>]/gi;

		$(".characterOnly").on("focusout", function() {
			var x = $(this).val();
			if (x.length > 0) {
				if (x.match(replaceId)) {
					x = x.replace(replaceId, "");
				}
				$(this).val(x);
			}
		}).on("keyup", function() {
			$(this).val($(this).val().replace(replaceId, ""));
			if($(this).val().length > $(this).attr('maxlength'))
				$(this).val($(this).val().substr(0, $(this).attr('maxlength')));
		});
	});
	
	function showIconWindow() {
		window.open("/system/window/icons.mng", "Icons", "width=800px, height=800px, toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no");
	}
	
	function setIcon(icon) {
		var form = document.funcForm;
		form.icon.value=icon;
		$("#iconI").empty();
		$("#iconI").append(icon);
	}
	
	function select() {
		$("#datatable > tbody").html("");
		$.ajax({
			url : "<c:url value='/system/menu/list.json' />",
			type : "POST",
			dataType : "json",
			beforeSend: function () { $('.progress-body').css('display','block') },
			success : function(res) {
				if ("success" == res.result) {
					var html = "";
					for(idx in res.data) {
						var menu = res.data[idx];
						html += makeTbody(menu, 0);
					}
					$("#datatable > tbody").html(html);
				}else {
					alert(res.message);
				}
			}
		}).done(function () {
			$('.progress-body').css('display','none');
		});
	}
	
	function makeTbody(menu, depth) {
		
		var html = "";
		html += "<tr>";
		html += "<th>";

		var pnm = "";
		var purl = ""
		if(menu.pgm!=null && menu.pgm!=undefined) {
			pnm = menu.pgm.pgmNm;
			purl = menu.pgm.pgmUrl;
		}
		html += menu.menuNm;
		html += "</th>";
		html += "<td>";
		html += pnm;
		html += "</td>";
		html += "<td><a href='"+purl+"' target='_blank'>";
		html += purl;
		html += "</a></td>";
		html += "<td class='text-center'>";
		html += "<button class='cellFormBtn cellFormBtn5' onclick='showUpdateModal(\""+menu.menuId+"\")'>수정</button>"
		html += "<button class='cellFormBtn cellFormBtn3 mr5 ml5' onclick='showInsertModal(\""+menu.menuId+"\",\""+menu.menuNm+"\")'>추가</button>"
		html +=	"<button class='cellFormBtn cellFormBtn4' onclick='del(\""+menu.menuId+"\")'>삭제</button>"
		html += "</td>";
		html += "</tr>";
		
		for(idx in menu.childList) {
			var childMenu = menu.childList[idx];
			html += makeTbody(childMenu, parseInt(depth)+1);
		}
		return html;
	}
	
	function showInsertModal(upperMenuId, upperMenuNm) {
		$("#upperMenuTxtDiv").hide();
		
		var form = document.funcForm;
		form.menuId.value = "";
		form.menuNm.value = "";
		form.pgmId.value = "";
		$("#pgmId").val(0);
		form.menuDesc.value = "";
		form.icon.value = "label_important";
		$("#iconI").empty();
		$("#iconI").append("label_important");
		
		if(upperMenuId != null) {
			$(".layerPop-header strong").text("등록");
			$("#upperMenuTxtDiv").show();
			$("#upperMenuTxt").html(upperMenuNm);
			form.upperMenuId.value = upperMenuId;
		}else {
			$(".layerPop-header strong").text("최상위 메뉴 추가");
			form.upperMenuId.value = "";
		}
		

		$('.func-modal').removeClass("modal-none");
		$('.func-modal').addClass("modal-show");
	}
	
	function showUpdateModal(menuId) {
		$.ajax({
			url : "<c:url value='/system/menu/view.json' />",
			type : "POST",
			data : {"menuId" : menuId},
			dataType : "json",
			success : function(res) {
				if ("success" == res.result) {
					$("#upperMenuTxtDiv").hide();
					
					var form = document.funcForm;
					var data = res.data;
					form.menuId.value = data.menuId;
					form.menuNm.value = data.menuNm;
					
					if(data.menuDesc == null || data.menuDesc == ""){
						form.menuDesc.value = "";
					}else{
						form.menuDesc.value = data.menuDesc;	
					}

					form.icon.value = data.icon;
					$("#pgmId").val(data.pgmId);
					$("#iconI").empty();
					$("#iconI").append(data.icon);
					
					if(data.upperMenuId != null) {
						$("#upperMenuTxtDiv").show();
						$("#upperMenuTxt").html(data.upperMenu.menuNm);
					}

					$(".layerPop-header strong").text("수정");
					$('.func-modal').removeClass("modal-none");
					$('.func-modal').addClass("modal-show");
				}else {
					alert(res.message);
				}
			}
		});
	}
	
	function func() {
		var form = document.funcForm;
		if($.trim(form.menuNm.value) == '') {
			alert("메뉴명을 입력 해 주세요.");
			form.menuNm.focus();
		} else if($.trim(form.pgmId.value) == '') {
			alert("프로그램을 선택 해 주세요.");
			form.pgmId.focus();
		} else {
			if(form.menuId.value == '') {
				if(confirm("등록하시겠습니까?")) {
					$.ajax({
						url : "<c:url value='/system/menu/insert.json' />",
						type : "POST",
						data : $("#funcForm").serialize(),
						dataType : "json",
						success : function(res) {
							if ("success" == res.result) {
								alert("등록되었습니다.");
								select();
								$('.func-modal').addClass("modal-none");
								$('.func-modal').removeClass("modal-show");
							}else {
								alert(res.message);
							}
						}
					});
				}
			}else {
				if(confirm("수정하시겠습니까?")) {
					$.ajax({
						url : "<c:url value='/system/menu/update.json' />",
						type : "POST",
						data : $("#funcForm").serialize(),
						dataType : "json",
						success : function(res) {
							if ("success" == res.result) {
								alert("수정되었습니다.");
								select();
								$('.func-modal').addClass("modal-none");
								$('.func-modal').removeClass("modal-show");
							}else {
								alert(res.message);
							}
						}
					});
				}
			}
		}
	}
	
	//메뉴 순서 변경 페이지 이동
	function goChangeOrder() {
		location.href = "/system/menu/changeOrder.mng";
	}
	
	function del(menuId) {
		if(confirm("삭제하시겠습니까?")) {
			$.ajax({
				url : "<c:url value='/system/menu/delete.json' />",
				type : "POST",
				data : {"menuId" : menuId},
				dataType : "json",
				success : function(res) {
					if ("success" == res.result) {
						alert("삭제되었습니다.");
						select();
						$('.func-modal').modal("hide");
					}else {
						alert(res.message);
					}
				}
			});
		}
	}
</script>
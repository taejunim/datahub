<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>
<article class="contentsBody">
	<div class="contentsBody-inner">
		<div class="contentsHd clear-fix">
			<tg:menuInfoTag />
		</div>
		<div class="search-box searchCondition loginData clear-fix">
			<div class="formItem">
				<label for="labelForSelect1" class="form-tit">프로그램명</label>
				<input type="text" id="pgmNmLike" maxlength="50" class="inputTxt-md mr10 searchWord" maxlength="50">
			</div>
			<div class="formItem">
				<label for="labelForSelect1" class="form-tit">프로그램 URL</label>
				<input type="text" id="pgmUrlLike" maxlength="50" class="inputTxt-md mr5 searchWord" maxlength="50">
			</div>
			<div class="btn-group onlySearch">
				<button class="cmnBtn search" id="searchBtn">조회</button>
				<button class="cmnBtn cancel" id="resetBtn">초기화</button>
			</div>
		</div>
	</div>
	<div class="clear-fix">
		<div class="floatLt">
			<p class="listTotal">총<span id="pm-usage-total">0</span>건</p>
		</div>
		<div class="floatRt">
			<select name="" id="pm-usage-dropdown" class="select-xs">
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
	<button class="cmnBtn register" style="float: right; margin:8px 3px;" onclick="showInsertModal()">등록</button>
</article>

<div class="custom-modal loc-modal custom-modal-none" tabindex="-1" aria-hidden="true">
	<div class="layerPop8 permission" tabindex="-1" aria-hidden="true" style="left: 50% !important; right: 0% !important; transform: translate(-50%, -50%) !important; top: 50% !important;">
		<div class="layerPop-header clear-fix">
			<strong id="func-modal-title">수정</strong>
			<button class="layerPop-close">닫기</button>
		</div>
		<div class="layerPop-con">
			<div class="clear-fix">
				<form id="funcForm" name="funcForm" class="form-horizontal form-label-left">
					<input type="hidden" name="pgmId" />
					<tr>
						<div class="toggleBar" style="margin-bottom: 5px;">
							<input type="hidden" name="recSt" />
							<label for="labelForSelect1" class="form-tit mr5" style="font-size: 15px;font-weight: 500;">사용유무</label>
							<input type="checkbox" id="recSt" hidden="">
							<label for="recSt" class="toggleSwitch">
								<span class="toggleButton"></span>
							</label>
						</div>
					</tr>
					<table class="pop-table mb20">
						<tbody>
						<tr>
							<th>프로그램명 *</th>
							<td colspan="2">
								<input type="text" name="pgmNm" class="inputTxt-full mr5 characterOnly" placeholder="프로그램명 입력" maxlength="50">
							</td>
						</tr>
						<tr>
							<th>프로그램 URL *</th>
							<td colspan="2">
								<input type="text" name="pgmUrl" class="inputTxt-full mr5 characterOnly" placeholder="프로그램명 호출 URL 입력" maxlength="200">
							</td>
						</tr>
						<tr>
							<th>프로그램 설명</th>
							<td colspan="2"><input type="text" name="pgmDesc" class="inputTxt-full mr5" placeholder="프로그램 설명" maxlength="500"></td>
						</tr>
						</tbody>
					</table>
				</form>
			</div>
		</div>
		<div class="btn-wrap txtCt">
			<button class="cmnBtn register mr5" onclick="func()">확인</button>
			<button class="cmnBtn cancel mr5 custom-modal-close">닫기</button>
		</div>
	</div>
</div>

<script>
	var datatable;

	$(document).ready(function() {
		datatable = $('#datatable').DataTable({
			searching : false,
			paging: true,
			responsive: true,
			language: lang_kor,
			lengthChange: true,
			processing: true,
			serverSide: true,
			order : [],
			scrollX: "100%",
			initComplete: function(settings, json) {
				this.api().page('last').draw('page');
				$("#datatable_length").css("display", "none");
			},
			drawCallback: function(settings) {
				$("#datatable_paginate").addClass("pagination");
				$("#datatable_paginate .active").addClass("on");
			},
			language: {
				lengthMenu: "_MENU_",
				info: ''
			},
			lengthMenu: [[10, 20, 30], [10, 20, 30]],
			ajax: {
				url: '/system/pgm/list.json',
				type: "POST",
				beforeSend: function () { $('.progress-body').css('display','block') },
				data: function (d) {
					if ($('#pgmNmLike').val() != "") {d.pgmNmLike = $('#pgmNmLike').val();	}
					if ($('#pgmUrlLike').val() != "") {d.pgmUrlLike = $('#pgmUrlLike').val();	}
				},
				dataType: 'json',
				dataSrc: function (data) {
					$("#pm-usage-total").text(data.recordsTotal);
					$('.progress-body').css('display','none') ;
					return data.list
				}
			},
			columns: [
				{
					title: '순번',
					className: 'colNum',
					orderable: false,
					render: function (data, type, row, meta) {
						return meta.row + meta.settings._iDisplayStart + 1;
					}
				},
				{   title: '프로그램명',
					data: 'pgmNm',
					orderable : false
				},
				{	title: '프로그램 URL',
					data: 'pgmUrl',
					orderable : false
				},
				{   title: '등록일',
					data: 'regDt',
					render: function (data, type, row) {
						return new Date(row["regDt"]).format("yyyy-MM-dd HH:mm:ss");
					},
					orderable : false

				},
				{   title: '수정일',
					data: 'updDt',
					render: function (data, type, row) {
						return new Date(row["updDt"]).format("yyyy-MM-dd HH:mm:ss");
					},
					orderable : false
				},
				{	title: '기능',
					render: function(data, type, row) {
						var html = "";
						html += "<button type='button' class='cellFormBtn cellFormBtn5' onclick='showUpdateModel(\""+row["pgmId"]+"\")'>수정</button>&nbsp;";
						html += "<button type='button' class='cellFormBtn cellFormBtn4' onclick='del(\""+row["pgmId"]+"\")'>삭제</button>";
						return html;
					},
					orderable : false
				}
			],
			columnDefs: [
				{"targets": [0], width: "40px"}
				,{"targets": [1], width: "150px"}
				,{"targets": [2], width: "200px"}
				,{"targets": [3], width: "180px"}
				,{"targets": [4], width: "180px"}
				,{"targets": [5], width: "100px"}
			]
		});

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

	$("#pm-usage-dropdown").on("change", function() {
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

	$(".custom-modal-close, .layerPop-close").click(function (e) {
		$(".loc-modal").removeClass("custom-modal-show");
		$(".loc-modal").addClass("custom-modal-none");
	})

	$(".searchWord").keyup(function(e){
		if(e.keyCode == 13)
			datatable.ajax.reload();
	})

	$("#searchBtn").click(function() {
		datatable.ajax.reload();
	});

	$("#resetBtn").click(function() {
		$("#pgmNmLike").val("");
		$("#pgmUrlLike").val("");
		datatable.ajax.reload();
	});

	function showInsertModal() {
		var form = document.funcForm;
		form.pgmId.value = "";
		form.pgmNm.value = "";
		form.pgmDesc.value = "";
		form.pgmUrl.value = "";
		//$("#recSt").bootstrapToggle('on');
		$('input:checkbox').prop('checked', true);
		$("[name='recSt']").val("1");
		$("#func-modal-title").html("등록");
		$(".loc-modal").removeClass("custom-modal-none");
		$(".loc-modal").addClass("custom-modal-show");
	}

	function showUpdateModel(pgmId) {
		$.ajax({
			url : "<c:url value='/system/pgm/view.json' />",
			type : "POST",
			data : {"pgmId" : pgmId},
			dataType : "json",
			success : function(res) {
				if ("success" == res.result) {
					var data = res.data;
					var form = document.funcForm;
					form.pgmId.value = data.pgmId;
					form.pgmNm.value = data.pgmNm;
					form.pgmDesc.value = data.pgmDesc;

					if(data.pgmDesc == null || data.pgmDesc == ""){
						form.pgmDesc.value = "";
					}else{
						form.pgmDesc.value = data.pgmDesc;
					}

					form.pgmUrl.value = data.pgmUrl;

					if(data.recSt == 1){
						//$("#recSt").bootstrapToggle('on');
						$('input:checkbox').prop('checked', true);
						$("[name='recSt']").val("1");
					}else{
						//$("#recSt").bootstrapToggle('off');
						$('input:checkbox').prop('checked', false);
						$("[name='recSt']").val("0");
					}

					$("#func-modal-title").html("수정");

					$(".loc-modal").removeClass("custom-modal-none");
					$(".loc-modal").addClass("custom-modal-show");
				}else {
					alert(res.message);
				}
			}
		});
	}

	$("#funcForm #recSt").change( function () {
		if($("#recSt").is(":checked")){
			$("[name='recSt']").val("1");
		} else {
			$("[name='recSt']").val("0");
		}
	});

	function func() {
		var form = document.funcForm;
		if($.trim(form.pgmNm.value) == "") {
			alert("프로그램명을 입력 해 주세요.");
			form.pgmNm.focus();
		}else if($.trim(form.pgmUrl.value) == "") {
			alert("프로그램 URL을 입력 해 주세요.");
			form.pgmUrl.focus();
		}else {
			if(form.pgmId.value == '') {
				if(confirm("등록하시겠습니까?")) {
					$.ajax({
						url : "<c:url value='/system/pgm/insert.json' />",
						type : "POST",
						data : $("#funcForm").serialize(),
						dataType : "json",
						success : function(res) {
							if ("success" == res.result) {
								alert("등록되었습니다.");

								$(".loc-modal").removeClass("custom-modal-show");
								$(".loc-modal").addClass("custom-modal-none");
								datatable.ajax.reload();
							}else {
								alert(res.message);
							}
						}
					});
				}
			}else {
				if(confirm("수정하시겠습니까?")) {
					$.ajax({
						url : "<c:url value='/system/pgm/update.json' />",
						type : "POST",
						data : $("#funcForm").serialize(),
						dataType : "json",
						success : function(res) {
							if ("success" == res.result) {
								alert("수정되었습니다.");

								$(".loc-modal").removeClass("custom-modal-show");
								$(".loc-modal").addClass("custom-modal-none");
								datatable.ajax.reload();
							}else {
								alert(res.message);
							}
						}
					});
				}
			}
		}
	}

	function del(pgmId) {
		if(confirm("삭제하시겠습니까?")) {
			$.ajax({
				url : "<c:url value='/system/pgm/delete.json' />",
				type : "POST",
				data : {"pgmId" : pgmId},
				dataType : "json",
				success : function(res) {
					if ("success" == res.result) {
						alert("삭제 되었습니다.");

						$(".loc-modal").removeClass("custom-modal-show");
						$(".loc-modal").addClass("custom-modal-none");
						datatable.ajax.reload();
					}else {
						alert(res.message);
					}
				}
			});
		}
	}

</script>
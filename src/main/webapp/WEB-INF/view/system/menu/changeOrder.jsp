<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>

<link rel="stylesheet" href="/css/plugins/nestable/nestable.css">

<article class="contentsBody">
	<div class="contentsBody-inner">
		<div class="contentsHd clear-fix">
			<tg:menuInfoTag />
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class=" box-primary">
				<div class="box-header">
					<strong style="font-size: 18px; font-weight: 500; display: block;">메뉴 순서 변경</strong>
				</div>
				<div class="box-body" style="padding-top: 0;">
					<div class="row">
						<div class="dd" style="max-width: 100%;">
							<ol class="dd-list">
							</ol>
						</div>
					</div>
				</div>
				<div class="box-footer">
					<div class="btn-group pull-right">
						<button class="cmnBtn list" style="margin:8px 3px;" onclick="expandAll()">모두 펼치기</button>
						<button class="cmnBtn list" style="margin:8px 3px;" onclick="collapseAll()">모두 접기</button>
						<button class="cmnBtn etc2" style="margin:8px 3px;" onclick="select()">초기화</button>
						<button class="cmnBtn register" style="margin:8px 3px;" onclick="update()">수정</button>
						<button class="cmnBtn delete" style="margin:8px 3px;" onclick="goMenu()">목록</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</article>

<script src="/js/plugins/nestable/jquery.nestable.js"></script>

<script>
	$(document).ready(function() {
		select(); 
	});
	
	function expandAll() {
		$('.dd').nestable('expandAll');
	}
	
	function collapseAll() {
		$('.dd').nestable('collapseAll');
	}
	
	function select() { 
		$(".dd-list").html("");
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
					$(".dd-list").html(html);
				}else {
					alert(res.message);
				}
			}
		}).done(function () {
			$('.progress-body').css('display','none');
		});
		$('.dd').nestable({});
	}
	
	function makeTbody(menu, depth) {
		var html = "";
		html += "<li class='dd-item ";
		if(depth == 0) html += "item-red";
		else if(depth == 1) html += "item-orange";
		else if(depth == 2) html += "item-green";
		else if(depth == 3) html += "item-blue";
		else if(depth == 4) html += "item-purple";
		else if(depth == 5) html += "item-grey";
		html += "' data-id='"+menu.menuId+"'>";
		html += "<div class='dd-handle'>"+menu.menuNm;
		html += "<small class='text-muted'>&nbsp;&nbsp;&nbsp;"+menu.pgm.pgmUrl+"</small>";
		html += "</div>";
		if(menu.childList.length > 0) {
			html += "<ol class='dd-list'>";
			for(idx in menu.childList) {
				var childMenu = menu.childList[idx];
				html += makeTbody(childMenu, parseInt(depth)+1);
			}
			html += "</ol>";
		}
		html += "</li>";
		return html;
	}
	
	function update() {
		if(confirm("수정하시겠습니까?")) {
			$.ajax({
				url : "<c:url value='/system/menu/changeOrder.json' />",
				type : "POST",
				data : {"order" : $('.dd').nestable('serialize')},
				beforeSend: function () { $('.progress-body').css('display','block') },
				dataType : "json",
				success : function(res) {
					if ("success" == res.result) {
						alert("수정되었습니다");
						location.href="/system/menu/list.mng";
					}else {
						alert(res.message);
					}
				}
			});
		}
	}

	function goMenu() {
		location.href="/system/menu/list.mng";
	}
</script>
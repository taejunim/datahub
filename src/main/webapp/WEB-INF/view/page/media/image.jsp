<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>

<section class="content">
	<div class="box box-success">
		<div class="box-header">
			<form name="searchForm">
				<div class="row">
					<div class="col-xs-6">											
                       	<div class="input-group">
                          	<span class="input-group-addon">미디어명</span>
                             <input type="text" id="mediaNmLike" name="mediaNmLike" class="form-control" placeholder="미디어명 입력" maxlength="50">
                       	</div>
					</div>
				</div>
				<div class="btn-group pull-right">
					<button type="button" class="btn btn-outline-primary" id="searchBtn"><i class="fa fa-search"></i> 검색</button>
					<button type="button" class="btn btn-outline-primary" id="resetBtn"><i class="fa fa-undo"></i> 리셋</button>
				</div>
			</form>
		</div>
		<div class="box-body">
			<div class="row" id="gallery"></div>
			<div class="text-center" id="pagination"></div>
		</div>
	</div>
</section>

<script src="<c:url value='/js/common/pagination.js' />"></script>
<script>

	var datatable;
	$(document).ready(function() {
		
		setPagination("${totalCnt}", 12);
		selectList();
	});
	
	function selectList() {
		$.ajax({
			url : "<c:url value='/system/media/list.json' />",
			type : "POST",
			data : {"columns[column][name]" : "REG_DT", "order[0][column]" : "column", "order[0][dir]" : "DESC", "start" : firstRecordIndex, "length" : 12, "pagingYn" : true, "mediaNmLike" : $("#mediaNmLike").val()},
			dataType : "json",
			success : function(res) {
				if ("success" == res.result) {
					var html = "";
					if(res.data.length == 0) {
						html += "<div class='col-xs-3'>";
						html += "데이터가 존재하지 않습니다.";
						html += "</div>";
					}else {
						for(idx in res.data) {
							var data = res.data[idx];
							html += "<div class='col-xs-3'>";
							html += "<div class='box box-primary'>";
							html += "<div class='box-header'>";
							html += data.mediaNm +"&nbsp;"+ data.mediaRegNm +"("+data.mediaRegId+")";
							html += "</div>";
							html += "<div class='box-body text-center'>";
							html += "<a href='/public/media/image.json?hash="+data.hash+"&"+new Date().getTime()+"' rel='lightbox'>";
							html += "<img src='/public/media/image.json?hash="+data.hash+"&thumnail=true&"+new Date().getTime()+"' onclick='selectImage(\""+data.hash+"\")' style='width:100%;height:110px;' alt='"+data.mediaNm+"' />";
							html += "</a>";
							html += "</div>";
							html += "</div>";
							html += "</div>";
						}
					}
					$("#gallery").html(html);
					
					totalRecord = res.recordsTotal;
					renderPagination();
				}else {
					alert(res.message);
				}
			}
		});
	}
	
	function selectImage(hash){
		opener.setImage(hash);
		//window.close();
	}
	
	$("#searchBtn").click(function() {
		selectList();
	});
	
	$("#resetBtn").click(function() {
		$('#mediaNmLike').val("");
		selectList();
	});
	
	$(".content input").keypress(function(event) {
	    if (event.which == 13) {
	        event.preventDefault();
	        selectList();
	    }
	});
	
</script>
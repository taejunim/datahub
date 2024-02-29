<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>

<article class="contentsBody">
	<div class="contentsBody-inner">
		<div class="contentsHd clear-fix">
			<tg:menuInfoTag />
		</div>
		<div class="search-box clear-fix">
			<div class="formItem">
				<label class="form-tit">기간</label>
				<div class="calendar-wr mr5">
					<div class="calendar-item">
						<input type="text" class="date-picker2 datepicker" name="startSearchDt" id="startSearchDt">
						<span class="calendar-btn"><img src="/images/cmn/ico_calendar.png" alt="달력"></span>
					</div>
					<span>~</span>
					<div class="calendar-item">
						<input type="text" class="date-picker2 datepicker" name="endSearchDt" id="endSearchDt">
						<span class="calendar-btn"><img src="/images/cmn/ico_calendar.png" alt="달력"></span>
					</div>
				</div>
				<div class="btn-group onlySearch">
					<button class="cmnBtn search" id="searchBtn" onclick="chartData()">조회</button>
					<button class="cmnBtn cancel" id="resetBtn">초기화</button>
				</div>
			</div>
		</div>
		<div class="contents_wrap">
			<div style="display: flex;justify-content: space-between;">
				<div class="inforAll" style="width: 100%;">
					<div class="statsAll">
						<div class="formhd">
							<label class="formhd-tit">사용자 접속통계</label>
						</div>
					</div>
					<div class="inforArea">
						<div id="line-chart" class="chart" style="width:100%; height:100%;"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</article>

<script>
	$(document).ready(function(){
		var currentDate = new Date();
		var previousMonthDate = new Date(currentDate);
		previousMonthDate.setFullYear(previousMonthDate.getFullYear() - 1);

		$("#startSearchDt").val(previousMonthDate.getFullYear() + "-" + ((previousMonthDate.getMonth() + 1) > 9 ? (previousMonthDate.getMonth() + 1).toString() : "0" + (previousMonthDate.getMonth() + 1)) + "-" + (previousMonthDate.getDate() > 9 ? previousMonthDate.getDate().toString() : "0" + previousMonthDate.getDate().toString()));
		$("#endSearchDt").val(currentDate.getFullYear() + "-" + ((currentDate.getMonth() + 1) > 9 ? (currentDate.getMonth() + 1).toString() : "0" + (currentDate.getMonth() + 1)) + "-" + (currentDate.getDate() > 9 ? currentDate.getDate().toString() : "0" + currentDate.getDate().toString()));

		chartData();

		$(window).resize(function () {
			chartData();
		})
	});

	$("#resetBtn").click(function() {
		var currentDate = new Date();
		var previousMonthDate = new Date(currentDate);
		previousMonthDate.setFullYear(previousMonthDate.getFullYear() - 1);

		$("#startSearchDt").val(previousMonthDate.getFullYear() + "-" + ((previousMonthDate.getMonth() + 1) > 9 ? (previousMonthDate.getMonth() + 1).toString() : "0" + (previousMonthDate.getMonth() + 1)) + "-" + (previousMonthDate.getDate() > 9 ? previousMonthDate.getDate().toString() : "0" + previousMonthDate.getDate().toString()));
		$("#endSearchDt").val(currentDate.getFullYear() + "-" + ((currentDate.getMonth() + 1) > 9 ? (currentDate.getMonth() + 1).toString() : "0" + (currentDate.getMonth() + 1)) + "-" + (currentDate.getDate() > 9 ? currentDate.getDate().toString() : "0" + currentDate.getDate().toString()));
		chartData();
	});

	function chartData() {
		if($('#startSearchDt').val() != "" && $('#endSearchDt').val() != "") {
			if ($('#startSearchDt').val() > $('#endSearchDt').val()) {
				alert("시작일은 종료일보다 클 수 없습니다.");
				return;
			}
		}
	    $.ajax({
	        url : "<c:url value='/system/siteStats/list.json' />",
	        type : "POST",
			data : {"startSearchDt":$("#startSearchDt").val(),"endSearchDt":$("#endSearchDt").val()},
	        dataType : "json",
	        success : function(result) {
	        	//chart 초기화
	        	$('#line-chart').html('');

	            Morris.Line({
					element: 'line-chart',
					data: result.data,
					xkey: 'convertedSearchDate',
					ykeys: ['loginCount'],
					labels: ['접속자수'],
					lineColors: ['#3c8dbc'],
					hideHover: 'auto',
					resize: true	//반응형 리사이징 문제점 파악
				});
	        }
	    });
	}

	// 일정기간 : datepicker 설정(오늘까지 선택가능하도록)
	$(function() {
		$('.datepicker').datepicker({
			format: "yyyy-mm-dd",   // 데이터 포맷 형식(yyyy : 년, mm : 월, dd : 일 )
			endDate: '0d',       // 달력에서 선택 할 수 있는 가장 나중 날짜. 이후으로는 선택 불가능 ( d : 일 m : 달 y : 년 w : 주)
			autoclose : true,	    // 사용자가 날짜를 클릭하면 자동 캘린더가 닫히는 옵션
			language : "ko"	        // 달력의 언어 선택, 그에 맞는 js로 교체해줘야한다.
		});

		$.datepicker.setDefaults({
			dateFormat:"yy-mm-dd",
			closeText: "닫기",
			currentText: "오늘",
			prevText: '이전 달',
			nextText: '다음 달',
			monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			dayNames: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
			weekHeader: "주",
			yearSuffix: '년'
		});
	});
	
</script>
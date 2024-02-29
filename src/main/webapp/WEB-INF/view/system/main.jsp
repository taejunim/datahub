<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>

<section class="content">
	<div class="row">
		<c:if test="${userRole.contains('ROLE_MANAGER') or userRole.contains('ROLE_SYSTEM')}">
		<div class="col-md-12 col-sm-12 col-xs-12">
			<div class="box box-info">
				<div class="box-header">
					<h3 class="box-title"><i class='material-icons' style='font-size:16px;'>play_arrow</i>&nbsp;&nbsp;거래 현황 관리</h3>
					<div class="box-tools pull-right">
						<a href="<c:url value='/system/status/deal.mng?currentMenuId=1036'/>">
							<button type="button" class="btn btn-sm btn-outline-primary">
								더보기
							</button>
						</a>
					</div>
				</div>
				<div class="box-body" style="padding: 10px;">
					<div class="box-card col-md-3 col-sm-6 col-xs-12">
						<div class="box-card-input">
							<div> 일일 매입 전력량 </div>
							<div id="daySupply"></div>
						</div>
					</div>
					<div class="box-card col-md-3 col-sm-6 col-xs-12">
						<div class="box-card-input">
							<div> 일일 판매 전력량 </div>
							<div id="dayDemand"></div>
						</div>
					</div>
					<div class="box-card col-md-3 col-sm-6 col-xs-12">
						<div class="box-card-input">
							<div> 매입 전력 누계량 </div>
							<div id="addSupply"></div>
						</div>
					</div>
					<div class="box-card col-md-3 col-sm-6 col-xs-12">
						<div class="box-card-input">
							<div> 판매 전력 누계량 </div>
							<div id="addDemand"></div>
						</div>
					</div>
				</div>
				<div class="box-footer">
				</div>
			</div>
		</div>

		<div class="col-md-12 col-sm-12 col-xs-12">
			<div class="box box-info">
				<div class="box-header">
					<h3 class="box-title"><i class='material-icons' style='font-size:16px;'>play_arrow</i>&nbsp;&nbsp;정산 현황 관리</h3>
					<div class="box-tools pull-right">
						<a href="<c:url value='/system/status/clc.mng?currentMenuId=1039'/>">
							<button type="button" class="btn btn-sm btn-outline-primary">
								더보기
							</button>
						</a>
					</div>
				</div>
				<div class="box-body" style="padding: 10px;">
					<div class="box-card col-md-4 col-sm-4 col-xs-12">
						<div class="box-card-input">
							<div> 정산진행건수 </div>
							<div id="settleProcess"></div>
						</div>
					</div>
					<div class="box-card col-md-4 col-sm-4 col-xs-12">
						<div class="box-card-input">
							<div> 미정산건수 </div>
							<div id="unsettled"></div>
						</div>
					</div>
					<div class="box-card col-md-4 col-sm-4 col-xs-12">
						<div class="box-card-input">
							<div> 정산완료건수 </div>
							<div id="settleComplete"></div>
						</div>
					</div>
				</div>
				<div class="box-footer">
				</div>
			</div>
		</div>
		</c:if>

		<div class="col-md-12 col-sm-12 col-xs-12">
			<div class="box box-info">
				<div class="box-header">
					<h3 class="box-title"><i class='material-icons' style='font-size:16px;'>play_arrow</i>&nbsp;&nbsp;사용자 접속 통계</h3>
					<div class="box-tools pull-right">
						<a href="<c:url value='/system/siteStats/list.mng?currentMenuId=26'/>">
							<button type="button" class="btn btn-sm btn-outline-primary">
								더보기
							</button>
						</a>
					</div>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-sm-12 col-xs-12">
							<div class="input-group">
								<span class="input-group-addon">일정기간</span>
								<input type="text" class="form-control datepicker" name="startSearchDt" id="startSearchDt" placeholder="시작일">
								<span class="input-group-addon"> ~ </span>
								<input type="text" class="form-control datepicker" name="endSearchDt" id="endSearchDt" placeholder="종료일">
							</div>
						</div>
					</div>
					<div class="box-footer">
						<div class="btn-group pull-right">
							<button type="button" class="btn btn-outline-primary" id="searchBtn" onclick="chartData()"></i> 검색</button>
							<button type="button" class="btn btn-outline-primary" id="resetBtn"></i> 리셋</button>
						</div>
					</div>
					<div class="box-body chart-responsive">
						<div id="line-chart" class="chart" style="width:100%; height:300px;"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<script>

	$(document).ready(function() {
		chartData();

		$.ajax({
			url : "/system/status/dashboard.json",
			type : "POST",
			data : { todayStr : userService.toToday() },
			dataType : "json",
			success : function(res) {
				if(res.result == "success") {
					$("#daySupply").html(res.daySupply + " kWh");
					$("#dayDemand").html(res.dayDemand + " kWh");
					$("#addSupply").html(res.addSupply + " kWh");
					$("#addDemand").html(res.addDemand + " kWh");
					$("#settleProcess").html(res.settleProcess + " 건");
					$("#unsettled").html(res.unsettled + " 건");
					$("#settleComplete").html(res.settleComplete + " 건");
				} else {
					alert(res.message);
				}
			}
		})

		$(window).resize(function () {
			chartData();
		})

	});

	$("#resetBtn").click(function() {
		$('#startSearchDt').val("");
		$('#endSearchDt').val("");
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
			todayHighlight : true,	// 오늘 날짜에 하이라이팅 기능 기본값 :false
			language : "ko"	        // 달력의 언어 선택, 그에 맞는 js로 교체해줘야한다.
		});
	});

</script>
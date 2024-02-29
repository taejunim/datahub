$(document).ready(function() {
    setYearMonthSelect();

    $(window).on('resize', function() {
        chartData();
    });

    $(".btn-group .btn").on("click", function () {
        $("#btnId").val(this.id);
        $("#yearLike").val("");
        $("#yearLike").selectpicker("refresh");
        $("#monthLike").val("");
        $("#monthLike").selectpicker("refresh");

        if ($(".btn-group .btn").hasClass('active')) {
            $(".btn-group .btn").removeClass('active');
        }
        $(this).addClass('active');
    });

    $("#timeBtn").on("click", function () {
        $("#yearSelect").hide();
        $("#monthSelect").hide();
        $("#chartReload").hide();
        $("#box-title").html("시간대별 매입 전력량 통계");
        chartData();
    }).click();

    $("#dayBtn").on("click", function () {
        $("#yearSelect").show();
        $("#monthSelect").show();
        $("#chartReload").show();
    });

    $("#monthBtn").on("click", function () {
        $("#yearSelect").show();
        $("#monthSelect").hide();
        $("#chartReload").show();
    });

    $("#yearBtn").on("click", function () {
        $("#yearSelect").hide();
        $("#monthSelect").hide();
        $("#chartReload").hide();
        $("#box-title").html("연도별 매입 전력량 통계");
        chartData();
    });

    $("#chartBtn").on("click", function () {
        if ($("#btnId").val() == "dayBtn") {
            if ($("#yearLike").val() == "") {
                alert("검색할 년도를 선택해주세요.");
                $("#yearLike").selectpicker("toggle");
            } else if ($("#monthLike").val() == "") {
                alert("검색할 달을 선택해주세요.");
                $("#monthLike").selectpicker("toggle");
            } else {
                $("#box-title").html("일별 매입 전력량 통계");
                chartData();
            }
        } else if ($("#btnId").val() == "monthBtn") {
            if ($("#yearLike").val() == "") {
                alert("검색할 년도를 선택해주세요.");
                $("#yearLike").selectpicker("toggle");
            } else {
                $("#box-title").html("월별 매입 전력량 통계");
                chartData();
            }
        }
    });

});

function setYearMonthSelect() {
    var dt = new Date();
    var year = dt.getFullYear();
    $("#yearLike").append("<option value=''>년도 선택</option>");
    for(var y = (year-5); y <= year; y++) {
        $("#yearLike").append("<option value='"+ y +"'>"+ y +"년</option>");
    }
    $("#yearLike option:eq(0)").hide();

    $("#monthLike").append("<option value=''>달 선택</option>");
    for (var i = 1; i <= 12; i++) {
        $("#monthLike").append("<option value='" + i + "'>" + i + " 월</option>");
    }
    $("#monthLike option:eq(0)").hide();
}

function chartData() {
    $('#line-chart').html('');
    $.ajax({
        url : "/system/stats/deal.json",
        type : "POST",
        data : {
            insttCdLike : $("#insttCdLike").val(),
            btnId : $("#btnId").val(),
            yearLike : $("#yearLike").val(),
            monthLike : $("#monthLike").val()
        },
        dataType : "json",
        success : function(result) {
            var data = result.data;
            Morris.Line({
                element: 'line-chart',
                data: data,
                xkey: 'statsDt',
                ykeys: ['statsAmt'],
                labels: ['전력량'],
                lineColors: ['#3c8dbc'],
                hideHover: 'auto',
                resize: true	//반응형 리사이징 문제점 파악
            });
        }
    });
}

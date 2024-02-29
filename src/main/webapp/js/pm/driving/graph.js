document.write('<script src="/js/namu/NamuChart.js"></script>');

var formatString = 'YYYY-MM-DD HH:mm:ss';

$(() => {
    var resultObj = null;
    var spotList = [];

    $(".datepicker").datepicker({
        format: "yyyy-mm-dd"
        ,autoclose: true
        ,language: "ko"
        ,todayBtn: "linked"
        ,clearBtn: true
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

    // 디폴트로 쓸 날짜 가져오기
    var currentDate = new Date();
    var previousMonthDate = new Date(currentDate);
    previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);

    $("#startSearchDt").datepicker("setDate", previousMonthDate);
    $("#endSearchDt").datepicker("setDate", currentDate);

    $("#cvsFile").on("input", (e) => {
        console.dir(e.target.files[0]);
        csvFileToJSON(e.target.files[0]);
    });

    $("#searchBtn").on("click", function (e) {
        $(".vs").hide();
        submit();
    });

    $("#operator-order").on("change", function(e) {
        if (resultObj !== null) {
            var operatorStat = resultObj.operatorStat;

            if ($(this).val() === "asc") {
                if (operatorStat !== null) {
                    operatorStat.sort(function (a, b) {
                        return a.totalCnt - b.totalCnt;
                    })

                    resultObj = {
                        ...resultObj,
                        operatorStat: operatorStat
                    }

                    NamuChart.createOneChartBase(
                        "operator-bchart-usage",
                        NamuChart.chartType.IMAGE_ON_TOP.group_cd,
                        operatorStat, resultObj.isChartStacked === true ? {bottomName: resultObj.operatorBarChartBottomCntName, topName: resultObj.operatorBarChartTopCntName} : null
                    );
                }
            } else if ($(this).val() === "desc") {
                if (operatorStat !== null) {
                    operatorStat.sort(function (a, b) {
                        return b.totalCnt - a.totalCnt;
                    })

                    resultObj = {
                        ...resultObj,
                        operatorStat: operatorStat
                    }

                    NamuChart.createOneChartBase(
                        "operator-bchart-usage",
                        NamuChart.chartType.IMAGE_ON_TOP.group_cd,
                        operatorStat, resultObj.isChartStacked === true ? {bottomName: resultObj.operatorBarChartBottomCntName, topName: resultObj.operatorBarChartTopCntName} : null
                    );
                }
            }
        }
    });

    $("#spot-order").on("change", function(e) {
        if (resultObj !== null) {
            var spotStat = resultObj.spotBarStat;

            if ($(this).val() === "asc") {
                if (spotStat !== null) {
                    spotStat.sort(function (a, b) {
                        return a.totalCnt - b.totalCnt;
                    })

                    resultObj = {
                        ...resultObj,
                        spotBarStat: spotStat
                    }

                    NamuChart.createOneChartBase(
                        "loc-bchart-usage",
                        NamuChart.chartType.CURVED.group_cd,
                        spotStat, resultObj.isChartStacked === true ? {bottomName: resultObj.spotBarChartBottomCntName, topName: resultObj.spotBarChartTopCntName} : null
                    );
                }
            } else if ($(this).val() === "desc") {
                if (spotStat !== null) {
                    spotStat.sort(function (a, b) {
                        return b.totalCnt - a.totalCnt;
                    })

                    resultObj = {
                        ...resultObj,
                        spotBarStat: spotStat
                    }

                    NamuChart.createOneChartBase(
                        "loc-bchart-usage",
                        NamuChart.chartType.CURVED.group_cd,
                        spotStat, resultObj.isChartStacked === true ? {bottomName: resultObj.spotBarChartBottomCntName, topName: resultObj.spotBarChartTopCntName} : null
                    );
                }
            }
        }
    });

    $("#kind-order").on("change", function(e) {
        if (resultObj !== null) {
            var kindStat = resultObj.kindStat;

            if ($(this).val() === "asc") {
                if (kindStat !== null) {
                    kindStat.sort(function (a, b) {
                        return a.totalCnt - b.totalCnt;
                    })

                    resultObj = {
                        ...resultObj,
                        kindStat: kindStat
                    }

                    NamuChart.createOneChartBase(
                        "kind-bchart-usage",
                        NamuChart.chartType.BAR.group_cd,
                        kindStat, null
                    );
                }
            } else if ($(this).val() === "desc") {
                if (kindStat !== null) {
                    kindStat.sort(function (a, b) {
                        return b.totalCnt - a.totalCnt;
                    })

                    resultObj = {
                        ...resultObj,
                        kindStat: kindStat
                    }

                    NamuChart.createOneChartBase(
                        "kind-bchart-usage",
                        NamuChart.chartType.BAR.group_cd,
                        kindStat, null
                    );
                }
            }
        }
    });

    $(".custom-modal-close").click(function (e) {
        $(".loc-modal").removeClass("custom-modal-show");
        $(".loc-modal").addClass("custom-modal-none");
    })

    $(".zoom-icon").on("click", function () {
        $(".loc-modal").removeClass("custom-modal-none");
        $(".loc-modal").addClass("custom-modal-show");

        var retf = $('input[name="search-target"]:checked').val();

        var groupCdList = [];
        var groupListList = [];

        groupCdList = $(this).data("groupcd").split(",");
        groupListList = $(this).data("grouplist").split(",");

        if (groupCdList.length === 2) {
            $("#first-chart").addClass("first-chart-half");
            $("#second-chart").addClass("second-chart-show");

            NamuChart.createOneChartBase("first-chart", groupCdList[0], resultObj[groupListList[0]]);
            NamuChart.createOneChartBase("second-chart", groupCdList[1], groupCdList[1] == NamuChart.chartType.WORD_CLOUD.group_cd ? spotList : resultObj[groupListList[1]]);
        } else if (groupListList.length === 1) {
            $("#first-chart").removeClass("first-chart-half");
            $("#second-chart").removeClass("second-chart-show");

            NamuChart.createOneChartBase("first-chart", groupCdList[0], resultObj[groupListList[0]], groupCdList[0] == NamuChart.chartType.LINE.group_cd ? (resultObj.isChartStacked === true ? {firstName: resultObj.timeLineChartFirstCntName, secondName: resultObj.timeLineChartSecondCntName} : {firstName: retfDecoder(retf)}) : null);
        }
    });

    function submit() {
        var formatString = 'YYYY-MM-DD HH:mm:ss';

        // var retf = $("#graph-usage-retf").val();
        var retf = $('input[name="search-target"]:checked').val();

        var startSearchDt = $("input[name='startSearchDt']").val() ? moment($("input[name='startSearchDt']").val(), 'YYYY-MM-DD').format(formatString) : "";
        var endSearchDt = $("input[name='endSearchDt']").val()  ? moment($("input[name='endSearchDt']").val(), 'YYYY-MM-DD').format(formatString) : "";

        if (moment(startSearchDt).isAfter(endSearchDt)) {
            alert("검색종료일은 검색시작일보다 이후 날짜를 입력해야 합니다.");
            $("input[name='startSearchDt']").focus();
            return false;
        }

        endSearchDt= moment(endSearchDt).add(1, 'days').format(formatString);

        $.ajax({
            url: "/pm/driving/getOverallPmLendRtnHstryStat.json",
            type: "POST",
            data: {
                retf : retf,
                startSearchDt : startSearchDt,
                endSearchDt : endSearchDt
            },
            dataType: "json",
            success: function (resObj) {

                if ($("#operator-order").val() === 'asc') {
                    $("#operator-order").val('desc');
                }

                if ($("#spot-order").val() === 'asc') {
                    $("#spot-order").val('desc');
                }

                if ($("#kind-order").val() === 'asc') {
                    $("#kind-order").val('desc');
                }

                spotList = [];

                resObj.spotBarStat.forEach(item => {
                    for (var i = 0; i < item.totalCnt; i++) {
                        spotList.push(item.name);
                    }
                });

                (async () => {
                    $(".dow-bchart-usage-vs").show();
                    NamuChart.createOneChartBase(
                        "dow-bchart-usage",
                        NamuChart.chartType.BAR.group_cd, resObj.dowStat,
                        resObj.isChartStacked === true ? {bottomName: resObj.dowBarChartBottomCntName, topName: resObj.dowBarChartTopCntName} : null
                    );
                    NamuChart.createOneChartBase(
                        "comb-bheatmap-usage",
                        NamuChart.chartType.BUBBLE_BASED_HEATMAP.group_cd, resObj.dowTimeStat
                    );
                    await NamuChart.createOneChartBasePromise(
                        ["operator-bchart-usage", "kind-bchart-usage"],
                        [NamuChart.chartType.IMAGE_ON_TOP.group_cd, NamuChart.chartType.BAR.group_cd],
                        [resObj.operatorStat, resObj.kindStat], [(resObj.isChartStacked === true ? {bottomName: resObj.operatorBarChartBottomCntName, topName: resObj.operatorBarChartTopCntName} : null), null]
                    );
                    await NamuChart.createOneChartBasePromise(
                        ["time-lchart-usage"],
                        [NamuChart.chartType.LINE.group_cd],
                        [resObj.timeStat], [(resObj.isChartStacked === true ? {firstName: resObj.timeLineChartFirstCntName, secondName: resObj.timeLineChartSecondCntName} : {firstName: retfDecoder(retf)})]
                    );
                    await NamuChart.createOneChartBasePromise(["loc-wordcloud-usage", "loc-bchart-usage"], [NamuChart.chartType.WORD_CLOUD.group_cd, NamuChart.chartType.CURVED.group_cd], [spotList, resObj.spotBarStat], [null, resObj.isChartStacked === true ? {bottomName: resObj.spotBarChartBottomCntName, topName: resObj.spotBarChartTopCntName} : null]);
                    // NamuChart.createOneChartBase("loc-pchart-usage", NamuChart.chartType.PIE.group_cd, resObj.spotPieStat, retfDecoder(retf));
                })();

                resultObj = resObj;
            },
            error: function(xhr, status, error) {
                alert('데이터를 불러오는도중 에러가 발생했습니다.\n해당 문제가 지속될 경우 관리자에게 문의하여 주십시오.');
                console.log(error.code);
            }
        })
    }

    function retfDecoder(retfName) {
        if (retfName === "rent") {
            return "대여";
        } else if (retfName === "return") {
            return "반납";
        }
    }

    submit();

});



/*var createChart = (roots, divNum, checkNum) => {
    var chartOption = NamuChart.chartOption.new();
    chartOption.divNum = divNum;

    if (checkNum == "1") {
        chartOption.title = "종별";
        chartOption.categoryFieldName = "wrngdo_isrty_vhcty_lclas_cd";
        chartOption.targets = [
            {name: "사망자수", value: "dth_dnv_cnt"},
            {name: "경상자수", value: "se_dnv_cnt"},
            {name: "중상자수", value: "sl_dnv_cnt"},
        ];
        NamuChart.createColumnChart(roots, chartOption, data);
    } else if (checkNum == "2") {
        chartOption.title = "지역별";
        chartOption.categoryFieldName = "occrrnc_lc_sgg_cd";
        chartOption.targets = [
            {name: "사망자수", value: "dth_dnv_cnt"},
            {name: "경상자수", value: "se_dnv_cnt"},
            {name: "중상자수", value: "sl_dnv_cnt"},
        ];
        // drawChart(arrReduceSum(categoryFieldName, outputTargets, data));
        NamuChart.createColumnChart(roots, chartOption, data);
    } else if (checkNum == "3") {
        chartOption.title = "시간별";
        chartOption.categoryFieldName = "occrrnc_dt";
        chartOption.targets = [
            {name: "사상자수", value: "injpsn_cnt"},
            {name: "사망자수", value: "dth_dnv_cnt"},
            {name: "경상자수", value: "se_dnv_cnt"},
            {name: "중상자수", value: "sl_dnv_cnt"},
        ];
        NamuChart.createLineChart(roots, chartOption, data);
    } else if (checkNum == "4") {
        chartOption.title = "요일별";
        chartOption.categoryFieldName = "occrrnc_day_cd";
        chartOption.targets = [
            {name: "사망자수", value: "dth_dnv_cnt"},
            {name: "경상자수", value: "se_dnv_cnt"},
            {name: "중상자수", value: "sl_dnv_cnt"},
        ];
        NamuChart.createColumnChart(roots, chartOption, data);
    }
};*/

/*
var clickSearch = (e) => {
    console.dir(e);
    var chkChartArray = new Array();
    $('input:checkbox[name=searchTitle]:checked').each(function() {
        chkChartArray.push(this.value);
    })
    console.dir(chkChartArray);

    $("#chartdiv").empty();
    var chartCnt = chkChartArray.length;
    for (let i = 0; i < chartCnt; i++) {
        $("#chartdiv").append('<div class="chartdiv" id="chartdiv' + i + '"></div>');
    }

    const roots = NamuChart.createRoots(chartCnt);

    for (let i = 0; i < chkChartArray.length; i++) {
        const chartNum = chkChartArray[i];
        createChart(roots, i, chartNum);
    }
};*/

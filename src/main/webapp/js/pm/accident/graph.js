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
    // previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
    previousMonthDate.setFullYear(previousMonthDate.getFullYear() - 1);

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
                        "loc-bchart-acc",
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
                        "loc-bchart-acc",
                        NamuChart.chartType.CURVED.group_cd,
                        spotStat, resultObj.isChartStacked === true ? {bottomName: resultObj.spotBarChartBottomCntName, topName: resultObj.spotBarChartTopCntName} : null
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

            NamuChart.createOneChartBase("first-chart", groupCdList[0], resultObj[groupListList[0]], {op: true});
        }
    });

    function submit() {

        var startSearchDt = $("input[name='startSearchDt']").val() ? moment($("input[name='startSearchDt']").val(), 'YYYY-MM-DD').format(formatString) : "";
        var endSearchDt = $("input[name='endSearchDt']").val()  ? moment($("input[name='endSearchDt']").val(), 'YYYY-MM-DD').format(formatString) : "";

        if (moment(startSearchDt).isAfter(endSearchDt)) {
            alert("검색종료일은 검색시작일보다 이후 날짜를 입력해야 합니다.");
            $("input[name='startSearchDt']").focus();
            return false;
        }

        $.ajax({
            url: "/pm/accident/getOverallAccidentStat.json",
            type: "POST",
            data: {
                startSearchDt : startSearchDt,
                endSearchDt : endSearchDt
            },
            dataType: "json",
            success: function (resObj) {

                if ($("#spot-order").val() === 'asc') {
                    $("#spot-order").val('desc');
                }

                spotList = [];

                resObj.spotBarStat.forEach(item => {
                    for (var i = 0; i < item.totalCnt; i++) {
                        spotList.push(item.name);
                    }
                });

                (async () => {
                    // 첫번째 라인
                    $(".piechart-vs").show();
                    NamuChart.createOneChartBase("gender-chart", NamuChart.chartType.DONUT.group_cd, resObj.genderStat);
                    NamuChart.createOneChartBase("age-chart", NamuChart.chartType.DONUT.group_cd, resObj.ageStat);
                    NamuChart.createOneChartBase("pmKind-chart", NamuChart.chartType.DONUT.group_cd, resObj.kindStat);
                    NamuChart.createOneChartBase("operator-chart", NamuChart.chartType.DONUT.group_cd, resObj.operatorStat);
                    NamuChart.createOneChartBase("accType-chart", NamuChart.chartType.DONUT.group_cd, resObj.typeStat);
                    await NamuChart.createOneChartBasePromise(["time-lchart-acc", "dow-bchart-acc"], [NamuChart.chartType.COLOR_LINE.group_cd, NamuChart.chartType.BAR.group_cd], [resObj.timeStat, resObj.dowStat], [null, null]);
                    await NamuChart.createOneChartBasePromise(["loc-wordcloud-acc", "loc-bchart-acc"], [NamuChart.chartType.WORD_CLOUD.group_cd, NamuChart.chartType.CURVED.group_cd], [spotList, resObj.spotBarStat], [null, null]);
                    // NamuChart.createOneChartBase("loc-pchart-usage", NamuChart.chartType.PIE.group_cd, resObj.spotPieStat);
                })();

                resultObj = resObj;
            },
            error: function(xhr, status, error) {
                alert('데이터를 불러오는도중 에러가 발생했습니다.\n해당 문제가 지속될 경우 관리자에게 문의하여 주십시오.');
                console.log(error.code);
            }
        })
    }

    submit();
});

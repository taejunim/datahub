var barChartArray = [];

var BarChart_CarType;
var BarChart_CarType_XAxis;
var BarChart_CarType_Series_Sedan;
var BarChart_CarType_Series_Van;
var BarChart_CarType_Series_Truck;
var BarChart_CarType_Series_Bus;
var BarChart_CarType_DataArray = [];

var BarChart_TimeZoneCode;
var BarChart_TimeZoneCode_XAxis;
var BarChart_TimeZoneCode_Series_AM;
var BarChart_TimeZoneCode_Series_PM;
var BarChart_TimeZoneCode_DataArray = [];

var BarChart_Gender;
var BarChart_Gender_XAxis;
var BarChart_Gender_Series_MALE;
var BarChart_Gender_Series_FEMALE;
var BarChart_Gender_DataArray = [];

var BarChart_CarWeather;
var BarChart_CarWeather_XAxis;
var BarChart_CarWeather_Series_MILD;
var BarChart_CarWeather_Series_CLOUD;
var BarChart_CarWeather_Series_RAIN;
var BarChart_CarWeather_Series_SNOW;
var BarChart_CarWeather_DataArray = [];

var BarChart_PopulationWeather;
var BarChart_PopulationWeather_XAxis;
var BarChart_PopulationWeather_Series_MILD;
var BarChart_PopulationWeather_Series_CLOUD;
var BarChart_PopulationWeather_Series_RAIN;
var BarChart_PopulationWeather_Series_SNOW;
var BarChart_PopulationWeather_DataArray = [];

var PieChart_CarType;
var PieChart_CarType_Series;
var PieChart_CarType_Legend;
var PieChart_CarType_DataArray = [];

var PieChart_TimeZoneCode;
var PieChart_TimeZoneCode_Series;
var PieChart_TimeZoneCode_Legend;
var PieChart_TimeZoneCode_DataArray = [];

var PieChart_Gender;
var PieChart_Gender_Series;
var PieChart_Gender_Legend;
var PieChart_Gender_DataArray = [];

var PieChart_CarWeather;
var PieChart_CarWeather_Series;
var PieChart_CarWeather_Legend;
var PieChart_CarWeather_DataArray = [];

var PieChart_PopulationWeather;
var PieChart_PopulationWeather_Series;
var PieChart_PopulationWeather_Legend;
var PieChart_PopulationWeather_DataArray = [];

let seriesCarColor1 = 0xbae1ff;
let seriesCarColor2 = 0xffb3ba;
let seriesCarColor3 = 0xbbfdc8;
let seriesCarColor4 = 0xffdfba;

let seriesTimeZoneColor1 = 0xbae1ff;
let seriesTimeZoneColor2 = 0xffb3ba;
let seriesGenderColor1 = 0x67b7dc;
let seriesGenderColor2 = 0xdc6967;

let seriesWeatherColor1 = 0xbee9b4;
let seriesWeatherColor2 = 0xf2cfa5;
let seriesWeatherColor3 = 0x67b7dc;
let seriesWeatherColor4 = 0xdc6967;

let isLowResolution = false

$(document).ready(() => {

    //AM5차트 라이센스 등록
    am5.addLicense("AM5C423195853");

    let windowWidth = $(window).width();

    //저해상도 설정
    if (windowWidth < 1400) {
        isLowResolution = true;

        $('.layerPop').css('top', '0px');
        $('.layerPop').css('left', '68%');
        $('#zoneList').css('height', '411px');
        $('.listPop').css('height', '650px');
    }

    barChartArray.push(createBarChart("BarChart_CarType", {}, BarChart_CarType_DataArray, '승용', '승합', '특수', '화물'));
    createPieChart("PieChart_CarType", {}, PieChart_CarType_DataArray);

    barChartArray.push(createBarChart("BarChart_TimeZoneCode", {}, BarChart_TimeZoneCode_DataArray, '오전', '오후', '', ''));
    createPieChart("PieChart_TimeZoneCode", {}, PieChart_TimeZoneCode_DataArray);

    barChartArray.push(createBarChart("BarChart_Gender", {}, BarChart_Gender_DataArray, '남성', '여성', '', ''));
    createPieChart("PieChart_Gender", {}, PieChart_Gender_DataArray);

    barChartArray.push(createBarChart("BarChart_CarWeather", {}, BarChart_CarWeather_DataArray, '맑음', '흐림', '비', '눈'));
    createPieChart("PieChart_CarWeather", {}, PieChart_CarWeather_DataArray);

    barChartArray.push(createBarChart("BarChart_PopulationWeather", {}, BarChart_PopulationWeather_DataArray, '맑음', '흐림', '비', '눈'));
    createPieChart("PieChart_PopulationWeather", {}, PieChart_PopulationWeather_DataArray);

    $("#compareModalButton").click(function() {
        $("#compare-modal").removeClass("modal-none");
        $("#compare-modal").addClass("modal-show");
    });

    $("#searchButton").click(function() {
        var zoneLocation = $('#zoneDetail-location').text();

        if(zoneLocation != '-'){
            searchCarTrafficData();
        }else{
            alert('보호구역이 선택되지 않아 조회할 수 없습니다.');
        }
    });

    $("#modalResetButton").click(function() {
        $("#list-modal input").val("");
        searchSafetyArea();
    });

    $("#safetyAreaName").keypress(function(event) {
        if(event.which == 13) {
            searchSafetyArea();
        }
    });

    function getChartRoot(chartId) {
        let root = am5.Root.new(chartId);
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        return root;
    }

    function createBarChart(chartId, option, data, seriesName1, seriesName2, seriesName3, seriesName4) {
        var root = getChartRoot(chartId);

        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            maxWidth : 900,
            paddingTop : 50
        }));

        var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
        xRenderer.labels.template.setAll({
            fontSize: 13
        });

        xRenderer.grid.template.setAll({
            location: 1
        })

        var yRenderer = am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 });
        yRenderer.labels.template.setAll({
            fontSize: 13
        });

        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: "time",
            renderer: xRenderer
        }));

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            min:0,
            maxDeviation: 0.3,
            extraMax: 0.1,
            renderer: yRenderer
        }));

        //X 범례 추가
        yAxis.children.unshift(am5.Label.new(root, {
            text: chartId === 'BarChart_CarType' || chartId === 'BarChart_CarWeather' ? '대' : '명',
            textAlign: 'right',
            fontSize: 13,
            fontWeight: "400",
            paddingTop: -5

        }));

        var series1 = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: seriesName1,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value1",
            sequencedInterpolation: true,
            categoryXField: "time",
            sequencedDelay: 100
        }));

        var series2 = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: seriesName2,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value2",
            sequencedInterpolation: true,
            categoryXField: "time",
            sequencedDelay: 100,
        }));

        let bulletTemplate = am5.Template.new({
            fontSize: 13
        });

        let seriesColumnsTemplate;

        let series1Color;
        let series2Color;
        let series3Color;
        let series4Color;

        switch (chartId) {
            case 'BarChart_CarType':
                series1Color = seriesCarColor1;
                series2Color = seriesCarColor2;
                series3Color = seriesCarColor3;
                series4Color = seriesCarColor4;
                break;
            case 'BarChart_TimeZoneCode':
                series1Color = seriesTimeZoneColor1;
                series2Color = seriesTimeZoneColor2;
                break;
            case 'BarChart_Gender':
                series1Color = seriesGenderColor1;
                series2Color = seriesGenderColor2;
                break;
            case 'BarChart_CarWeather':
            case 'BarChart_PopulationWeather':
                series1Color = seriesWeatherColor1;
                series2Color = seriesWeatherColor2;
                series3Color = seriesWeatherColor3;
                series4Color = seriesWeatherColor4;
                break;
        }

        if (!isLowResolution) {
            seriesColumnsTemplate = {
                width: am5.percent(30),
                tooltipText: "{valueY}",
                tooltipY: 0,
                strokeOpacity: 0
            }
        } else {
            seriesColumnsTemplate = {
                width: am5.percent(30),
                tooltipText: "{valueY}",
                tooltipY: 0,
                strokeOpacity: 0
            }
        }

        series1.set("fill", am5.color(series1Color));
        series1.set("stroke", am5.color(series1Color));
        series1.columns.template.setAll(seriesColumnsTemplate);

        series2.set("fill", am5.color(series2Color));
        series2.set("stroke", am5.color(series2Color));
        series2.columns.template.setAll(seriesColumnsTemplate);

        var yLegend = chart.children.push(am5.Legend.new(root, {
            paddingTop : -40,
            maxWidth: 500
        }));

        yLegend.labels.template.setAll({
            fontSize: 16,
            fontWeight: "400"
        });

        xAxis.data.setAll(data);
        series1.data.setAll(data);
        series2.data.setAll(data);

        switch (chartId) {
            case 'BarChart_CarType':

                var series3 = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: seriesName3,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "value3",
                    sequencedInterpolation: true,
                    categoryXField: "time",
                    sequencedDelay: 100
                }));

                var series4 = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: seriesName4,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "value4",
                    sequencedInterpolation: true,
                    categoryXField: "time",
                    sequencedDelay: 100,
                }));


                series3.set("fill", am5.color(series3Color));
                series3.set("stroke", am5.color(series3Color));
                series3.columns.template.setAll(seriesColumnsTemplate);

                series4.set("fill", am5.color(series4Color));
                series4.set("stroke", am5.color(series4Color));
                series4.columns.template.setAll(seriesColumnsTemplate);

                xAxis.data.setAll(data);
                series1.data.setAll(data);
                series2.data.setAll(data);
                series3.data.setAll(data);
                series4.data.setAll(data);

                BarChart_CarType = chart;
                BarChart_CarType_XAxis = xAxis;
                BarChart_CarType_Series_Sedan = series1;
                BarChart_CarType_Series_Van = series2;
                BarChart_CarType_Series_Truck = series3;
                BarChart_CarType_Series_Bus = series4;
                break;
            case 'BarChart_TimeZoneCode':
                BarChart_TimeZoneCode = chart;
                BarChart_TimeZoneCode_XAxis = xAxis;
                BarChart_TimeZoneCode_Series_AM = series1;
                BarChart_TimeZoneCode_Series_PM = series2;
                break;
            case 'BarChart_Gender':
                BarChart_Gender = chart;
                BarChart_Gender_XAxis = xAxis;
                BarChart_Gender_Series_MALE = series1;
                BarChart_Gender_Series_FEMALE = series2;
                break;
            case 'BarChart_CarWeather':
                var series3 = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: seriesName3,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "value3",
                    sequencedInterpolation: true,
                    categoryXField: "time",
                    sequencedDelay: 100
                }));

                var series4 = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: seriesName4,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "value4",
                    sequencedInterpolation: true,
                    categoryXField: "time",
                    sequencedDelay: 100,
                }));


                series3.set("fill", am5.color(series3Color));
                series3.set("stroke", am5.color(series3Color));
                series3.columns.template.setAll(seriesColumnsTemplate);

                series4.set("fill", am5.color(series4Color));
                series4.set("stroke", am5.color(series4Color));
                series4.columns.template.setAll(seriesColumnsTemplate);

                xAxis.data.setAll(data);
                series1.data.setAll(data);
                series2.data.setAll(data);
                series3.data.setAll(data);
                series4.data.setAll(data);

                BarChart_CarWeather = chart;
                BarChart_CarWeather_XAxis = xAxis;
                BarChart_CarWeather_Series_MILD = series1;
                BarChart_CarWeather_Series_CLOUD = series2;
                BarChart_CarWeather_Series_RAIN = series3;
                BarChart_CarWeather_Series_SNOW = series4;
                break;
            case 'BarChart_PopulationWeather':
                var series3 = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: seriesName3,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "value3",
                    sequencedInterpolation: true,
                    categoryXField: "time",
                    sequencedDelay: 100
                }));

                var series4 = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: seriesName4,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "value4",
                    sequencedInterpolation: true,
                    categoryXField: "time",
                    sequencedDelay: 100,
                }));
                

                series3.set("fill", am5.color(series3Color));
                series3.set("stroke", am5.color(series3Color));
                series3.columns.template.setAll(seriesColumnsTemplate);

                series4.set("fill", am5.color(series4Color));
                series4.set("stroke", am5.color(series4Color));
                series4.columns.template.setAll(seriesColumnsTemplate);

                xAxis.data.setAll(data);
                series1.data.setAll(data);
                series2.data.setAll(data);
                series3.data.setAll(data);
                series4.data.setAll(data);

                BarChart_PopulationWeather = chart;
                BarChart_PopulationWeather_XAxis = xAxis;
                BarChart_PopulationWeather_Series_MILD = series1;
                BarChart_PopulationWeather_Series_CLOUD = series2;
                BarChart_PopulationWeather_Series_RAIN = series3;
                BarChart_PopulationWeather_Series_SNOW = series4;
                break;

        }

        yLegend.data.setAll(chart.series.values);

        //X 범례 추가
        let periodArray = ["일", "월", "년"];
        for (let i=periodArray.length - 1; i>=0; i--) {
            createPeriodLabel(chart, root, periodArray[i], periodArray[i] == '일' ? true : false);
        }

        return chart;
    }

    function createPieChart(chartId, option, data) {
        let root = getChartRoot(chartId);

        var chart = root.container.children.push(am5percent.PieChart.new(root, {
            layout: root.verticalLayout
        }));

        var series = chart.series.push(am5percent.PieSeries.new(root, {
            valueField: "populationTraffic",
            categoryField: "type"
        }));

        let series1Color;
        let series2Color;
        let series3Color;
        let series4Color;

        switch (chartId) {
            case 'PieChart_CarType':
                series1Color = seriesCarColor1;
                series2Color = seriesCarColor2;
                series3Color = seriesCarColor3;
                series4Color = seriesCarColor4;

                series.get("colors").set("colors", [
                    am5.color(series1Color),
                    am5.color(series2Color),
                    am5.color(series3Color),
                    am5.color(series4Color)
                ]);

                break;
            case 'PieChart_TimeZoneCode':
                series1Color = seriesTimeZoneColor1;
                series2Color = seriesTimeZoneColor2;

                series.get("colors").set("colors", [
                    am5.color(series1Color),
                    am5.color(series2Color)
                ]);

                break;
            case 'PieChart_Gender':
                series1Color = seriesGenderColor1;
                series2Color = seriesGenderColor2;

                series.get("colors").set("colors", [
                    am5.color(series1Color),
                    am5.color(series2Color)
                ]);
                break;
            case 'PieChart_CarWeather':
            case 'PieChart_PopulationWeather':
                series1Color = seriesWeatherColor1;
                series2Color = seriesWeatherColor2;
                series3Color = seriesWeatherColor3;
                series4Color = seriesWeatherColor4;

                series.get("colors").set("colors", [
                    am5.color(series1Color),
                    am5.color(series2Color),
                    am5.color(series3Color),
                    am5.color(series4Color)
                ]);
                break;
        }

        series.set("tooltip", am5.Tooltip.new(root, {
            forceHidden: true,
        }));

        series.slices.template.set("toggleKey", "none");
        series.slices.template.states.create("hover", { scale: 1 });

        series.data.setAll(data);

        series.labels.template.setAll({
            fontSize: 13
        });

        var chartLegend = chart.children.push(am5.Legend.new(root, {
            centerX: am5.percent(50),
            x: am5.percent(50),
            marginTop: 15,
            marginBottom: 15
        }));

        chartLegend.data.setAll(series.dataItems);
        chartLegend.labels.template.setAll({
            textAlign: "center",
            fontSize: 16
        });

        series.animate({
            key: "startAngle",
            to: 180,
            loops: 4,
            duration: 2000,
            easing: am5.ease.yoyo(am5.ease.cubic)
        });

        chartLegend.valueLabels.template.set("forceHidden", true);

        switch (chartId) {
            case 'PieChart_CarType':
                PieChart_CarType = chart;
                PieChart_CarType_Series = series;
                PieChart_CarType_Legend = chartLegend;
                break;
            case 'PieChart_TimeZoneCode':
                PieChart_TimeZoneCode = chart;
                PieChart_TimeZoneCode_Series = series;
                PieChart_TimeZoneCode_Legend = chartLegend;
                break;
            case 'PieChart_Gender':
                PieChart_Gender = chart;
                PieChart_Gender_Series = series;
                PieChart_Gender_Legend = chartLegend;
                break;
            case 'PieChart_CarWeather':
                PieChart_CarWeather = chart;
                PieChart_CarWeather_Series = series;
                PieChart_CarWeather_Legend = chartLegend;
                break;
            case 'PieChart_PopulationWeather':
                PieChart_PopulationWeather = chart;
                PieChart_PopulationWeather_Series = series;
                PieChart_PopulationWeather_Legend = chartLegend;
                break;
        }
    }

    //차량 통행량 조회
    function searchCarTrafficData() {
        BarChart_CarType_DataArray = [];
        PieChart_CarType_DataArray = [];

        var selectVal = $('#search-target option:selected').val();
        //그 외 (날짜 까지 붙이기)
        if(selectVal === 'day') {
            startDate = $('#dayOptionStartDate').val();
            endDate = setNextDate($('#dayOptionEndDate').val(), selectVal);
        } else if(selectVal === 'month') {
            startDate = $('#monthOptionStartYear').val() + '-' + $('#monthOptionStartMonth').val() + '-' + '01';
            endDate =  setNextDate($('#monthOptionStartYear').val() + '-' + $('#monthOptionEndMonth').val() + '-01', selectVal);
        } else if(selectVal === 'year') {
            startDate = $('#yearOptionStartYear').val() + '-' + '01' + '-' + '01';
            endDate = (parseInt($('#yearOptionEndYear').val()) + 1) + '-' + '01' + '-' + '01';
        }

        $.ajax({
            url: "/tv/common/getCarTrafficChartData.json",
            type : "POST",
            data : JSON.stringify({
                startDate : startDate
                , endDate : endDate
                , period : selectVal
                , selectedCoordinates : selectedCoordinates
            }),
            dataType : "json",
            contentType : "application/json",
            beforeSend: function () { $('.progress-body').css('display','block') },
            success : function(res) {

                let barChartDataByCarType = res.result.barChartDataByCarType.length > 0 ?  res.result.barChartDataByCarType : [];
                let pieChartDataByCarType = res.result.pieChartDataByCarType.length > 0 ?  res.result.pieChartDataByCarType : [];

                if (barChartDataByCarType.length > 0) {

                    var baseDate = "";
                    var value1 = "";
                    var value2 = "";
                    var value3 = "";
                    var value4 = "";

                    $.each(barChartDataByCarType, function (i, item) {

                        baseDate = item.trafficTime;

                        if (item.type == '-') {
                            BarChart_CarType_DataArray.push({
                                time: baseDate,
                                value1: 0,
                                value2: 0,
                                value3: 0,
                                value4: 0
                            });
                        } else {
                            if (item.type == '승용') {
                                value1 = item.trafficCount;
                            } else if (item.type == '승합') {
                                value2 = item.trafficCount;
                            } else if (item.type == '특수') {
                                value3 = item.trafficCount;
                            } else if (item.type == '화물') {
                                value4 = item.trafficCount;
                            }

                            if (value1 != "" && value2 != "" && value3 != "" && value4 != "") {
                                BarChart_CarType_DataArray.push({
                                    time: baseDate,
                                    value1: parseInt(value1),
                                    value2: parseInt(value2),
                                    value3: parseInt(value3),
                                    value4: parseInt(value4)
                                });

                                baseDate = "";
                                value1 = "";
                                value2 = "";
                                value3 = "";
                                value4 = "";
                            }
                        }
                    });
                }

                BarChart_CarType_XAxis.data.setAll(BarChart_CarType_DataArray);
                BarChart_CarType_Series_Sedan.data.setAll(BarChart_CarType_DataArray);
                BarChart_CarType_Series_Van.data.setAll(BarChart_CarType_DataArray);
                BarChart_CarType_Series_Truck.data.setAll(BarChart_CarType_DataArray);
                BarChart_CarType_Series_Bus.data.setAll(BarChart_CarType_DataArray);

                if (pieChartDataByCarType.length > 0) {

                    $.each(pieChartDataByCarType, function (i, item) {

                        PieChart_CarType_DataArray.push({
                            type: item.type,
                            populationTraffic: parseInt(item.trafficCount)
                        });
                    });
                }

                PieChart_CarType_Series.data.setAll(PieChart_CarType_DataArray);
                PieChart_CarType_Legend.data.setAll(PieChart_CarType_Series.dataItems);
            },
            complete : function(xhr, status) {

            },
            error: function(error) {
                $('.progress-body').css('display','none');
                console.log(error);
            }
        }).done(function () {
            searchData();
        });
    }

    //보행자 통행량 조회
    function searchData() {

        BarChart_TimeZoneCode_DataArray = [];
        BarChart_Gender_DataArray = [];

        PieChart_TimeZoneCode_DataArray = [];
        PieChart_Gender_DataArray = [];

        var selectVal = $('#search-target option:selected').val();
                                                                        //그 외 (날짜 까지 붙이기)
        if(selectVal === 'day') {
            startDate = $('#dayOptionStartDate').val().replaceAll('-','');
            endDate = setNextDateNoHyphen($('#dayOptionEndDate').val(), selectVal);
        } else if(selectVal === 'month') {
            startDate = $('#monthOptionStartYear').val() + $('#monthOptionStartMonth').val() + '01';
            endDate =  setNextDateNoHyphen($('#monthOptionStartYear').val() + '-' + $('#monthOptionEndMonth').val() + '-01', selectVal);
        } else if(selectVal === 'year') {
            startDate = $('#yearOptionStartYear').val() + '0101';
            endDate = (parseInt($('#yearOptionEndYear').val()) + 1) + '0101';
        }

        $.ajax({
            url: "/tv/protectionZone/getChartData.json",
            type : "POST",
            data : JSON.stringify({
                startDate : startDate
                , endDate : endDate
                , period : selectVal
                , cellId : selectedCellId
            }),
            dataType : "json",
            contentType : "application/json",
            success : function(res) {

                let barChartDataByTimeZoneCode = res.result.barChartDataByTimeZoneCode.length > 0 ?  res.result.barChartDataByTimeZoneCode : [];
                let barChartDataByGender = res.result.barChartDataByGender.length > 0 ?  res.result.barChartDataByGender : [];

                let pieChartDataByTimeZoneCode = res.result.pieChartDataByTimeZoneCode.length > 0 ?  res.result.pieChartDataByTimeZoneCode : [];
                let pieChartDataByGender = res.result.pieChartDataByGender.length > 0 ?  res.result.pieChartDataByGender : [];

                let barChartDataArray = [barChartDataByTimeZoneCode, barChartDataByGender];

                for (var k=0; k<barChartDataArray.length; k++) {

                    if (barChartDataArray[k].length > 0) {

                        var baseDate = "";
                        var value1 = "";
                        var value2 = "";

                        $.each(barChartDataArray[k], function (i, item) {

                            baseDate = item.baseDate;

                            if (k==0) {

                                if (item.type == '-') {
                                    BarChart_TimeZoneCode_DataArray.push({
                                        time: baseDate,
                                        value1: 0,
                                        value2: 0
                                    });
                                } else {
                                    if (item.type == '오전') {
                                        value1 = item.populationTraffic;
                                    } else if (item.type == '오후') {
                                        value2 = item.populationTraffic;
                                    }

                                    if (value1 != "" && value2 != "") {
                                        BarChart_TimeZoneCode_DataArray.push({
                                            time: baseDate,
                                            value1: parseFloat(value1),
                                            value2: parseFloat(value2)
                                        });

                                        baseDate = "";
                                        value1 = "";
                                        value2 = "";
                                    }
                                }
                            }

                            //성별
                            else if (k==1) {

                                if (item.type == '-') {
                                    BarChart_Gender_DataArray.push({
                                        time: baseDate,
                                        value1: 0,
                                        value2: 0
                                    });
                                } else {
                                    if (item.type == '남성') {
                                        value1 = item.populationTraffic;
                                    } else if (item.type == '여성') {
                                        value2 = item.populationTraffic;
                                    }

                                    if (value1 != "" && value2 != "") {
                                        BarChart_Gender_DataArray.push({
                                            time: baseDate,
                                            value1: parseFloat(value1),
                                            value2: parseFloat(value2)
                                        });

                                        baseDate = "";
                                        value1 = "";
                                        value2 = "";
                                    }
                                }
                            }
                        });
                    }
                }

                BarChart_TimeZoneCode_XAxis.data.setAll(BarChart_TimeZoneCode_DataArray);
                BarChart_TimeZoneCode_Series_AM.data.setAll(BarChart_TimeZoneCode_DataArray);
                BarChart_TimeZoneCode_Series_PM.data.setAll(BarChart_TimeZoneCode_DataArray);

                BarChart_Gender_XAxis.data.setAll(BarChart_Gender_DataArray);
                BarChart_Gender_Series_MALE.data.setAll(BarChart_Gender_DataArray);
                BarChart_Gender_Series_FEMALE.data.setAll(BarChart_Gender_DataArray);

                let pieChartDataArray = [pieChartDataByTimeZoneCode, pieChartDataByGender];

                for (var k=0; k<pieChartDataArray.length; k++) {

                    if (pieChartDataArray[k].length > 0) {

                        $.each(pieChartDataArray[k], function (i, item) {

                            if (k==0) {
                                PieChart_TimeZoneCode_DataArray.push({
                                    type: item.type,
                                    populationTraffic: parseFloat(item.populationTraffic)
                                });
                            }

                            //성별
                            else if (k==1) {
                                PieChart_Gender_DataArray.push({
                                    type: item.type,
                                    populationTraffic: parseFloat(item.populationTraffic)
                                });
                            }

                        });
                    }
                }

                PieChart_TimeZoneCode_Series.data.setAll(PieChart_TimeZoneCode_DataArray);
                PieChart_TimeZoneCode_Legend.data.setAll(PieChart_TimeZoneCode_Series.dataItems);

                PieChart_Gender_Series.data.setAll(PieChart_Gender_DataArray);
                PieChart_Gender_Legend.data.setAll(PieChart_Gender_Series.dataItems);

            },
            complete : function(xhr, status) {
                if (BarChart_CarType_DataArray.length > 0) {
                    showChart('vehicleChart');
                } else {
                    hideChart('vehicleChart');
                }

                if (BarChart_TimeZoneCode_DataArray.length > 0) {
                    showChart('pedestrianChart');
                } else {
                    hideChart('pedestrianChart');
                }

                for (var i=0; i<barChartArray.length; i++) {

                    var chart = barChartArray[i];
                    if (chart.children.length > 0) {
                        $('#search-target option:not(:selected)').each(function(){
                            chart.children.getIndex($(this).attr('value2')).hide();
                        });

                        chart.children.getIndex($('#search-target option:selected').attr('value2')).show();
                    }
                }

            },
            error: function(error) {
                $('.progress-body').css('display','none');
                console.log(error);
            }
        }).done(function () {
            searchWeatherChartData();
        });
    }

    function searchWeatherChartData(){

        BarChart_CarWeather_DataArray = [];
        PieChart_CarWeather_DataArray = [];

        BarChart_PopulationWeather_DataArray = [];
        PieChart_PopulationWeather_DataArray = [];

        var selectVal = $('#search-target option:selected').val();
        //그 외 (날짜 까지 붙이기)
        if(selectVal === 'day') {
            startDate = $('#dayOptionStartDate').val();
            endDate = setNextDate($('#dayOptionEndDate').val(), selectVal);
        } else if(selectVal === 'month') {
            startDate = $('#monthOptionStartYear').val() + '-' + $('#monthOptionStartMonth').val() + '-' + '01';
            endDate =  setNextDate($('#monthOptionStartYear').val() + '-' + $('#monthOptionEndMonth').val() + '-01', selectVal);
        } else if(selectVal === 'year') {
            startDate = $('#yearOptionStartYear').val() + '-' + '01' + '-' + '01';
            endDate = (parseInt($('#yearOptionEndYear').val()) + 1) + '-' + '01' + '-' + '01';
        }

        $.ajax({
            url: "/tv/common/getChartDataByWeather.json",
            type : "POST",
            data : JSON.stringify({
                startDate : startDate
                , endDate : endDate
                , period : selectVal
                , selectedCoordinates : selectedCoordinates
                , cellId : selectedCellId
            }),
            dataType : "json",
            contentType : "application/json",
            success : function(res) {
                let barChartDataByCarWeather = res.result.barChartDataByCarWeather.length > 0 ?  res.result.barChartDataByCarWeather : [];
                let pieChartDataByCarWeather = res.result.pieChartDataByCarWeather.length > 0 ?  res.result.pieChartDataByCarWeather : [];
                let barChartDataByPopulationWeather = res.result.barChartDataByPopulationWeather.length > 0 ?  res.result.barChartDataByPopulationWeather : [];
                let pieChartDataByPopulationWeather = res.result.pieChartDataByPopulationWeather.length > 0 ?  res.result.pieChartDataByPopulationWeather : [];
                let getDataByWeatherYearMonthDay = res.result.getDataByWeatherYearMonthDay.length > 0 ? res.result.getDataByWeatherYearMonthDay : [];

                if (barChartDataByCarWeather.length > 0) {

                    var baseDate = "";
                    var value1 = "";
                    var value2 = "";
                    var value3 = "";
                    var value4 = "";

                    $.each(barChartDataByCarWeather, function (i, item) {

                        baseDate = item.trafficTime;

                        if (item.type == '-') {
                            BarChart_CarWeather_DataArray.push({
                                time: baseDate,
                                value1: 0,
                                value2: 0,
                                value3: 0,
                                value4: 0
                            });
                        } else {
                            if (item.type == '맑음') {
                                value1 = item.trafficCount;
                            } else if (item.type == '흐림') {
                                value2 = item.trafficCount;
                            } else if (item.type == '비') {
                                value3 = item.trafficCount;
                            } else if (item.type == '눈') {
                                value4 = item.trafficCount;
                            }

                            if (value1 != "" && value2 != "" && value3 != "" && value4 != "") {
                                BarChart_CarWeather_DataArray.push({
                                    time: baseDate,
                                    value1: parseInt(value1),
                                    value2: parseInt(value2),
                                    value3: parseInt(value3),
                                    value4: parseInt(value4)
                                });

                                baseDate = "";
                                value1 = "";
                                value2 = "";
                                value3 = "";
                                value4 = "";
                            }
                        }
                    });
                }


                BarChart_CarWeather_XAxis.data.setAll(BarChart_CarWeather_DataArray);
                BarChart_CarWeather_Series_MILD.data.setAll(BarChart_CarWeather_DataArray);
                BarChart_CarWeather_Series_CLOUD.data.setAll(BarChart_CarWeather_DataArray);
                BarChart_CarWeather_Series_RAIN.data.setAll(BarChart_CarWeather_DataArray);
                BarChart_CarWeather_Series_SNOW.data.setAll(BarChart_CarWeather_DataArray);

                if (pieChartDataByCarWeather.length > 0) {

                    $.each(pieChartDataByCarWeather, function (i, item) {

                        PieChart_CarWeather_DataArray.push({
                            type: item.type,
                            populationTraffic: parseInt(item.trafficCount)
                        });
                    });
                }

                PieChart_CarWeather_Series.data.setAll(PieChart_CarWeather_DataArray);
                PieChart_CarWeather_Legend.data.setAll(PieChart_CarWeather_Series.dataItems);
                if (barChartDataByPopulationWeather.length > 0) {
                    var baseDate = "";
                    var value1 = "";
                    var value2 = "";
                    var value3 = "";
                    var value4 = "";

                    $.each(barChartDataByPopulationWeather, function (i, item) {

                        baseDate = item.baseDate;

                        if (item.type == '-') {
                            BarChart_PopulationWeather_DataArray.push({
                                time: baseDate,
                                value1: 0,
                                value2: 0,
                                value3: 0,
                                value4: 0
                            });
                        } else {
                            if (item.type == '맑음') {
                                value1 = item.populationTraffic;
                            } else if (item.type == '흐림') {
                                value2 = item.populationTraffic;
                            } else if (item.type == '비') {
                                value3 = item.populationTraffic;
                            } else if (item.type == '눈') {
                                value4 = item.populationTraffic;
                            }

                            if (value1 != "" && value2 != "" && value3 != "" && value4 != "") {
                                BarChart_PopulationWeather_DataArray.push({
                                    time: baseDate,
                                    value1: parseInt(value1),
                                    value2: parseInt(value2),
                                    value3: parseInt(value3),
                                    value4: parseInt(value4)
                                });

                                baseDate = "";
                                value1 = "";
                                value2 = "";
                                value3 = "";
                                value4 = "";
                            }
                        }
                    });
                }

                BarChart_PopulationWeather_XAxis.data.setAll(BarChart_PopulationWeather_DataArray);
                BarChart_PopulationWeather_Series_MILD.data.setAll(BarChart_PopulationWeather_DataArray);
                BarChart_PopulationWeather_Series_CLOUD.data.setAll(BarChart_PopulationWeather_DataArray);
                BarChart_PopulationWeather_Series_RAIN.data.setAll(BarChart_PopulationWeather_DataArray);
                BarChart_PopulationWeather_Series_SNOW.data.setAll(BarChart_PopulationWeather_DataArray);

                if (pieChartDataByPopulationWeather.length > 0) {

                    $.each(pieChartDataByPopulationWeather, function (i, item) {

                        PieChart_PopulationWeather_DataArray.push({
                            type: item.type,
                            populationTraffic: parseInt(item.populationTraffic)
                        });
                    });
                }

                PieChart_PopulationWeather_Series.data.setAll(PieChart_PopulationWeather_DataArray);
                PieChart_PopulationWeather_Legend.data.setAll(PieChart_PopulationWeather_Series.dataItems);

                console.log(getDataByWeatherYearMonthDay);

                if (getDataByWeatherYearMonthDay.length > 0) {

                    $.each(getDataByWeatherYearMonthDay, function (i, item) {

                        switch (item.weatherType) {
                            case '맑음' :
                                $('#sunnyCount').text(item.count.toString().toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
                                break;

                            case '흐림' :
                                $('#cloudyCount').text(item.count.toString().toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
                                break;

                            case '비' :
                                $('#rainyCount').text(item.count.toString().toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
                                break;

                            case '눈' :
                                $('#snowyCount').text(item.count.toString().toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
                                break;
                        }
                        PieChart_PopulationWeather_DataArray.push({
                            type: item.type,
                            populationTraffic: parseInt(item.populationTraffic)
                        });
                    });
                }
            },
            complete : function(xhr, status) {
                if (BarChart_CarWeather_DataArray.length > 0) {
                    showChart('weatherChart');
                } else {
                    hideChart('weatherChart');
                }
            },
            error: function(error) {
                $('.progress-body').css('display','none');
                console.log(error);
            }
        }).done(function () {
            if(selectVal === 'day') {
                startDate = $('#dayOptionStartDate').val().replaceAll('-','');
                endDate = setNextDateNoHyphen($('#dayOptionEndDate').val(), selectVal);
            } else if(selectVal === 'month') {
                startDate = $('#monthOptionStartYear').val() + $('#monthOptionStartMonth').val() + '01';
                endDate =  setNextDateNoHyphen($('#monthOptionStartYear').val() + '-' + $('#monthOptionEndMonth').val() + '-01', selectVal);
            } else if(selectVal === 'year') {
                startDate = $('#yearOptionStartYear').val() + '0101';
                endDate = (parseInt($('#yearOptionEndYear').val()) + 1) + '0101';
            }
            $('.progress-body').css('display','none');
        });
    }
    //X 범례 추가
    function createPeriodLabel(chart, root, text, visible) {
        chart.children.unshift(am5.Label.new(root, {
            text: text,
            fontSize: 13,
            fontWeight: "400",
            textAlign: "right",
            x: am5.percent(100),
            y: am5.percent(100),
            centerX: am5.p50,
            centerY: am5.percent(100),
            visible: visible,
            paddingTop: 0,
            paddingBottom: -10,
            paddingLeft: -10
        }));
    }

    hideChart('vehicleChart');
    hideChart('pedestrianChart');
    hideChart('weatherChart');

    //레포트 출력 버튼 클릭
    $("#speedDecisionMakingReport").click(function() {

        if (BarChart_CarType_DataArray.length > 0 || BarChart_Gender_DataArray.length > 0) {
            $('.progress-body').css('display','block');
            printReport().then(r => $('.progress-body').css('display','none'));
        } else {
            alert("조회결과가 존재하지 않아 보고서를 출력할 수 없습니다.");
        }
    });
});

// 차트정보 초기화 및 숨김
function clearChartData() {

    BarChart_CarType_DataArray = [];
    BarChart_TimeZoneCode_DataArray = [];
    BarChart_Gender_DataArray = [];
    BarChart_CarWeather_DataArray = [];
    BarChart_PopulationWeather_DataArray = [];

    PieChart_CarType_DataArray = [];
    PieChart_TimeZoneCode_DataArray = [];
    PieChart_Gender_DataArray = [];
    PieChart_CarWeather_DataArray = [];
    PieChart_PopulationWeather_DataArray = [];

    hideChart('vehicleChart');
    hideChart('pedestrianChart');
    hideChart('weatherChart');
}

function showChart(chartClass) {
    $('.'+chartClass).show();
    $('#'+chartClass + "NoDataMessage").css('display', 'none');
}

function hideChart(chartClass) {
    $('.'+chartClass).hide();
    $('#'+chartClass + "NoDataMessage").css('display', 'block');
}

const printReport = async () => {

    const canvasArray = [];

    let elements = document.getElementsByClassName('captureDiv');

    for (let i=0; i<elements.length; i++) {
        await html2canvas(elements[i]).then(canvas => {
            canvasArray[i] = canvas.toDataURL('image/png');
        })
    }

    var url = '/tv/protectionZone/speedDecisionMakingReport.mng';
    var form = $("#reportForm");
    var target = '통행속도 의사결정 보고서';

    window.open(url, target);

    form.attr('action', url);
    form.attr('target', target); // window.open 타이틀과 매칭 되어야함
    form.attr('method', 'post');

    var reportStartDate = startDate.substr(0,4) + '-' + startDate.substr(4,2) + '-' + startDate.substr(6,2);
    var reportEndDate   = setPrevDate(endDate.substr(0,4) + '-' + endDate.substr(4,2) + '-' + endDate.substr(6,2));

    let trafficTime = reportStartDate + " ~ " + reportEndDate;
    form.append('<input type="text" name="trafficTime" value="'+trafficTime+'">');
    form.append('<input type="text" name="address" value="'+$('#zoneDetail-location').text()+'">');
    form.append('<input type="text" name="cctvCount" value="'+$('#cctvCount').text()+'">');
    form.append('<input type="text" name="crossWalkCount" value="'+$('#crossWalkCount').text()+'">');
    form.append('<input type="text" name="crossRoadCount" value="'+$('#crossRoadCount').text()+'">');
    form.append('<input type="text" name="childPickupZoneCount" value="'+$('#childPickupZoneCount').text()+'">');
    form.append('<input type="text" name="childWaySchoolCount" value="'+$('#childWaySchoolCount').text()+'">');
    form.append('<input type="text" name="oneWayRoadCount" value="'+$('#oneWayRoadCount').text()+'">');
    form.append('<input type="text" name="speedBumpCount" value="'+$('#speedBumpCount').text()+'">');

    for (let i = 0; i < canvasArray.length; i++) {
        form.append('<input type="text" name="capture' + i + '" value="'+canvasArray[i]+'">');
    }

    form.submit();
    form.empty();
};
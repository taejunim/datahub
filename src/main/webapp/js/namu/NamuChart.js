document.write('<script src="/js/namu/NamuUtil.js"></script>');

const NamuChart = {
    chartType: {
        BAR: {
            group_cd: "01"
        },
        LINE: {
            group_cd: "02"
        },
        PIE: {
            group_cd: "03"
        },
        COLOR_LINE: {
            group_cd: "04"
        },
        CURVED: {
            group_cd: "05"
        },
        IMAGE_ON_TOP: {
            group_cd: "06"
        },
        WORD_CLOUD: {
            group_cd: "07"
        },
        BUBBLE_BASED_HEATMAP: {
            group_cd: "08"
        },
        DONUT: {
            group_cd: "09"
        }
    },
    pieColorSet: {
        type1: [
            am5.color(0x095256),  // greenish
            am5.color(0x087f8c),
            am5.color(0x5aaa95),
            am5.color(0x86a873),
            am5.color(0xbb9f06),
            am5.color(0x00a600),
            am5.color(0x008c4b)
        ],
        type2: [
            am5.color(0xff5256), // Reddish
            am5.color(0xff7f8c),
            am5.color(0xffaaaa),
            am5.color(0xffa873),
            am5.color(0xff9f06),
            am5.color(0xff3b00),
            am5.color(0xff6543)
        ],
        type3: [
            am5.color(0x333333), // Greyish
            am5.color(0x555555),
            am5.color(0x777777),
            am5.color(0x999999),
            am5.color(0xBBBBBB),
            am5.color(0xDDDDDD),
            am5.color(0xEEEEEE)
        ],
        type4: [
            am5.color(0xff6600), // Orangish
            am5.color(0xff8000),
            am5.color(0xff9900),
            am5.color(0xffb300),
            am5.color(0xffcc00),
            am5.color(0xffe600),
            am5.color(0xffcc33)
        ],
        type5: [
            am5.color(0x8B4513), // Brownish
            am5.color(0xA0522D),
            am5.color(0xCD853F),
            am5.color(0xD2691E),
            am5.color(0x8B7E66),
            am5.color(0xA67D3D),
            am5.color(0x8B7355)
        ]
    },
    initialize: function () {
        am5.addLicense("AM5C423195853");
    },
    createRoots: (cnt, divName = "chartdiv") => {
        var divName = divName;
        var roots = [];
        for (let i = 0; i < cnt; i++) {
            roots[i] = am5.Root.new(divName + i);
            roots[i].locale = am5locales_ko_KR;
            roots[i].setThemes([am5themes_Animated.new(roots[i])]);
        }
        return roots;
    },
    chartOption: {
      new: () => {
          return {
              divNum: -1,
              title: "title",
              categoryFieldName: "",
              targets: [],
              isShowTotoal: true,
              isColumnStack: true,
          };
      },
    },
    createColumnChart: (roots, options, datas) => {
        console.dir("createColumnChart");
        console.dir(options);
        console.dir(datas);

        var data = NamuUtil.arrReduceSum(options.categoryFieldName, options.targets, JSON.parse(JSON.stringify(datas)))
        console.dir(data);

        var num = options.divNum;
        const root = roots[num];
        // root.container.children.clear();
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout,
        }));

        /*chart.topAxesContainer.children.push(am5.Label.new(root, {
            text: options.title,
            fontSize: 20,
            fontWeight: "400",
            x: am5.p50,
            centerX: am5.p50
        }));*/

        var legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50,
            })
        );

        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.5,
            minZoomCount: 10,
            maxZoomCount: 20,
            categoryField: options.categoryFieldName,
            renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 50
            }),
            tooltip: am5.Tooltip.new(root, {})
        }));

        xAxis.events.once("datavalidated", function (ev) {
            ev.target.zoomToIndexes(0, 10);
        });

        xAxis.data.setAll(data);

        /*
            var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                categoryField: categoryFieldName,
                renderer: am5xy.AxisRendererX.new(root, {
                    cellStartLocation: 0.4,
                    cellEndLocation: 0.6,
                }),
                tooltip: am5.Tooltip.new(root, {})
            }));
        */

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            calculateTotals: true,
            min: 0,
            extraMax: 0.1,
            renderer: am5xy.AxisRendererY.new(root, {})
        }));

        var scrollbar = chart.set("scrollbarX", am5.Scrollbar.new(root, {
            orientation: "horizontal"
        }));
        // chart.bottomAxesContainer.children.push(scrollbar);

/*
        chart.children.unshift(am5.Label.new(root, {
            text: options.title,
            fontSize: 15,
            fontWeight: 550,
            textAlign: "center",
            x: am5.percent(50),
            centerX: am5.percent(50),
            paddingTop: -9,
            paddingBottom: 20,
            oversizedBehavior: "wrap"
        }));
*/

        var makeSeries = (seriesName, fieldName, showTotal) => {
            var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: seriesName,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: options.categoryFieldName,
                stacked: options.isColumnStack,
                maskBullets: false
            }));

            series.columns.template.setAll({
                // tooltipText: "{name}, {valueY}",
                tooltipText: "{valueY}",
                width: am5.p50,
                tooltipY: 0
            });

            if (showTotal) {
                series.bullets.push(() => {
                    return am5.Bullet.new(root, {
                        locationY: 1,
                        sprite: am5.Label.new(root, {
                            text: "{valueYTotal}",
                            fill: am5.color(0xff0000),
                            centerY: am5.p100,
                            centerX: am5.p50,
                            populateText: true
                        })
                    });
                });
            }

            series.data.setAll(data);
            series.appear();

            if (!showTotal) {
                legend.data.push(series);
            }
        }

        for (const target of options.targets) {
            makeSeries(target.name, target.value);
        }
        if (options.isShowTotoal)
            makeSeries("", "none", true);

        // 내보내기
        var exporting = am5plugins_exporting.Exporting.new(root, {
            menu: am5plugins_exporting.ExportingMenu.new(root, {}),
            pngOptions: {
                quality: 0.7,
                maintainPixelRatio: true,
                minWidth: 1000,
                maxWidth: 2000
            },
            jpgOptions: {
                quality: 0.7,
                maintainPixelRatio: true,
                minWidth: 1000,
                maxWidth: 2000
            },
            filePrefix: "test",
            // filePrefix: $('#searchKey1 option:selected').text() + "(" + $('#searchKey2 option:selected').text() + ")"
        });

        chart.appear();

        return chart;
    },
    createLineChart: (roots, options, datas) => {
        console.dir("createLineChart");
        console.dir(options);
        console.dir(datas);
        var data = NamuUtil.arrDateFormat("occrrnc_dt", "YYYYMMDDHH", JSON.parse(JSON.stringify(datas)));
        console.dir(data);

        var num = options.divNum;
        const root = roots[num];
        // root.container.children.clear();
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            // panX: false,
            // panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout,
            // maxTooltipDistance: 0,
        }));

        /*chart.topAxesContainer.children.push(am5.Label.new(root, {
            text: options.title,
            fontSize: 20,
            fontWeight: "400",
            x: am5.p50,
            centerX: am5.p50
        }));*/

        var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
            // maxDeviation: 0.2,
            minZoomCount: 15,
            maxZoomCount: 100,
            baseInterval: {timeUnit: "hour", count: 1},
            renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 70,
            }),
            tooltip: am5.Tooltip.new(root, {}),
            tooltipDateFormat: "yyyy-MM-dd HH",
        }));

        // xAxis.get("dateFormats")["day"] = "MM-dd";
        // xAxis.get("periodChangeDateFormats")["day"] = "MMM";

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {})
        }));

        var legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50
            })
        );

        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "zoomX",
            // xAxis: xAxis,
        })).lineY.set("visible", false);

        var scrollbar = chart.set("scrollbarX", am5.Scrollbar.new(root, {
            orientation: "horizontal"
        }));
        // chart.bottomAxesContainer.children.push(scrollbar);

/*
        chart.children.unshift(am5.Label.new(root, {
            text: options.title,
            fontSize: 15,
            fontWeight: 550,
            textAlign: "center",
            x: am5.percent(50),
            centerX: am5.percent(50),
            paddingTop: -9,
            paddingBottom: 20,
            oversizedBehavior: "wrap"
        }));
*/

        // 내보내기
        var exporting = am5plugins_exporting.Exporting.new(root, {
            menu: am5plugins_exporting.ExportingMenu.new(root, {}),
            pngOptions: {
                quality: 0.7,
                maintainPixelRatio: true,
                minWidth: 1000,
                maxWidth: 2000
            },
            jpgOptions: {
                quality: 0.7,
                maintainPixelRatio: true,
                minWidth: 1000,
                maxWidth: 2000
            },
            // filePrefix: $('#searchKey1 option:selected').text() + "(" + $('#searchKey2 option:selected').text() + ")"
        });

        const createSeries = ( valueYField, name) => {
            var currentDataItem;
            var series = chart.series.push(am5xy.LineSeries.new(root, {
                xAxis: xAxis,
                yAxis: yAxis,
                name: name,
                valueYField: valueYField,
                valueXField: options.categoryFieldName,
                tooltip: am5.Tooltip.new(root, {
                    pointerOrientation: "horizontal",
                    labelText: "{valueY}",
                })
            }));

/*
            series.bullets.push(function () {
                var sprite = am5.Container.new(root, {
                    interactive: true,
                    setStateOnChildren: true
                });

                sprite.states.create("hover", {});

                var outer = sprite.children.push(am5.Circle.new(root, {
                    radius: 7,
                    fillOpacity: 0,
                    stroke: series.get("fill"),
                    strokeWidth: 2,
                    strokeOpacity: 0
                }));

                outer.states.create("hover", {
                    strokeOpacity: 1
                });

                var inner = sprite.children.push(am5.Circle.new(root, {
                    radius: 5,
                    fill: series.get("fill"),
                    stroke: root.interfaceColors.get("background"),
                    strokeWidth: 2
                }));

                return am5.Bullet.new(root, {
                    sprite: sprite
                });
            });
*/

/*
            series.on("tooltipDataItem", function(dataItem) {
                if (currentDataItem) {
                    am5.array.each(currentDataItem.bullets, function(bullet) {
                        bullet.get("sprite").unhover();
                    });
                }
                currentDataItem = dataItem;
                if (currentDataItem) {
                    am5.array.each(currentDataItem.bullets, function(bullet) {
                        bullet.get("sprite").hover();
                    });
                }
            });
*/

            series.events.once("datavalidated", function (ev, target) {
                console.dir(ev);
                console.dir(target);

                xAxis.zoomToDates(
                    new Date(data[0].occrrnc_dt),
                    new Date(data[100].occrrnc_dt),
                )
            });

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    sprite: am5.Circle.new(root, {
                        radius: 5,
                        fill: series.get("fill"),
                        stroke: root.interfaceColors.get("background"),
                        strokeWidth: 2
                    })
                });
            });
            series.data.setAll(data);
            legend.data.push(series);
            series.appear();
        };

        for (const target of options.targets) {
            createSeries(target.value, target.name);
        }

        chart.appear();

        return chart;
    },
    createOnePieChart: (root, list, type) => {
        var root = root[0];

        root.setThemes([
            am5themes_Animated.new(root)
        ]);
        var chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                endAngle: 270
            })
        );

        var series = chart.series.push(
            am5percent.PieSeries.new(root, {
                name: "Series",
                valueField: "value",
                categoryField: "name",
                alignLabels: false,
            })
        );

        if (type === 1) {
            series.get("colors").set("colors", NamuChart.pieColorSet.type1);
        } else if (type === 2) {
            series.get("colors").set("colors", NamuChart.pieColorSet.type2);
        } else if (type === 3) {
            series.get("colors").set("colors", NamuChart.pieColorSet.type3);
        } else if (type === 4) {
            series.get("colors").set("colors", NamuChart.pieColorSet.type4);
        } else if (type === 5) {
            series.get("colors").set("colors", NamuChart.pieColorSet.type5);
        }

        series.data.setAll(list);

        series.appear(1000, 100);

        series.labels.template.setAll({
            fontSize: 12,
            text: "{category}\n{value}건",
            textType: "radial",
            radius: 0,
            centerX: am5.percent(100),
            fill: am5.color(0xffffff)
        });

    },
    createOneChartBase: function (idName, type, list, targetNameObj) {
        var root = null;
        var divWrapper = null;

        if (idName === "first-chart") {
            $('#second-chart').empty();
        }

        if ((type === NamuChart.chartType.BUBBLE_BASED_HEATMAP.group_cd && idName !== "first-chart") || (idName === "dow-bchart-usage" && type === NamuChart.chartType.BAR.group_cd)) {
            $('#' + idName).empty();
            divWrapper = $(`<div class="chartdiv" id="${idName}0" style="height: 100%;"></div>`);
        } else {
            if (type !== NamuChart.chartType.PIE.group_cd && type !== NamuChart.chartType.DONUT.group_cd) {
                $('#' + idName).empty();
                divWrapper = $(`<div class="chartdiv" id="${idName}0"></div>`);
            } else if (type === NamuChart.chartType.DONUT.group_cd && idName === "first-chart") {
                $('#' + idName).empty();
                divWrapper = $(`<div class="pieModalChartDiv" id="${idName}0"></div>`);
            } else {
                $('#' + idName).empty();
                divWrapper = $(`<div class="pieChartdiv" id="${idName}0"></div>`);
            }
        }

        if (list !== null) {
            if (list.length === 0) {
                if (type === NamuChart.chartType.PIE.group_cd) {
                    divWrapper.append(`<div class="div-inner"><span>조회된 데이터가 없습니다.</span></div>`);
                    $('#' + idName).append(divWrapper);
                } else if (type == NamuChart.chartType.BAR.group_cd) {
                    divWrapper.append(`<div class="no-data"><span>조회된 데이터가 없습니다.</span></div>`);
                    $('#' + idName).append(divWrapper);
                } else if (type == NamuChart.chartType.CURVED.group_cd) {
                    divWrapper.append(`<div class="no-data"><span>조회된 데이터가 없습니다.</span></div>`);
                    $('#' + idName).append(divWrapper);
                } else if (type == NamuChart.chartType.WORD_CLOUD.group_cd) {
                    divWrapper.append(`<div class="no-data"><span>조회된 데이터가 없습니다.</span></div>`);
                    $('#' + idName).append(divWrapper);
                } else if (type == NamuChart.chartType.IMAGE_ON_TOP.group_cd) {
                    divWrapper.append(`<div class="no-data"><span>조회된 데이터가 없습니다.</span></div>`);
                    $('#' + idName).append(divWrapper);
                } else if (type === NamuChart.chartType.DONUT.group_cd) {
                    divWrapper.append(`<div class="div-inner"><span>조회된 데이터가 없습니다.</span></div>`);
                    $('#' + idName).append(divWrapper);
                }
            } else {
                $('#' + idName).append(divWrapper);

                root = NamuChart.createRoots(1, idName);

                if (type === NamuChart.chartType.BAR.group_cd) {
                    NamuChart.createOneColumnChart(root, list, targetNameObj, idName);
                } else if (type === NamuChart.chartType.LINE.group_cd) {
                    NamuChart.createOneLineChart(root, list, targetNameObj);
                } else if (type === NamuChart.chartType.PIE.group_cd) {
                    if (!targetNameObj) {
                        NamuChart.createOnePieChart(root, list);
                    } else {
                        NamuChart.createOnePieChart(root, list, targetNameObj);
                    }
                } else if (type === NamuChart.chartType.COLOR_LINE.group_cd) {
                    NamuChart.createOneColorLineChart(root, list);
                } else if (type === NamuChart.chartType.CURVED.group_cd) {
                    NamuChart.createOneCurvedChart(root, list);
                } else if (type === NamuChart.chartType.IMAGE_ON_TOP.group_cd) {
                    NamuChart.createOneImageOnTopChart(root, list);
                } else if (type === NamuChart.chartType.WORD_CLOUD.group_cd) {
                    NamuChart.createOneWordCloudChart(root, list);
                } else if (type === NamuChart.chartType.BUBBLE_BASED_HEATMAP.group_cd) {
                    NamuChart.createOneBubbleBasedHeatMapChart(root, list);
                } else if (type === NamuChart.chartType.DONUT.group_cd) {
                    if (!targetNameObj) {
                        NamuChart.createOneDonutChart(root, list);
                    } else {
                        NamuChart.createOneDonutChart(root, list, targetNameObj);
                    }
                }
            }
        }
    },
    createOneChartBasePromise: function (idNameList, typeList, listList, targetNameObjList) {
        return new Promise((resolve, reject) => {
            setTimeout(function (idNameList){
                try {
                    for (var i = 0; i < idNameList.length; i++) {
                        var type = typeList[i];
                        var list = listList[i];
                        var idName = idNameList[i];
                        var targetNameObj = targetNameObjList[i];

                        var root = null;
                        var divWrapper = null;

                        if (type !== NamuChart.chartType.PIE.group_cd) {
                            $('#' + idName).empty();
                            divWrapper = $(`<div class="chartdiv" id="${idName}0"></div>`);
                        } else {
                            $('#' + idName).empty();
                            divWrapper = $(`<div class="pieChartdiv" id="${idName}0"></div>`);
                        }

                        if (list !== null) {
                            $(`.${idNameList[0]}-vs`).show();

                            if (list.length === 0) {
                                if (type === NamuChart.chartType.PIE.group_cd) {
                                    divWrapper.append(`<div class="div-inner"><span>조회된 데이터가 없습니다.</span></div>`);
                                    $('#' + idName).append(divWrapper);
                                } else if (type == NamuChart.chartType.BAR.group_cd) {
                                    divWrapper.append(`<div class="no-data"><span>조회된 데이터가 없습니다.</span></div>`);
                                    $('#' + idName).append(divWrapper);
                                } else if (type == NamuChart.chartType.CURVED.group_cd) {
                                    divWrapper.append(`<div class="no-data"><span>조회된 데이터가 없습니다.</span></div>`);
                                    $('#' + idName).append(divWrapper);
                                } else if (type == NamuChart.chartType.WORD_CLOUD.group_cd) {
                                    divWrapper.append(`<div class="no-data"><span>조회된 데이터가 없습니다.</span></div>`);
                                    $('#' + idName).append(divWrapper);
                                } else if (type == NamuChart.chartType.IMAGE_ON_TOP.group_cd) {
                                    divWrapper.append(`<div class="no-data"><span>조회된 데이터가 없습니다.</span></div>`);
                                    $('#' + idName).append(divWrapper);
                                }
                            } else {

                                $('#' + idName).append(divWrapper);

                                root = NamuChart.createRoots(1, idName);

                                if (type === NamuChart.chartType.BAR.group_cd) {
                                    NamuChart.createOneColumnChart(root, list, targetNameObj, idName);
                                } else if (type === NamuChart.chartType.LINE.group_cd) {
                                    NamuChart.createOneLineChart(root, list, targetNameObj);
                                } else if (type === NamuChart.chartType.PIE.group_cd) {
                                    if (!targetNameObj) {
                                        NamuChart.createOnePieChart(root, list);
                                    } else {
                                        NamuChart.createOnePieChart(root, list, targetNameObj);
                                    }
                                } else if (type === NamuChart.chartType.COLOR_LINE.group_cd) {
                                    NamuChart.createOneColorLineChart(root, list);
                                } else if (type === NamuChart.chartType.CURVED.group_cd) {
                                    NamuChart.createOneCurvedChart(root, list);
                                } else if (type === NamuChart.chartType.IMAGE_ON_TOP.group_cd) {
                                    NamuChart.createOneImageOnTopChart(root, list);
                                } else if (type === NamuChart.chartType.WORD_CLOUD.group_cd) {
                                    NamuChart.createOneWordCloudChart(root, list);
                                } else if (type === NamuChart.chartType.BUBBLE_BASED_HEATMAP.group_cd) {
                                    NamuChart.createOneBubbleBasedHeatMapChart(root, list);
                                }

                            }
                        }
                    }

                    resolve();
                } catch (e) {
                    reject();
                }
            }.bind(null, idNameList), 1000);
        })
    },
    createChart: function (roots, divNum, checkNum, data) {
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
    },
    createOneColumnChart: function (root, list, targetNameObj = null, idName) {
        var root = root[0];

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true,
        }));

        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);

        var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });

        xRenderer.grid.template.setAll({
            location: 1
        })

        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: "name",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1
            })
        }));

        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "totalCnt",
            sequencedInterpolation: true,
            categoryXField: "name",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}"
            }),
            maskBullets: false
        }));

        var colWidth = am5.p50;
        if (idName == "operator-bchart-usage" || idName == "kind-bchart-usage") {
            colWidth = 100;
        }

        series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0, width: colWidth });
        series.columns.template.adapters.add("fill", function(fill, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.columns.template.adapters.add("stroke", function(stroke, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.bullets.push(() => {
            return am5.Bullet.new(root, {
                locationY: 1,
                sprite: am5.Label.new(root, {
                    text: "{totalCnt}",
                    fill: "#ff0000",
                    centerY: am5.p100,
                    centerX: am5.p50,
                    populateText: true
                })
            });
        });

        xAxis.data.setAll(list);
        series.data.setAll(list);

        series.appear(1000, 1);
        chart.appear(1000, 1);

        return chart;
    },
    createOneLineChart: function (root, list, targetNameObj) {
        var root = root[0];
        var targetList = Object.keys(targetNameObj).length === 2 ? [
            {name: targetNameObj.firstName, value: "firstCnt"},
            {name: targetNameObj.secondName, value: "secondCnt"}
        ] : [
            {name: targetNameObj.firstName, value: "totalCnt"}
        ];

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout,
        }));

        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "none"
        }));
        cursor.lineY.set("visible", false);

        var legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50,
            })
        );

        // xAxis
        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.5,
            minZoomCount: 10,
            maxZoomCount: 20,
            categoryField: "x",
            renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 50
            }),
            tooltip: am5.Tooltip.new(root, {})
        }));

        /*xAxis.events.once("datavalidated", function (ev) {
            ev.target.zoomToIndexes(0, 10);
        });*/

        xAxis.data.setAll(list);

        // yAxis
        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            calculateTotals: true,
            min: 0,
            extraMax: 0.1,
            renderer: am5xy.AxisRendererY.new(root, {
                minGridDistance: 20
            })
        }));

        var makeSeries = (seriesName, fieldName) => {
            var series = chart.series.push(am5xy.LineSeries.new(root, {
                name: seriesName,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: "x",
                tooltip: am5.Tooltip.new(root, {
                    pointerOrientation: "horizontal",
                    labelText: "{valueY}",
                })
            }));

            series.bullets.push(() => {
                return am5.Bullet.new(root, {
                    locationY: 1,
                    sprite: am5.Circle.new(root, {
                        text: "{valueYTotal}",
                        radius: 5,
                        fill: series.get("fill"),
                        stroke: root.interfaceColors.get("background"),
                        strokeWidth: 1,
                        populateText: true
                    })
                });
            });

            series.data.setAll(list);
            legend.data.push(series);
            series.appear(1000, 1);
        }

        chart.set("scrollbarX", am5.Scrollbar.new(root, {
            orientation: "horizontal"
        }));

        for (var target of targetList) {
            makeSeries(target.name, target.value);
        }

        // 내보내기
        /*var exporting = am5plugins_exporting.Exporting.new(root, {
            menu: am5plugins_exporting.ExportingMenu.new(root, {}),
            pngOptions: {
                quality: 0.7,
                maintainPixelRatio: true,
                minWidth: 1000,
                maxWidth: 2000
            },
            jpgOptions: {
                quality: 0.7,
                maintainPixelRatio: true,
                minWidth: 1000,
                maxWidth: 2000
            },
            filePrefix: "test",
            // filePrefix: $('#searchKey1 option:selected').text() + "(" + $('#searchKey2 option:selected').text() + ")"
        });*/

        chart.appear(1000, 1);

        return chart;
    },
    createOneColorLineChart: function (root, list) {
        var root = root[0];

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout,
            pinchZoomX: true
        }));

        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "none"
        }))
        cursor.lineY.set("visible", false);

        var colorSet = am5.ColorSet.new(root, {});

        for (var i = 0; i < list.length; i++) {
            var idx = i / 4;

            if (i % 4 === 0) {
                list[i] = {
                    ...list[i],
                    strokeSettings: {
                        stroke: colorSet.getIndex(idx * 3)
                    },
                    fillSettings: {
                        fill: colorSet.getIndex(idx * 3)
                    },
                    bulletSettings: {
                        fill: colorSet.getIndex(idx * 3)
                    }
                }
            } else {
                list[i] = {
                    ...list[i],
                    bulletSettings: {
                        fill: colorSet.getIndex(idx * 3)
                    }
                }
            }
        }

        var xRenderer = am5xy.AxisRendererX.new(root, {});
        xRenderer.grid.template.set("location", 0.5);
        xRenderer.labels.template.setAll({
            location: 0.5,
            multiLocation: 0.5
        });

        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "x",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        xAxis.data.setAll(list);

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxPrecision: 0,
            renderer: am5xy.AxisRendererY.new(root, {})
        }));

        var series = chart.series.push(am5xy.LineSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "totalCnt",
            categoryXField: "x",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}",
                dy:-5
            })
        }));

        series.strokes.template.setAll({
            templateField: "strokeSettings",
            strokeWidth: 2
        });

        series.fills.template.setAll({
            visible: true,
            fillOpacity: 0.5,
            templateField: "fillSettings"
        });

        series.bullets.push(function() {
            return am5.Bullet.new(root, {
                sprite: am5.Circle.new(root, {
                    templateField: "bulletSettings",
                    radius: 5
                })
            });
        });

        series.data.setAll(list);
        series.appear(1000, 1);

        chart.set("scrollbarX", am5.Scrollbar.new(root, {
            orientation: "horizontal",
            marginBottom: 20
        }));

        chart.appear(1000, 1);

        return chart;
    },
    createOneCurvedChart: function (root, list, targetNameObj = null, idName) {
        var root = root[0];
        var targetList = targetNameObj ? [
            {name: targetNameObj.bottomName, value: "bottomCnt"},
            {name: targetNameObj.topName, value: "topCnt"},
        ] : [];

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
        }));

        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);

        var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });

        var xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                maxDeviation: 0.3,
                categoryField: "name",
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(root, {})
            })
        );

        xRenderer.grid.template.setAll({
            location: 1
        })

        var yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 0.3,
                renderer: am5xy.AxisRendererY.new(root, {
                    strokeOpacity: 0.1
                })
            })
        );

        var tooltip = am5.Tooltip.new(root, {});

        var series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: "Series 1",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "totalCnt",
                sequencedInterpolation: true,
                categoryXField: "name",
                tooltipText: "{valueY}",
                tooltip: tooltip
            })
        );

        series.columns.template.setAll({
            width: am5.percent(120),
            fillOpacity: 0.9,
            strokeOpacity: 0
        });
        series.columns.template.adapters.add("fill", (fill, target) => {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.columns.template.adapters.add("stroke", (stroke, target) => {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.columns.template.set("draw", function(display, target) {
            var w = target.getPrivate("width", 0);
            var h = target.getPrivate("height", 0);
            display.moveTo(0, h);
            display.bezierCurveTo(w / 4, h, w / 4, 0, w / 2, 0);
            display.bezierCurveTo(w - w / 4, 0, w - w / 4, h, w, h);
        });

        xAxis.data.setAll(list);
        series.data.setAll(list);

        series.appear(1000, 1);
        chart.appear(1000, 1);

        return chart;
    },
    createOneImageOnTopChart: function (root, list) {
        var root = root[0];

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
            layout: root.verticalLayout,
        }));

        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);

        var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });

        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.5,
            minZoomCount: 10,
            maxZoomCount: 20,
            categoryField: "name",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        xRenderer.grid.template.set("visible", false);

        var yRenderer = am5xy.AxisRendererY.new(root, {});
        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0,
            min: 0,
            extraMax: 0.1,
            renderer: yRenderer
        }));

        yRenderer.grid.template.setAll({
            strokeDasharray: [2, 2]
        });

        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "totalCnt",
            sequencedInterpolation: true,
            categoryXField: "name",
            tooltip: am5.Tooltip.new(root, { dy: -25, labelText: "{valueY}" })
        }));


        series.columns.template.setAll({
            cornerRadiusTL: 5,
            cornerRadiusTR: 5,
            strokeOpacity: 0,
            width: 100,
            tooltipY: 0
        });

        series.columns.template.adapters.add("fill", (fill, target) => {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.columns.template.adapters.add("stroke", (stroke, target) => {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        list.forEach(element => {
            if (element["name"].toLowerCase() === "evpass") {
                element["bulletSettings"] = {
                    src: "/images/chart/evpass.png"
                }
            } else if (element["name"].toLowerCase() === "swing") {
                element["bulletSettings"] = {
                    src: "/images/chart/swing.png"
                }
            } else if (element["name"].toLowerCase() === "citylabs") {
                element["bulletSettings"] = {
                    src: "/images/chart/citylabs.png"
                }
            }
        });

        series.bullets.push(function() {
            return am5.Bullet.new(root, {
                locationY: 1,
                sprite: am5.Picture.new(root, {
                    templateField: "bulletSettings",
                    width: 50,
                    height: 50,
                    centerX: am5.p50,
                    centerY: am5.p50,
                    shadowColor: am5.color(0x000000),
                    shadowBlur: 4,
                    shadowOffsetX: 4,
                    shadowOffsetY: 4,
                    shadowOpacity: 0.6
                })
            });
        });

        xAxis.data.setAll(list);
        series.data.setAll(list);

        series.appear(1000, 1);
        chart.appear(1000, 1);

        return chart;
    },
    createOneWordCloudChart: function (root, list) {
        var root = root[0];

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var series = root.container.children.push(am5wc.WordCloud.new(root, {
            minWordLength: 1,
            maxFontSize:am5.percent(95),
            minFontSize:am5.percent(30),
            text: list.join(" ")
        }));

        series.labels.template.setAll({
           paddingTop: 5,
           paddingBottom: 5,
           paddingLeft: 5,
           paddingRight: 5,
           fontFamily: "Courier New"
        });

        series.appear();
    },
    createOneBubbleBasedHeatMapChart: function (root, list) {
        var root = root[0];
        var thresholdDiff = 13;

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: "none",
                wheelY: "none",
                layout: root.verticalLayout
            })
        );

        var yRenderer = am5xy.AxisRendererY.new(root, {
            visible: false,
            minGridDistance: 5,
            inversed: true
        });

        yRenderer.grid.template.set("visible", false);

        var yAxis = chart.yAxes.push(
            am5xy.CategoryAxis.new(root, {
                maxDeviation: 0,
                renderer: yRenderer,
                categoryField: "weekday"
            })
        );

        var xRenderer = am5xy.AxisRendererX.new(root, {
            visible: false,
            minGridDistance: 30,
            opposite: true
        });

        xRenderer.grid.template.set("visible", false);

        var xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                renderer: xRenderer,
                categoryField: "hour"
            })
        );

        var minValue = list.reduce(function (min, obj) {
            return obj.value < min ? obj.value : min;
        }, Infinity);

        var maxValue = list.reduce(function (max, obj) {
            return obj.value > max ? obj.value : max;
        }, -Infinity);

        if (maxValue > minValue + thresholdDiff) {
            maxValue = minValue + thresholdDiff;
        }

        var series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                calculateAggregates: true,
                stroke: am5.color(0xffa500),
                clustered: false,
                xAxis: xAxis,
                yAxis: yAxis,
                categoryXField: "hour",
                categoryYField: "weekday",
                valueField: "value"
            })
        );

        series.columns.template.setAll({
            forceHidden: true
        });

        var circleTemplate = am5.Template.new({ radius: 5 });

        series.bullets.push(function () {
            if (list.length > 0) {
                var graphics = am5.Circle.new(
                    root, {
                        stroke: series.get("stroke"),
                        fill: series.get("fill")
                    }, circleTemplate
                );
                return am5.Bullet.new(root, {
                    sprite: graphics
                });
            }
        });

        series.bullets.push(function (root, series, dataItem) {
            if (dataItem.dataContext.value > 0) {
                return am5.Bullet.new(root, {
                    locationX: 0.5,
                    locationY: 0.5,
                    sprite: am5.Label.new(root, {
                        text: dataItem.dataContext.value,
                        centerX: am5.percent(50),
                        centerY: am5.percent(50),
                        populateText: true,
                        fontSize: 16
                    })
                })
            }
        })

        var heatRulesConfObj = {};

        if (minValue === 0 && maxValue === 0) {
            heatRulesConfObj = {
                target: circleTemplate,
                min: 0,
                max: 0,
                dataField: "value",
                key: "radius",
                visible: false
            }
        } else {
            heatRulesConfObj = {
                target: circleTemplate,
                min: minValue,
                max: maxValue,
                dataField: "value",
                key: "radius"
            }
        }

        series.set("heatRules", [heatRulesConfObj]);

        series.data.setAll(list);

        yAxis.data.setAll([
            { weekday: "일요일" },
            { weekday: "월요일" },
            { weekday: "화요일" },
            { weekday: "수요일" },
            { weekday: "목요일" },
            { weekday: "금요일" },
            { weekday: "토요일" }
        ]);

        xAxis.data.setAll([
            { hour: "0시" },
            { hour: "1시" },
            { hour: "2시" },
            { hour: "3시" },
            { hour: "4시" },
            { hour: "5시" },
            { hour: "6시" },
            { hour: "7시" },
            { hour: "8시" },
            { hour: "9시" },
            { hour: "10시" },
            { hour: "11시" },
            { hour: "12시" },
            { hour: "13시" },
            { hour: "14시" },
            { hour: "15시" },
            { hour: "16시" },
            { hour: "17시" },
            { hour: "18시" },
            { hour: "19시" },
            { hour: "20시" },
            { hour: "21시" },
            { hour: "22시" },
            { hour: "23시" }
        ]);

        chart.appear(1000, 1);

        setInterval(function () {
            var i = 0;
            list.forEach(function (d) {
                var n = {
                    value: d.value + d.value * Math.random() * 0.2,
                    hour: d.hour,
                    weekday: d.weekday
                };
                series.data.setIndex(i, n);
                i++;
            });
        }, 1000);
    },
    createOneDonutChart: function (root, list, targetNameObj) {
        var root = root[0];
        var chart = null;

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        if (!targetNameObj) {
            chart = root.container.children.push(am5percent.PieChart.new(root, {
                radius: am5.percent(90),
                innerRadius: am5.percent(50),
                layout: root["verticalLayout"]
            }));
        } else if (targetNameObj && targetNameObj.op) {
            chart = root.container.children.push(am5percent.PieChart.new(root, {
                radius: am5.percent(90),
                innerRadius: am5.percent(50),
                layout: root["horizontalLayout"]
            }));
        }

        var series = chart.series.push(am5percent.PieSeries.new(root, {
            name: "Series",
            valueField: "value",
            categoryField: "name",
            alignLabels: false,
        }));

        series.data.setAll(list);

        series.labels.template.set("forceHidden", true);
        series.ticks.template.set("forceHidden", true);

        series.slices.template.set("strokeOpacity", 0);
        series.slices.template.set("fillGradient", am5.RadialGradient.new(root, {
            stops: [{
                brighten: -0.8
            }, {
                brighten: -0.8
            }, {
                brighten: -0.5
            }, {
                brighten: 0
            }, {
                brighten: -0.5
            }]
        }));

        var legend = chart.children.push(am5.Legend.new(root, {
            centerY: am5.percent(100),
            y: am5.percent(100),
            layout: root.verticalLayout,
            height: am5.percent(100),
            oversizedBehavior: "none"
        }));

        legend.valueLabels.template.setAll({ textAlign: "center" })

        legend.labels.template.setAll({
            fontSize: 8,
            oversizedBehavior: "wrap"
        });

        legend.valueLabels.template.setAll({
            fontSize: 10,
        });

        legend.data.setAll(series.dataItems);

        series.appear(1000, 100);
    }
};

NamuChart.initialize();
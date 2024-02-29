<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c' %>

<div id="pmUsage" class="row_detail" style="display: none;">
    <div class="box" style="border: none;">
        <form>
            <label>
                <input type="checkbox" class="form-chk" name="illegalParking" id="illegalParking">
                <span class="form-name" style="background: 0; padding-left: 0px;">불법주정차</span>
            </label>
            <p>운영사</p>
            <select name="useComp" id="useComp" class="select-full">
                <option value="">전체</option>
                <option value="none">미분류</option>
                <c:forEach var="operator" items="${operators}">
                    <option value="<c:out value='${operator}'/>"><c:out value='${operator}'/></option>
                </c:forEach>
            </select>
            <p>대여/반납</p>
            <select name="use" id="use" class="select-full">
                <option value="">전체</option>
                <option value="rent">대여</option>
                <option value="return">반납</option>
            </select>
            <div style="width: 100%; display: flex; justify-content: space-between; margin-bottom: 8px; position: relative; margin-top: 8px;">
                <input type="text" style="width: 50%;" class="form-control searchList datepicker" id="startSearchDt" name="startSearchDt"
                       placeholder="시작일을 선택해주세요.">
                <input type="text" style="width: 50%;" class="form-control searchList datepicker" id="endSearchDt" name="endSearchDt"
                       placeholder="종료일을 선택해주세요.">
            </div>
            <button type="button" class="cmnBtn search" style="min-width: 100%; margin-top: 10px;">조회</button>
        </form>
    </div>
</div>

<script type="text/javascript">
    jQuery(document).ready(function () {

        $(".datepicker").datepicker({
            format: "yy-mm-dd"
            , autoclose: true
            , language: "ko"
            , todayBtn: "linked"
            , clearBtn: true
        });

        // 디폴트로 쓸 날짜 가져오기
        var currentDate = new Date();
        var previousMonthDate = new Date(currentDate);
        previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);

        $("#startSearchDt").datepicker("setDate", previousMonthDate);
        $("#endSearchDt").datepicker("setDate", currentDate);

        $("#illegalParking").change(function () {
            if (!$("#illegalParking").is(':checked')) {
                $("#vw-notice").hide();
            }

            if ($("#illegalParking").is(':checked') && NamuLayer.illegalFlag) {
                $("#vw-notice").show();
            }

            if (NamuLayer.getLayer("park")) {
                NamuLayer.getLayer("park").setVisible($("#illegalParking").is(':checked'));
            }
        });

        var rentIconStyle = new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [10, 10],
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
                src: '/images/marker/marker_blue.png'
            }))
        });

        var returnIconStyle = new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [10, 10],
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
                src: '/images/marker/marker_green.png'
            }))
        });

        var parkIconStyle = new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [10, 10],
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
                src: '/images/marker/marker_red.png'
            }))
        });

        let blur = 18;
        let radius = 15;
        let opacity = 0.6;

        $('#pmUsage button').bind('click', function (event) {
            NamuLayer.removeLayer("allUsage", "view_all_usage");
            NamuLayer.removeLayer("rentUsage", "view_rent_usage");
            NamuLayer.removeLayer("returnUsage", "view_return_usage");
            NamuLayer.delLayer("park");

            var dataObj = {};
            var formatString = 'YYYY-MM-DD HH:mm:ss';

            dataObj.operator = $("#useComp").val();
            dataObj.retf = $("#use").val();
            dataObj.startSearchDt = $("#startSearchDt").datepicker("getDate") ? moment($("#startSearchDt").datepicker("getDate")).startOf('day').format(formatString) : "";
            dataObj.endSearchDt = $("#endSearchDt").datepicker("getDate") ? moment($("#endSearchDt").datepicker("getDate")).startOf('day').format(formatString) : "";
            dataObj.isIPChecked = null;

            if (dataObj.startSearchDt == "" || dataObj.endSearchDt == "") {
                alert("이용정보 시작일/종료일을 확인하세요");
                return;
            }

            if (moment(dataObj.startSearchDt).isAfter(dataObj.endSearchDt)) {
                alert("시작일이 종료일을 넘었습니다.");
                $("input[name='startSearchDt']").focus();
                return;
            }

            dataObj.endSearchDt= moment(dataObj.endSearchDt).add(1, 'days').format(formatString);

            $.ajax({
                headers: {
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                },
                type: "POST",
                url: "/pm/driving/getOverallPmLendRtnHstryList.json",
                data: $.param(dataObj),
                dataType: "json",
                success: function (result) {
                    var data = result.list;
                    var length = 0;

                    // rent: blue
                    // return: red
                    var rentFeatures = new Array();
                    var returnFeatures = new Array();
                    var parkFeatures = new Array();
                    var use = $("#use").val();

                    if (use !== "rent") {
                        NamuLayer.illegalFlag = true;
                    } else {
                        NamuLayer.illegalFlag = false;
                        $("#vw-notice").hide();
                    }

                    data.forEach(function (datum, index) {
                        // console.dir(datum);

                        if (use === "" || use === "rent") {
                            rentFeatures[index] = new ol.Feature({
                                id: datum.id,
                                geometry: new ol.geom.Point(ol.proj.transform([datum.spoint_x * 1, datum.spoint_y * 1], 'EPSG:4326', "EPSG:900913")),
                                point: [datum.spoint_y, datum.spoint_x],
                                type: "rentUsage"
                            });

                            // rentFeatures[index].setStyle(rentIconStyle);

                            length++;
                        }

                        if (use === "" || use === "return") {
                            returnFeatures[index] = new ol.Feature({
                                id: datum.id,
                                geometry: new ol.geom.Point(ol.proj.transform([datum.epoint_x * 1, datum.epoint_y * 1], 'EPSG:4326', "EPSG:900913")),
                                point: [datum.epoint_y, datum.epoint_x],
                                type: "returnUsage"
                            });

                            // returnFeatures[index].setStyle(returnIconStyle);

                            if (datum.ille_park == 1) {
                                var parkFeature = new ol.Feature({
                                    id: datum.id,
                                    geometry: new ol.geom.Point(ol.proj.transform([datum.epoint_x * 1, datum.epoint_y * 1], 'EPSG:4326', "EPSG:900913")),
                                    point: [datum.epoint_y, datum.epoint_x],
                                    type: "park"
                                });
                                parkFeature.setStyle(parkIconStyle);
                                parkFeatures.push(parkFeature);
                            }

                            length++;

                            // if () {
                            //     $("#vw-notice").show();
                            //     NamuLayer.searchIllegalParkingMarker();
                            // } else {
                            //     $("#vw-notice").hide();
                            //     NamuLayer.removeLayer("illegalParking", "search_illegal_parking");
                            // }
                        }

                    });

                    (async () => {
                        await NamuLayer.showGisPopup(length);

                        if (use === "") {
                            vectorHeatAll = new ol.layer.Heatmap({
                                source: new ol.source.Vector({
                                    features: rentFeatures.concat(returnFeatures)
                                }),
                                blur: blur,
                                radius: radius,
                                opacity: opacity
                            });

                            vectorHeatAll.setGradient([
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#8b51c0',
                                '#e84d39',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#e60000',
                                '#FFD700']);
                            vectorHeatAll.set("allUsage", "view_all_usage")
                            NamuLayer.map.addLayer(vectorHeatAll);

                        } else {
                            vectorHeatRent = new ol.layer.Heatmap({
                                source: new ol.source.Vector({
                                    features: rentFeatures
                                }),
                                blur: blur,
                                radius: radius,
                                opacity: opacity
                            });

                            vectorHeatRent.setGradient(['#003', '#006', '#00d', '#009', '#00f']);
                            vectorHeatRent.set("rentUsage", "view_rent_usage")
                            NamuLayer.map.addLayer(vectorHeatRent);

                            vectorHeatReturn = new ol.layer.Heatmap({
                                source: new ol.source.Vector({
                                    features: returnFeatures
                                }),
                                blur: blur,
                                radius: radius,
                                opacity: opacity
                            });

                            /*
                                                vectorHeatReturn.setStyle({
                                                    "fill-color": "yellow",
                                                    "stroke-color": "black",
                                                    "stroke-width": 4
                                                });
                            */

                            vectorHeatReturn.setGradient(['#030', '#060', '#0d0', '#090', '#0f0']);
                            vectorHeatReturn.set("returnUsage", "view_return_usage");
                            NamuLayer.map.addLayer(vectorHeatReturn);
                        }
                        /*
                                            var rentUsageLayer = new ol.layer.Vector({
                                                source: new ol.source.Vector({
                                                    features: rentFeatures
                                                })
                                            });
                                            rentUsageLayer.set("rentUsage", "view_rent_usage");
                                            NamuLayer.map.addLayer(rentUsageLayer);
                        */

                        /*
                                            var returnUsageLayer = new ol.layer.Vector({
                                                source: new ol.source.Vector({
                                                    features: returnFeatures
                                                })
                                            });
                                            returnUsageLayer.set("returnUsage", "view_return_usage");
                                            NamuLayer.map.addLayer(returnUsageLayer);
                        */

                        var parkUsageLayer = new ol.layer.Vector({
                            source: new ol.source.Vector({
                                features: parkFeatures
                            })
                        });
                        // parkUsageLayer.set("parkUsage", "view_park_usage");
                        if ($("#illegalParking").is(':checked') && NamuLayer.illegalFlag) {
                            $("#vw-notice").show();
                        }

                        if (!$("#illegalParking").is(':checked')) {
                            $("#vw-notice").hide();
                        }

                        parkUsageLayer.setVisible($("#illegalParking").is(':checked'));
                        NamuLayer.addLayer("park", parkUsageLayer);
                        // NamuLayer.getLayer("park").setVisible();


                        // NamuLayer.removeLayer("rentUsage", "view_rent_usage");

                        // if (use === "rent") {
                        //   NamuLayer.removeLayer("returnUsage", "view_return_usage");
                        // }

                        // NamuLayer.removeLayer("returnUsage", "view_return_usage");

                        // if (use === "return") {
                        //   NamuLayer.removeLayer("rentUsage", "view_rent_usage");
                        // }

                        /*                    {
                                                features[index] = new ol.Feature({
                                                id: datum.id,
                                                geometry: new ol.geom.Point(ol.proj.transform([datum.epoint_x * 1, datum.epoint_y * 1], 'EPSG:4326', "EPSG:900913")),
                                                type: "illegalParking"
                                              });

                                                features[index].setStyle(iconStyle);

                                                var illegalParkingVSource = new ol.source.Vector({
                                                  features: features
                                                });

                                                var illegalParkingLayer = new ol.layer.Vector({
                                                  source: illegalParkingVSource
                                                });

                                                illegalParkingLayer.set("illegalParking", "search_illegal_parking")

                                                // NamuLayer.removeLayer("illegalParking", "search_illegal_parking");

                                                NamuLayer.map.addLayer(illegalParkingLayer);
                                            }*/
                    })();
                }, error: function (error) {
                    alert('이용 정보 조회에 실패했습니다.\n해당 문제가 지속될 경우 관리자에게 문의하여 주십시요.');
                    console.log(error.code);
                }
            });

        });
    });

</script>
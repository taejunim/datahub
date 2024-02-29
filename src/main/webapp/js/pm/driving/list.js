document.write('<script src="/js/namu/NamuLayer.js"></script>');

var map; //맵 변수 선언 : 지도 객체
var view;
var aKey = "D5152B22-77A2-311E-B514-EFD1422CD4ED";
var formatString = 'YYYY-MM-DD HH:mm:ss';

$(() => {
    view = new ol.View({ //뷰 생성
        projection: 'EPSG:3857', //좌표계 설정 (EPSG:3857은 구글에서 사용하는 좌표계)
        center: new ol.geom.Point([126.5398, 33.3876]) //처음 중앙에 보여질 경도, 위도
            .transform('EPSG:4326', 'EPSG:3857') //GPS 좌표계 -> 구글 좌표계
            .getCoordinates(), //포인트의 좌표를 리턴함
        zoom: 10.5, //초기지도 zoom의 정도값
        minZoom: 10.5,
        maxZoom: 20
    });

    map = new ol.Map({ //맵 생성
        target: 'vMap', //html 요소 id 값
        view: view //뷰
    });

    NamuLayer.setMap(map);

    NamuLayer.createVworldMapLayer('Base', 'base', true, 'png');

    $(".ol-zoom").hide();

    ol.proj.proj4.register(proj4);

    var operator = "";
    var retf = $("#pm-usage-retf").val();
    var startSearchDt = "";
    var endSearchDt = "";
    var isIPChecked = false;

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
    startSearchDt = moment($("#startSearchDt").val(), 'YYYY-MM-DD').format(formatString);
    endSearchDt = moment($("#endSearchDt").val(), 'YYYY-MM-DD').format(formatString);


    $(".custom-modal-close").click(function (e) {
        NamuLayer.removeLayer("vector", "search_vector");

        $(".loc-modal").removeClass("custom-modal-show");
        $(".loc-modal").addClass("custom-modal-none");
    })

    var datatable = $('#datatable').DataTable({
        searching : false,
        paging: true,
        responsive: true,
        language: lang_kor,
        lengthChange: true,
        processing: true,
        serverSide: true,
        order : [],
        scrollX: "100%",
        initComplete: function(settings, json) {
            this.api().page('last').draw('page');
            $("#datatable_length").css("display", "none");
        },
        drawCallback: function(settings) {
            $("#datatable_paginate").addClass("pagination");
            $("#datatable_paginate .active").addClass("on");
        },
        language: {
            lengthMenu: "_MENU_",
            info: ''
        },
        lengthMenu: [[10, 20, 30], [10, 20, 30]],
        ajax: {
            url: '/pm/driving/getOverallPmLendRtnHstryList.json',
            type: "POST",
            data: function (d) {
                d.operator = operator;
                d.retf = retf;
                d.startSearchDt = startSearchDt;
                d.endSearchDt = endSearchDt;
                d.isIPChecked = isIPChecked;
            },
            dataType: 'json',
            dataSrc: function (data) {
                $("#pm-usage-total").text(data.recordsTotal);
                return data.list
            }
        },
        columns: [
            {
                title: '순번',
                width: "40px",
                className: 'colNum',
                orderable: false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },{
                title: '운영사',
                width: "80px",
                data: 'oper',
                render: function (data, type, row, meta) {
                    if (data !== null && data !== '') {
                        return data;
                    } else {
                        return '-';
                    }
                },
                orderable: false
            },{
                title: 'PM 종류',
                width: "80px",
                data: 'pm_type',
                render: function (data, type, row, meta) {
                    if (data !== null && data !== '') {
                        return data;
                    } else {
                        return '-';
                    }
                },
                orderable: false
            },{
                title: '회원번호',
                width: "60px",
                data: 'mbr_no',
                render: function (data, type, row, meta) {
                    if (data !== null && data !== '') {
                        return data;
                    } else {
                        return '-';
                    }
                },
                orderable: false
            },{
                title: 'PM ID',
                width: "80px",
                data: 'kckbrd_id',
                render: function (data, type, row, meta) {
                    if (data !== null && data !== '') {
                        if (data.length <= 10) {
                            return data;
                        } else {
                            return data.substring(0, 10) + '...';
                        }
                    } else {
                        return '-';
                    }
                },
                orderable: false
            },{
                title: '대여 지역',
                // width: "80px",
                data: 'rent_spot',
                render: function (data, type, row, meta) {
                    if (data !== null && data !== '') {
                        return data;
                    } else {
                        return '-';
                    }
                },
                orderable: false
            },{
                title: '대여일',
                data: 'lend_dt',
                render: function (data, type, row, meta) {
                    if (data !== null) {
                        var date = new Date(data);

                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        var day = date.getDate();
                        var hours = date.getHours();
                        var minutes = date.getMinutes();
                        var seconds = date.getSeconds();

                        return `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    } else {
                        return '-';
                    }
                },
                orderable: false
            },{
                title: '반납 지역',
                // width: "80px",
                data: 'return_spot',
                render: function (data, type, row, meta) {
                    if (data !== null && data !== '') {
                        return data;
                    } else {
                        return '-';
                    }
                },
                orderable: false
            },{
                title: '반납일',
                data: 'rtn_dt',
                render: function (data, type, row, meta) {
                    if (data !== null) {
                        var date = new Date(data);

                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        var day = date.getDate();
                        var hours = date.getHours();
                        var minutes = date.getMinutes();
                        var seconds = date.getSeconds();

                        return `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    } else {
                        return '-';
                    }
                },
                orderable: false
            },{
                title: "불법주차",
                width: "60px",
                data: "ille_park",
                render: function (data, type, row, meta) {
                    if (data === 1) {
                        return '○';
                    } else if (data === 0) {
                        return 'X'
                    } else {
                        return '-'
                    }
                },
                orderable: false
            },{
                title: "위치보기",
                width: "60px",
                data: "",
                render: function (data, type, row, meta) {
                    var locBtn = $('<button>').text("위치보기").addClass('cellFormButton cellFormBtn4');

                    $('#datatable').off('click', 'button');

                    // event delegation
                    $('#datatable').on('click', 'button', function() {

                        var rowData = $('#datatable').DataTable().row($(this).closest('tr')).data();

                        if (rowData) {
                            if ((rowData.spoint_x !== null && rowData.spoint_y !== null) && (rowData.epoint_x !== null && rowData.epoint_y !== null)) {
                                var xy = [(rowData.spoint_x + rowData.epoint_x) / 2, (rowData.spoint_y + rowData.epoint_y) / 2];
                                var distance = NamuLayer.getDistance(rowData.spoint_y, rowData.spoint_x, rowData.epoint_y, rowData.epoint_x);

                                if (distance < 1.49) {
                                    NamuLayer.setCenterCustom(xy, 16);
                                } else if (distance < 14.6) {
                                    NamuLayer.setCenterCustom(xy, 13);
                                } else {
                                    NamuLayer.setCenterCustom(xy, 10);
                                }
                            } else {
                                if (rowData.spoint_x !== null && rowData.spoint_y !== null) {
                                    var xy = [rowData.spoint_x, rowData.spoint_y];
                                    NamuLayer.setCenter(xy);
                                } else if (rowData.epoint_x !== null && rowData.epoint_y !== null) {
                                    var xy = [rowData.epoint_x, rowData.epoint_y];
                                    NamuLayer.setCenter(xy);
                                }
                            }

                            if (rowData.spoint_x !== null && rowData.spoint_y !== null) {
                                NamuLayer.setMarker(rowData.spoint_y, rowData.spoint_x, "blue", "driving")
                            }

                            if (rowData.epoint_x !== null && rowData.epoint_y !== null) {
                                if (rowData.ille_park === 0) {
                                    NamuLayer.setMarker(rowData.epoint_y, rowData.epoint_x, "green", "driving")
                                } else if (rowData.ille_park === 1) {
                                    NamuLayer.setMarker(rowData.epoint_y, rowData.epoint_x, "red", "driving")
                                }
                            }

                            $(".loc-modal").removeClass("custom-modal-none");
                            $(".loc-modal").addClass("custom-modal-show");
                        }
                    });

                    return locBtn.prop('outerHTML');
                },
                orderable: false
            }
        ],
    });

    $("#pm-usage-dropdown").on("change", function() {
        var val = parseInt(this.value);
        var dropdown = document.querySelector('.dataTables_length select');

        if (dropdown instanceof HTMLSelectElement) {
            var changeEvent = new Event("change");
            if (val === 10) {
                dropdown.selectedIndex = 0;
            } else if (val === 20) {
                dropdown.selectedIndex = 1;
            } else if (val === 30) {
                dropdown.selectedIndex = 2;
            }
            dropdown.dispatchEvent(changeEvent);
        }
    });

    $("#resetBtn").on("click", () => {
        window.location.reload();
    });

    // 검색조건 : 검색버튼 클릭 이벤트
    $("#searchBtn").on("click", () => {
        submit();
    });

    $("#excelBtn").on("click", () => {

        var data = {
            "operator": $("#pm-usage-operator").val(),
            "retf": $("#pm-usage-retf").val(),
            "startSearchDt": $("input[name='startSearchDt']").val() ? moment($("input[name='startSearchDt']").val(), 'YYYY-MM-DD').format(formatString) : "",
            "endSearchDt": $("input[name='endSearchDt']").val()  ? moment($("input[name='endSearchDt']").val(), 'YYYY-MM-DD').add(1, "days").format(formatString) : "",
            "isIPChecked": $("input[name='ill-pk']").prop("checked"),
            "pagingYn": false
        };

        $.ajax({
            url: "/pm/driving/downloadExcel.json",
            type: "POST",
            data: data,
            dataType: "json",
            success: (res) => {
                var fileName = res.fileName
                $("#excelDownForm #excelFileName").val(fileName);
                $("#excelDownForm #excelFileDownName").val("PM_이용_정보");
                $("#excelDownForm").attr("action", "/common/downloadExcel.json");
                $('#excelDownForm').submit();
            }, error: function(error) {
                alert('서버 에러가 발생했습니다.\n해당 문제가 지속될 경우 관리자에게 문의하여 주십시오.');
                console.log(error.code);
            }
        });
    });

    function submit() {
        operator = $("#pm-usage-operator").val();
        retf = $("#pm-usage-retf").val();
        startSearchDt = $("input[name='startSearchDt']").val() ? moment($("input[name='startSearchDt']").val(), 'YYYY-MM-DD').format(formatString) : "";
        endSearchDt = $("input[name='endSearchDt']").val()  ? moment($("input[name='endSearchDt']").val(), 'YYYY-MM-DD').format(formatString) : "";
        isIPChecked = $("input[name='ill-pk']").prop("checked");

        if (moment(startSearchDt).isAfter(endSearchDt)) {
            alert("검색종료일은 검색시작일보다 이후 날짜를 입력해야 합니다.");
            $("input[name='startSearchDt']").focus();
            return false;
        }

        endSearchDt= moment(endSearchDt).add(1, 'days').format(formatString);

        datatable.ajax.reload();
    }
})
